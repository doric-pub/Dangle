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
    
    if ([self.engineType isEqual: @"MDN_WebGL"]) {
        for(int i = 1; i <= 6; i++) {
            [self.tableDataArr addObject:[NSString stringWithFormat:@"mdn_webgl/Sample%i", i]];
        }
    } else if ([self.engineType isEqual: @"Three.js"]) {
        [self.tableDataArr addObject:@"three.js/misc_animation_groups"];
        [self.tableDataArr addObject:@"three.js/misc_animation_keys"];
        
        [self.tableDataArr addObject:@"three.js/misc_controls_drag"];
        [self.tableDataArr addObject:@"three.js/misc_controls_map"];
        [self.tableDataArr addObject:@"three.js/misc_controls_orbit"];
        [self.tableDataArr addObject:@"three.js/misc_controls_pointerlock"];
        
        [self.tableDataArr addObject:@"three.js/misc_lookat"];
        
        [self.tableDataArr addObject:@"three.js/webgl_animation_keyframes"];

        [self.tableDataArr addObject:@"three.js/webgl_camera"];
        [self.tableDataArr addObject:@"three.js/webgl_camera_array"];
        [self.tableDataArr addObject:@"three.js/webgl_camera_cinematic"];
        
        [self.tableDataArr addObject:@"three.js/webgl_clipping"];
        [self.tableDataArr addObject:@"three.js/webgl_clipping_advanced"];
        [self.tableDataArr addObject:@"three.js/webgl_clipping_intersection"];
        [self.tableDataArr addObject:@"three.js/webgl_clipping_stencil"];

        [self.tableDataArr addObject:@"three.js/webgl_depth_texture"];
        
        [self.tableDataArr addObject:@"three.js/webgl_effects_anaglyph"];
        [self.tableDataArr addObject:@"three.js/webgl_effects_parallaxbarrier"];
        [self.tableDataArr addObject:@"three.js/webgl_effects_peppersghost"];

        [self.tableDataArr addObject:@"three.js/webgl_framebuffer_texture"];
        
        [self.tableDataArr addObject:@"three.js/webgl_geometry_text_shapes"];
        
        [self.tableDataArr addObject:@"three.js/webgl_interactive_buffergeometry"];
        [self.tableDataArr addObject:@"three.js/webgl_interactive_raycasting_points"];
        [self.tableDataArr addObject:@"three.js/webgl_interactive_voxelpainter"];
        
        [self.tableDataArr addObject:@"three.js/webgl_lines_colors"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_fbx"];
        [self.tableDataArr addObject:@"three.js/webgl_loader_obj"];

        [self.tableDataArr addObject:@"three.js/webgl_points_waves"];

    } else if ([self.engineType isEqual: @"Stardust"]) {
        [self.tableDataArr addObject:@"stardust/hello_world"];
        [self.tableDataArr addObject:@"stardust/daily_activities"];
        [self.tableDataArr addObject:@"stardust/sanddance"];
        
    } else if ([self.engineType isEqual: @"PlayCanvas"]) {
        [self.tableDataArr addObject:@"playcanvas/grab_pass"];
        [self.tableDataArr addObject:@"playcanvas/hello_world"];
        [self.tableDataArr addObject:@"playcanvas/shapes"];
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
