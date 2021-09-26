#import "DangleViewNode.h"
#import <EXGL/EXGLView.h>
#import "DangleSingleton.h"

@implementation DangleViewNode

- (instancetype)init {
    self = [super init];
    if (self) {
        if (!DangleSingleton.instance.jsRuntimePtr) {
            [DangleSingleton.instance setupJSIRuntime];
        }
    }
    return self;
}

- (UIView *)build {
    EXGLView *exglView = [[EXGLView alloc] init];
    return exglView;
}
@end
