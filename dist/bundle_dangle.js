'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var doric = require('doric');

var GLErrors = {
    1280: 'INVALID ENUM: An unacceptable value has been specified for an enumerated argument.',
    1281: 'INVALID_VALUE: A numeric argument is out of range.',
    1282: 'INVALID_OPERATION: The specified command is not allowed for the current state.',
    1285: 'OUT_OF_MEMORY: Not enough memory is left to execute the command.',
    1286: 'INVALID_FRAMEBUFFER_OPERATION: The currently bound framebuffer is not complete when trying to render to or to read from it.',
    37442: 'CONTEXT_LOST_WEBGL: The WebGL context is lost.',
};

exports.GLLoggingOption = void 0;
(function (GLLoggingOption) {
    /**
     * Disables logging entirely.
     */
    GLLoggingOption[GLLoggingOption["DISABLED"] = 0] = "DISABLED";
    /**
     * Logs method calls, their parameters and results.
     */
    GLLoggingOption[GLLoggingOption["METHOD_CALLS"] = 1] = "METHOD_CALLS";
    /**
     * Calls `gl.getError()` after each other method call and prints an error if any is returned.
     * This option has a significant impact on the performance as this method is blocking.
     */
    GLLoggingOption[GLLoggingOption["GET_ERRORS"] = 2] = "GET_ERRORS";
    /**
     * Resolves parameters of type `number` to their constant names.
     */
    GLLoggingOption[GLLoggingOption["RESOLVE_CONSTANTS"] = 4] = "RESOLVE_CONSTANTS";
    /**
     * When this option is enabled, long strings will be truncated.
     * It's useful if your shaders are really big and logging them significantly reduces performance.
     */
    GLLoggingOption[GLLoggingOption["TRUNCATE_STRINGS"] = 8] = "TRUNCATE_STRINGS";
    /**
     * Enables all other options. It implies `GET_ERRORS` so be aware of the slowdown.
     */
    GLLoggingOption[GLLoggingOption["ALL"] = 15] = "ALL";
})(exports.GLLoggingOption || (exports.GLLoggingOption = {}));

/**
 * Maximum length of the strings printed to the console.
 */
const MAX_STRING_LENGTH = 20;
/**
 * Sets up `__dangleSetLogging` method providing some logging options useful when debugging GL calls.
 */
function configureLogging(gl) {
    // Enable/disable logging of all GL function calls
    let loggingOption = exports.GLLoggingOption.DISABLED;
    gl.__dangleSetLogging = (option) => {
        // If boolean values are the same, just change the internal value,
        // there is no need to wrap/unwrap functions in this case.
        if (!loggingOption === !option) {
            loggingOption = option;
            return;
        }
        // Turn off logging.
        if (!option || option === exports.GLLoggingOption.DISABLED) {
            Object.entries(gl).forEach(([key, value]) => {
                if (typeof value === 'function' && value.original) {
                    gl[key] = value.original;
                }
            });
            loggingOption = option;
            return;
        }
        // Turn on logging.
        Object.entries(gl).forEach(([key, originalValue]) => {
            if (typeof originalValue !== 'function' || key === '__dangleSetLogging') {
                return;
            }
            gl[key] = (...args) => {
                if (loggingOption & exports.GLLoggingOption.METHOD_CALLS) {
                    const params = args.map(arg => {
                        // If the type is `number`, then try to find name of the constant that has such value,
                        // so it's easier to read these logs. In some cases it might be misleading
                        // if the parameter is for example a width or height, so the number is still logged.
                        if (loggingOption & exports.GLLoggingOption.RESOLVE_CONSTANTS && typeof arg === 'number') {
                            for (const prop in gl) {
                                if (gl[prop] === arg) {
                                    return `${arg} (${prop})`;
                                }
                            }
                        }
                        // Truncate strings so they don't produce too much output and don't block the bridge.
                        // It mostly applies to shaders which might be very long...
                        if (loggingOption & exports.GLLoggingOption.TRUNCATE_STRINGS && typeof arg === 'string') {
                            if (arg.length > MAX_STRING_LENGTH) {
                                const lastIndex = arg.lastIndexOf(' ', MAX_STRING_LENGTH);
                                return arg.substr(0, lastIndex >= 0 ? lastIndex : MAX_STRING_LENGTH) + '...';
                            }
                        }
                        // Just return the parameter as a string.
                        return '' + arg;
                    });
                    console.log(`Dangle: ${key}(${params.join(', ')})`);
                }
                const result = originalValue.apply(gl, args);
                if (loggingOption & exports.GLLoggingOption.METHOD_CALLS) {
                    console.log(`Dangle:   = ${result}`);
                }
                if (loggingOption & exports.GLLoggingOption.GET_ERRORS && key !== 'getError') {
                    // @ts-ignore We need to call into the original `getError`.
                    const error = gl.getError.original.call(gl);
                    if (error) { //  && error !== gl.NO_ERROR
                        // `console.error` would cause a red screen, so let's just log with red color.
                        console.log(`Dangle: Error ${GLErrors[error]}`);
                    }
                }
                return result;
            };
            gl[key].original = originalValue;
        });
        loggingOption = option;
    };
}

const global = new Function('return this')();
// JavaScript WebGL types to wrap around native objects
class WebGLRenderingContext {
}
class WebGL2RenderingContext extends WebGLRenderingContext {
}
const idToObject = {};
class WebGLObject {
    constructor(id) {
        if (idToObject[id]) {
            throw new Error(`WebGL object with underlying DangleObjectId '${id}' already exists!`);
        }
        this.id = id; // Native GL object id
    }
    toString() {
        return `[${this.constructor.name} ${this.id}]`;
    }
}
const wrapObject = (type, id) => {
    const found = idToObject[id];
    if (found) {
        return found;
    }
    return (idToObject[id] = new type(id));
};
const objectId = (obj) => obj && obj.id;
class WebGLBuffer extends WebGLObject {
}
class WebGLFramebuffer extends WebGLObject {
}
class WebGLProgram extends WebGLObject {
}
class WebGLRenderbuffer extends WebGLObject {
}
class WebGLShader extends WebGLObject {
}
class WebGLTexture extends WebGLObject {
}
class WebGLUniformLocation {
    constructor(id) {
        this.id = id; // Native GL object id
    }
    toString() {
        return `[${this.constructor.name} ${this.id}]`;
    }
}
class WebGLActiveInfo {
    constructor(obj) {
        Object.assign(this, obj);
    }
    toString() {
        return `[${this.constructor.name} ${JSON.stringify(this)}]`;
    }
}
class WebGLShaderPrecisionFormat {
    constructor(obj) {
        Object.assign(this, obj);
    }
    toString() {
        return `[${this.constructor.name} ${JSON.stringify(this)}]`;
    }
}
// WebGL2 classes
class WebGLQuery extends WebGLObject {
}
class WebGLSampler extends WebGLObject {
}
class WebGLSync extends WebGLObject {
}
class WebGLTransformFeedback extends WebGLObject {
}
class WebGLVertexArrayObject extends WebGLObject {
}
// Many functions need wrapping/unwrapping of arguments and return value. We handle each case
// specifically so we can write the tightest code for better performance.
const wrapMethods = gl => {
    const wrap = (methodNames, wrapper) => (Array.isArray(methodNames) ? methodNames : [methodNames]).forEach(methodName => (gl[methodName] = wrapper(gl[methodName])));
    // We can be slow in `gl.getParameter(...)` since it's a blocking call anyways
    const getParameterTypes = {
        [gl.ARRAY_BUFFER_BINDING]: WebGLBuffer,
        [gl.COPY_READ_BUFFER_BINDING]: WebGLBuffer,
        [gl.COPY_WRITE_BUFFER_BINDING]: WebGLBuffer,
        [gl.CURRENT_PROGRAM]: WebGLProgram,
        [gl.DRAW_FRAMEBUFFER_BINDING]: WebGLFramebuffer,
        [gl.ELEMENT_ARRAY_BUFFER_BINDING]: WebGLBuffer,
        [gl.READ_FRAMEBUFFER_BINDING]: WebGLFramebuffer,
        [gl.RENDERBUFFER_BINDING]: WebGLRenderbuffer,
        [gl.SAMPLER_BINDING]: WebGLSampler,
        [gl.TEXTURE_BINDING_2D_ARRAY]: WebGLTexture,
        [gl.TEXTURE_BINDING_2D]: WebGLTexture,
        [gl.TEXTURE_BINDING_3D]: WebGLTexture,
        [gl.TEXTURE_BINDING_CUBE_MAP]: WebGLTexture,
        [gl.TRANSFORM_FEEDBACK_BINDING]: WebGLTransformFeedback,
        [gl.TRANSFORM_FEEDBACK_BUFFER_BINDING]: WebGLBuffer,
        [gl.UNIFORM_BUFFER_BINDING]: WebGLBuffer,
        [gl.VERTEX_ARRAY_BINDING]: WebGLVertexArrayObject,
    };
    wrap('getParameter', orig => pname => {
        let ret = Reflect.apply(orig, gl, [pname]);
        if (pname === gl.VERSION) {
            // Wrap native version name
            ret = `WebGL 2.0 (Expo-${"Dangle"}-${'1.0.0'}) (${ret})`;
        }
        const type = getParameterTypes[pname];
        return type ? wrapObject(type, ret) : ret;
    });
    // Buffers
    wrap('bindBuffer', orig => (target, buffer) => Reflect.apply(orig, gl, [target, buffer && buffer.id]));
    wrap('createBuffer', orig => () => wrapObject(WebGLBuffer, Reflect.apply(orig, gl, [])));
    wrap('deleteBuffer', orig => buffer => Reflect.apply(orig, gl, [buffer && buffer.id]));
    wrap('isBuffer', orig => buffer => buffer instanceof WebGLBuffer && Reflect.apply(orig, gl, [buffer.id]));
    // Framebuffers
    wrap('bindFramebuffer', orig => (target, framebuffer) => Reflect.apply(orig, gl, [target, framebuffer && framebuffer.id]));
    wrap('createFramebuffer', orig => () => wrapObject(WebGLFramebuffer, Reflect.apply(orig, gl, [])));
    wrap('deleteFramebuffer', orig => framebuffer => Reflect.apply(orig, gl, [framebuffer && framebuffer.id]));
    wrap('framebufferRenderbuffer', orig => (target, attachment, rbtarget, rb) => Reflect.apply(orig, gl, [target, attachment, rbtarget, rb && rb.id]));
    wrap('framebufferTexture2D', orig => (target, attachment, textarget, tex, level) => Reflect.apply(orig, gl, [target, attachment, textarget, tex && tex.id, level]));
    wrap('isFramebuffer', orig => framebuffer => framebuffer instanceof WebGLFramebuffer && Reflect.apply(orig, gl, [framebuffer.id]));
    wrap('framebufferTextureLayer', orig => (target, attachment, texture, level, layer) => {
        return Reflect.apply(orig, gl, [target, attachment, objectId(texture), level, layer]);
    });
    // Renderbuffers
    wrap('bindRenderbuffer', orig => (target, renderbuffer) => Reflect.apply(orig, gl, [target, renderbuffer && renderbuffer.id]));
    wrap('createRenderbuffer', orig => () => wrapObject(WebGLRenderbuffer, Reflect.apply(orig, gl, [])));
    wrap('deleteRenderbuffer', orig => renderbuffer => Reflect.apply(orig, gl, [renderbuffer && renderbuffer.id]));
    wrap('isRenderbuffer', orig => renderbuffer => renderbuffer instanceof WebGLRenderbuffer && Reflect.apply(orig, gl, [renderbuffer.id]));
    // Textures
    wrap('bindTexture', orig => (target, texture) => Reflect.apply(orig, gl, [target, texture && texture.id]));
    wrap('createTexture', orig => () => wrapObject(WebGLTexture, Reflect.apply(orig, gl, [])));
    wrap('deleteTexture', orig => texture => Reflect.apply(orig, gl, [texture && texture.id]));
    wrap('isTexture', orig => texture => texture instanceof WebGLTexture && Reflect.apply(orig, gl, [texture.id]));
    // Programs and shaders
    wrap('attachShader', orig => (program, shader) => Reflect.apply(orig, gl, [program && program.id, shader && shader.id]));
    wrap('bindAttribLocation', orig => (program, index, name) => Reflect.apply(orig, gl, [program && program.id, index, name]));
    wrap('compileShader', orig => shader => Reflect.apply(orig, gl, [shader && shader.id]));
    wrap('createProgram', orig => () => wrapObject(WebGLProgram, Reflect.apply(orig, gl, [])));
    wrap('createShader', orig => type => wrapObject(WebGLShader, Reflect.apply(orig, gl, [type])));
    wrap('deleteProgram', orig => program => Reflect.apply(orig, gl, [program && program.id]));
    wrap('deleteShader', orig => shader => Reflect.apply(orig, gl, [shader && shader.id]));
    wrap('detachShader', orig => (program, shader) => Reflect.apply(orig, gl, [program && program.id, shader && shader.id]));
    wrap('getAttachedShaders', orig => program => Reflect.apply(orig, gl, [program && program.id]).map(id => wrapObject(WebGLShader, id)));
    wrap('getProgramParameter', orig => (program, pname) => Reflect.apply(orig, gl, [program && program.id, pname]));
    wrap('getProgramInfoLog', orig => program => Reflect.apply(orig, gl, [program && program.id]));
    wrap('getShaderParameter', orig => (shader, pname) => Reflect.apply(orig, gl, [shader && shader.id, pname]));
    wrap('getShaderPrecisionFormat', orig => (shadertype, precisiontype) => new WebGLShaderPrecisionFormat(Reflect.apply(orig, gl, [shadertype, precisiontype])));
    wrap('getShaderInfoLog', orig => shader => Reflect.apply(orig, gl, [shader && shader.id]));
    wrap('getShaderSource', orig => shader => Reflect.apply(orig, gl, [shader && shader.id]));
    wrap('linkProgram', orig => program => Reflect.apply(orig, gl, [program && program.id]));
    wrap('shaderSource', orig => (shader, source) => Reflect.apply(orig, gl, [shader && shader.id, source]));
    wrap('useProgram', orig => program => Reflect.apply(orig, gl, [program && program.id]));
    wrap('validateProgram', orig => program => Reflect.apply(orig, gl, [program && program.id]));
    wrap('isShader', orig => shader => shader instanceof WebGLShader && Reflect.apply(orig, gl, [shader.id]));
    wrap('isProgram', orig => program => program instanceof WebGLProgram && Reflect.apply(orig, gl, [program.id]));
    wrap('getFragDataLocation', orig => program => Reflect.apply(orig, gl, [objectId(program)]));
    // Uniforms and attributes
    wrap('getActiveAttrib', orig => (program, index) => new WebGLActiveInfo(Reflect.apply(orig, gl, [program && program.id, index])));
    wrap('getActiveUniform', orig => (program, index) => new WebGLActiveInfo(Reflect.apply(orig, gl, [program && program.id, index])));
    wrap('getAttribLocation', orig => (program, name) => Reflect.apply(orig, gl, [program && program.id, name]));
    wrap('getUniform', orig => (program, location) => Reflect.apply(orig, gl, [program && program.id, location && location.id]));
    wrap('getUniformLocation', orig => (program, name) => new WebGLUniformLocation(Reflect.apply(orig, gl, [program && program.id, name])));
    wrap(['uniform1f', 'uniform1i', 'uniform1ui'], orig => (loc, x) => Reflect.apply(orig, gl, [objectId(loc), x]));
    wrap(['uniform2f', 'uniform2i', 'uniform2ui'], orig => (loc, x, y) => Reflect.apply(orig, gl, [objectId(loc), x, y]));
    wrap(['uniform3f', 'uniform3i', 'uniform3ui'], orig => (loc, x, y, z) => Reflect.apply(orig, gl, [objectId(loc), x, y, z]));
    wrap(['uniform4f', 'uniform4i', 'uniform4ui'], orig => (loc, x, y, z, w) => Reflect.apply(orig, gl, [objectId(loc), x, y, z, w]));
    wrap(['uniform1fv', 'uniform2fv', 'uniform3fv', 'uniform4fv'], orig => (loc, val) => Reflect.apply(orig, gl, [objectId(loc), new Float32Array(val)]));
    wrap(['uniform1iv', 'uniform2iv', 'uniform3iv', 'uniform4iv'], orig => (loc, val) => Reflect.apply(orig, gl, [objectId(loc), new Int32Array(val)]));
    wrap(['uniform1uiv', 'uniform2uiv', 'uniform3uiv', 'uniform4uiv'], orig => (loc, val) => Reflect.apply(orig, gl, [objectId(loc), new Uint32Array(val)]));
    wrap([
        'uniformMatrix2fv',
        'uniformMatrix3fv',
        'uniformMatrix4fv',
        'uniformMatrix3x2fv',
        'uniformMatrix4x2fv',
        'uniformMatrix2x3fv',
        'uniformMatrix4x3fv',
        'uniformMatrix2x4fv',
        'uniformMatrix3x4fv',
    ], orig => (loc, transpose, val) => Reflect.apply(orig, gl, [loc && loc.id, transpose, new Float32Array(val)]));
    wrap(['vertexAttrib1fv', 'vertexAttrib2fv', 'vertexAttrib3fv', 'vertexAttrib4fv'], orig => (index, val) => Reflect.apply(orig, gl, [index, new Float32Array(val)]));
    wrap('vertexAttribI4iv', orig => (index, val) => Reflect.apply(orig, gl, [index, new Int32Array(val)]));
    wrap('vertexAttribI4uiv', orig => (index, val) => Reflect.apply(orig, gl, [index, new Uint32Array(val)]));
    // Query objects
    wrap('createQuery', orig => () => wrapObject(WebGLQuery, Reflect.apply(orig, gl, [])));
    wrap('deleteQuery', orig => query => Reflect.apply(orig, gl, [objectId(query)]));
    wrap('beginQuery', orig => (target, query) => Reflect.apply(orig, gl, [target, objectId(query)]));
    wrap('getQuery', orig => (target, pname) => {
        const id = Reflect.apply(orig, gl, [target, pname]);
        return id ? wrapObject(WebGLQuery, id) : id;
    });
    wrap('getQueryParameter', orig => (query, pname) => Reflect.apply(orig, gl, [objectId(query), pname]));
    // Samplers
    wrap('bindSampler', orig => (unit, sampler) => Reflect.apply(orig, gl, [unit, objectId(sampler)]));
    wrap('createSampler', orig => () => wrapObject(WebGLSampler, Reflect.apply(orig, gl, [])));
    wrap('deleteSampler', orig => sampler => Reflect.apply(orig, gl, [objectId(sampler)]));
    wrap('isSampler', orig => sampler => sampler instanceof WebGLSampler && Reflect.apply(orig, gl, [sampler.id]));
    wrap(['samplerParameteri', 'samplerParameterf'], orig => (sampler, pname, param) => {
        return Reflect.apply(orig, gl, [objectId(sampler), pname, param]);
    });
    wrap('getSamplerParameter', orig => (sampler, pname) => {
        return Reflect.apply(orig, gl, [objectId(sampler), pname]);
    });
    // Transform feedback
    wrap('bindTransformFeedback', orig => (target, transformFeedback) => {
        return Reflect.apply(orig, gl, [target, objectId(transformFeedback)]);
    });
    wrap('createTransformFeedback', orig => () => wrapObject(WebGLTransformFeedback, Reflect.apply(orig, gl, [])));
    wrap('deleteTransformFeedback', orig => transformFeedback => {
        return Reflect.apply(orig, gl, [objectId(transformFeedback)]);
    });
    wrap('transformFeedbackVaryings', orig => (program, varyings, bufferMode) => {
        return Reflect.apply(orig, gl, [objectId(program), varyings, bufferMode]);
    });
    wrap('getTransformFeedbackVarying', orig => (program, index) => {
        return new WebGLActiveInfo(Reflect.apply(orig, gl, [objectId(program), index]));
    });
    // Uniforms and attributes
    wrap(['bindBufferBase', 'bindBufferRange'], orig => (target, index, buffer, ...rest) => {
        return Reflect.apply(orig, gl, [target, index, objectId(buffer), ...rest]);
    });
    wrap('getUniformIndices', orig => (program, uniformNames) => {
        // according to WebGL2 specs, it returns Array instead of Uint32Array
        const uintArray = Reflect.apply(orig, gl, [objectId(program), uniformNames]);
        return Array.from(uintArray);
    });
    wrap('getActiveUniforms', orig => (program, uniformIndices, pname) => {
        // according to WebGL2 specs, it returns Array instead of Int32Array
        const intArray = Reflect.apply(orig, gl, [objectId(program), new Uint32Array(uniformIndices), pname]);
        const boolResult = pname === gl.UNIFORM_IS_ROW_MAJOR;
        const arr = Array.from(intArray);
        return boolResult ? arr.map(val => !!val) : arr;
    });
    wrap('getUniformBlockIndex', orig => (program, uniformBlockName) => Reflect.apply(orig, gl, [objectId(program), uniformBlockName]));
    wrap('getActiveUniformBlockName', orig => (program, uniformBlockIndex) => Reflect.apply(orig, gl, [objectId(program), uniformBlockIndex]));
    wrap('uniformBlockBinding', orig => (program, uniformBlockIndex, uniformBlockBinding) => {
        return Reflect.apply(orig, gl, [objectId(program), uniformBlockIndex, uniformBlockBinding]);
    });
    // Vertex array objects
    wrap('bindVertexArray', orig => vertexArray => Reflect.apply(orig, gl, [vertexArray && vertexArray.id]));
    wrap('createVertexArray', orig => () => wrapObject(WebGLVertexArrayObject, Reflect.apply(orig, gl, [])));
    wrap('deleteVertexArray', orig => vertexArray => Reflect.apply(orig, gl, [vertexArray && vertexArray.id]));
    wrap('isVertexArray', orig => vertexArray => vertexArray instanceof WebGLVertexArrayObject && Reflect.apply(orig, gl, [vertexArray.id]));
};
// Get the GL interface from an DangleContextID and do JS-side setup
const getGl = (dangleCtxId) => {
    if (!global.__DANGLEContexts) {
        throw new Error('ERR_GL_NOT_AVAILABLE' + " " +
            'GL is currently not available. (Have you enabled remote debugging? GL is not available while debugging remotely.)');
    }
    const gl = global.__DANGLEContexts[dangleCtxId];
    gl.__dangleCtxId = dangleCtxId;
    delete global.__DANGLEContexts[dangleCtxId];
    // determine the prototype to use, depending on OpenGL ES version
    const glesVersion = gl.getParameter(gl.VERSION);
    const supportsWebGL2 = parseFloat(glesVersion.split(/[^\d.]+/g).join(' ')) >= 3.0;
    const prototype = supportsWebGL2
        ? global.WebGL2RenderingContext.prototype
        : global.WebGLRenderingContext.prototype;
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(gl, prototype);
    }
    else {
        // Delete this path when we are competely sure we're using modern JSC on Android. iOS 9+
        // supports Object.setPrototypeOf.
        gl.__proto__ = prototype; // eslint-disable-line no-proto
    }
    wrapMethods(gl);
    // No canvas yet...
    gl.canvas = null;
    // Drawing buffer width/height
    // TODO(nikki): Make this dynamic
    const viewport = gl.getParameter(gl.VIEWPORT);
    gl.drawingBufferWidth = viewport[2];
    gl.drawingBufferHeight = viewport[3];
    configureLogging(gl);
    return gl;
};
global.WebGLRenderingContext = WebGLRenderingContext;
global.WebGL2RenderingContext = WebGL2RenderingContext;
global.WebGLObject = WebGLObject;
global.WebGLBuffer = WebGLBuffer;
global.WebGLFramebuffer = WebGLFramebuffer;
global.WebGLProgram = WebGLProgram;
global.WebGLRenderbuffer = WebGLRenderbuffer;
global.WebGLShader = WebGLShader;
global.WebGLTexture = WebGLTexture;
global.WebGLUniformLocation = WebGLUniformLocation;
global.WebGLActiveInfo = WebGLActiveInfo;
global.WebGLShaderPrecisionFormat = WebGLShaderPrecisionFormat;
global.WebGLQuery = WebGLQuery;
global.WebGLSampler = WebGLSampler;
global.WebGLSync = WebGLSync;
global.WebGLTransformFeedback = WebGLTransformFeedback;
global.WebGLVertexArrayObject = WebGLVertexArrayObject;

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class DangleView extends doric.View {
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
    doric.Property,
    __metadata("design:type", Object)
], DangleView.prototype, "onPrepared", void 0);
function dangleView(config) {
    const ret = new DangleView();
    ret.layoutConfig = doric.layoutConfig().fit();
    for (let key in config) {
        Reflect.set(ret, key, Reflect.get(config, key, config), ret);
    }
    return ret;
}
function vsync(context) {
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

exports.DangleView = DangleView;
exports.WebGLObject = WebGLObject;
exports.dangleView = dangleView;
exports.getGl = getGl;
exports.vsync = vsync;
//# sourceMappingURL=bundle_dangle.js.map
