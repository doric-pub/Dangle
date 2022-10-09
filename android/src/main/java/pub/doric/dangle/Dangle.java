package pub.doric.dangle;

import android.os.Handler;

import java.util.HashMap;
import java.util.Map;

public class Dangle {
    private static class Inner {
        private static final Dangle sInstance = new Dangle();
    }

    public static Dangle getInstance() {
        return Inner.sInstance;
    }

    private Dangle() {

    }

    private Handler mJSHandler;

    public void setJSHandler(Handler mJSHandler) {
        this.mJSHandler = mJSHandler;
    }

    public Handler getJSHandler() {
        return mJSHandler;
    }

    private final Map<Integer, GLContext> glContexts = new HashMap<>();

    public Map<Integer, GLContext> getGLContexts() {
        return glContexts;
    }
}
