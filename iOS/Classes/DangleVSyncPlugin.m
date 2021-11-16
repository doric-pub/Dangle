//
//  DangleVSyncPlugin.m
//  Dangle
//
//  Created by 王劲鹏 on 2021/10/8.
//

#import "DangleVSyncPlugin.h"
#import "DangleWeakProxy.h"

@interface DangleVSyncPlugin ()

@property(nonatomic, strong) id displayLink;

@property(nonatomic, copy) NSMutableSet<NSString *> *requestIDs;
@property(nonatomic, strong) dispatch_queue_t syncQueue;

@end

@implementation DangleVSyncPlugin

- (instancetype)init {
    if (self = [super init]) {
        _displayLink = [CADisplayLink displayLinkWithTarget:[DangleWeakProxy proxyWithTarget:self] selector:@selector(handleDisplayLink:)];
        [_displayLink addToRunLoop:[NSRunLoop currentRunLoop] forMode:NSRunLoopCommonModes];
    }
    return self;
}

- (NSMutableSet *)requestIDs {
    if (!_requestIDs) {
        _requestIDs = [NSMutableSet new];
    }
    return _requestIDs;
}

- (dispatch_queue_t)syncQueue {
    if (!_syncQueue) {
        _syncQueue = dispatch_queue_create("pub.doric.dangle.plugin.vsync", DISPATCH_QUEUE_CONCURRENT);
    }
    return _syncQueue;
}

- (void)handleDisplayLink: (CADisplayLink*)displayLink {
    __weak __typeof(self) _self = self;
    
    dispatch_async(self.syncQueue, ^{
        __strong __typeof(_self) self = _self;
        
        if (self.doricContext.destroyed) {
            NSException *exception = [NSException exceptionWithName:@"" reason:@"doric context destroyed when vsync" userInfo:@{}];
            [self.doricContext.driver.registry onException:exception inContext:self.doricContext];
            return;
        }
        
        [self.requestIDs enumerateObjectsWithOptions:NSEnumerationReverse usingBlock:^(NSString * _Nonnull obj, BOOL * _Nonnull stop) {
            DoricPromise *currentPromise = [[DoricPromise alloc] initWithContext:self.doricContext callbackId:obj];
            [currentPromise resolve:@(displayLink.timestamp * 1000L)];
            
            [self.requestIDs removeObject:obj];
        }];
    });
}

- (void)requestAnimationFrame:(NSString *)requestID withPromise:(DoricPromise *)promise {
    __weak __typeof(self) _self = self;
    
    dispatch_async(self.syncQueue, ^{
        __strong __typeof(_self) self = _self;
        
        [self.requestIDs addObject:requestID];
    });
    [promise resolve:requestID];
}

- (void)cancelAnimationFrame:(NSString *)requestID withPromise:(DoricPromise *)promise {
    __weak __typeof(self) _self = self;
    
    dispatch_async(self.syncQueue, ^{
        __strong __typeof(_self) self = _self;
        
        BOOL result = [self.requestIDs containsObject:requestID];
        
        if (result) {
            [self.requestIDs removeObject:requestID];
            [promise resolve:requestID];
        } else {
            [promise reject:@"requestID does not exist"];
        }
    });
    
}

- (void)dealloc {
    [self.displayLink invalidate];
    self.displayLink = nil;
}
@end
