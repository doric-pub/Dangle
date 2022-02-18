import { BridgeContext, Property, View, layoutConfig } from "doric";
import { DangleWebGLRenderingContext } from "./GLView.types";
import { getGl } from "./GLView";

export interface IDangleView {
  onReady?: (gl: DangleWebGLRenderingContext) => void;
}

export class DangleView extends View implements IDangleView {
  @Property
  private onPrepared = (contextId: number) => {
    if (this.onReady) {
      this.onReady(getGl(contextId));
    }
  };

  onReady?: (gl: DangleWebGLRenderingContext) => void;
}

export function dangleView(config: IDangleView) {
  const ret = new DangleView();
  ret.layoutConfig = layoutConfig().fit();
  for (let key in config) {
    Reflect.set(ret, key, Reflect.get(config, key, config), ret);
  }
  return ret;
}

export function vsync(context: BridgeContext) {
  return {
    requestAnimationFrame: (fn: (time: number) => void) => {
      return context.callNative(
        "vsync",
        "requestAnimationFrame",
        context.function2Id(fn)
      ) as Promise<string>;
    },
    cancelAnimationFrame: (requestID: string) => {
      context.removeFuncById(requestID);
      return context.callNative("vsync", "cancelAnimationFrame", requestID);
    },
  };
}
