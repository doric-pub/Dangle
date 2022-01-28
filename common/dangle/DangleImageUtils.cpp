#include "DangleImageUtils.h"

namespace jsi = facebook::jsi;

namespace dangle {
    namespace gl_cpp {

        GLuint bytesPerPixel(GLenum type, GLenum format) {
            int bytesPerComponent = 0;
            switch (type) {
                case GL_UNSIGNED_BYTE:
                    bytesPerComponent = 1;
                    break;
                case GL_FLOAT:
                    bytesPerComponent = 4;
                    break;
                case GL_HALF_FLOAT:
                    bytesPerComponent = 2;
                    break;
                case GL_UNSIGNED_SHORT_5_6_5:
                case GL_UNSIGNED_SHORT_4_4_4_4:
                case GL_UNSIGNED_SHORT_5_5_5_1:
                    return 2;
            }

            switch (format) {
                case GL_LUMINANCE:
                case GL_ALPHA:
                    return 1 * bytesPerComponent;
                case GL_LUMINANCE_ALPHA:
                    return 2 * bytesPerComponent;
                case GL_RGB:
                    return 3 * bytesPerComponent;
                case GL_RGBA:
                    return 4 * bytesPerComponent;
            }
            return 0;
        }

        void flipPixels(GLubyte *pixels, size_t bytesPerRow, size_t rows) {
            if (!pixels) {
                return;
            }

            GLuint middle = (GLuint) rows / 2;
            GLuint intsPerRow = (GLuint) bytesPerRow / sizeof(GLuint);
            GLuint remainingBytes = (GLuint) bytesPerRow - intsPerRow * sizeof(GLuint);

            for (GLuint rowTop = 0, rowBottom = (GLuint) rows - 1; rowTop < middle; ++rowTop, --rowBottom) {
                // Swap in packs of sizeof(GLuint) bytes
                GLuint *iTop = (GLuint *) (pixels + rowTop * bytesPerRow);
                GLuint *iBottom = (GLuint *) (pixels + rowBottom * bytesPerRow);
                GLuint iTmp;
                GLuint n = intsPerRow;
                do {
                    iTmp = *iTop;
                    *iTop++ = *iBottom;
                    *iBottom++ = iTmp;
                } while (--n > 0);

                // Swap remainder bytes
                GLubyte *bTop = (GLubyte *) iTop;
                GLubyte *bBottom = (GLubyte *) iBottom;
                GLubyte bTmp;
                switch (remainingBytes) {
                    case 3:
                        bTmp = *bTop;
                        *bTop++ = *bBottom;
                        *bBottom++ = bTmp;
                    case 2:
                        bTmp = *bTop;
                        *bTop++ = *bBottom;
                        *bBottom++ = bTmp;
                    case 1:
                        bTmp = *bTop;
                        *bTop = *bBottom;
                        *bBottom = bTmp;
                }
            }
        }

    } // namespace gl_cpp
} // namespace dangle
