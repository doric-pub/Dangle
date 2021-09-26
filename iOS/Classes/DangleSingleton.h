#import <Foundation/Foundation.h>

@interface DangleSingleton : NSObject

@property(nonatomic, strong) NSThread *jsThread;
@property(nonatomic) void *jsRuntimePtr;

+ (instancetype)instance;

- (void)setupJsThread;

- (void)setupJSIRuntime;
@end
