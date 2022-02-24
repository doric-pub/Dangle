// Copyright 2016-present 650 Industries. All rights reserved.

#import "DangleGLContext.h"
#include <MetalANGLE/GLES3/gl3.h>
#include "DangleSingleton.h"

@interface DangleGLContext ()

@property(nonatomic, strong) dispatch_queue_t glQueue;

@end

@implementation DangleGLContext

- (instancetype)initWithDelegate:(id <DangleContextDelegate>)delegate {
    if (self = [super init]) {
        self.delegate = delegate;

        _glQueue = dispatch_queue_create("host.dangle.gl", DISPATCH_QUEUE_SERIAL);
        _eaglCtx = [[MGLContext alloc] initWithAPI:kMGLRenderingAPIOpenGLES3] ?: [[MGLContext alloc] initWithAPI:kMGLRenderingAPIOpenGLES2];
    }
    return self;
}

- (BOOL)isInitialized {
    return _contextId != 0;
}

- (MGLContext *)createSharedEAGLContext {
    return [[MGLContext alloc] initWithAPI:[_eaglCtx API] sharegroup:[_eaglCtx sharegroup]];
}

- (void)runInEAGLContext:(MGLContext *)context callback:(void (^)(void))callback {
    [MGLContext setCurrentContext:context forLayer:self.layer];
    glBindFramebuffer(GL_FRAMEBUFFER, self.layer.defaultOpenGLFrameBufferID);
    callback();
    glFlush();
    
    [context present:self.layer];
    [MGLContext setCurrentContext:nil];
}

- (void)runAsync:(void (^)(void))callback {
    if (_glQueue) {
        dispatch_async(_glQueue, ^{
            [self runInEAGLContext:self->_eaglCtx callback:callback];
        });
    }
}

- (void)ensureRunOnJSThread:(dispatch_block_t)block {
    if (NSThread.currentThread == DangleSingleton.instance.jsThread) {
        block();
    } else {
        [self performSelector:@selector(ensureRunOnJSThread:)
                     onThread:DangleSingleton.instance.jsThread
                   withObject:[block copy]
                waitUntilDone:NO];
    }
}

- (void)initialize:(void (^)(BOOL))callback {

    void *jsRuntimePtr = DangleSingleton.instance.jsRuntimePtr;

    if (jsRuntimePtr) {
        __weak __typeof__(self) weakSelf = self;

        [self ensureRunOnJSThread:^{
            DangleGLContext *self = weakSelf;

            if (!self) {
                return;
            }

            self->_contextId = UDangleContextCreate(jsRuntimePtr);

            UDangleContextSetFlushMethodObjc(self->_contextId, ^{
                [self flush];
            });

            if ([self.delegate respondsToSelector:@selector(glContextInitialized:)]) {
                [self.delegate glContextInitialized:self];
            }
        }];
    } else {
        NSLog(@"Dangle: Can only run on JavaScriptCore! Do you have 'Remote Debugging' enabled in your app's Developer Menu (https://reactnative.dev/docs/debugging)? Dangle is not supported while using Remote Debugging, you will need to disable it to use Dangle.");
    }
}

- (void)flush {
    [self runAsync:^{
        UDangleContextFlush(self->_contextId);

        if ([self.delegate respondsToSelector:@selector(glContextFlushed:)]) {
            [self.delegate glContextFlushed:self];
        }
    }];
}

- (void)destroy {
    [self runAsync:^{
        if ([self.delegate respondsToSelector:@selector(glContextWillDestroy:)]) {
            [self.delegate glContextWillDestroy:self];
        }

        // Flush all the stuff
        UDangleContextFlush(self->_contextId);

        // Destroy JS binding
        UDangleContextDestroy(self->_contextId);
    }];
}

- (GLint)defaultFramebuffer {
    if ([self.delegate respondsToSelector:@selector(glContextGetDefaultFramebuffer)]) {
        return [self.delegate glContextGetDefaultFramebuffer];
    }

    return 0;
}

@end
