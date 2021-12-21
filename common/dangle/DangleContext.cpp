#include "DangleContext.h"

namespace dangle::gl_cpp {

static std::unordered_map<UDangleContextId, DangleContext *> DangleContextMap;
static std::mutex DangleContextMapMutex;
static UDangleContextId DangleContextNextId = 1;

std::atomic_uint DangleContext::nextObjectId{1};

DangleContext *DangleContext::ContextGet(UDangleContextId dangleCtxId) {
  std::lock_guard<decltype(DangleContextMapMutex)> lock(DangleContextMapMutex);
  auto iter = DangleContextMap.find(dangleCtxId);
  if (iter != DangleContextMap.end()) {
    return iter->second;
  }
  return nullptr;
}

UDangleContextId DangleContext::ContextCreate(jsi::Runtime &runtime) {
  // Out of ids?
  if (DangleContextNextId >= std::numeric_limits<UDangleContextId>::max()) {
    DangleSysLog("Ran out of DangleContext ids!");
    return 0;
  }

  // Create C++ object
  DangleContext *dangleCtx;
  UDangleContextId dangleCtxId;
  {
    std::lock_guard<std::mutex> lock(DangleContextMapMutex);
    dangleCtxId = DangleContextNextId++;
    if (DangleContextMap.find(dangleCtxId) != DangleContextMap.end()) {
      DangleSysLog("Tried to reuse an DangleContext id. This shouldn't really happen...");
      return 0;
    }
    dangleCtx = new DangleContext(runtime, dangleCtxId);
    DangleContextMap[dangleCtxId] = dangleCtx;
  }

  return dangleCtxId;
}

void DangleContext::ContextDestroy(UDangleContextId dangleCtxId) {
  std::lock_guard<std::mutex> lock(DangleContextMapMutex);

  // Destroy C++ object, JavaScript side should just know...
  auto iter = DangleContextMap.find(dangleCtxId);
  if (iter != DangleContextMap.end()) {
    iter->second->destroy = true;
    delete iter->second;
    DangleContextMap.erase(iter);
  }
}

void DangleContext::installMethods(
        jsi::Runtime &runtime,
        jsi::Object &jsGl,
        UDangleContextId dangleCtxId) {
  using namespace std::placeholders;
#define INSTALL_METHOD(name, requiredWebgl2)                                       \
  setFunctionOnObject(                                                             \
      runtime,                                                                     \
      jsGl,                                                                        \
      #name,                                                                       \
      [this, dangleCtxId](                                                         \
          jsi::Runtime &runtime,                                                   \
          const jsi::Value &jsThis,                                                \
          const jsi::Value *jsArgv,                                                \
          size_t argc) {                                                           \
        auto dangleCtx = DangleContext::ContextGet(dangleCtxId);                   \
        if (!dangleCtx) {                                                          \
          return jsi::Value::null();                                               \
        }                                                                          \
        try {                                                                      \
          if (requiredWebgl2 && !this->supportsWebGL2) {                           \
            unsupportedWebGL2(#name, runtime, jsThis, jsArgv, argc);               \
            return jsi::Value::null();                                             \
          } else {                                                                 \
            return this->glNativeMethod_##name(runtime, jsThis, jsArgv, argc);     \
          }                                                                        \
        } catch (const std::exception &e) {                                        \
          throw std::runtime_error(std::string("[" #name "] error: ") + e.what()); \
        }                                                                          \
      });

#define NATIVE_METHOD(name) INSTALL_METHOD(name, false)
#define NATIVE_WEBGL2_METHOD(name) INSTALL_METHOD(name, true)
#include "DangleNativeMethods.def"
#undef NATIVE_METHOD
#undef NATIVE_WEBGL2_METHOD
}

void DangleContext::installConstants(jsi::Runtime &runtime, jsi::Object &jsGl) {
#define GL_CONSTANT(name) \
  jsGl.setProperty(       \
      runtime, jsi::PropNameID::forUtf8(runtime, #name), static_cast<double>(GL_##name));
#include "DangleConstants.def"
#undef GL_CONSTANT
}

jsi::Value DangleContext::dangleIsObject(UDangleObjectId id, std::function<GLboolean(GLuint)> func) {
  GLboolean glResult;
  addBlockingToNextBatch([&] { glResult = func(lookupObject(id)); });
  return glResult == GL_TRUE;
}

jsi::Value DangleContext::dangleGenObject(
    jsi::Runtime &runtime,
    const std::function<void(GLsizei, UDangleObjectId *)>& func) {
  return addFutureToNextBatch(runtime, [=] {
    GLuint buffer;
    func(1, &buffer);
    return buffer;
  });
  return nullptr;
}

jsi::Value DangleContext::dangleCreateObject(jsi::Runtime &runtime, const std::function<GLuint()>& func) {
  return addFutureToNextBatch(runtime, [=] { return func(); });
  return nullptr;
}

jsi::Value DangleContext::dangleDeleteObject(
        UDangleObjectId id,
        const std::function<void(UDangleObjectId)>& func) {
  addToNextBatch([=] { func(lookupObject(id)); });
  return nullptr;
}

jsi::Value DangleContext::dangleDeleteObject(
        UDangleObjectId id,
        const std::function<void(GLsizei, const UDangleObjectId *)>& func) {
  addToNextBatch([=] {
    GLuint buffer = lookupObject(id);
    func(1, &buffer);
  });
  return nullptr;
}
jsi::Value DangleContext::dangleUnimplemented(const std::string& name) {
  throw std::runtime_error("DANGLE: " + name + "() isn't implemented yet!");
}

void DangleContext::maybeReadAndCacheSupportedExtensions() {
  if (supportedExtensions.empty()) {
    addBlockingToNextBatch([&] {
      GLint numExtensions = 0;
      glGetIntegerv(GL_NUM_EXTENSIONS, &numExtensions);

      for (auto i = 0; i < numExtensions; i++) {
        std::string extensionName(reinterpret_cast<const char *>(glGetStringi(GL_EXTENSIONS, i)));

        // OpenGL ES prefixes extension names with `GL_`, need to trim this.
        if (extensionName.substr(0, 3) == "GL_") {
          extensionName.erase(0, 3);
        }
        if (extensionName != "OES_vertex_array_object") {
          supportedExtensions.insert(extensionName);
        }
      }
    });

    supportedExtensions.insert("OES_texture_float_linear");
    supportedExtensions.insert("OES_texture_half_float_linear");

    // OpenGL ES 3.0 supports these out of the box.
    if (supportsWebGL2) {
      supportedExtensions.insert("WEBGL_compressed_texture_astc");
      supportedExtensions.insert("WEBGL_compressed_texture_etc");
    }

#ifdef __APPLE__
    // All iOS devices support PVRTC compression format.
    supportedExtensions.insert("WEBGL_compressed_texture_pvrtc");
#endif
  }
}
} // namespace dangle::gl_cpp
