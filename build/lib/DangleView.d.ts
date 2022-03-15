import { BridgeContext, View } from "doric";
import { DangleWebGLRenderingContext } from "./GLView.types";
export interface IDangleView {
    onReady?: (gl: DangleWebGLRenderingContext) => void;
}
export declare class DangleView extends View implements IDangleView {
    enableCmdRecord: boolean;
    glCmds: {
        cmd: string;
        args: any[];
    }[];
    private onPrepared;
    onReady?: (gl: DangleWebGLRenderingContext) => void;
}
export declare function dangleView(config: IDangleView): DangleView;
export declare function vsync(context: BridgeContext): {
    requestAnimationFrame: (fn: (time: number) => void) => Promise<string>;
    cancelAnimationFrame: (requestID: string) => Promise<any>;
};
