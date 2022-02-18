package pub.doric.dangle;

import com.facebook.soloader.SoLoader;

public class DangleJNI {

    static {
        SoLoader.loadLibrary("dangle");
    }

    public static native int ContextCreate(long jsCtxPtr);

    public static native void ContextDestroy(int dangleCtxId);

    public static native void ContextFlush(int dangleCtxId);

    public static native void ContextSetFlushMethod(int dangleCtxId, Object glContext);

    public static native boolean ContextNeedsRedraw(int dangleCtxId);

    public static native void ContextDrawEnded(int dangleCtxId);
}
