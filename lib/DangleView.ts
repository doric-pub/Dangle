import { BridgeContext, Property, View, layoutConfig } from "doric";

export interface IDangleView {
  onPrepared?: Function;
}

export class DangleView extends View implements IDangleView {
  @Property
  onPrepared?: Function;
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
