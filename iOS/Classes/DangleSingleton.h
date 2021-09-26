#import <Foundation/Foundation.h>

@interface DangleSingleton : NSObject
@property(nonatomic, strong) NSThread *jsThread;

+ (instancetype)instance;

- (void)setJsThread:(NSThread *)jsThread;
@end
