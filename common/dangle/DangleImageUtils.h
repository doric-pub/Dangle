#pragma once

#ifdef __ANDROID__
#include <GLES3/gl3.h>
#include <GLES3/gl3ext.h>
#endif
#ifdef __APPLE__

#include <OpenGLES/ES3/gl.h>

#endif

#ifdef __cplusplus

#include "jsi.h"
#include <vector>

namespace dangle {
    namespace gl_cpp {

        GLuint bytesPerPixel(GLenum type, GLenum format);

        void flipPixels(GLubyte *pixels, size_t bytesPerRow, size_t rows);

    } // namespace gl_cpp
} // namespace dangle
#endif
