#include "UDangle.h"

#include <utility>
#include "DangleContext.h"

using namespace dangle::gl_cpp;

UDangleContextId UDangleContextCreate(void *runtime) {
    return DangleContext::ContextCreate(*reinterpret_cast<jsi::Runtime *>(runtime));
}

void UDangleContextSetFlushMethod(UDangleContextId dangleCtxId, std::function<void(void)> flushMethod) {
    auto dangleCtx = DangleContext::ContextGet(dangleCtxId);
    if (dangleCtx) {
        dangleCtx->flushOnGLThread = std::move(flushMethod);
    }
}

#ifdef __APPLE__

void UDangleContextSetFlushMethodObjc(UDangleContextId dangleCtxId, UDangleFlushMethodBlock flushMethod) {
    UDangleContextSetFlushMethod(dangleCtxId, [flushMethod] {
        flushMethod();
    });
}

#endif

bool UDangleContextNeedsRedraw(UDangleContextId dangleCtxId) {
    auto dangleCtx = DangleContext::ContextGet(dangleCtxId);
    if (dangleCtx) {
        return dangleCtx->needsRedraw;
    }
    return false;
}

void UDangleContextDrawEnded(UDangleContextId dangleCtxId) {
    auto dangleCtx = DangleContext::ContextGet(dangleCtxId);
    if (dangleCtx) {
        dangleCtx->setNeedsRedraw(false);
    }
}

void UDangleContextDestroy(UDangleContextId dangleCtxId) {
    auto dangleCtx = DangleContext::ContextGet(dangleCtxId);
    if (dangleCtx && !dangleCtx->m_done) {
        DangleSysLog("notify blocked JS thread");
        dangleCtx->m_done = true;
        dangleCtx->m_done_cv.notify_all();
    }
    DangleContext::ContextDestroy(dangleCtxId);
}

void UDangleContextFlush(UDangleContextId dangleCtxId) {
    auto dangleCtx = DangleContext::ContextGet(dangleCtxId);
    if (dangleCtx) {
        dangleCtx->flush();
    }
}

void UDangleContextSetDefaultFramebuffer(UDangleContextId dangleCtxId, GLint framebuffer) {
    auto dangleCtx = DangleContext::ContextGet(dangleCtxId);
    if (dangleCtx) {
        dangleCtx->setDefaultFramebuffer(framebuffer);
    }
}
