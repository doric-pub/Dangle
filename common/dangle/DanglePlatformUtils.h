#pragma once

#ifdef __APPLE__

namespace dangle {
namespace gl_cpp {
void DangleiOSLog(const char *msg, ...) __attribute__((format(printf, 1, 2)));

typedef struct {
  long majorVersion;
  long minorVersion;
  long patchVersion;
} DangleiOSOperatingSystemVersion;

DangleiOSOperatingSystemVersion DangleiOSGetOperatingSystemVersion(void);
} // namespace gl_cpp
} // namespace dangle

#endif

#ifdef __ANDROID__
#include <android/log.h>
#endif

#define DANGLE_DEBUG // Whether debugging is on

#ifdef DANGLE_DEBUG
#ifdef __ANDROID__
#define DangleSysLog(fmt, ...) __android_log_print(ANDROID_LOG_ERROR, "Dangle", fmt, ##__VA_ARGS__)
#endif
#ifdef __APPLE__
#define DangleSysLog(fmt, ...) DangleiOSLog("Dangle: " fmt, ##__VA_ARGS__)
#endif
#else
#define DangleSysLog(...)
#endif
