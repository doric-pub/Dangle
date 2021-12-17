#include <cstdint>

#include <android/log.h>
#include <jni.h>
#include <thread>

#include <jsi/jsi.h>
#include "UDangle.h"

extern "C" {

JNIEXPORT jint JNICALL
Java_pub_doric_dangle_DangleJNI_ContextCreate([[maybe_unused]] JNIEnv *env,
                                              [[maybe_unused]] jclass clazz, jlong jsiPtr) {
    return UDangleContextCreate((void *) jsiPtr);
}

JNIEXPORT void JNICALL
Java_pub_doric_dangle_DangleJNI_ContextDestroy([[maybe_unused]] JNIEnv *env,
                                               [[maybe_unused]] jclass clazz, jint dangleCtxId) {
    UDangleContextDestroy(dangleCtxId);
}

JNIEXPORT void JNICALL
Java_pub_doric_dangle_DangleJNI_ContextFlush([[maybe_unused]] JNIEnv *env,
                                             [[maybe_unused]] jclass clazz, jint dangleCtxId) {
    UDangleContextFlush(dangleCtxId);
}

JNIEXPORT void JNICALL Java_pub_doric_dangle_DangleJNI_ContextSetFlushMethod(
        JNIEnv *env,
        [[maybe_unused]] jclass clazz,
        jint dangleCtxId,
        jobject glContext) {
    jclass GLContextClass = env->GetObjectClass(glContext);
    jobject glContextRef = env->NewGlobalRef(glContext);
    jmethodID flushMethodRef = env->GetMethodID(GLContextClass, "flush", "()V");

    std::function<void(void)> flushMethod = [env, glContextRef, flushMethodRef] {
        env->CallVoidMethod(glContextRef, flushMethodRef);
    };
    UDangleContextSetFlushMethod(dangleCtxId, flushMethod);
}

JNIEXPORT jboolean JNICALL
Java_pub_doric_dangle_DangleJNI_ContextNeedsRedraw([[maybe_unused]] JNIEnv *env,
                                                   [[maybe_unused]] jclass clazz,
                                                   jint dangleCtxId) {
    return UDangleContextNeedsRedraw(dangleCtxId);
}

JNIEXPORT void JNICALL
Java_pub_doric_dangle_DangleJNI_ContextDrawEnded([[maybe_unused]] JNIEnv *env,
                                                 [[maybe_unused]] jclass clazz, jint dangleCtxId) {
    UDangleContextDrawEnded(dangleCtxId);
}
}
