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
    public static final String TYPE_PLAYCANVAS = "PlayCanvas";
    public static final String TYPE_BABYLON_JS = "Babylon.js";

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
                        "three.js/chess",

                        "three.js/games_crossy_road",
                        "three.js/games_fps",

                        "three.js/misc_animation_groups",
                        "three.js/misc_animation_keys",

                        "three.js/misc_controls_drag",
                        "three.js/misc_controls_map",
                        "three.js/misc_controls_orbit",
                        "three.js/misc_controls_pointerlock",

                        "three.js/misc_lookat",
                        "three.js/misc_lookat_instanced_mesh",

                        "three.js/physics_ammo_break",
                        "three.js/physics_ammo_cloth",

                        "three.js/physics_oimo_instancing",

                        "three.js/webgl_animation_keyframes",
                        "three.js/webgl_animation_skinning_additive_blending",
                        "three.js/webgl_animation_skinning_blending",

                        "three.js/webgl_buffergeometry_instancing",

                        "three.js/webgl_camera",
                        "three.js/webgl_camera_array",
                        "three.js/webgl_camera_cinematic",

                        "three.js/webgl_clipping",
                        "three.js/webgl_clipping_advanced",
                        "three.js/webgl_clipping_intersection",
                        "three.js/webgl_clipping_stencil",

                        "three.js/webgl_decals",

                        "three.js/webgl_depth_texture",

                        "three.js/webgl_effects_anaglyph",
                        "three.js/webgl_effects_parallaxbarrier",
                        "three.js/webgl_effects_peppersghost",
                        "three.js/webgl_effects_stereo",

                        "three.js/webgl_framebuffer_texture",

                        "three.js/webgl_geometry_convex",
                        "three.js/webgl_geometry_cube",
                        "three.js/webgl_geometry_minecraft",
                        "three.js/webgl_geometry_text_shapes",

                        "three.js/webgl_instancing_dynamic",

                        "three.js/webgl_interactive_buffergeometry",
                        "three.js/webgl_interactive_raycasting_points",
                        "three.js/webgl_interactive_voxelpainter",

                        "three.js/webgl_lights_hemisphere",

                        "three.js/webgl_lines_colors",

                        "three.js/webgl_loader_amf",
                        "three.js/webgl_loader_collada",
                        "three.js/webgl_loader_fbx",
                        "three.js/webgl_loader_obj",
                        "three.js/webgl_loader_texture_hdr",
                        "three.js/webgl_loader_texture_tga",
                        "three.js/webgl_loader_ttf",
                        "three.js/webgl_loader_3ds",

                        "three.js/webgl_materials_car",

                        "three.js/webgl_points_dynamic",
                        "three.js/webgl_points_sprites",
                        "three.js/webgl_points_waves",

                        "three.js/webxr_vr_rollercoaster",
                };
                break;
            case TYPE_STARTDUST:
                dataSet = new String[]{
                        "stardust/hello_world",
                        "stardust/daily_activities",
                        "stardust/sanddance",
                };
                break;
            case TYPE_PLAYCANVAS:
                dataSet = new String[]{
                        "playcanvas/batching_dynamic",

                        "playcanvas/clustered_lighting",

                        "playcanvas/grab_pass",

                        "playcanvas/hello_world",
                        "playcanvas/hierarchy",
                        
                        "playcanvas/layers",
                        "playcanvas/light_baked",
                        "playcanvas/lines",

                        "playcanvas/mesh_decals",
                        "playcanvas/mesh_generation",
                        "playcanvas/mesh_morph",
                        "playcanvas/model_texture_box",
                        

                        "playcanvas/painter",
                        "playcanvas/particles_anim_index",
                        "playcanvas/particles_snow",

                        "playcanvas/shapes",
                };
                break;
            case TYPE_BABYLON_JS:
                dataSet = new String[]{
                        "babylon.js/hello_world",
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
