#ifndef __UDANGLE_H__
#define __UDANGLE_H__

#ifdef __ANDROID__
#include <GLES3/gl3.h>
#endif
#ifdef __APPLE__
#include <OpenGLES/ES3/gl.h>
#endif

#ifdef __cplusplus
#include <functional>
#else
#include <stdbool.h>
#endif

// NOTE: The symbols exposed by this header are named with a `UEX` prefix rather than an `EX`
//       prefix so that they are unaffected by the automated iOS versioning script when
//       referenced in versioned Objective-C code. The Dangle C/C++ library is not versioned
//       and there is only one copy of its code in the binary form of the Expo application.

#ifdef __cplusplus
extern "C" {
#endif

// Identifies an Dangle context. No Dangle context has the id 0, so that can be
// used as a 'null' value.
typedef unsigned int UDangleContextId;

// Identifies an Dangle object. Dangle objects represent virtual mappings to underlying OpenGL objects.
// No Dangle object has the id 0, so that can be used as a 'null' value.
typedef unsigned int UDangleObjectId;

// [JS thread] Create an Dangle context and return its id number. Saves the
// JavaScript interface object (has a WebGLRenderingContext-style API) at
// `global.__DANGLEContexts[id]` in JavaScript.
UDangleContextId UDangleContextCreate(void *runtime);

#ifdef __cplusplus
// [JS thread] Pass function to cpp that will run GL operations on GL thread
void UDangleContextSetFlushMethod(UDangleContextId dangleCtxId, std::function<void(void)> flushMethod);
#endif

#ifdef __APPLE__
// Objective-C wrapper for UDangleContextSetFlushMethod
typedef void (^UDangleFlushMethodBlock)(void);
void UDangleContextSetFlushMethodObjc(UDangleContextId dangleCtxId, UDangleFlushMethodBlock flushMethod);
#endif

// [Any thread] Check whether we should redraw the surface
bool UDangleContextNeedsRedraw(UDangleContextId dangleCtxId);

// [GL thread] Tell cpp that we finished drawing to the surface
void UDangleContextDrawEnded(UDangleContextId dangleCtxId);

// [Any thread] Release the resources for an Dangle context. The same id is never
// reused.
void UDangleContextDestroy(UDangleContextId dangleCtxId);

// [GL thread] Perform one frame's worth of queued up GL work
void UDangleContextFlush(UDangleContextId dangleCtxId);

// [GL thread] Set the default framebuffer (used when binding 0). Allows using
// platform-specific extensions on the default framebuffer, such as MSAA.
void UDangleContextSetDefaultFramebuffer(UDangleContextId dangleCtxId, GLint framebuffer);

#ifdef __cplusplus
}
#endif

#endif
