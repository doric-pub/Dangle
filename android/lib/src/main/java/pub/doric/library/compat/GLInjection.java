package pub.doric.library.compat;

import android.util.Base64;
import android.webkit.ValueCallback;

import com.github.pengfeizhou.jscore.ArchiveException;
import com.github.pengfeizhou.jscore.JSDecoder;
import com.github.pengfeizhou.jscore.JavaFunction;
import com.github.pengfeizhou.jscore.JavaValue;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.ref.WeakReference;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.IntBuffer;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.LockSupport;

import pub.doric.DoricNativeDriver;
import pub.doric.DoricSingleton;
import pub.doric.engine.DoricJSEngine;

public class GLInjection {
    private static boolean injected = false;

    private static Map<String, WeakReference<GLWebView>> map = new HashMap<>();

    public static void inject() {
        final GLWebView glWebView = null;
        if (!injected) {
            injected = true;
            DoricNativeDriver doricNativeDriver = DoricSingleton.getInstance().getNativeDriver();
            DoricJSEngine doricJSEngine = doricNativeDriver.getDoricJSEngine();
            assert doricJSEngine != null;
            {
                // createShader
                doricJSEngine.getDoricJSE().injectGlobalJSFunction("dangle_createShader", new JavaFunction() {
                    @Override
                    public JavaValue exec(JSDecoder[] args) {
                        Thread currentThread = Thread.currentThread();

                        int type = 0;
                        try {
                            type = args[0].number().intValue();
                        } catch (ArchiveException e) {
                            e.printStackTrace();
                        }

                        final JavaValue[] output = new JavaValue[1];

                        final String script = "glWrapper.createShader(" + type + ")";

                        glWebView.post(new Runnable() {
                            @Override
                            public void run() {
                                glWebView.evaluateJavascript(script, new ValueCallback<String>() {
                                    @Override
                                    public void onReceiveValue(String value) {
                                        System.out.println(value);
                                        LockSupport.unpark(currentThread);
                                    }
                                });
                            }
                        });
                        LockSupport.park(currentThread);
                        return null;
                    }
                });
            }
            {
                // clearColor
                doricJSEngine.getDoricJSE().injectGlobalJSFunction("dangle_clearColor", new JavaFunction() {
                    @Override
                    public JavaValue exec(JSDecoder[] args) {
                        Thread currentThread = Thread.currentThread();

                        int red = 0;
                        int green = 0;
                        int blue = 0;
                        int alpha = 0;
                        try {
                            red = args[0].number().intValue();
                            green = args[1].number().intValue();
                            blue = args[2].number().intValue();
                            alpha = args[3].number().intValue();
                        } catch (ArchiveException e) {
                            e.printStackTrace();
                        }

                        final String script = "glWrapper.clearColor(" + red + ", " + green + "," + blue + "," + alpha + "," + ")";

                        glWebView.post(new Runnable() {
                            @Override
                            public void run() {
                                glWebView.evaluateJavascript(script, new ValueCallback<String>() {
                                    @Override
                                    public void onReceiveValue(String value) {
                                        LockSupport.unpark(currentThread);
                                    }
                                });
                            }
                        });
                        LockSupport.park(currentThread);
                        return null;
                    }
                });
            }
            {
                // clear
                doricJSEngine.getDoricJSE().injectGlobalJSFunction("dangle_clear", new JavaFunction() {
                    @Override
                    public JavaValue exec(JSDecoder[] args) {
                        Thread currentThread = Thread.currentThread();

                        int mask = 0;
                        try {
                            mask = args[0].number().intValue();
                        } catch (ArchiveException e) {
                            e.printStackTrace();
                        }

                        final String script = "glWrapper.clear(" + mask + ")";

                        glWebView.post(new Runnable() {
                            @Override
                            public void run() {
                                glWebView.evaluateJavascript(script, new ValueCallback<String>() {
                                    @Override
                                    public void onReceiveValue(String value) {
                                        LockSupport.unpark(currentThread);
                                    }
                                });
                            }
                        });
                        LockSupport.park(currentThread);
                        return null;
                    }
                });
            }
            {
                // getParameter
                doricJSEngine.getDoricJSE().injectGlobalJSFunction("dangle_getParameter", new JavaFunction() {
                    @Override
                    public JavaValue exec(JSDecoder[] args) {
                        Thread currentThread = Thread.currentThread();

                        int input = 0;
                        try {
                            input = args[0].number().intValue();
                        } catch (ArchiveException e) {
                            e.printStackTrace();
                        }

                        final JavaValue[] output = new JavaValue[1];

                        final String script = "glWrapper.getParameter(" + input + ")";

                        int finalInput = input;
                        glWebView.post(new Runnable() {
                            @Override
                            public void run() {
                                glWebView.evaluateJavascript(script, new ValueCallback<String>() {
                                    @Override
                                    public void onReceiveValue(String value) {
                                        if (finalInput == 2978) {
                                            IntBuffer intBuf = ByteBuffer.wrap(Base64.decode(value.getBytes(StandardCharsets.UTF_8), Base64.DEFAULT)).order(ByteOrder.LITTLE_ENDIAN).asIntBuffer();
                                            int[] array = new int[intBuf.remaining()];
                                            intBuf.get(array);
                                            JSONObject jsonObject = new JSONObject();
                                            for (int i = 0; i != array.length; i++) {
                                                try {
                                                    jsonObject.put(String.valueOf(i), array[i]);
                                                } catch (JSONException e) {
                                                    e.printStackTrace();
                                                }
                                            }
                                            output[0] = new JavaValue(jsonObject);
                                        } else {
                                            output[0] = new JavaValue(value);
                                        }
                                        LockSupport.unpark(currentThread);
                                    }
                                });
                            }
                        });

                        LockSupport.park(currentThread);

                        return output[0];
                    }
                });
            }
        }
    }
}
