package pub.doric.dangle;

import android.os.Handler;

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
}
