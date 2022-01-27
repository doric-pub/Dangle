package pub.doric.library.compat;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.concurrent.atomic.AtomicInteger;

import pub.doric.DoricNativeDriver;
import pub.doric.DoricSingleton;
import pub.doric.engine.DoricJSEngine;

public class GLWebView extends WebView {
    private static AtomicInteger counter = new AtomicInteger(0);

    private int webViewId;

    public GLWebView(Context context) {
        super(context);

        init();
    }

    public GLWebView(Context context, AttributeSet attrs) {
        super(context, attrs);

        init();
    }

    public GLWebView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);

        init();
    }

    public GLWebView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);

        init();
    }

    public void init() {
        this.webViewId = counter.incrementAndGet();
    }

    public int getWebViewId() {
        return webViewId;
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
                "\n" +
                "      glWrapper.createShader = function (type) {\n" +
                "        return gl.createShader(type);\n" +
                "      };\n" +
                "      glWrapper.clearColor = function (red, green, blue, alpha) {\n" +
                "        gl.clearColor(red, green, blue, alpha);\n" +
                "      };\n" +
                "      glWrapper.clear = function (mask) {\n" +
                "        gl.clear(mask);\n" +
                "      };\n" +
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
                "    </script>\n" +
                "  </body>\n" +
                "</html>\n";
        loadData(htmlText, "text/html", "UTF-8");

        setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView view, String url) {
                DoricNativeDriver doricNativeDriver = DoricSingleton.getInstance().getNativeDriver();
                DoricJSEngine doricJSEngine = doricNativeDriver.getDoricJSEngine();
                assert doricJSEngine != null;
                String script = "__DANGLEContexts = [];\n" +
                        "__DANGLEContexts[\"webview-" + webViewId + "\"] = {\n" +
                        "  COLOR_BUFFER_BIT: 16384,\n" +
                        "  VERSION: 7938,\n" +
                        "  VERTEX_SHADER: 35633,\n" +
                        "  VIEWPORT: 2978,\n" +
                        "  endFrame() {},\n" +
                        "\n" +
                        "  createShader(type) {\n" +
                        "    return dangle_createShader(type);\n" +
                        "  },\n" +
                        "  clearColor(red, green, blue, alpha) {\n" +
                        "    dangle_clearColor(red, green, blue, alpha);\n" +
                        "  },\n" +
                        "  clear(mask) {\n" +
                        "    dangle_clear(mask);\n" +
                        "  },\n" +
                        "  getParameter(pname) {\n" +
                        "    return dangle_getParameter(pname);\n" +
                        "  },\n" +
                        "};\n";
                doricJSEngine.getDoricJSE().loadJS(script, "");


                onAvailable.prepared();
            }
        });
    }
}
