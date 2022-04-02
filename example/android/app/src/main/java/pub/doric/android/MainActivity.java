package pub.doric.android;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        RecyclerView sampleRV = findViewById(R.id.sample_rv);

        String[] dataSet = new String[]{
                EngineTypeActivity.TYPE_MDN_WEBGL,
                EngineTypeActivity.TYPE_THREE_JS,
                EngineTypeActivity.TYPE_STARTDUST,
                EngineTypeActivity.TYPE_PLAYCANVAS,
                EngineTypeActivity.TYPE_BABYLON_JS,
                EngineTypeActivity.TYPE_WEBGL_SHADERS,
                EngineTypeActivity.TYPE_REGL,
                EngineTypeActivity.TYPE_GLTF_VIEWER,
        };
        EngineTypeAdapter engineTypeAdapter = new EngineTypeAdapter(dataSet);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        sampleRV.setLayoutManager(layoutManager);
        sampleRV.setAdapter(engineTypeAdapter);

        DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(sampleRV.getContext(),
                layoutManager.getOrientation());
        sampleRV.addItemDecoration(dividerItemDecoration);
    }

}
