#import <EXGL/EXGLView.h>

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
    EXGLView *exglView = [[EXGLView alloc] init];
    __weak EXGLView* weakView = exglView;
    __weak __typeof(self) _self = self;
    exglView.onSurfaceAvailable = ^void(int width, int height) {
        __strong EXGLView* strongView = weakView;
        __strong __typeof(_self) self = _self;
        
        [self callJSResponse:self.onPrepared, @(strongView.glContext.contextId), @(width), @(height), nil];
    };
    return exglView;
}

- (void)blendView:(UIView *)view forPropName:(NSString *)name propValue:(id)prop {
    if ([name isEqualToString:@"onPrepared"]) {
        self.onPrepared = prop;
    } else {
        [super blendView:view forPropName:name propValue:prop];
    }
}

@end
