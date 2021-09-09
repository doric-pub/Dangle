'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function demoPlugin(context) {
    return {
        call: () => {
            return context.callNative("demoPlugin", "call");
        },
    };
}

exports.demoPlugin = demoPlugin;
//# sourceMappingURL=bundle_dangle.js.map
