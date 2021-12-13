import { BridgeContext, Property, View, layoutConfig } from "doric";
import { getGl } from "./GLView";

export interface IDangleView {
  onReady?: (gl: WebGL2RenderingContext) => void;
}

export class DangleView extends View implements IDangleView {
  onPrepared = (contextId: number) => {
    if (this.onReady) {
      this.onReady(getGl(contextId) as unknown as WebGL2RenderingContext);
    }
  };

  @Property
  onReady?: (gl: WebGL2RenderingContext) => void;
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
