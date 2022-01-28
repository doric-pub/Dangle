#import "DangleSingleton.h"
#import "JSCRuntime.h"
#import "DoricSingleton.h"
#import "DoricNativeDriver.h"
#import "DoricJSEngine.h"
#import "DoricJSCoreExecutor.h"

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

- (void)setupJsThread {
    DoricNativeDriver *nativeDriver = DoricSingleton.instance.nativeDriver;
    DoricJSEngine *engine = nativeDriver.jsExecutor;
    _jsThread = engine.jsThread;
}

- (void)setupJSIRuntime {
    DoricNativeDriver *nativeDriver = DoricSingleton.instance.nativeDriver;
    DoricJSEngine *engine = nativeDriver.jsExecutor;
    DoricJSCoreExecutor *jscExecutor = engine.jsExecutor;
    std::unique_ptr < facebook::jsi::Runtime > runtime = facebook::jsc::makeJSCRuntime(jscExecutor.jsContext.JSGlobalContextRef);
    _jsRuntimePtr = runtime.release();
}

@end
