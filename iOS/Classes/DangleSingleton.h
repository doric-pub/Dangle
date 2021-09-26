#import <Foundation/Foundation.h>

@interface DangleSingleton : NSObject

@property(nonatomic, strong) NSThread *jsThread;
@property(nonatomic) void *jsRuntimePtr;

+ (instancetype)instance;

- (void)setJsThread:(NSThread *)jsThread;

- (void)setupJSIRuntime;
@end
