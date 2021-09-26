

#import "DangleSingleton.h"

@implementation DangleSingleton

- (instancetype)init {
    if (self = [super init]) {
    }
    return self;
}

+ (instancetype)instance {
    static DangleSingleton *_instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [DangleSingleton new];
    });
    return _instance;
}

- (void)setJsThread:(NSThread *)jsThread {
    _jsThread = jsThread;
}

@end
