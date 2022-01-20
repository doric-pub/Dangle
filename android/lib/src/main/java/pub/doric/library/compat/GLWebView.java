package pub.doric.library.compat;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.util.Base64;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.github.pengfeizhou.jscore.ArchiveException;
import com.github.pengfeizhou.jscore.JSDecoder;
import com.github.pengfeizhou.jscore.JavaFunction;
import com.github.pengfeizhou.jscore.JavaValue;

import org.json.JSONException;
import org.json.JSONObject;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.IntBuffer;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.locks.LockSupport;

import pub.doric.DoricNativeDriver;
import pub.doric.DoricSingleton;
import pub.doric.engine.DoricJSEngine;

public class GLWebView extends WebView {
    public GLWebView(Context context) {
        super(context);
    }

    public GLWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public GLWebView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public GLWebView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    public interface OnAvailable {
        void prepared();
    }

    @SuppressLint("SetJavaScriptEnabled")
    public void prepare(OnAvailable onAvailable) {
        WebSettings webSettings = getSettings();
        webSettings.setJavaScriptEnabled(true);
        String htmlText = "<html>\n" +
                "  <head></head>\n" +
                "  <body style=\"background: red\">\n" +
                "    <canvas id=\"canvas\" style=\"width: 100%; height: 100%\"></canvas>\n" +
                "    <script>\n" +
                "      const canvas = document.getElementById(\"canvas\");\n" +
                "      const gl = canvas.getContext(\"webgl\");\n" +
                "      const glWrapper = {};\n" +
                "      glWrapper.getParameter = function (pname) {\n" +
                "        const output = gl.getParameter(pname);\n" +
                "        if (pname === gl.VIEWPORT) {\n" +
                "          const base64Output = btoa(\n" +
                "            String.fromCharCode.apply(null, new Uint8Array(output.buffer))\n" +
                "          );\n" +
                "          return base64Output;\n" +
                "        }\n" +
                "\n" +
                "        return output;\n" +
                "      };\n" +
                "      glWrapper.clearColor = function (red, green, blue, alpha) {\n" +
                "        gl.clearColor(red, green, blue, alpha);\n" +
                "      };\n" +
                "      glWrapper.clear = function (mask) {\n" +
                "        gl.clear(mask);\n" +
                "      };\n" +
                "    </script>\n" +
                "  </body>\n" +
                "</html>\n";
        loadData(htmlText, "text/html", "UTF-8");

        setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView view, String url) {
                DoricNativeDriver doricNativeDriver = DoricSingleton.getInstance().getNativeDriver();
                DoricJSEngine doricJSEngine = doricNativeDriver.getDoricJSEngine();
                assert doricJSEngine != null;
                String script = "const global = new Function(\"return this\")();\n" +
                        "global.__DANGLEContexts = [];\n" +
                        "global.__DANGLEContexts[\"webview\"] = {\n" +
                        "  VERSION: 7938,\n" +
                        "  VIEWPORT: 2978,\n" +
                        "  COLOR_BUFFER_BIT: 16384,\n" +
                        "  endFrame() {},\n" +
                        "  getParameter(pname) {\n" +
                        "    return dangle_getParameter(pname);\n" +
                        "  },\n" +
                        "  clearColor(red, green, blue, alpha) {\n" +
                        "    dangle_clearColor(red, green, blue, alpha);\n" +
                        "  },\n" +
                        "  clear(mask) {\n" +
                        "    dangle_clear(mask);\n" +
                        "  },\n" +
                        "};\n";
                doricJSEngine.getDoricJSE().loadJS(script, "");
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
                        post(new Runnable() {
                            @Override
                            public void run() {
                                evaluateJavascript(script, new ValueCallback<String>() {
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

                        post(new Runnable() {
                            @Override
                            public void run() {
                                evaluateJavascript(script, new ValueCallback<String>() {
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

                        post(new Runnable() {
                            @Override
                            public void run() {
                                evaluateJavascript(script, new ValueCallback<String>() {
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

                onAvailable.prepared();
            }
        });
    }
}
