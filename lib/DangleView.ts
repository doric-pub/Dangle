import { BridgeContext, Property, View, layoutConfig } from "doric";
import { DangleWebGLRenderingContext } from "./GLView.types";
import { getGl } from "./GLView";

export interface IDangleView {
  onReady?: (gl: DangleWebGLRenderingContext) => void;
}

export class DangleView extends View implements IDangleView {
  enableCmdRecord = false;

  glCmds: { cmd: string; args: any[] }[] = [];

  @Property
  private onPrepared = (contextId: number) => {
    if (this.onReady) {
      const gl = getGl(contextId);
      if (this.enableCmdRecord) {
        this.onReady(
          new Proxy(gl, {
            get: (target, key) => {
              const ret = target[key];
              if (typeof ret === "function") {
                const self = this;
                return function () {
                  const params: any[] = [];
                  for (let i = 0; i < arguments.length; i++) {
                    params.push(arguments[i]);
                  }
                  self.glCmds.push({
                    cmd: key as string,
                    args: params,
                  });
                  return Reflect.apply(ret, gl, params);
                };
              }
              return ret;
            },
          })
        );
      } else {
        this.onReady(gl);
      }
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
