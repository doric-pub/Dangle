#include <cstdint>

#include <android/log.h>
#include <jni.h>
#include <thread>

#include <jsi/jsi.h>
#include "UDangle.h"

jint ContextCreate([[maybe_unused]] JNIEnv *env, [[maybe_unused]] jclass clazz, jlong jsiPtr) {
    return UDangleContextCreate((void *) jsiPtr);
}

void ContextDestroy([[maybe_unused]] JNIEnv *env, [[maybe_unused]] jclass clazz, jint dangleCtxId) {
    UDangleContextDestroy(dangleCtxId);
}

void ContextFlush([[maybe_unused]] JNIEnv *env, [[maybe_unused]] jclass clazz, jint dangleCtxId) {
    UDangleContextFlush(dangleCtxId);
}

void ContextSetFlushMethod(JNIEnv *env, [[maybe_unused]] jclass clazz, jint dangleCtxId,
                           jobject glContext) {
    jclass GLContextClass = env->GetObjectClass(glContext);
    jobject glContextRef = env->NewGlobalRef(glContext);
    jmethodID flushMethodRef = env->GetMethodID(GLContextClass, "flush", "()V");

    std::function<void(void)> flushMethod = [env, glContextRef, flushMethodRef] {
        env->CallVoidMethod(glContextRef, flushMethodRef);
    };
    UDangleContextSetFlushMethod(dangleCtxId, flushMethod);
}

jboolean
ContextNeedsRedraw([[maybe_unused]] JNIEnv *env, [[maybe_unused]] jclass clazz, jint dangleCtxId) {
    return UDangleContextNeedsRedraw(dangleCtxId);
}

void
ContextDrawEnded([[maybe_unused]] JNIEnv *env, [[maybe_unused]] jclass clazz, jint dangleCtxId) {
    UDangleContextDrawEnded(dangleCtxId);
}

static JNINativeMethod methods[] = {
        {"ContextCreate",         "(J)I",                   (void *) &ContextCreate},
        {"ContextDestroy",        "(I)V",                   (void *) &ContextDestroy},
        {"ContextFlush",          "(I)V",                   (void *) &ContextFlush},
        {"ContextSetFlushMethod", "(ILjava/lang/Object;)V", (void *) &ContextSetFlushMethod},
        {"ContextNeedsRedraw",    "(I)Z",                   (void *) &ContextNeedsRedraw},
        {"ContextDrawEnded",      "(I)V",                   (void *) &ContextDrawEnded},
};

int jniRegisterNativeMethods(JNIEnv *env, const char *className, const JNINativeMethod *gMethods,
                             int numMethods) {
    jclass clazz;
    int tmp;
    clazz = env->FindClass(className);
    if (clazz == nullptr) {
        return -1;
    }
    if ((tmp = env->RegisterNatives(clazz, gMethods, numMethods)) < 0) {
        return -1;
    }
    return 0;
}

int registerNativeMethods(JNIEnv *env) {
    return jniRegisterNativeMethods(env, "pub/doric/dangle/DangleJNI",
                                    methods,
                                    sizeof(methods) / sizeof(methods[0]));
}

jint JNI_OnLoad(JavaVM *vm, void *reserved) {
    JNIEnv *env;
    if (vm->GetEnv(reinterpret_cast<void **>(&env), JNI_VERSION_1_6) != JNI_OK) {
        return -1;
    }
    if (registerNativeMethods(env) != JNI_OK) {
        return -1;
    }
    return JNI_VERSION_1_6;
}