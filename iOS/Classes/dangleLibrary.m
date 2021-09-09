#import "dangleLibrary.h"
#import "DoricDemoPlugin.h"

@implementation dangleLibrary
- (void)load:(DoricRegistry *)registry {
    NSString *path = [[NSBundle mainBundle] bundlePath];
    NSString *fullPath = [path stringByAppendingPathComponent:@"bundle_dangle.js"];
    NSString *jsContent = [NSString stringWithContentsOfFile:fullPath encoding:NSUTF8StringEncoding error:nil];
    [registry registerJSBundle:jsContent withName:@"dangle"];
    [registry registerNativePlugin:DoricDemoPlugin.class withName:@"demoPlugin"];
}
@end