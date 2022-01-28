#import "DangleLibrary.h"
#import "DangleViewNode.h"
#import "DangleVSyncPlugin.h"

@implementation DangleLibrary
- (void)load:(DoricRegistry *)registry {
    NSString *path = [[NSBundle mainBundle] bundlePath];
    NSString *fullPath = [path stringByAppendingPathComponent:@"bundle_dangle.js"];
    NSString *jsContent = [NSString stringWithContentsOfFile:fullPath encoding:NSUTF8StringEncoding error:nil];
    [registry registerJSBundle:jsContent withName:@"dangle"];

    [registry registerViewNode:DangleViewNode.class withName:@"DangleView"];
    [registry registerNativePlugin:DangleVSyncPlugin.class withName:@"vsync"];
}
@end
