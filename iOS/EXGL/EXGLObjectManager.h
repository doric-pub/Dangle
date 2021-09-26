// Copyright 2016-present 650 Industries. All rights reserved.

@interface EXGLObjectManager : NSObject

- (void)saveContext:(nonnull id)glContext;
- (void)deleteContextWithId:(nonnull NSNumber *)contextId;

@end
