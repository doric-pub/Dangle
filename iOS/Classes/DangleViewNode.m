#import <DANGLE/DangleView.h>

#import "DangleViewNode.h"
#import "DangleSingleton.h"

@implementation DangleViewNode

- (instancetype)init {
    self = [super init];
    if (self) {
        if (!DangleSingleton.instance.jsRuntimePtr) {
            [DangleSingleton.instance setupJSIRuntime];
            [DangleSingleton.instance setupJsThread];
        }
    }
    return self;
}

- (UIView *)build {
    DangleView *dangleView = [[DangleView alloc] init];
    __weak DangleView* weakView = dangleView;
    __weak __typeof(self) _self = self;
    dangleView.onSurfaceAvailable = ^void() {
        __strong DangleView* strongView = weakView;
        __strong __typeof(_self) self = _self;
        
        [self callJSResponse:self.onPrepared, @(strongView.glContext.contextId), nil];
    };
    return dangleView;
}

- (void)blendView:(UIView *)view forPropName:(NSString *)name propValue:(id)prop {
    if ([name isEqualToString:@"onPrepared"]) {
        self.onPrepared = prop;
    } else {
        [super blendView:view forPropName:name propValue:prop];
    }
}

@end
