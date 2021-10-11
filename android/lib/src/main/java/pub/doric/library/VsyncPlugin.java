package pub.doric.library;

import android.view.Choreographer;

import com.github.pengfeizhou.jscore.JSString;
import com.github.pengfeizhou.jscore.JavaValue;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import pub.doric.DoricContext;
import pub.doric.DoricContextManager;
import pub.doric.DoricSingleton;
import pub.doric.extension.bridge.DoricMethod;
import pub.doric.extension.bridge.DoricPlugin;
import pub.doric.extension.bridge.DoricPromise;
import pub.doric.plugin.DoricJavaPlugin;
import pub.doric.utils.ThreadMode;

@DoricPlugin(name = "vsync")
public class VsyncPlugin extends DoricJavaPlugin {

    private final Set<String> requestIDs = new HashSet<>();

    public VsyncPlugin(DoricContext doricContext) {
        super(doricContext);
    }

    @DoricMethod(thread = ThreadMode.UI)
    public void requestAnimationFrame(JSString args, DoricPromise promise) {
        final String requestID = args.asString().value();
        requestIDs.add(requestID);

        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
                if (DoricContextManager.getContext(getDoricContext().getContextId()) == null) {
                    DoricSingleton.getInstance().getNativeDriver().getRegistry()
                            .onException(getDoricContext(), new Exception("doric context destroyed when vsync"));
                    return;
                }

                Iterator<String> it = requestIDs.iterator();
                if (it.hasNext()) {
                    do {
                        String callbackId = it.next();
                        DoricPromise callback = new DoricPromise(getDoricContext(), callbackId);

                        double frameTimeMillis = frameTimeNanos / (1000d * 1000d);
                        callback.resolve(new JavaValue(frameTimeMillis));

                        it.remove();
                    } while (it.hasNext());
                }
            }
        });

        promise.resolve(new JavaValue(requestID));
    }

    @DoricMethod
    public void cancelAnimationFrame(String requestID, DoricPromise promise) {
        if (requestIDs.contains(requestID)) {
            requestIDs.remove(requestID);
            promise.resolve(new JavaValue(requestID));
        } else {
            promise.reject(new JavaValue("requestID does not exist"));
        }
    }
}
