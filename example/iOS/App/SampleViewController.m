//
//  ViewController.m
//  Example
//
//  Created by 王劲鹏 on 2021/9/27.
//  Copyright © 2021 pengfei.zhou. All rights reserved.
//
#import <UIKit/UILabel.h>
#import <DoricCore/Doric.h>

#import "SampleViewController.h"

@interface SampleViewController ()

@property (nonatomic) UITableView *tableView;
@property (strong, nonatomic) NSMutableArray *tableDataArr;

@end

@implementation SampleViewController

- (void)viewDidLoad {
    self.tableDataArr = [NSMutableArray array];
    
    if ([self.engineType isEqual: @"MDN WebGL"]) {
        for(int i = 1; i <= 7; i++) {
            [self.tableDataArr addObject:[NSString stringWithFormat:@"mdn_webgl/Sample%i", i]];
        }
    } else if ([self.engineType isEqual: @"Three.js"]) {
        [self.tableDataArr addObject:@"three.js/chess"];

        [self.tableDataArr addObject:@"three.js/d3_force"];

        [self.tableDataArr addObject:@"three.js/games_crossy_road"];
        [self.tableDataArr addObject:@"three.js/games_fps"];

        [self.tableDataArr addObject:@"three.js/misc_animation_groups"];
        [self.tableDataArr addObject:@"three.js/misc_animation_keys"];
        
        [self.tableDataArr addObject:@"three.js/misc_controls_drag"];
        [self.tableDataArr addObject:@"three.js/misc_controls_map"];
        [self.tableDataArr addObject:@"three.js/misc_controls_orbit"];
        [self.tableDataArr addObject:@"three.js/misc_controls_pointerlock"];
        
        [self.tableDataArr addObject:@"three.js/misc_lookat"];
        [self.tableDataArr addObject:@"three.js/misc_lookat_instanced_mesh"];

        [self.tableDataArr addObject:@"three.js/physics_ammo_break"];
        [self.tableDataArr addObject:@"three.js/physics_ammo_cloth"];
        
        [self.tableDataArr addObject:@"three.js/physics_oimo_instancing"];

        [self.tableDataArr addObject:@"three.js/webgl_animation_keyframes"];
        [self.tableDataArr addObject:@"three.js/webgl_animation_skinning_additive_blending"];
        [self.tableDataArr addObject:@"three.js/webgl_animation_skinning_blending"];
        [self.tableDataArr addObject:@"three.js/webgl_animation_skinning_morph"];

        [self.tableDataArr addObject:@"three.js/webgl_buffergeometry_instancing"];

        [self.tableDataArr addObject:@"three.js/webgl_camera"];
        [self.tableDataArr addObject:@"three.js/webgl_camera_array"];
        [self.tableDataArr addObject:@"three.js/webgl_camera_cinematic"];
        
        [self.tableDataArr addObject:@"three.js/webgl_clipping"];
        [self.tableDataArr addObject:@"three.js/webgl_clipping_advanced"];
        [self.tableDataArr addObject:@"three.js/webgl_clipping_intersection"];
        [self.tableDataArr addObject:@"three.js/webgl_clipping_stencil"];

        [self.tableDataArr addObject:@"three.js/webgl_decals"];

        [self.tableDataArr addObject:@"three.js/webgl_depth_texture"];
        
        [self.tableDataArr addObject:@"three.js/webgl_effects_anaglyph"];
        [self.tableDataArr addObject:@"three.js/webgl_effects_anaglyph_instanced_mesh"];
        [self.tableDataArr addObject:@"three.js/webgl_effects_parallaxbarrier"];
        [self.tableDataArr addObject:@"three.js/webgl_effects_parallaxbarrier_instanced_mesh"];
        [self.tableDataArr addObject:@"three.js/webgl_effects_peppersghost"];
        [self.tableDataArr addObject:@"three.js/webgl_effects_stereo"];
        [self.tableDataArr addObject:@"three.js/webgl_effects_stereo_instanced_mesh"];

        [self.tableDataArr addObject:@"three.js/webgl_framebuffer_texture"];
        
        [self.tableDataArr addObject:@"three.js/webgl_geometry_convex"];
        [self.tableDataArr addObject:@"three.js/webgl_geometry_cube"];
        [self.tableDataArr addObject:@"three.js/webgl_geometry_minecraft"];
        [self.tableDataArr addObject:@"three.js/webgl_geometry_text_shapes"];
        
        [self.tableDataArr addObject:@"three.js/webgl_instancing_dynamic"];

        [self.tableDataArr addObject:@"three.js/webgl_interactive_buffergeometry"];
        [self.tableDataArr addObject:@"three.js/webgl_interactive_raycasting_points"];
        [self.tableDataArr addObject:@"three.js/webgl_interactive_voxelpainter"];
        
        [self.tableDataArr addObject:@"three.js/webgl_lights_hemisphere"];

        [self.tableDataArr addObject:@"three.js/webgl_lines_colors"];

        [self.tableDataArr addObject:@"three.js/webgl_loader_amf"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_collada"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_collada_kinematics"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_fbx"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_gltf"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_gltf_fullscreen"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_obj"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_texture_dds"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_texture_hdr"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_texture_ktx"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_texture_tga"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_ttf"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_vox"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_vrml"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_3ds"];

        [self.tableDataArr addObject:@"three.js/webgl_materials_car"];
        [self.tableDataArr addObject:@"three.js/webgl_materials_envmaps_hdr"];

        [self.tableDataArr addObject:@"three.js/webgl_performance_shader"];

        [self.tableDataArr addObject:@"three.js/webgl_pmrem_test"];

        [self.tableDataArr addObject:@"three.js/webgl_points_dynamic"];
        [self.tableDataArr addObject:@"three.js/webgl_points_sprites"];
        [self.tableDataArr addObject:@"three.js/webgl_points_waves"];

        [self.tableDataArr addObject:@"three.js/webgl_shaders_ocean"];

        [self.tableDataArr addObject:@"three.js/webgl2_multiple_rendertargets"];
        [self.tableDataArr addObject:@"three.js/webgl2_multisampled_renderbuffers"];

        [self.tableDataArr addObject:@"three.js/webxr_vr_rollercoaster"];

        [self.tableDataArr addObject:@"three.js/zeekr_001"];

    } else if ([self.engineType isEqual: @"Stardust"]) {
        [self.tableDataArr addObject:@"stardust/hello_world"];
        [self.tableDataArr addObject:@"stardust/daily_activities"];
        [self.tableDataArr addObject:@"stardust/sanddance"];
        
    } else if ([self.engineType isEqual: @"PlayCanvas"]) {
        [self.tableDataArr addObject:@"playcanvas/batching_dynamic"];

        [self.tableDataArr addObject:@"playcanvas/clustered_lighting"];
        [self.tableDataArr addObject:@"playcanvas/clustered_omni_shadows"];
        [self.tableDataArr addObject:@"playcanvas/clustered_spot_shadows"];
        [self.tableDataArr addObject:@"playcanvas/component_properties"];

        [self.tableDataArr addObject:@"playcanvas/grab_pass"];

        [self.tableDataArr addObject:@"playcanvas/hardware_instancing"];
        [self.tableDataArr addObject:@"playcanvas/hello_world"];
        [self.tableDataArr addObject:@"playcanvas/hierarchy"];

        [self.tableDataArr addObject:@"playcanvas/layers"];
        [self.tableDataArr addObject:@"playcanvas/light_baked"];
        [self.tableDataArr addObject:@"playcanvas/lines"];

        [self.tableDataArr addObject:@"playcanvas/mesh_decals"];
        [self.tableDataArr addObject:@"playcanvas/mesh_generation"];
        [self.tableDataArr addObject:@"playcanvas/mmesh_morph"];
        [self.tableDataArr addObject:@"playcanvas/model_texture_box"];

        [self.tableDataArr addObject:@"playcanvas/painter"];
        [self.tableDataArr addObject:@"playcanvas/particles_anim_index"];
        [self.tableDataArr addObject:@"playcanvas/particles_random_sprites"];
        [self.tableDataArr addObject:@"playcanvas/particles_snow"];
        [self.tableDataArr addObject:@"playcanvas/particles_spark"];
        [self.tableDataArr addObject:@"playcanvas/point_cloud_simulation"];
        [self.tableDataArr addObject:@"playcanvas/portal"];

        [self.tableDataArr addObject:@"playcanvas/shader_burn"];
        [self.tableDataArr addObject:@"playcanvas/shapes"];

        [self.tableDataArr addObject:@"playcanvas/transform_feedback"];
    } else if ([self.engineType isEqual: @"Babylon.js"]) {
        [self.tableDataArr addObject:@"babylon.js/hello_world"];
    } else if ([self.engineType isEqual: @"WebGL Shaders"]) {
        [self.tableDataArr addObject:@"webgl_shaders/random_pixels"];
        [self.tableDataArr addObject:@"webgl_shaders/classic_2d_noise"];
        [self.tableDataArr addObject:@"webgl_shaders/rain_drops"];
        [self.tableDataArr addObject:@"webgl_shaders/geometric_tile"];
    } else if ([self.engineType isEqual: @"regl"]) {
        [self.tableDataArr addObject:@"regl/basic"];
        [self.tableDataArr addObject:@"regl/batch"];
        [self.tableDataArr addObject:@"regl/bunny"];
    }
    
    self.tableView = [[UITableView new] also:^(UITableView *it) {
        it.width = self.view.width;
        it.height = self.view.height;
        [self.view addSubview:it];
    }];
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    [self.tableView registerClass:UITableViewCell.class forCellReuseIdentifier:@"cell"];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [self.tableView dequeueReusableCellWithIdentifier:@"cell" forIndexPath:indexPath];
    NSArray *components = [[self.tableDataArr objectAtIndex:indexPath.row] componentsSeparatedByString:@"/"];
    cell.textLabel.text = components[components.count - 1];
    cell.textLabel.textAlignment = NSTextAlignmentCenter;
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    NSInteger row = indexPath.row;
    NSString *bundleName = self.tableDataArr[row];
    DoricViewController *doricViewController = [[DoricViewController alloc] initWithSource:[NSString stringWithFormat:@"assets://src/%@.js", bundleName] alias:bundleName extra:@""];
    doricViewController.view.backgroundColor = [UIColor whiteColor];
    
    UIViewController *viewController = [UIApplication sharedApplication].delegate.window.rootViewController;
    UINavigationController *navigationController;
    if ([viewController isKindOfClass:[UINavigationController class]]) {
        navigationController = (UINavigationController *) viewController;
    } else {
        navigationController = viewController.navigationController;
    }
    [navigationController pushViewController:doricViewController animated:NO];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [self.tableDataArr count];
}

@end
