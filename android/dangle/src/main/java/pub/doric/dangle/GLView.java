package pub.doric.dangle;

import android.content.Context;
import android.graphics.SurfaceTexture;
import android.util.AttributeSet;
import android.view.TextureView;


public class GLView extends TextureView implements TextureView.SurfaceTextureListener {

    private boolean mOnSurfaceCreateCalled = false;
    private boolean mOnSurfaceTextureCreatedWithZeroSize = false;

    private GLContext mGLContext;

    public interface OnSurfaceAvailable {
        void invoke();
    }

    private OnSurfaceAvailable mOnSurfaceAvailable;

    public void setOnSurfaceAvailable(OnSurfaceAvailable onSurfaceAvailable) {
        this.mOnSurfaceAvailable = onSurfaceAvailable;
    }

    public GLView(Context context) {
        super(context);
        init();
    }

    public GLView(Context context, AttributeSet attributeSet) {
        super(context, attributeSet);
        init();
    }

    private void init() {
        setSurfaceTextureListener(this);
        setOpaque(false);

        mGLContext = new GLContext();
    }

    // `TextureView.SurfaceTextureListener` events

    @Override
    synchronized public void onSurfaceTextureAvailable(SurfaceTexture surfaceTexture, int width, int height) {
        if (!mOnSurfaceCreateCalled) {
            // onSurfaceTextureAvailable is sometimes called with 0 size texture
            // and immediately followed by onSurfaceTextureSizeChanged with actual size
            if (width == 0 || height == 0) {
                mOnSurfaceTextureCreatedWithZeroSize = true;
            }

            if (!mOnSurfaceTextureCreatedWithZeroSize) {
                initializeSurfaceInGLContext(surfaceTexture);
            }

            mOnSurfaceCreateCalled = true;
        }
    }

    @Override
    public boolean onSurfaceTextureDestroyed(SurfaceTexture surface) {
        mGLContext.destroy();

        // reset flag, so the context will be recreated when the new surface is available
        mOnSurfaceCreateCalled = false;

        return true;
    }

    @Override
    synchronized public void onSurfaceTextureSizeChanged(SurfaceTexture surfaceTexture, int width, int height) {
        if (mOnSurfaceTextureCreatedWithZeroSize && (width != 0 || height != 0)) {
            initializeSurfaceInGLContext(surfaceTexture);
            mOnSurfaceTextureCreatedWithZeroSize = false;
        }
    }

    @Override
    public void onSurfaceTextureUpdated(SurfaceTexture surface) {
    }

    public void flush() {
        if (!mOnSurfaceCreateCalled) return;
        mGLContext.flush();
    }

    public int getDangleCtxId() {
        return mGLContext.getContextId();
    }

    private void initializeSurfaceInGLContext(SurfaceTexture surfaceTexture) {
        mGLContext.initialize(surfaceTexture, () -> {
            if (mOnSurfaceAvailable != null) {
                mOnSurfaceAvailable.invoke();
            }
        });
    }
}

