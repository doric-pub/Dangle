#import <Foundation/Foundation.h>

#include "DanglePlatformUtils.h"

namespace dangle {
    namespace gl_cpp {

        void DangleiOSLog(const char *msg, ...) {
            va_list args;
            va_start(args, msg);
            NSLog(@"%@", [[NSString alloc] initWithFormat:[NSString stringWithUTF8String:msg]
                                                arguments:args]);
            va_end(args);
        }

        DangleiOSOperatingSystemVersion DangleiOSGetOperatingSystemVersion() {
            NSOperatingSystemVersion version = NSProcessInfo.processInfo.operatingSystemVersion;
            return DangleiOSOperatingSystemVersion{
                    version.majorVersion,
                    version.minorVersion,
                    version.patchVersion,
            };
        }
    }
}
