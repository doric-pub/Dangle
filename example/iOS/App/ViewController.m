//
//  ViewController.m
//  Example
//
//  Created by 王劲鹏 on 2021/9/27.
//  Copyright © 2021 pengfei.zhou. All rights reserved.
//
#import <UIKit/UILabel.h>
#import <DoricCore/Doric.h>

#import "ViewController.h"

@interface ViewController ()

@property (nonatomic) UITableView *tableView;
@property (strong, nonatomic) NSMutableArray *tableDataArr;

@end

@implementation ViewController

- (void)viewDidLoad {
    self.tableDataArr = [NSMutableArray array];
    for(int i = 1; i <= 6; i++) {
        [self.tableDataArr addObject:[NSString stringWithFormat:@"Sample%i", i]];
    }
    [self.tableDataArr addObject:@"webgl_lines_colors"];
    
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
    cell.textLabel.text = [self.tableDataArr objectAtIndex:indexPath.row];
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
