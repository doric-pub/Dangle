// Copyright 2016-present 650 Industries. All rights reserved.

#import <EXGL/EXGLContext.h>

#include <OpenGLES/ES3/gl.h>
#include <OpenGLES/ES3/glext.h>

#include "DangleSingleton.h"

#define BLOCK_SAFE_RUN(block, ...) block(__VA_ARGS__)

@interface EXGLContext ()

@property (nonatomic, strong) dispatch_queue_t glQueue;
@property (nonatomic, weak) EXGLObjectManager *objectManager;

@end

@implementation EXGLContext

- (instancetype)initWithDelegate:(id<EXGLContextDelegate>)delegate andObjectManager:(nonnull EXGLObjectManager *)objectManager
{
  if (self = [super init]) {
    self.delegate = delegate;

    _objectManager = objectManager;
    _glQueue = dispatch_queue_create("host.exp.gl", DISPATCH_QUEUE_SERIAL);
    _eaglCtx = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES3] ?: [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
  }
  return self;
}

- (BOOL)isInitialized
{
  return _contextId != 0;
}

- (EAGLContext *)createSharedEAGLContext
{
  return [[EAGLContext alloc] initWithAPI:[_eaglCtx API] sharegroup:[_eaglCtx sharegroup]];
}

- (void)runInEAGLContext:(EAGLContext*)context callback:(void(^)(void))callback
{
  [EAGLContext setCurrentContext:context];
  callback();
  glFlush();
  [EAGLContext setCurrentContext:nil];
}

- (void)runAsync:(void(^)(void))callback
{
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

- (void)initialize:(void(^)(BOOL))callback
{

  void *jsRuntimePtr = DangleSingleton.instance.jsRuntimePtr;

  if (jsRuntimePtr) {
    __weak __typeof__(self) weakSelf = self;

    [self ensureRunOnJSThread:^{
      EXGLContext *self = weakSelf;

      if (!self) {
        BLOCK_SAFE_RUN(callback, NO);
        return;
      }

      self->_contextId = UEXGLContextCreate(jsRuntimePtr);
      [self->_objectManager saveContext:self];

      UEXGLContextSetFlushMethodObjc(self->_contextId, ^{
        [self flush];
      });

      if ([self.delegate respondsToSelector:@selector(glContextInitialized:)]) {
        [self.delegate glContextInitialized:self];
      }
      BLOCK_SAFE_RUN(callback, YES);
    }];
  } else {
    BLOCK_SAFE_RUN(callback, NO);
    NSLog(@"EXGL: Can only run on JavaScriptCore! Do you have 'Remote Debugging' enabled in your app's Developer Menu (https://reactnative.dev/docs/debugging)? EXGL is not supported while using Remote Debugging, you will need to disable it to use EXGL.");
  }
}

- (void)flush
{
  [self runAsync:^{
    UEXGLContextFlush(self->_contextId);

    if ([self.delegate respondsToSelector:@selector(glContextFlushed:)]) {
      [self.delegate glContextFlushed:self];
    }
  }];
}

- (void)destroy
{
  [self runAsync:^{
    if ([self.delegate respondsToSelector:@selector(glContextWillDestroy:)]) {
      [self.delegate glContextWillDestroy:self];
    }

    // Flush all the stuff
    UEXGLContextFlush(self->_contextId);

    // Destroy JS binding
    UEXGLContextDestroy(self->_contextId);

    // Remove from dictionary of contexts
    [self->_objectManager deleteContextWithId:@(self->_contextId)];
  }];
}

- (NSDictionary *)currentViewport
{
  GLint viewport[4];
  glGetIntegerv(GL_VIEWPORT, viewport);
  return @{ @"x": @(viewport[0]), @"y": @(viewport[1]), @"width": @(viewport[2]), @"height": @(viewport[3]) };
}

- (GLint)defaultFramebuffer
{
  if ([self.delegate respondsToSelector:@selector(glContextGetDefaultFramebuffer)]) {
    return [self.delegate glContextGetDefaultFramebuffer];
  }

  return 0;
}

@end
