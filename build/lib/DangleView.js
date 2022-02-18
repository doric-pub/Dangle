var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Property, View, layoutConfig } from "doric";
import { getGl } from "./GLView";
export class DangleView extends View {
    constructor() {
        super(...arguments);
        this.onPrepared = (contextId) => {
            if (this.onReady) {
                this.onReady(getGl(contextId));
            }
        };
    }
}
__decorate([
    Property,
    __metadata("design:type", Object)
], DangleView.prototype, "onPrepared", void 0);
export function dangleView(config) {
    const ret = new DangleView();
    ret.layoutConfig = layoutConfig().fit();
    for (let key in config) {
        Reflect.set(ret, key, Reflect.get(config, key, config), ret);
    }
    return ret;
}
export function vsync(context) {
    return {
        requestAnimationFrame: (fn) => {
            return context.callNative("vsync", "requestAnimationFrame", context.function2Id(fn));
        },
        cancelAnimationFrame: (requestID) => {
            context.removeFuncById(requestID);
            return context.callNative("vsync", "cancelAnimationFrame", requestID);
        },
    };
}
//# sourceMappingURL=DangleView.js.map