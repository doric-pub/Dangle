package pub.doric.dangle;

import static pub.doric.dangle.DangleJNI.ContextCreate;
import static pub.doric.dangle.DangleJNI.ContextDestroy;
import static pub.doric.dangle.DangleJNI.ContextDrawEnded;
import static pub.doric.dangle.DangleJNI.ContextFlush;
import static pub.doric.dangle.DangleJNI.ContextNeedsRedraw;
import static pub.doric.dangle.DangleJNI.ContextSetFlushMethod;

import android.graphics.SurfaceTexture;
import android.opengl.EGL14;
import android.opengl.GLUtils;
import android.util.Log;

import com.github.pengfeizhou.jscore.JSIRuntime;

import java.lang.reflect.Field;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.microedition.khronos.egl.EGL10;
import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.egl.EGLContext;
import javax.microedition.khronos.egl.EGLDisplay;
import javax.microedition.khronos.egl.EGLSurface;

public class GLContext {
    private int mDangleCtxId = -1;

    private GLThread mGLThread;
    private EGLDisplay mEGLDisplay;
    private EGLSurface mEGLSurface;
    private EGLContext mEGLContext;
    private EGLConfig mEGLConfig;
    private EGL10 mEGL;

    private final BlockingQueue<Runnable> mEventQueue = new LinkedBlockingQueue<>();

    public int getContextId() {
        return mDangleCtxId;
    }

    public boolean isHeadless() {
        if (mGLThread != null) {
            return mGLThread.mSurfaceTexture == null;
        }
        return true;
    }

    public void runAsync(Runnable r) {
        mEventQueue.add(r);
    }

    public void initialize(SurfaceTexture surfaceTexture, final Runnable completionCallback) {
        if (mGLThread != null) {
            return;
        }

        mGLThread = new GLThread(surfaceTexture);
        mGLThread.setName("Dangle GLThread");
        mGLThread.start();

        // On JS thread, get JavaScriptCore context, create Dangle context, call JS callback
        final GLContext glContext = this;

        {
            Dangle.getInstance().getJSHandler().post(new Runnable() {
                @Override
                public void run() {
                    try {
                        Field ptrField = JSIRuntime.class.getDeclaredField("jsiPtr");
                        ptrField.setAccessible(true);
                        long jsContextRef = ptrField.getLong(JSIRuntime.class);

                        if (jsContextRef != 0) {
                            mDangleCtxId = ContextCreate(jsContextRef);
                        }

                        ContextSetFlushMethod(mDangleCtxId, glContext);
                        completionCallback.run();
                    } catch (NoSuchFieldException | IllegalAccessException e) {
                        e.printStackTrace();
                    }
                }
            });
        }
    }

    public void flush() {
        runAsync(new Runnable() {
            @Override
            public void run() {
                // mDangleCtxId may be unset if we get here (on the GL thread) before DangleContextCreate(...) is
                // called on the JS thread (see above in the implementation of `initialize(...)`)

                if (mDangleCtxId > 0) {
                    ContextFlush(mDangleCtxId);

                    if (!isHeadless() && ContextNeedsRedraw(mDangleCtxId)) {
                        if (!swapBuffers(mEGLSurface)) {
                            Log.e("DANGLE", "Cannot swap buffers!");
                        }
                        ContextDrawEnded(mDangleCtxId);
                    }
                }
            }
        });
    }

    public boolean swapBuffers(EGLSurface eglSurface) {
        return mEGL.eglSwapBuffers(mEGLDisplay, eglSurface);
    }

    public boolean makeCurrent(EGLSurface eglSurface) {
        return mEGL.eglMakeCurrent(mEGLDisplay, eglSurface, eglSurface, mEGLContext);
    }

    // Creates Pbuffer surface for headless rendering if surfaceTexture == null
    public EGLSurface createSurface(EGLConfig eglConfig, Object surfaceTexture) {
        if (surfaceTexture == null) {
            // Some devices are crashing when pbuffer surface doesn't have EGL_WIDTH and EGL_HEIGHT attributes set
            int[] surfaceAttribs = {
                    EGL10.EGL_WIDTH, 1,
                    EGL10.EGL_HEIGHT, 1,
                    EGL10.EGL_NONE
            };
            return mEGL.eglCreatePbufferSurface(mEGLDisplay, eglConfig, surfaceAttribs);
        } else {
            return mEGL.eglCreateWindowSurface(mEGLDisplay, eglConfig, surfaceTexture, null);
        }
    }

    public void destroySurface(EGLSurface eglSurface) {
        mEGL.eglDestroySurface(mEGLDisplay, eglSurface);
    }

    public void destroy() {
        if (mGLThread != null) {
            ContextDestroy(mDangleCtxId);

            try {
                mGLThread.interrupt();
                mGLThread.join();
            } catch (InterruptedException e) {
                Log.e("DANGLE", "Can't interrupt GL thread.", e);
            }
            mGLThread = null;
        }
    }

    // All actual GL calls are made on this thread

    private class GLThread extends Thread {
        private final SurfaceTexture mSurfaceTexture;

        private static final int EGL_CONTEXT_CLIENT_VERSION = 0x3098;

        GLThread(SurfaceTexture surfaceTexture) {
            mSurfaceTexture = surfaceTexture;
        }

        @Override
        public void run() {
            initEGL();

            while (true) {
                try {
                    makeEGLContextCurrent();
                    mEventQueue.take().run();
                    checkEGLError();
                } catch (InterruptedException e) {
                    break;
                }
            }

            deinitEGL();
        }

        private EGLContext createGLContext(int contextVersion, EGLConfig eglConfig) {
            int[] attribs = {EGL_CONTEXT_CLIENT_VERSION, contextVersion, EGL10.EGL_NONE};
            return mEGL.eglCreateContext(mEGLDisplay, eglConfig, EGL10.EGL_NO_CONTEXT, attribs);
        }

        private void initEGL() {
            mEGL = (EGL10) EGLContext.getEGL();

            // Get EGLDisplay and initialize display connection
            mEGLDisplay = mEGL.eglGetDisplay(EGL10.EGL_DEFAULT_DISPLAY);
            if (mEGLDisplay == EGL10.EGL_NO_DISPLAY) {
                throw new RuntimeException("eglGetDisplay failed " + GLUtils.getEGLErrorString(mEGL.eglGetError()));
            }
            int[] version = new int[2];
            if (!mEGL.eglInitialize(mEGLDisplay, version)) {
                throw new RuntimeException("eglInitialize failed " + GLUtils.getEGLErrorString(mEGL.eglGetError()));
            }

            // Find a compatible EGLConfig
            int[] configsCount = new int[1];
            EGLConfig[] configs = new EGLConfig[1];
            int[] configSpec = {
                    EGL10.EGL_RENDERABLE_TYPE, EGL14.EGL_OPENGL_ES2_BIT,
                    EGL10.EGL_RED_SIZE, 8, EGL10.EGL_GREEN_SIZE, 8, EGL10.EGL_BLUE_SIZE, 8,
                    EGL10.EGL_ALPHA_SIZE, 8, EGL10.EGL_DEPTH_SIZE, 16, EGL10.EGL_STENCIL_SIZE, 8,
                    EGL10.EGL_NONE,
            };
            if (!mEGL.eglChooseConfig(mEGLDisplay, configSpec, configs, 1, configsCount)) {
                throw new IllegalArgumentException("eglChooseConfig failed " + GLUtils.getEGLErrorString(mEGL.eglGetError()));
            } else if (configsCount[0] > 0) {
                mEGLConfig = configs[0];
            }
            if (mEGLConfig == null) {
                throw new RuntimeException("eglConfig not initialized");
            }

            // Create EGLContext and EGLSurface
            mEGLContext = createGLContext(3, mEGLConfig);
            if (mEGLContext == null || mEGLContext == EGL10.EGL_NO_CONTEXT) {
                mEGLContext = createGLContext(2, mEGLConfig);
            }
            checkEGLError();
            mEGLSurface = createSurface(mEGLConfig, mSurfaceTexture);
            checkEGLError();
            if (mEGLSurface == null || mEGLSurface == EGL10.EGL_NO_SURFACE) {
                int error = mEGL.eglGetError();
                throw new RuntimeException("eglCreateWindowSurface failed " + GLUtils.getEGLErrorString(error));
            }

            // Switch to our EGLContext
            makeEGLContextCurrent();
            checkEGLError();

            // Enable buffer preservation -- allows app to draw over previous frames without clearing
            EGL14.eglSurfaceAttrib(EGL14.eglGetCurrentDisplay(), EGL14.eglGetCurrentSurface(EGL14.EGL_DRAW),
                    EGL14.EGL_SWAP_BEHAVIOR, EGL14.EGL_BUFFER_PRESERVED);
            checkEGLError();
        }

        private void deinitEGL() {
            makeEGLContextCurrent();
            destroySurface(mEGLSurface);
            checkEGLError();
            mEGL.eglDestroyContext(mEGLDisplay, mEGLContext);
            checkEGLError();
            mEGL.eglTerminate(mEGLDisplay);
            checkEGLError();
        }

        private void makeEGLContextCurrent() {
            if (!mEGLContext.equals(mEGL.eglGetCurrentContext()) ||
                    !mEGLSurface.equals(mEGL.eglGetCurrentSurface(EGL10.EGL_DRAW))) {
                checkEGLError();
                if (!makeCurrent(mEGLSurface)) {
                    throw new RuntimeException("eglMakeCurrent failed " + GLUtils.getEGLErrorString(mEGL.eglGetError()));
                }
                checkEGLError();
            }
        }

        private void checkEGLError() {
            final int error = mEGL.eglGetError();
            if (error != EGL10.EGL_SUCCESS) {
                Log.e("DANGLE", "EGL error = 0x" + Integer.toHexString(error));
            }
        }
    }
}
