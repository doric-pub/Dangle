package pub.doric.android;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class EngineTypeActivity extends AppCompatActivity {
    public static final String TAG = "ENGINE_TYPE";

    public static final String TYPE_MDN_WEBGL = "MDN WebGL";
    public static final String TYPE_THREE_JS = "Three.js";
    public static final String TYPE_STARTDUST = "Stardust";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String ENGINE_TYPE = getIntent().getStringExtra(TAG);

        setContentView(R.layout.activity_engine_type);

        RecyclerView sampleRV = findViewById(R.id.sample_rv);

        String[] dataSet;
        switch (ENGINE_TYPE) {
            case TYPE_MDN_WEBGL:
                dataSet = new String[]{
                        "mdn_webgl/Sample1",
                        "mdn_webgl/Sample2",
                        "mdn_webgl/Sample3",
                        "mdn_webgl/Sample4",
                        "mdn_webgl/Sample5",
                        "mdn_webgl/Sample6",
                };
                break;
            case TYPE_THREE_JS:
                dataSet = new String[]{
                        "three.js/misc_animation_groups",
                        "three.js/misc_animation_keys",

                        "three.js/misc_controls_drag",
                        "three.js/misc_controls_map",
                        "three.js/misc_controls_orbit",
                        "three.js/misc_controls_pointerlock",

                        "three.js/misc_lookat",

                        "three.js/webgl_camera",
                        "three.js/webgl_camera_array",
                        "three.js/webgl_camera_cinematic",

                        "three.js/webgl_clipping",
                        "three.js/webgl_clipping_advanced",
                        "three.js/webgl_clipping_intersection",
                        "three.js/webgl_clipping_stencil",

                        "three.js/webgl_depth_texture",

                        "three.js/webgl_effects_peppersghost",

                        "three.js/webgl_geometry_text_shapes",

                        "three.js/webgl_interactive_buffergeometry",
                        "three.js/webgl_interactive_raycasting_points",

                        "three.js/webgl_lines_colors",

                        "three.js/webgl_points_waves",
                };
                break;
            case TYPE_STARTDUST:
                dataSet = new String[]{
                        "stardust/hello_world",
                        "stardust/daily_activities",
                        "stardust/sanddance",
                };
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + ENGINE_TYPE);
        }

        SampleAdapter customAdapter = new SampleAdapter(dataSet);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        sampleRV.setLayoutManager(layoutManager);
        sampleRV.setAdapter(customAdapter);

        DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(sampleRV.getContext(),
                layoutManager.getOrientation());
        sampleRV.addItemDecoration(dividerItemDecoration);
    }
}
