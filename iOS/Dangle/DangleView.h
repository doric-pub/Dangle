// Copyright 2016-present 650 Industries. All rights reserved.

#import <DANGLE_CPP/UDangle.h>
#import "DangleContext.h"

NS_ASSUME_NONNULL_BEGIN

@interface DangleView : UIView <DangleContextDelegate>

- (instancetype)init;
- (UDangleContextId)dangleCtxId;

@property (nonatomic, assign) NSNumber *msaaSamples;

// "protected"
@property (nonatomic, strong, nullable) DangleContext *glContext;
@property (nonatomic, strong, nullable) EAGLContext *uiEaglCtx;

@property (nonatomic, copy) void (^onSurfaceAvailable)();

@end

NS_ASSUME_NONNULL_END
