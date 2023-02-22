import { DangleWebGLRenderingContext } from './GLView.types';
type WebGLObjectId = any;
export declare class WebGLObject {
    id: WebGLObjectId;
    constructor(id: WebGLObjectId);
    toString(): string;
}
export declare const getGl: (dangleCtxId: number) => DangleWebGLRenderingContext;
export {};
