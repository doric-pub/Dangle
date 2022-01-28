// Copyright 2016-present 650 Industries. All rights reserved.

#import <OpenGLES/EAGL.h>
#import <Engine/UDangle.h>

@class DangleContext;

@protocol DangleContextDelegate <NSObject>

- (void)glContextFlushed:(nonnull DangleContext *)context;
- (void)glContextInitialized:(nonnull DangleContext *)context;
- (void)glContextWillDestroy:(nonnull DangleContext *)context;
- (UDangleObjectId)glContextGetDefaultFramebuffer;

@end

@interface DangleContext : NSObject

- (instancetype)initWithDelegate:(id<DangleContextDelegate>)delegate;
- (void)initialize:(nullable void (^)(BOOL))callback;
- (BOOL)isInitialized;
- (nullable EAGLContext *)createSharedEAGLContext;
- (void)runAsync:(nonnull void (^)(void))callback;
- (void)runInEAGLContext:(nonnull EAGLContext *)context callback:(nonnull void (^)(void))callback;
- (void)destroy;

// "protected"
@property(nonatomic, assign) UDangleContextId contextId;
@property(nonatomic, strong, nonnull) EAGLContext *eaglCtx;
@property(nonatomic, weak, nullable) id<DangleContextDelegate> delegate;

@end
