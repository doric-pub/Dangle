// Copyright 2016-present 650 Industries. All rights reserved.

#import <OpenGLES/EAGL.h>
#include "UDangle.h"

@class DangleGLContext;

@protocol DangleContextDelegate <NSObject>

- (void)glContextFlushed:(nonnull DangleGLContext *)context;

- (void)glContextInitialized:(nonnull DangleGLContext *)context;

- (void)glContextWillDestroy:(nonnull DangleGLContext *)context;

- (UDangleObjectId)glContextGetDefaultFramebuffer;

@end

@interface DangleGLContext : NSObject

- (instancetype)initWithDelegate:(id <DangleContextDelegate>)delegate;

- (void)initialize:(nullable void (^)(BOOL))callback;

- (BOOL)isInitialized;

- (nullable EAGLContext *)createSharedEAGLContext;

- (void)runAsync:(nonnull void (^)(void))callback;

- (void)runInEAGLContext:(nonnull EAGLContext *)context callback:(nonnull void (^)(void))callback;

- (void)destroy;

// "protected"
@property(nonatomic, assign) UDangleContextId contextId;
@property(nonatomic, strong, nonnull) EAGLContext *eaglCtx;
@property(nonatomic, weak, nullable) id <DangleContextDelegate> delegate;

@end
