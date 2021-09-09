import { Property, View, layoutConfig } from "doric"

export interface IDangleView {
    onPrepared?: Function
}

export class DangleView extends View implements IDangleView{
    @Property
    onPrepared?: Function
}

export function dangleView(config: IDangleView) {
    const ret = new DangleView
    ret.layoutConfig = layoutConfig().fit()
    for (let key in config) {
        Reflect.set(ret, key, Reflect.get(config, key, config), ret)
    }
    return ret
}
