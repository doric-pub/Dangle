// Copyright 2016-present 650 Industries. All rights reserved.

#import <EXGL/EXGLObjectManager.h>
#import <EXGL/EXGLObject.h>
#import <EXGL/EXGLView.h>

@interface EXGLObjectManager ()

@property (nonatomic, strong) NSMutableDictionary<NSNumber *, EXGLContext *> *glContexts;
@property (nonatomic, strong) NSMutableDictionary<NSNumber *, EXGLObject *> *objects; // Key is `EXGLObjectId`

@end

@implementation EXGLObjectManager

+ (const NSString *)exportedModuleName
{
  return @"ExponentGLObjectManager";
}

- (instancetype)init
{
  if ((self = [super init])) {
    _glContexts = [NSMutableDictionary dictionary];
    _objects = [NSMutableDictionary dictionary];
  }
  return self;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_queue_create("host.exp.exponent.GLObjectManager", DISPATCH_QUEUE_SERIAL);
}

- (EXGLContext *)getContextWithId:(NSNumber *)contextId
{
  return _glContexts[contextId];
}

- (void)saveContext:(nonnull EXGLContext *)glContext
{
  if (glContext.isInitialized) {
    [_glContexts setObject:glContext forKey:@(glContext.contextId)];
  }
}

- (void)deleteContextWithId:(nonnull NSNumber *)contextId
{
  [_glContexts removeObjectForKey:contextId];
}

- (void)dealloc
{
  // destroy all GLContexts when EXGLObjectManager gets dealloced
  [_glContexts enumerateKeysAndObjectsUsingBlock:^(NSNumber * _Nonnull contextId, EXGLContext * _Nonnull glContext, BOOL * _Nonnull stop) {
    [glContext destroy];
  }];
}

@end
