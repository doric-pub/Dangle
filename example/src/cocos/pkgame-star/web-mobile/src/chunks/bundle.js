System.register([], function(_export, _context) { return { execute: function () {
System.register("chunks:///_virtual/_rollupPluginModLoBabelHelpers.js", [], function (exports) {
  'use strict';

  return {
    execute: function () {
      exports({
        applyDecoratedDescriptor: _applyDecoratedDescriptor,
        assertThisInitialized: _assertThisInitialized,
        asyncToGenerator: _asyncToGenerator,
        createClass: _createClass,
        defineProperty: _defineProperty,
        inheritsLoose: _inheritsLoose,
        initializerDefineProperty: _initializerDefineProperty,
        setPrototypeOf: _setPrototypeOf
      });

      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }

      function _asyncToGenerator(fn) {
        return function () {
          var self = this,
              args = arguments;
          return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }

            _next(undefined);
          });
        };
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      }

      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;

        _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = exports('setPrototypeOf', Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        });
        return _setPrototypeOf(o, p);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
          value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
      }

      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function (key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
          desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
          return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
          Object.defineProperty(target, property, desc);
          desc = null;
        }

        return desc;
      }
    }
  };
});

System.register("chunks:///_virtual/fetch.umd.mjs_cjs=&original=.js", ['./cjs-loader.mjs', './fetch.umd.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './fetch.umd.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./fetch.umd.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/cjs-loader.mjs", [], function (exports) {
  'use strict';

  return {
    execute: function () {
      var CjsLoader = /*#__PURE__*/function () {
        function CjsLoader() {
          this._namedWrappers = {};
          this._resolveCache = {};
          this._moduleCache = {};
        }

        var _proto = CjsLoader.prototype;

        _proto.define = function define(id, wrapper) {
          this._namedWrappers[id] = wrapper;
        };

        _proto.require = function require(id) {
          return this._require(id);
        };

        _proto.createRequireWithReqMap = function createRequireWithReqMap(requireMap, originalRequire) {
          return function (specifier) {
            var resolved = requireMap[specifier];

            if (resolved) {
              return originalRequire(resolved);
            } else {
              throw new Error('Unresolved specifier ' + specifier);
            }
          };
        };

        _proto.throwInvalidWrapper = function throwInvalidWrapper(requestTarget, from) {
          throw new Error("Module '" + requestTarget + "' imported from '" + from + "' is expected be an ESM-wrapped CommonJS module but it doesn't.");
        };

        _proto._require = function _require(id, parent) {
          var cachedModule = this._moduleCache[id];

          if (cachedModule) {
            return cachedModule.exports;
          }

          var module = {
            id: id,
            exports: {}
          };
          this._moduleCache[id] = module;

          this._tryModuleLoad(module, id);

          return module.exports;
        };

        _proto._resolve = function _resolve(specifier, parent) {
          return this._resolveFromInfos(specifier, parent) || this._throwUnresolved(specifier, parent);
        };

        _proto._resolveFromInfos = function _resolveFromInfos(specifier, parent) {
          var _cjsInfos$parent$reso, _cjsInfos$parent;

          if (specifier in cjsInfos) {
            return specifier;
          }

          if (!parent) {
            return;
          }

          return (_cjsInfos$parent$reso = (_cjsInfos$parent = cjsInfos[parent]) === null || _cjsInfos$parent === void 0 ? void 0 : _cjsInfos$parent.resolveCache[specifier]) !== null && _cjsInfos$parent$reso !== void 0 ? _cjsInfos$parent$reso : undefined;
        };

        _proto._tryModuleLoad = function _tryModuleLoad(module, id) {
          var threw = true;

          try {
            this._load(module, id);

            threw = false;
          } finally {
            if (threw) {
              delete this._moduleCache[id];
            }
          }
        };

        _proto._load = function _load(module, id) {
          var wrapper = this._loadWrapper(id);

          var require = this._createRequire(module);

          wrapper(module.exports, require, module);
        };

        _proto._loadWrapper = function _loadWrapper(id) {
          if (id in this._namedWrappers) {
            return this._namedWrappers[id];
          } else {
            return this._loadExternalWrapper(id);
          }
        };

        _proto._loadExternalWrapper = function _loadExternalWrapper(id) {
          return function (exports) {
            var path;

            try {
              path = URL.fileURLToPath(id);
            } catch (err) {
              throw new Error(id + " is not a valid file URL");
            }

            var extern = require(path);

            Object.assign(exports, extern);
          };
        };

        _proto._createRequire = function _createRequire(module) {
          var _this = this;

          return function (specifier) {
            return _this._require(specifier, module);
          };
        };

        _proto._throwUnresolved = function _throwUnresolved(specifier, parentUrl) {
          throw new Error("Unable to resolve " + specifier + " from " + parent + ".");
        };

        return CjsLoader;
      }();

      var loader = exports('default', new CjsLoader());
    }
  };
});

System.register("chunks:///_virtual/protobuf-library.min.mjs_cjs=&original=.js", ['./cjs-loader.mjs', './protobuf-library.min.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './protobuf-library.min.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./protobuf-library.min.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/protobuf-library.mjs_cjs=&original=.js", ['./cjs-loader.mjs', './protobuf-library.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './protobuf-library.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./protobuf-library.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/protobuf-bundles.mjs_cjs=&original=.js", ['./cjs-loader.mjs', './protobuf-bundles.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './protobuf-bundles.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./protobuf-bundles.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/index.cjs.mjs_cjs=&original=.js", ['./cjs-loader.mjs', './index.cjs.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './index.cjs.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./index.cjs.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/long.mjs_cjs=&original=.js", ['./cjs-loader.mjs', './long.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './long.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./long.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/index.cjs.js", ['./cjs-loader.mjs', './typeof.js', './set-prototype-of.js', './assign.js', './promise.js', './symbol.js', './iterator.js', './slice.js', './sort.js', './index-of.js', './parse-int.js', './starts-with.js', './reduce.js', './trim.js', './includes.js', './stringify.js', './filter.js', './keys.js', './freeze.js', './map.js', './splice.js', './last-index-of.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$6, __cjsMetaURL$7, __cjsMetaURL$8, __cjsMetaURL$9, __cjsMetaURL$a, __cjsMetaURL$b, __cjsMetaURL$c, __cjsMetaURL$d, __cjsMetaURL$e, __cjsMetaURL$f, __cjsMetaURL$g, __cjsMetaURL$h, __cjsMetaURL$i, __cjsMetaURL$j, __cjsMetaURL$k, __cjsMetaURL$l;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$a = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$b = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$c = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$d = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$e = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$f = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$g = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$h = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$i = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$j = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$k = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$l = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "@babel/runtime-corejs3/helpers/typeof": __cjsMetaURL$1,
          "@babel/runtime-corejs3/core-js-stable/object/set-prototype-of": __cjsMetaURL$2,
          "@babel/runtime-corejs3/core-js-stable/object/assign": __cjsMetaURL$3,
          "@babel/runtime-corejs3/core-js-stable/promise": __cjsMetaURL$4,
          "@babel/runtime-corejs3/core-js-stable/symbol": __cjsMetaURL$5,
          "@babel/runtime-corejs3/core-js-stable/symbol/iterator": __cjsMetaURL$6,
          "@babel/runtime-corejs3/core-js-stable/instance/slice": __cjsMetaURL$7,
          "@babel/runtime-corejs3/core-js-stable/instance/sort": __cjsMetaURL$8,
          "@babel/runtime-corejs3/core-js-stable/instance/index-of": __cjsMetaURL$9,
          "@babel/runtime-corejs3/core-js-stable/parse-int": __cjsMetaURL$a,
          "@babel/runtime-corejs3/core-js-stable/instance/starts-with": __cjsMetaURL$b,
          "@babel/runtime-corejs3/core-js-stable/instance/reduce": __cjsMetaURL$c,
          "@babel/runtime-corejs3/core-js-stable/instance/trim": __cjsMetaURL$d,
          "@babel/runtime-corejs3/core-js-stable/instance/includes": __cjsMetaURL$e,
          "@babel/runtime-corejs3/core-js-stable/json/stringify": __cjsMetaURL$f,
          "@babel/runtime-corejs3/core-js-stable/instance/filter": __cjsMetaURL$g,
          "@babel/runtime-corejs3/core-js-stable/object/keys": __cjsMetaURL$h,
          "@babel/runtime-corejs3/core-js-stable/object/freeze": __cjsMetaURL$i,
          "@babel/runtime-corejs3/core-js-stable/instance/map": __cjsMetaURL$j,
          "@babel/runtime-corejs3/core-js-stable/instance/splice": __cjsMetaURL$k,
          "@babel/runtime-corejs3/core-js-stable/instance/last-index-of": __cjsMetaURL$l
        }, _require);

        (function () {
          var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

          var _Object$setPrototypeOf = require("@babel/runtime-corejs3/core-js-stable/object/set-prototype-of");

          var _Object$assign = require("@babel/runtime-corejs3/core-js-stable/object/assign");

          var _Promise = require("@babel/runtime-corejs3/core-js-stable/promise");

          var _Symbol = require("@babel/runtime-corejs3/core-js-stable/symbol");

          var _Symbol$iterator = require("@babel/runtime-corejs3/core-js-stable/symbol/iterator");

          var _sliceInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/slice");

          var _sortInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/sort");

          var _indexOfInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/index-of");

          var _parseInt = require("@babel/runtime-corejs3/core-js-stable/parse-int");

          var _startsWithInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/starts-with");

          var _reduceInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/reduce");

          var _trimInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/trim");

          var _includesInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/includes");

          var _JSON$stringify = require("@babel/runtime-corejs3/core-js-stable/json/stringify");

          var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

          var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

          var _Object$freeze = require("@babel/runtime-corejs3/core-js-stable/object/freeze");

          var _mapInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/map");

          var _spliceInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/splice");

          var _lastIndexOfInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/last-index-of");

          Object.defineProperty(exports$1, "__esModule", {
            value: !0
          });
          /*! *****************************************************************************
          Copyright (c) Microsoft Corporation.
          
          Permission to use, copy, modify, and/or distribute this software for any
          purpose with or without fee is hereby granted.
          
          THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
          REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
          AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
          INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
          LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
          OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
          PERFORMANCE OF THIS SOFTWARE.
          ***************************************************************************** */

          var _extendStatics = function extendStatics(d, b) {
            return (_extendStatics = _Object$setPrototypeOf || {
              __proto__: []
            } instanceof Array && function (d, b) {
              d.__proto__ = b;
            } || function (d, b) {
              for (var p in b) {
                b.hasOwnProperty(p) && (d[p] = b[p]);
              }
            })(d, b);
          };

          function __extends(d, b) {
            function __() {
              this.constructor = d;
            }

            _extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          }

          var _assign = function __assign() {
            return (_assign = _Object$assign || function (t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                for (var p in s = arguments[i]) {
                  Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
                }
              }

              return t;
            }).apply(this, arguments);
          };

          function __awaiter(thisArg, _arguments, P, generator) {
            return new (P || (P = _Promise))(function (resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value));
                } catch (e) {
                  reject(e);
                }
              }

              function rejected(value) {
                try {
                  step(generator["throw"](value));
                } catch (e) {
                  reject(e);
                }
              }

              function step(result) {
                var value;
                result.done ? resolve(result.value) : (value = result.value, value instanceof P ? value : new P(function (resolve) {
                  resolve(value);
                })).then(fulfilled, rejected);
              }

              step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
          }

          function __generator(thisArg, body) {
            var f,
                y,
                t,
                g,
                _ = {
              label: 0,
              sent: function sent() {
                if (1 & t[0]) throw t[1];
                return t[1];
              },
              trys: [],
              ops: []
            };
            return g = {
              next: verb(0),
              "throw": verb(1),
              "return": verb(2)
            }, "function" == typeof _Symbol && (g[_Symbol$iterator] = function () {
              return this;
            }), g;

            function verb(n) {
              return function (v) {
                return function (op) {
                  if (f) throw new TypeError("Generator is already executing.");

                  for (; _;) {
                    try {
                      if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;

                      switch (y = 0, t && (op = [2 & op[0], t.value]), op[0]) {
                        case 0:
                        case 1:
                          t = op;
                          break;

                        case 4:
                          return _.label++, {
                            value: op[1],
                            done: !1
                          };

                        case 5:
                          _.label++, y = op[1], op = [0];
                          continue;

                        case 7:
                          op = _.ops.pop(), _.trys.pop();
                          continue;

                        default:
                          if (!(t = _.trys, (t = t.length > 0 && t[t.length - 1]) || 6 !== op[0] && 2 !== op[0])) {
                            _ = 0;
                            continue;
                          }

                          if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                          }

                          if (6 === op[0] && _.label < t[1]) {
                            _.label = t[1], t = op;
                            break;
                          }

                          if (t && _.label < t[2]) {
                            _.label = t[2], _.ops.push(op);
                            break;
                          }

                          t[2] && _.ops.pop(), _.trys.pop();
                          continue;
                      }

                      op = body.call(thisArg, _);
                    } catch (e) {
                      op = [6, e], y = 0;
                    } finally {
                      f = t = 0;
                    }
                  }

                  if (5 & op[0]) throw op[1];
                  return {
                    value: op[0] ? op[1] : void 0,
                    done: !0
                  };
                }([n, v]);
              };
            }
          }

          function __spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
              s += arguments[i].length;
            }

            var r = Array(s),
                k = 0;

            for (i = 0; i < il; i++) {
              for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
                r[k] = a[j];
              }
            }

            return r;
          }

          var u8 = Uint8Array,
              u16 = Uint16Array,
              u32 = Uint32Array,
              fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
              fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
              clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
              freb = function freb(eb, start) {
            for (var b = new u16(31), i = 0; i < 31; ++i) {
              b[i] = start += 1 << eb[i - 1];
            }

            var r = new u32(b[30]);

            for (i = 1; i < 30; ++i) {
              for (var j = b[i]; j < b[i + 1]; ++j) {
                r[j] = j - b[i] << 5 | i;
              }
            }

            return [b, r];
          },
              _a = freb(fleb, 2),
              fl = _a[0],
              revfl = _a[1];

          fl[28] = 258, revfl[258] = 28;

          for (var revfd = freb(fdeb, 0)[1], rev = new u16(32768), i = 0; i < 32768; ++i) {
            var x = (43690 & i) >>> 1 | (21845 & i) << 1;
            x = (61680 & (x = (52428 & x) >>> 2 | (13107 & x) << 2)) >>> 4 | (3855 & x) << 4, rev[i] = ((65280 & x) >>> 8 | (255 & x) << 8) >>> 1;
          }

          var hMap = function hMap(cd, mb, r) {
            for (var s = cd.length, i = 0, l = new u16(mb); i < s; ++i) {
              ++l[cd[i] - 1];
            }

            var co,
                le = new u16(mb);

            for (i = 0; i < mb; ++i) {
              le[i] = le[i - 1] + l[i - 1] << 1;
            }

            if (r) {
              co = new u16(1 << mb);
              var rvb = 15 - mb;

              for (i = 0; i < s; ++i) {
                if (cd[i]) for (var sv = i << 4 | cd[i], r_1 = mb - cd[i], v = le[cd[i] - 1]++ << r_1, m = v | (1 << r_1) - 1; v <= m; ++v) {
                  co[rev[v] >>> rvb] = sv;
                }
              }
            } else for (co = new u16(s), i = 0; i < s; ++i) {
              cd[i] && (co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i]);
            }

            return co;
          },
              flt = new u8(288);

          for (i = 0; i < 144; ++i) {
            flt[i] = 8;
          }

          for (i = 144; i < 256; ++i) {
            flt[i] = 9;
          }

          for (i = 256; i < 280; ++i) {
            flt[i] = 7;
          }

          for (i = 280; i < 288; ++i) {
            flt[i] = 8;
          }

          var fdt = new u8(32);

          for (i = 0; i < 32; ++i) {
            fdt[i] = 5;
          }

          var flm = hMap(flt, 9, 0),
              fdm = hMap(fdt, 5, 0),
              shft = function shft(p) {
            return (p / 8 | 0) + (7 & p && 1);
          },
              wbits = function wbits(d, p, v) {
            v <<= 7 & p;
            var o = p / 8 | 0;
            d[o] |= v, d[o + 1] |= v >>> 8;
          },
              wbits16 = function wbits16(d, p, v) {
            v <<= 7 & p;
            var o = p / 8 | 0;
            d[o] |= v, d[o + 1] |= v >>> 8, d[o + 2] |= v >>> 16;
          },
              hTree = function hTree(d, mb) {
            for (var t = [], i = 0; i < d.length; ++i) {
              d[i] && t.push({
                s: i,
                f: d[i]
              });
            }

            var s = t.length,
                t2 = _sliceInstanceProperty(t).call(t);

            if (!s) return [et, 0];

            if (1 == s) {
              var v = new u8(t[0].s + 1);
              return v[t[0].s] = 1, [v, 1];
            }

            _sortInstanceProperty(t).call(t, function (a, b) {
              return a.f - b.f;
            }), t.push({
              s: -1,
              f: 25001
            });
            var l = t[0],
                r = t[1],
                i0 = 0,
                i1 = 1,
                i2 = 2;

            for (t[0] = {
              s: -1,
              f: l.f + r.f,
              l: l,
              r: r
            }; i1 != s - 1;) {
              l = t[t[i0].f < t[i2].f ? i0++ : i2++], r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++], t[i1++] = {
                s: -1,
                f: l.f + r.f,
                l: l,
                r: r
              };
            }

            var maxSym = t2[0].s;

            for (i = 1; i < s; ++i) {
              t2[i].s > maxSym && (maxSym = t2[i].s);
            }

            var tr = new u16(maxSym + 1),
                mbt = ln(t[i1 - 1], tr, 0);

            if (mbt > mb) {
              i = 0;
              var dt = 0,
                  lft = mbt - mb,
                  cst = 1 << lft;

              for (_sortInstanceProperty(t2).call(t2, function (a, b) {
                return tr[b.s] - tr[a.s] || a.f - b.f;
              }); i < s; ++i) {
                var i2_1 = t2[i].s;
                if (!(tr[i2_1] > mb)) break;
                dt += cst - (1 << mbt - tr[i2_1]), tr[i2_1] = mb;
              }

              for (dt >>>= lft; dt > 0;) {
                var i2_2 = t2[i].s;
                tr[i2_2] < mb ? dt -= 1 << mb - tr[i2_2]++ - 1 : ++i;
              }

              for (; i >= 0 && dt; --i) {
                var i2_3 = t2[i].s;
                tr[i2_3] == mb && (--tr[i2_3], ++dt);
              }

              mbt = mb;
            }

            return [new u8(tr), mbt];
          },
              ln = function ln(n, l, d) {
            return -1 == n.s ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
          },
              lc = function lc(c) {
            for (var s = c.length; s && !c[--s];) {}

            for (var cl = new u16(++s), cli = 0, cln = c[0], cls = 1, w = function w(v) {
              cl[cli++] = v;
            }, i = 1; i <= s; ++i) {
              if (c[i] == cln && i != s) ++cls;else {
                if (!cln && cls > 2) {
                  for (; cls > 138; cls -= 138) {
                    w(32754);
                  }

                  cls > 2 && (w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305), cls = 0);
                } else if (cls > 3) {
                  for (w(cln), --cls; cls > 6; cls -= 6) {
                    w(8304);
                  }

                  cls > 2 && (w(cls - 3 << 5 | 8208), cls = 0);
                }

                for (; cls--;) {
                  w(cln);
                }

                cls = 1, cln = c[i];
              }
            }

            return [cl.subarray(0, cli), s];
          },
              clen = function clen(cf, cl) {
            for (var l = 0, i = 0; i < cl.length; ++i) {
              l += cf[i] * cl[i];
            }

            return l;
          },
              wfblk = function wfblk(out, pos, dat) {
            var s = dat.length,
                o = shft(pos + 2);
            out[o] = 255 & s, out[o + 1] = s >>> 8, out[o + 2] = 255 ^ out[o], out[o + 3] = 255 ^ out[o + 1];

            for (var i = 0; i < s; ++i) {
              out[o + i + 4] = dat[i];
            }

            return 8 * (o + 4 + s);
          },
              wblk = function wblk(dat, out, _final, syms, lf, df, eb, li, bs, bl, p) {
            wbits(out, p++, _final), ++lf[256];

            for (var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1], _b = hTree(df, 15), ddt = _b[0], mdb = _b[1], _c = lc(dlt), lclt = _c[0], nlc = _c[1], _d = lc(ddt), lcdt = _d[0], ndc = _d[1], lcfreq = new u16(19), i = 0; i < lclt.length; ++i) {
              lcfreq[31 & lclt[i]]++;
            }

            for (i = 0; i < lcdt.length; ++i) {
              lcfreq[31 & lcdt[i]]++;
            }

            for (var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1], nlcc = 19; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc) {}

            var lm,
                ll,
                dm,
                dl,
                flen = bl + 5 << 3,
                ftlen = clen(lf, flt) + clen(df, fdt) + eb,
                dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
            if (flen <= ftlen && flen <= dtlen) return wfblk(out, p, dat.subarray(bs, bs + bl));

            if (wbits(out, p, 1 + (dtlen < ftlen)), p += 2, dtlen < ftlen) {
              lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
              var llm = hMap(lct, mlcb, 0);
              wbits(out, p, nlc - 257), wbits(out, p + 5, ndc - 1), wbits(out, p + 10, nlcc - 4), p += 14;

              for (i = 0; i < nlcc; ++i) {
                wbits(out, p + 3 * i, lct[clim[i]]);
              }

              p += 3 * nlcc;

              for (var lcts = [lclt, lcdt], it = 0; it < 2; ++it) {
                var clct = lcts[it];

                for (i = 0; i < clct.length; ++i) {
                  var len = 31 & clct[i];
                  wbits(out, p, llm[len]), p += lct[len], len > 15 && (wbits(out, p, clct[i] >>> 5 & 127), p += clct[i] >>> 12);
                }
              }
            } else lm = flm, ll = flt, dm = fdm, dl = fdt;

            for (i = 0; i < li; ++i) {
              if (syms[i] > 255) {
                len = syms[i] >>> 18 & 31;
                wbits16(out, p, lm[len + 257]), p += ll[len + 257], len > 7 && (wbits(out, p, syms[i] >>> 23 & 31), p += fleb[len]);
                var dst = 31 & syms[i];
                wbits16(out, p, dm[dst]), p += dl[dst], dst > 3 && (wbits16(out, p, syms[i] >>> 5 & 8191), p += fdeb[dst]);
              } else wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
            }

            return wbits16(out, p, lm[256]), p + ll[256];
          },
              deo = new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]),
              et = new u8(0),
              dflt = function dflt(dat, lvl, plvl, pre, post, lst) {
            var s = dat.length,
                o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post),
                w = o.subarray(pre, o.length - post),
                pos = 0;
            if (!lvl || s < 8) for (var i = 0; i <= s; i += 65535) {
              var e = i + 65535;
              e < s ? pos = wfblk(w, pos, dat.subarray(i, e)) : (w[i] = lst, pos = wfblk(w, pos, dat.subarray(i, s)));
            } else {
              for (var opt = deo[lvl - 1], n = opt >>> 13, c = 8191 & opt, msk_1 = (1 << plvl) - 1, prev = new u16(32768), head = new u16(msk_1 + 1), bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1, hsh = function hsh(i) {
                return (dat[i] ^ dat[i + 1] << bs1_1 ^ dat[i + 2] << bs2_1) & msk_1;
              }, syms = new u32(25e3), lf = new u16(288), df = new u16(32), lc_1 = 0, eb = 0, li = (i = 0, 0), wi = 0, bs = 0; i < s; ++i) {
                var hv = hsh(i),
                    imod = 32767 & i,
                    pimod = head[hv];

                if (prev[imod] = pimod, head[hv] = imod, wi <= i) {
                  var rem = s - i;

                  if ((lc_1 > 7e3 || li > 24576) && rem > 423) {
                    pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos), li = lc_1 = eb = 0, bs = i;

                    for (var j = 0; j < 286; ++j) {
                      lf[j] = 0;
                    }

                    for (j = 0; j < 30; ++j) {
                      df[j] = 0;
                    }
                  }

                  var l = 2,
                      d = 0,
                      ch_1 = c,
                      dif = imod - pimod & 32767;
                  if (rem > 2 && hv == hsh(i - dif)) for (var maxn = Math.min(n, rem) - 1, maxd = Math.min(32767, i), ml = Math.min(258, rem); dif <= maxd && --ch_1 && imod != pimod;) {
                    if (dat[i + l] == dat[i + l - dif]) {
                      for (var nl = 0; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl) {}

                      if (nl > l) {
                        if (l = nl, d = dif, nl > maxn) break;
                        var mmd = Math.min(dif, nl - 2),
                            md = 0;

                        for (j = 0; j < mmd; ++j) {
                          var ti = i - dif + j + 32768 & 32767,
                              cd = ti - prev[ti] + 32768 & 32767;
                          cd > md && (md = cd, pimod = ti);
                        }
                      }
                    }

                    dif += (imod = pimod) - (pimod = prev[imod]) + 32768 & 32767;
                  }

                  if (d) {
                    syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
                    var lin = 31 & revfl[l],
                        din = 31 & revfd[d];
                    eb += fleb[lin] + fdeb[din], ++lf[257 + lin], ++df[din], wi = i + l, ++lc_1;
                  } else syms[li++] = dat[i], ++lf[dat[i]];
                }
              }

              pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos), !lst && 7 & pos && (pos = wfblk(w, pos + 1, et));
            }
            return function (v, s, e) {
              (null == s || s < 0) && (s = 0), (null == e || e > v.length) && (e = v.length);
              var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
              return n.set(v.subarray(s, e)), n;
            }(o, 0, pre + shft(pos) + post);
          },
              crct = function () {
            for (var t = new Int32Array(256), i = 0; i < 256; ++i) {
              for (var c = i, k = 9; --k;) {
                c = (1 & c && -306674912) ^ c >>> 1;
              }

              t[i] = c;
            }

            return t;
          }(),
              wbytes = function wbytes(d, b, v) {
            for (; v; ++b) {
              d[b] = v, v >>>= 8;
            }
          };

          var td = "undefined" != typeof TextDecoder && new TextDecoder();

          try {
            td.decode(et, {
              stream: !0
            }), 1;
          } catch (e) {}

          var long_1 = Long,
              wasm = null;

          try {
            wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
          } catch (e) {}

          function Long(low, high, unsigned) {
            this.low = 0 | low, this.high = 0 | high, this.unsigned = !!unsigned;
          }

          function isLong(obj) {
            return !0 === (obj && obj.__isLong__);
          }

          Long.prototype.__isLong__, Object.defineProperty(Long.prototype, "__isLong__", {
            value: !0
          }), Long.isLong = isLong;
          var INT_CACHE = {},
              UINT_CACHE = {};

          function fromInt(value, unsigned) {
            var obj, cachedObj, cache;
            return unsigned ? (cache = 0 <= (value >>>= 0) && value < 256) && (cachedObj = UINT_CACHE[value]) ? cachedObj : (obj = fromBits(value, (0 | value) < 0 ? -1 : 0, !0), cache && (UINT_CACHE[value] = obj), obj) : (cache = -128 <= (value |= 0) && value < 128) && (cachedObj = INT_CACHE[value]) ? cachedObj : (obj = fromBits(value, value < 0 ? -1 : 0, !1), cache && (INT_CACHE[value] = obj), obj);
          }

          function fromNumber(value, unsigned) {
            if (isNaN(value)) return unsigned ? UZERO : ZERO;

            if (unsigned) {
              if (value < 0) return UZERO;
              if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
            } else {
              if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
              if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
            }

            return value < 0 ? fromNumber(-value, unsigned).neg() : fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
          }

          function fromBits(lowBits, highBits, unsigned) {
            return new Long(lowBits, highBits, unsigned);
          }

          Long.fromInt = fromInt, Long.fromNumber = fromNumber, Long.fromBits = fromBits;
          var pow_dbl = Math.pow;

          function fromString(str, unsigned, radix) {
            if (0 === str.length) throw Error("empty string");
            if ("NaN" === str || "Infinity" === str || "+Infinity" === str || "-Infinity" === str) return ZERO;
            if ("number" == typeof unsigned ? (radix = unsigned, unsigned = !1) : unsigned = !!unsigned, (radix = radix || 10) < 2 || 36 < radix) throw RangeError("radix");
            var p;
            if ((p = _indexOfInstanceProperty(str).call(str, "-")) > 0) throw Error("interior hyphen");
            if (0 === p) return fromString(str.substring(1), unsigned, radix).neg();

            for (var radixToPower = fromNumber(pow_dbl(radix, 8)), result = ZERO, i = 0; i < str.length; i += 8) {
              var size = Math.min(8, str.length - i),
                  value = _parseInt(str.substring(i, i + size), radix);

              if (size < 8) {
                var power = fromNumber(pow_dbl(radix, size));
                result = result.mul(power).add(fromNumber(value));
              } else result = (result = result.mul(radixToPower)).add(fromNumber(value));
            }

            return result.unsigned = unsigned, result;
          }

          function fromValue(val, unsigned) {
            return "number" == typeof val ? fromNumber(val, unsigned) : "string" == typeof val ? fromString(val, unsigned) : fromBits(val.low, val.high, "boolean" == typeof unsigned ? unsigned : val.unsigned);
          }

          Long.fromString = fromString, Long.fromValue = fromValue;
          var TWO_PWR_32_DBL = 4294967296,
              TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL,
              TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2,
              TWO_PWR_24 = fromInt(1 << 24),
              ZERO = fromInt(0);
          Long.ZERO = ZERO;
          var UZERO = fromInt(0, !0);
          Long.UZERO = UZERO;
          var ONE = fromInt(1);
          Long.ONE = ONE;
          var UONE = fromInt(1, !0);
          Long.UONE = UONE;
          var NEG_ONE = fromInt(-1);
          Long.NEG_ONE = NEG_ONE;
          var MAX_VALUE = fromBits(-1, 2147483647, !1);
          Long.MAX_VALUE = MAX_VALUE;
          var MAX_UNSIGNED_VALUE = fromBits(-1, -1, !0);
          Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
          var MIN_VALUE = fromBits(0, -2147483648, !1);
          Long.MIN_VALUE = MIN_VALUE;
          var LongPrototype = Long.prototype;
          LongPrototype.toInt = function () {
            return this.unsigned ? this.low >>> 0 : this.low;
          }, LongPrototype.toNumber = function () {
            return this.unsigned ? (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0) : this.high * TWO_PWR_32_DBL + (this.low >>> 0);
          }, LongPrototype.toString = function (radix) {
            if ((radix = radix || 10) < 2 || 36 < radix) throw RangeError("radix");
            if (this.isZero()) return "0";

            if (this.isNegative()) {
              if (this.eq(MIN_VALUE)) {
                var radixLong = fromNumber(radix),
                    div = this.div(radixLong),
                    rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
              }

              return "-" + this.neg().toString(radix);
            }

            for (var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this, result = "";;) {
              var remDiv = rem.div(radixToPower),
                  digits = (rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0).toString(radix);
              if ((rem = remDiv).isZero()) return digits + result;

              for (; digits.length < 6;) {
                digits = "0" + digits;
              }

              result = "" + digits + result;
            }
          }, LongPrototype.getHighBits = function () {
            return this.high;
          }, LongPrototype.getHighBitsUnsigned = function () {
            return this.high >>> 0;
          }, LongPrototype.getLowBits = function () {
            return this.low;
          }, LongPrototype.getLowBitsUnsigned = function () {
            return this.low >>> 0;
          }, LongPrototype.getNumBitsAbs = function () {
            if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();

            for (var val = 0 != this.high ? this.high : this.low, bit = 31; bit > 0 && 0 == (val & 1 << bit); bit--) {}

            return 0 != this.high ? bit + 33 : bit + 1;
          }, LongPrototype.isZero = function () {
            return 0 === this.high && 0 === this.low;
          }, LongPrototype.eqz = LongPrototype.isZero, LongPrototype.isNegative = function () {
            return !this.unsigned && this.high < 0;
          }, LongPrototype.isPositive = function () {
            return this.unsigned || this.high >= 0;
          }, LongPrototype.isOdd = function () {
            return 1 == (1 & this.low);
          }, LongPrototype.isEven = function () {
            return 0 == (1 & this.low);
          }, LongPrototype.equals = function (other) {
            return isLong(other) || (other = fromValue(other)), (this.unsigned === other.unsigned || this.high >>> 31 != 1 || other.high >>> 31 != 1) && this.high === other.high && this.low === other.low;
          }, LongPrototype.eq = LongPrototype.equals, LongPrototype.notEquals = function (other) {
            return !this.eq(other);
          }, LongPrototype.neq = LongPrototype.notEquals, LongPrototype.ne = LongPrototype.notEquals, LongPrototype.lessThan = function (other) {
            return this.comp(other) < 0;
          }, LongPrototype.lt = LongPrototype.lessThan, LongPrototype.lessThanOrEqual = function (other) {
            return this.comp(other) <= 0;
          }, LongPrototype.lte = LongPrototype.lessThanOrEqual, LongPrototype.le = LongPrototype.lessThanOrEqual, LongPrototype.greaterThan = function (other) {
            return this.comp(other) > 0;
          }, LongPrototype.gt = LongPrototype.greaterThan, LongPrototype.greaterThanOrEqual = function (other) {
            return this.comp(other) >= 0;
          }, LongPrototype.gte = LongPrototype.greaterThanOrEqual, LongPrototype.ge = LongPrototype.greaterThanOrEqual, LongPrototype.compare = function (other) {
            if (isLong(other) || (other = fromValue(other)), this.eq(other)) return 0;
            var thisNeg = this.isNegative(),
                otherNeg = other.isNegative();
            return thisNeg && !otherNeg ? -1 : !thisNeg && otherNeg ? 1 : this.unsigned ? other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(other).isNegative() ? -1 : 1;
          }, LongPrototype.comp = LongPrototype.compare, LongPrototype.negate = function () {
            return !this.unsigned && this.eq(MIN_VALUE) ? MIN_VALUE : this.not().add(ONE);
          }, LongPrototype.neg = LongPrototype.negate, LongPrototype.add = function (addend) {
            isLong(addend) || (addend = fromValue(addend));
            var a48 = this.high >>> 16,
                a32 = 65535 & this.high,
                a16 = this.low >>> 16,
                a00 = 65535 & this.low,
                b48 = addend.high >>> 16,
                b32 = 65535 & addend.high,
                b16 = addend.low >>> 16,
                c48 = 0,
                c32 = 0,
                c16 = 0,
                c00 = 0;
            return c16 += (c00 += a00 + (65535 & addend.low)) >>> 16, c32 += (c16 += a16 + b16) >>> 16, c48 += (c32 += a32 + b32) >>> 16, c48 += a48 + b48, fromBits((c16 &= 65535) << 16 | (c00 &= 65535), (c48 &= 65535) << 16 | (c32 &= 65535), this.unsigned);
          }, LongPrototype.subtract = function (subtrahend) {
            return isLong(subtrahend) || (subtrahend = fromValue(subtrahend)), this.add(subtrahend.neg());
          }, LongPrototype.sub = LongPrototype.subtract, LongPrototype.multiply = function (multiplier) {
            if (this.isZero()) return ZERO;
            if (isLong(multiplier) || (multiplier = fromValue(multiplier)), wasm) return fromBits(wasm.mul(this.low, this.high, multiplier.low, multiplier.high), wasm.get_high(), this.unsigned);
            if (multiplier.isZero()) return ZERO;
            if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
            if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
            if (this.isNegative()) return multiplier.isNegative() ? this.neg().mul(multiplier.neg()) : this.neg().mul(multiplier).neg();
            if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
            if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
            var a48 = this.high >>> 16,
                a32 = 65535 & this.high,
                a16 = this.low >>> 16,
                a00 = 65535 & this.low,
                b48 = multiplier.high >>> 16,
                b32 = 65535 & multiplier.high,
                b16 = multiplier.low >>> 16,
                b00 = 65535 & multiplier.low,
                c48 = 0,
                c32 = 0,
                c16 = 0,
                c00 = 0;
            return c16 += (c00 += a00 * b00) >>> 16, c32 += (c16 += a16 * b00) >>> 16, c16 &= 65535, c32 += (c16 += a00 * b16) >>> 16, c48 += (c32 += a32 * b00) >>> 16, c32 &= 65535, c48 += (c32 += a16 * b16) >>> 16, c32 &= 65535, c48 += (c32 += a00 * b32) >>> 16, c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48, fromBits((c16 &= 65535) << 16 | (c00 &= 65535), (c48 &= 65535) << 16 | (c32 &= 65535), this.unsigned);
          }, LongPrototype.mul = LongPrototype.multiply, LongPrototype.divide = function (divisor) {
            if (isLong(divisor) || (divisor = fromValue(divisor)), divisor.isZero()) throw Error("division by zero");
            var approx, rem, res;
            if (wasm) return this.unsigned || -2147483648 !== this.high || -1 !== divisor.low || -1 !== divisor.high ? fromBits((this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, divisor.low, divisor.high), wasm.get_high(), this.unsigned) : this;
            if (this.isZero()) return this.unsigned ? UZERO : ZERO;

            if (this.unsigned) {
              if (divisor.unsigned || (divisor = divisor.toUnsigned()), divisor.gt(this)) return UZERO;
              if (divisor.gt(this.shru(1))) return UONE;
              res = UZERO;
            } else {
              if (this.eq(MIN_VALUE)) return divisor.eq(ONE) || divisor.eq(NEG_ONE) ? MIN_VALUE : divisor.eq(MIN_VALUE) ? ONE : (approx = this.shr(1).div(divisor).shl(1)).eq(ZERO) ? divisor.isNegative() ? ONE : NEG_ONE : (rem = this.sub(divisor.mul(approx)), res = approx.add(rem.div(divisor)));
              if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
              if (this.isNegative()) return divisor.isNegative() ? this.neg().div(divisor.neg()) : this.neg().div(divisor).neg();
              if (divisor.isNegative()) return this.div(divisor.neg()).neg();
              res = ZERO;
            }

            for (rem = this; rem.gte(divisor);) {
              approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

              for (var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor); approxRem.isNegative() || approxRem.gt(rem);) {
                approxRem = (approxRes = fromNumber(approx -= delta, this.unsigned)).mul(divisor);
              }

              approxRes.isZero() && (approxRes = ONE), res = res.add(approxRes), rem = rem.sub(approxRem);
            }

            return res;
          }, LongPrototype.div = LongPrototype.divide, LongPrototype.modulo = function (divisor) {
            return isLong(divisor) || (divisor = fromValue(divisor)), wasm ? fromBits((this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, divisor.low, divisor.high), wasm.get_high(), this.unsigned) : this.sub(this.div(divisor).mul(divisor));
          }, LongPrototype.mod = LongPrototype.modulo, LongPrototype.rem = LongPrototype.modulo, LongPrototype.not = function () {
            return fromBits(~this.low, ~this.high, this.unsigned);
          }, LongPrototype.and = function (other) {
            return isLong(other) || (other = fromValue(other)), fromBits(this.low & other.low, this.high & other.high, this.unsigned);
          }, LongPrototype.or = function (other) {
            return isLong(other) || (other = fromValue(other)), fromBits(this.low | other.low, this.high | other.high, this.unsigned);
          }, LongPrototype.xor = function (other) {
            return isLong(other) || (other = fromValue(other)), fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
          }, LongPrototype.shiftLeft = function (numBits) {
            return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned) : fromBits(0, this.low << numBits - 32, this.unsigned);
          }, LongPrototype.shl = LongPrototype.shiftLeft, LongPrototype.shiftRight = function (numBits) {
            return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned) : fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
          }, LongPrototype.shr = LongPrototype.shiftRight, LongPrototype.shiftRightUnsigned = function (numBits) {
            return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >>> numBits, this.unsigned) : fromBits(32 === numBits ? this.high : this.high >>> numBits - 32, 0, this.unsigned);
          }, LongPrototype.shru = LongPrototype.shiftRightUnsigned, LongPrototype.shr_u = LongPrototype.shiftRightUnsigned, LongPrototype.rotateLeft = function (numBits) {
            var b;
            return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : 32 === numBits ? fromBits(this.high, this.low, this.unsigned) : numBits < 32 ? (b = 32 - numBits, fromBits(this.low << numBits | this.high >>> b, this.high << numBits | this.low >>> b, this.unsigned)) : (b = 32 - (numBits -= 32), fromBits(this.high << numBits | this.low >>> b, this.low << numBits | this.high >>> b, this.unsigned));
          }, LongPrototype.rotl = LongPrototype.rotateLeft, LongPrototype.rotateRight = function (numBits) {
            var b;
            return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : 32 === numBits ? fromBits(this.high, this.low, this.unsigned) : numBits < 32 ? (b = 32 - numBits, fromBits(this.high << b | this.low >>> numBits, this.low << b | this.high >>> numBits, this.unsigned)) : (b = 32 - (numBits -= 32), fromBits(this.low << b | this.high >>> numBits, this.high << b | this.low >>> numBits, this.unsigned));
          }, LongPrototype.rotr = LongPrototype.rotateRight, LongPrototype.toSigned = function () {
            return this.unsigned ? fromBits(this.low, this.high, !1) : this;
          }, LongPrototype.toUnsigned = function () {
            return this.unsigned ? this : fromBits(this.low, this.high, !0);
          }, LongPrototype.toBytes = function (le) {
            return le ? this.toBytesLE() : this.toBytesBE();
          }, LongPrototype.toBytesLE = function () {
            var hi = this.high,
                lo = this.low;
            return [255 & lo, lo >>> 8 & 255, lo >>> 16 & 255, lo >>> 24, 255 & hi, hi >>> 8 & 255, hi >>> 16 & 255, hi >>> 24];
          }, LongPrototype.toBytesBE = function () {
            var hi = this.high,
                lo = this.low;
            return [hi >>> 24, hi >>> 16 & 255, hi >>> 8 & 255, 255 & hi, lo >>> 24, lo >>> 16 & 255, lo >>> 8 & 255, 255 & lo];
          }, Long.fromBytes = function (bytes, unsigned, le) {
            return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
          }, Long.fromBytesLE = function (bytes, unsigned) {
            return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
          }, Long.fromBytesBE = function (bytes, unsigned) {
            return new Long(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
          };

          var gzipSync$1 = function gzipSync$1(data, opts) {
            opts || (opts = {});

            var c = function () {
              var c = -1;
              return {
                p: function p(d) {
                  for (var cr = c, i = 0; i < d.length; ++i) {
                    cr = crct[255 & cr ^ d[i]] ^ cr >>> 8;
                  }

                  c = cr;
                },
                d: function d() {
                  return ~c;
                }
              };
            }(),
                l = data.length;

            c.p(data);
            var dat,
                opt,
                pre,
                post,
                st,
                o,
                d = (dat = data, opt = opts, pre = 10 + ((o = opts).filename && o.filename.length + 1 || 0), post = 8, dflt(dat, null == opt.level ? 6 : opt.level, null == opt.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(dat.length)))) : 12 + opt.mem, pre, post, !st)),
                s = d.length;
            return function (c, o) {
              var fn = o.filename;

              if (c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : 9 == o.level ? 2 : 0, c[9] = 3, 0 != o.mtime && wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1e3)), fn) {
                c[3] = 8;

                for (var i = 0; i <= fn.length; ++i) {
                  c[i + 10] = fn.charCodeAt(i);
                }
              }
            }(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
          };

          function compareVersion(version1, version2) {
            for (var arr1 = version1.split("."), arr2 = version2.split("."), len1 = arr1.length, len2 = arr2.length, minLength = Math.min(len1, len2), i = 0; i < minLength; i++) {
              var diff = _parseInt(arr1[i], 10) - _parseInt(arr2[i], 10);

              if (0 !== diff) return diff;
            }

            return len1 < len2 ? -1 : len1 > len2 ? 1 : 0;
          }

          function getEnv(options) {
            void 0 === options && (options = {});

            var prefix = function (isTestOrEnv, options) {
              void 0 === options && (options = {});
              var prefix = "";
              if ("boolean" == typeof isTestOrEnv) prefix = isTestOrEnv ? "test" : "";else if ("string" == typeof isTestOrEnv) prefix = "prod" === isTestOrEnv ? "" : isTestOrEnv;else {
                var host = options.host || ("undefined" != typeof location ? location.host : "");
                /^uat[-.]/.test(host) ? prefix = "uat" : (/^test[-.]/.test(host) || _startsWithInstanceProperty(host).call(host, "localhost") || /^\d+(\.\d+){3}/.test(host)) && (prefix = "test");
              }
              options.enableUat || "uat" !== prefix || (prefix = "");
              return prefix + (prefix ? "-" : "");
            }(null, _assign({
              enableUat: !0
            }, options));

            return {
              name: prefix.replace("-", "") || "prod",
              prefix: prefix,
              isTest: "test-" === prefix,
              isUat: "uat-" === prefix,
              isProd: "" === prefix
            };
          }

          function createLong(value) {
            return long_1.fromString(value);
          }

          function isPlainObject(obj) {
            return "object" == _typeof(obj) && null !== obj;
          }

          function getUrlKey(name, url) {
            var result = new RegExp("[?|&]" + name + "=([^&;]+?)(&|#|;|$)").exec(url || location.href);
            return decodeURIComponent((result || ["", ""])[1].replace(/\+/g, "%20"));
          }

          var isLocal = function isLocal() {
            var _context;

            return _startsWithInstanceProperty(_context = location.host).call(_context, "localhost") || /^\d+(\.\d+){3}/.test(location.host) || "1" === getUrlKey("local");
          },
              index = {
            compareVersion: compareVersion,
            Env: getEnv(),
            createLong: createLong,
            longToString: function longToString(value) {
              var low = value.low,
                  high = value.high,
                  unsigned = value.unsigned;
              return new long_1(low, high, unsigned).toString();
            },
            equalLong: function equalLong(a, b) {
              return a && b && a.high === b.high && a.low === b.low && a.unsigned === b.unsigned;
            },
            second2hms: function second2hms(time, formatString) {
              var fix = function fix(n) {
                return n.toString().length > 1 ? n.toString() : 0 + n.toString();
              };

              if (time > 86400 && null == formatString) {
                var t = time % 86400;
                return t = Math.floor(t / 3600), Math.floor(time / 86400) + "天" + t + "小时";
              }

              var h = Math.floor(time / 3600),
                  m = Math.floor((time - 3600 * h) / 60),
                  s = time % 60,
                  str = formatString || "HH:mm:ss";
              return "HH:mm" == str && time < 60 && (str = "ss"), "sss" == str ? (str = str.replace("ss", s.toString())) + ("ss" == str ? "s" : "") : (str = (str = (str = str.replace("HH", fix(h))).replace("mm", fix(m))).replace("ss", fix(s))) + ("ss" == str ? "s" : "");
            },
            isPlainObject: isPlainObject,
            getUrlKey: getUrlKey,
            isLocal: isLocal,
            isLowAgent: function isLowAgent() {
              var agent = window.navigator.userAgent;

              if (/Android/i.test(agent)) {
                return compareVersion(agent.match(/Android ((\d+)\.(\d+)\.?(\d+)?)/)[1], "6.0.0") < 0;
              }

              return !1;
            }
          },
              _assign$ = function __assign$1() {
            return (_assign$ = _Object$assign || function (t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                for (var p in s = arguments[i]) {
                  Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
                }
              }

              return t;
            }).apply(this, arguments);
          },
              bundleConfig = {
            "com.yitan.lite": {
              appId: 10,
              platform: 6,
              productId: 130
            },
            "com.yitan.bixin": {
              appId: 10,
              platform: 1,
              productId: 100
            },
            "com.yitantech.gaigai": {
              appId: 10,
              platform: 2,
              productId: 100
            },
            "com.yitantech.gaigaienter": {
              appId: 10,
              platform: 1,
              productId: 110
            },
            "com.yitan.chuke": {
              appId: 10,
              platform: 1,
              productId: 120
            },
            "com.yitantech.chuke": {
              appId: 10,
              platform: 2,
              productId: 120
            },
            "com.yupp.yuer": {
              appId: 20,
              platform: 1,
              productId: 200
            },
            "com.yupaopao.yuer": {
              appId: 20,
              platform: 2,
              productId: 200
            },
            "com.wywk.yupaopao": {
              appId: 20,
              platform: 1,
              productId: 210
            },
            "cn.yupaopao.crop": {
              appId: 10,
              platform: 3,
              productId: 110
            },
            "php-activity": {
              appId: 20,
              platform: 5,
              productId: 200
            },
            "com.yangle.xiaoxingqiu": {
              appId: 30,
              platform: 2,
              productId: 300
            },
            "com.yitan.universe": {
              appId: 30,
              platform: 5,
              productId: 300
            },
            "com.yangle.xiaoyuzhou": {
              appId: 30,
              platform: 2,
              productId: 300
            },
            "com.yitantech.yuerent": {
              appId: 20,
              platform: 1,
              productId: 240
            },
            "pc.yupaopao.yuer": {
              appId: 20,
              platform: 3,
              productId: 250
            },
            "pc.yupaopao.bixin": {
              appId: 10,
              platform: 3,
              productId: 150
            },
            "com.yangle.xiaoxingqiuent": {
              appId: 30,
              platform: 2,
              productId: 300
            },
            "node.yupaopao.yuer": {
              appId: 20,
              platform: 7,
              productId: 240
            },
            "node.yupaopao.bixin": {
              appId: 10,
              platform: 7,
              productId: 140
            },
            "php.yupaopao.yuer": {
              appId: 20,
              platform: 7,
              productId: 260
            },
            "php.yupaopao.bixin": {
              appId: 10,
              platform: 7,
              productId: 160
            },
            "pc.yangle.xiaoxingqiu": {
              appId: 30,
              platform: 3,
              productId: 350
            },
            "node.xiaoxingqiu.union": {
              appId: 30,
              platform: 7,
              productId: 340
            },
            "node.yuer.home": {
              appId: 20,
              platform: 7,
              productId: 240
            },
            "node.bixin.home": {
              appId: 10,
              platform: 7,
              productId: 140
            },
            "node.bixin.h5": {
              appId: 10,
              platform: 7,
              productId: 140
            },
            "node.yuer.h5": {
              appId: 20,
              platform: 7,
              productId: 240
            },
            "node.xiaoxingqiu.h5": {
              appId: 30,
              platform: 7,
              productId: 340
            },
            "com.universe.helper": {
              appId: 30,
              platform: 2,
              productId: 370
            },
            "com.yitantech.yrlivehelper": {
              appId: 30,
              platform: 1,
              productId: 370
            },
            "com.yitantech.livehelper": {
              appId: 30,
              platform: 1,
              productId: 370
            },
            "com.yitan.tangguo": {
              appId: 80,
              platform: 1,
              productId: 800
            },
            "com.yitan.tangguoTest": {
              appId: 80,
              platform: 1,
              productId: 810
            },
            "node.tangguo.h5": {
              appId: 80,
              platform: 7,
              productId: 820
            }
          },
              R_YPP = /^(.*?)bridge\/([\d\.]+) \((.*?)\)/,
              R_IOS = /(iPhone|iPad|iPod|iOS)/i,
              R_ANDROID = /android/i,
              R_OTHER_MOBILE = /BlackBerry|Opera Mini|IEMobile/i,
              R_WECHAT = /MicroMessenger/i,
              R_WEIBO = /(\bWeibo\b|WeiboIntlAndroid|WeiboIntliOS)/i,
              R_ALIPAY = /Alipay/;

          function _parse(arr, field) {
            var _context2;

            return _reduceInstanceProperty(_context2 = _trimInstanceProperty(field).call(field).split(/\s*;\s*/)).call(_context2, function (res, key, i) {
              var value = arr[i];

              if (null != value) {
                if ("bundle" === key) {
                  var parts = value.split(" ");
                  value = {
                    id: parts[0],
                    version: parts[1]
                  };
                } else if ("appInfo" === key) {
                  var parts_1 = value.split(" "),
                      toInt = function toInt(index) {
                    return _parseInt(parts_1[index], 10);
                  };

                  value = {
                    statusHeight: toInt(0),
                    navbarHeight: toInt(1),
                    width: toInt(2),
                    height: toInt(3)
                  };
                }

                res[key] = value;
              }

              return res;
            }, {});
          }

          if ("undefined" == typeof navigator) throw new Error("@fe/user-agent 需要 navigator.userAgent 来解析");

          var _a$1 = function (ua) {
            var originUa = ua,
                yppAppName = null,
                ypp = null;
            R_YPP.test(ua) && (ua = RegExp.$1, yppAppName = function (bundleId, isPc) {
              if (370 === function (bundleId) {
                return bundleConfig[bundleId].productId;
              }(bundleId)) return "yrlivehelper";

              var inc = function inc(part) {
                return function (str, part) {
                  return _indexOfInstanceProperty(str).call(str, part) >= 0;
                }(bundleId, part);
              },
                  app = null;

              inc("bixin") ? app = "bixin" : inc("yuer") || inc(".wywk.") ? app = "yuer" : inc("xiaoxingqiu") || inc("xiaoyuzhou") || inc("universe") || inc("yrlive") ? app = "xxq" : inc("tangguo") ? app = "tangguo" : (inc(".yitantech.") || inc(".yitan.")) && (app = "bixin");
              return isPc ? "xxq" === app ? "pc-live" : "pc-chatroom" : app;
            }((ypp = function (version, detailArray) {
              var detail;
              detail = _parseInt(version[0], 10) >= 3 ? function (detailArray) {
                return _parse(detailArray, "bundle; accessToken; udid; network; equipment; osInfo; channel; appInfo");
              }(detailArray) : function (detailArray) {
                return _parse(detailArray, "bundle; token; accessToken; udid; salt; network; equipment; osInfo; channel; appInfo");
              }(detailArray);
              return _assign$(_assign$({}, detail), {
                version: version
              });
            }(RegExp.$2, RegExp.$3.split(";"))).bundle.id, "PC" === ypp.equipment));

            var isYpp = !!yppAppName,
                isYppPC = !!ypp && "PC" === ypp.equipment,
                isYppMC = isYpp && !isYppPC,
                info = _assign$({
              width: 0,
              height: 0
            }, ypp ? ypp.appInfo : {}),
                screenWidth = info.width,
                screenHeight = info.height;

            "undefined" != typeof window && (screenWidth = window.screen.width, screenHeight = window.screen.height);
            var app = {
              ua: originUa,
              name: yppAppName,
              isYppPC: isYppPC,
              isYppMC: isYppMC,
              isYpp: isYpp,
              isBixin: "bixin" === yppAppName,
              isYuer: "yuer" === yppAppName,
              isXxq: "xxq" === yppAppName,
              isYrlive: "xxq" === yppAppName,
              isYrlivehelper: "yrlivehelper" === yppAppName,
              isTangguo: "tangguo" === yppAppName,
              isPcChatroom: "pc-chatroom" === yppAppName,
              isPcLive: "pc-live" === yppAppName,
              isWechat: R_WECHAT.test(ua),
              isWeibo: R_WEIBO.test(ua),
              isAlipay: R_ALIPAY.test(ua),
              isIPhoneX: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua) && screenWidth >= 375 && screenHeight >= 812
            },
                isIOS = R_IOS.test(ua),
                isAndroid = R_ANDROID.test(ua);
            return {
              system: {
                isIOS: isIOS,
                isAndroid: isAndroid,
                isMobile: isIOS || isAndroid || R_OTHER_MOBILE.test(ua)
              },
              app: app,
              ypp: ypp
            };
          }(navigator.userAgent),
              system = _a$1.system,
              app = _a$1.app,
              ypp = _a$1.ypp;

          function createCommonjsModule(fn, module) {
            return fn(module = {
              exports: {}
            }, module.exports), module.exports;
          }

          var dayjs_min = createCommonjsModule(function (module, exports) {
            module.exports = function () {
              var t = "millisecond",
                  e = "second",
                  n = "minute",
                  r = "hour",
                  i = "day",
                  s = "week",
                  u = "month",
                  a = "quarter",
                  o = "year",
                  f = "date",
                  h = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
                  c = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
                  d = {
                name: "en",
                weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
              },
                  $ = function $(t, e, n) {
                var r = String(t);
                return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
              },
                  l = {
                s: $,
                z: function z(t) {
                  var e = -t.utcOffset(),
                      n = Math.abs(e),
                      r = Math.floor(n / 60),
                      i = n % 60;
                  return (e <= 0 ? "+" : "-") + $(r, 2, "0") + ":" + $(i, 2, "0");
                },
                m: function t(e, n) {
                  if (e.date() < n.date()) return -t(n, e);
                  var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
                      i = e.clone().add(r, u),
                      s = n - i < 0,
                      a = e.clone().add(r + (s ? -1 : 1), u);
                  return +(-(r + (n - i) / (s ? i - a : a - i)) || 0);
                },
                a: function a(t) {
                  return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
                },
                p: function p(h) {
                  return {
                    M: u,
                    y: o,
                    w: s,
                    d: i,
                    D: f,
                    h: r,
                    m: n,
                    s: e,
                    ms: t,
                    Q: a
                  }[h] || String(h || "").toLowerCase().replace(/s$/, "");
                },
                u: function u(t) {
                  return void 0 === t;
                }
              },
                  y = "en",
                  M = {};

              M[y] = d;

              var m = function m(t) {
                return t instanceof S;
              },
                  D = function D(t, e, n) {
                var r;
                if (!t) return y;
                if ("string" == typeof t) M[t] && (r = t), e && (M[t] = e, r = t);else {
                  var i = t.name;
                  M[i] = t, r = i;
                }
                return !n && r && (y = r), r || !n && y;
              },
                  v = function v(t, e) {
                if (m(t)) return t.clone();
                var n = "object" == _typeof(e) ? e : {};
                return n.date = t, n.args = arguments, new S(n);
              },
                  g = l;

              g.l = D, g.i = m, g.w = function (t, e) {
                return v(t, {
                  locale: e.$L,
                  utc: e.$u,
                  x: e.$x,
                  $offset: e.$offset
                });
              };

              var S = function () {
                function d(t) {
                  this.$L = D(t.locale, null, !0), this.parse(t);
                }

                var $ = d.prototype;
                return $.parse = function (t) {
                  this.$d = function (t) {
                    var e = t.date,
                        n = t.utc;
                    if (null === e) return new Date(NaN);
                    if (g.u(e)) return new Date();
                    if (e instanceof Date) return new Date(e);

                    if ("string" == typeof e && !/Z$/i.test(e)) {
                      var r = e.match(h);

                      if (r) {
                        var i = r[2] - 1 || 0,
                            s = (r[7] || "0").substring(0, 3);
                        return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
                      }
                    }

                    return new Date(e);
                  }(t), this.$x = t.x || {}, this.init();
                }, $.init = function () {
                  var t = this.$d;
                  this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
                }, $.$utils = function () {
                  return g;
                }, $.isValid = function () {
                  return !("Invalid Date" === this.$d.toString());
                }, $.isSame = function (t, e) {
                  var n = v(t);
                  return this.startOf(e) <= n && n <= this.endOf(e);
                }, $.isAfter = function (t, e) {
                  return v(t) < this.startOf(e);
                }, $.isBefore = function (t, e) {
                  return this.endOf(e) < v(t);
                }, $.$g = function (t, e, n) {
                  return g.u(t) ? this[e] : this.set(n, t);
                }, $.unix = function () {
                  return Math.floor(this.valueOf() / 1e3);
                }, $.valueOf = function () {
                  return this.$d.getTime();
                }, $.startOf = function (t, a) {
                  var h = this,
                      c = !!g.u(a) || a,
                      d = g.p(t),
                      $ = function $(t, e) {
                    var n = g.w(h.$u ? Date.UTC(h.$y, e, t) : new Date(h.$y, e, t), h);
                    return c ? n : n.endOf(i);
                  },
                      l = function l(t, e) {
                    var _context3;

                    return g.w(h.toDate()[t].apply(h.toDate("s"), _sliceInstanceProperty(_context3 = c ? [0, 0, 0, 0] : [23, 59, 59, 999]).call(_context3, e)), h);
                  },
                      y = this.$W,
                      M = this.$M,
                      m = this.$D,
                      D = "set" + (this.$u ? "UTC" : "");

                  switch (d) {
                    case o:
                      return c ? $(1, 0) : $(31, 11);

                    case u:
                      return c ? $(1, M) : $(0, M + 1);

                    case s:
                      var v = this.$locale().weekStart || 0,
                          S = (y < v ? y + 7 : y) - v;
                      return $(c ? m - S : m + (6 - S), M);

                    case i:
                    case f:
                      return l(D + "Hours", 0);

                    case r:
                      return l(D + "Minutes", 1);

                    case n:
                      return l(D + "Seconds", 2);

                    case e:
                      return l(D + "Milliseconds", 3);

                    default:
                      return this.clone();
                  }
                }, $.endOf = function (t) {
                  return this.startOf(t, !1);
                }, $.$set = function (s, a) {
                  var h,
                      c = g.p(s),
                      d = "set" + (this.$u ? "UTC" : ""),
                      $ = (h = {}, h[i] = d + "Date", h[f] = d + "Date", h[u] = d + "Month", h[o] = d + "FullYear", h[r] = d + "Hours", h[n] = d + "Minutes", h[e] = d + "Seconds", h[t] = d + "Milliseconds", h)[c],
                      l = c === i ? this.$D + (a - this.$W) : a;

                  if (c === u || c === o) {
                    var y = this.clone().set(f, 1);
                    y.$d[$](l), y.init(), this.$d = y.set(f, Math.min(this.$D, y.daysInMonth())).$d;
                  } else $ && this.$d[$](l);

                  return this.init(), this;
                }, $.set = function (t, e) {
                  return this.clone().$set(t, e);
                }, $.get = function (t) {
                  return this[g.p(t)]();
                }, $.add = function (t, a) {
                  var f,
                      h = this;
                  t = Number(t);

                  var c = g.p(a),
                      d = function d(e) {
                    var n = v(h);
                    return g.w(n.date(n.date() + Math.round(e * t)), h);
                  };

                  if (c === u) return this.set(u, this.$M + t);
                  if (c === o) return this.set(o, this.$y + t);
                  if (c === i) return d(1);
                  if (c === s) return d(7);
                  var $ = (f = {}, f[n] = 6e4, f[r] = 36e5, f[e] = 1e3, f)[c] || 1,
                      l = this.$d.getTime() + t * $;
                  return g.w(l, this);
                }, $.subtract = function (t, e) {
                  return this.add(-1 * t, e);
                }, $.format = function (t) {
                  var _context4;

                  var e = this;
                  if (!this.isValid()) return "Invalid Date";

                  var n = t || "YYYY-MM-DDTHH:mm:ssZ",
                      r = g.z(this),
                      i = this.$locale(),
                      s = this.$H,
                      u = this.$m,
                      a = this.$M,
                      o = i.weekdays,
                      f = i.months,
                      h = function h(t, r, i, s) {
                    return t && (t[r] || t(e, n)) || i[r].substr(0, s);
                  },
                      d = function d(t) {
                    return g.s(s % 12 || 12, t, "0");
                  },
                      $ = i.meridiem || function (t, e, n) {
                    var r = t < 12 ? "AM" : "PM";
                    return n ? r.toLowerCase() : r;
                  },
                      l = {
                    YY: _sliceInstanceProperty(_context4 = String(this.$y)).call(_context4, -2),
                    YYYY: this.$y,
                    M: a + 1,
                    MM: g.s(a + 1, 2, "0"),
                    MMM: h(i.monthsShort, a, f, 3),
                    MMMM: h(f, a),
                    D: this.$D,
                    DD: g.s(this.$D, 2, "0"),
                    d: String(this.$W),
                    dd: h(i.weekdaysMin, this.$W, o, 2),
                    ddd: h(i.weekdaysShort, this.$W, o, 3),
                    dddd: o[this.$W],
                    H: String(s),
                    HH: g.s(s, 2, "0"),
                    h: d(1),
                    hh: d(2),
                    a: $(s, u, !0),
                    A: $(s, u, !1),
                    m: String(u),
                    mm: g.s(u, 2, "0"),
                    s: String(this.$s),
                    ss: g.s(this.$s, 2, "0"),
                    SSS: g.s(this.$ms, 3, "0"),
                    Z: r
                  };

                  return n.replace(c, function (t, e) {
                    return e || l[t] || r.replace(":", "");
                  });
                }, $.utcOffset = function () {
                  return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                }, $.diff = function (t, f, h) {
                  var c,
                      d = g.p(f),
                      $ = v(t),
                      l = 6e4 * ($.utcOffset() - this.utcOffset()),
                      y = this - $,
                      M = g.m(this, $);
                  return M = (c = {}, c[o] = M / 12, c[u] = M, c[a] = M / 3, c[s] = (y - l) / 6048e5, c[i] = (y - l) / 864e5, c[r] = y / 36e5, c[n] = y / 6e4, c[e] = y / 1e3, c)[d] || y, h ? M : g.a(M);
                }, $.daysInMonth = function () {
                  return this.endOf(u).$D;
                }, $.$locale = function () {
                  return M[this.$L];
                }, $.locale = function (t, e) {
                  if (!t) return this.$L;
                  var n = this.clone(),
                      r = D(t, e, !0);
                  return r && (n.$L = r), n;
                }, $.clone = function () {
                  return g.w(this.$d, this);
                }, $.toDate = function () {
                  return new Date(this.valueOf());
                }, $.toJSON = function () {
                  return this.isValid() ? this.toISOString() : null;
                }, $.toISOString = function () {
                  return this.$d.toISOString();
                }, $.toString = function () {
                  return this.$d.toUTCString();
                }, d;
              }(),
                  p = S.prototype;

              return v.prototype = p, [["$ms", t], ["$s", e], ["$m", n], ["$H", r], ["$W", i], ["$M", u], ["$y", o], ["$D", f]].forEach(function (t) {
                p[t[1]] = function (e) {
                  return this.$g(e, t[0], t[1]);
                };
              }), v.extend = function (t, e) {
                return t.$i || (t(e, S, v), t.$i = !0), v;
              }, v.locale = D, v.isDayjs = m, v.unix = function (t) {
                return v(1e3 * t);
              }, v.en = M[y], v.Ls = M, v.p = {}, v;
            }();
          }),
              Logger = {};

          function contains(arr, item) {
            return _includesInstanceProperty(arr).call(arr, item);
          }

          function isCodeOk(code) {
            return contains([0, 8e3, "8000", "0"], code);
          }

          function resetNativeBridge(target) {
            if (target._reset) return target;
            var MAP = {
              closeWebview: "page_close",
              triggerWebviewError: "page_triggerError",
              closePullEffect: "ui_disableBounces",
              setNavbarType: "ui_setNavbarType",
              setWebviewDisplayType: "ui_setDisplayType",
              enablePullToRefresh: "ui_enablePullToRefresh",
              closeLoading: "ui_refreshComplete",
              setShareOptions: "share_setOptions",
              openSharePicker: "share_openSharePicker",
              getDeviceInfo: "device_getDeviceInfo",
              disableSwipeBack: "ui_disableSwipeBack",
              dispatchEvent: "app_dispatchEvent",
              saveImage: "image_saveToAlbum",
              openAudioMemos: "audio_simpleRecord",
              checkAudioMode: "audio_checkMode",
              getAuthInfo: "audio_checkRecordGranted",
              issueAuthPicker: "audio_acquireRecordAuth",
              isSpecifiedAppInstalled: "app_isAppInstalled",
              openSpecifiedApp: "app_openApp",
              issueCollectRequest: "log_trackEvent"
            },
                uniqueId = 1,
                responseCallbacks = {},
                events = {};
            return target.call = function (action, params, callback, needShell) {
              var message = {
                action: action,
                params: params
              };
              MAP[action] && (message.action = MAP[action]), function (message, callback, needShell) {
                if (callback) {
                  var callbackId = "cb_" + uniqueId++ + "_" + new Date().getTime();
                  responseCallbacks[callbackId] = {
                    callback: callback,
                    needShell: needShell
                  }, message.callbackId = callbackId;
                }
              }(message, callback, needShell);
              var encodeMessageJson = encodeURIComponent(_JSON$stringify(message));
              window.YppJsBridge ? window.YppJsBridge.call(_JSON$stringify(message)) : prompt("bridge://yupaopao.com?message=" + encodeMessageJson, "");
            }, target.bindEvent = function (type, callback) {
              callback && (events.hasOwnProperty(type) || (events[type] = []), events[type].push({
                type: type,
                callback: callback
              }));
            }, target.unbindEvent = function (type, callback) {
              var _context5;

              events.hasOwnProperty(type) && (callback ? events[type] = _filterInstanceProperty(_context5 = events[type]).call(_context5, function (it) {
                return it.callback !== callback;
              }) : delete events[type]);
            }, app.isYppMC && (target.callbackToWeb = function () {
              for (var args = [], _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }

              var jsonData = JSON.parse(args.join(""));

              if (jsonData.callbackId) {
                var responseData = jsonData.responseData,
                    savedData = responseCallbacks[jsonData.callbackId];
                if (!savedData || !responseData) return;
                var callback = savedData.callback,
                    needShell = savedData.needShell;
                !needShell && responseData.hasOwnProperty("code") && responseData.hasOwnProperty("result") ? callback(responseData.result) : callback(responseData), delete responseCallbacks[jsonData.callbackId];
              }
            }), target.onEvent = function (type, params) {
              console.warn("triggerEvent", type, params);
              var win = window;
              "pullToRefresh" === type && win.onYppRefresh && win.onYppRefresh(params), (events[type] || []).forEach(function (it) {
                it.callback && it.callback({
                  type: type,
                  data: params
                });
              });
            }, target._reset = !0, target;
          }

          function createBaseBridge(_a) {
            var ypp = _a.ypp,
                app = _a.app,
                system = _a.system;

            function _getVersion(isBundle) {
              return ypp ? isBundle ? ypp.bundle.version : ypp.version : null;
            }

            return {
              isServer: "undefined" == typeof window,
              ua: app.ua,
              isIOS: system.isIOS,
              isAndroid: system.isAndroid,
              isInYpp: app.isYpp,
              subject: app.name,
              detail: ypp,
              version: ypp ? ypp.version : null,
              app: app,
              ltVersion: function ltVersion(version, isBundle) {
                void 0 === isBundle && (isBundle = !1);

                var v = _getVersion(isBundle);

                return v ? compareVersion(v, version) < 0 : null;
              },
              lteVersion: function lteVersion(version, isBundle) {
                void 0 === isBundle && (isBundle = !1);

                var v = _getVersion(isBundle);

                return v ? compareVersion(v, version) <= 0 : null;
              },
              gtVersion: function gtVersion(version, isBundle) {
                void 0 === isBundle && (isBundle = !1);

                var v = _getVersion(isBundle);

                return v ? compareVersion(v, version) > 0 : null;
              },
              gteVersion: function gteVersion(version, isBundle) {
                void 0 === isBundle && (isBundle = !1);

                var v = _getVersion(isBundle);

                return v ? compareVersion(v, version) >= 0 : null;
              }
            };
          }

          ["info", "warn", "error"].forEach(function (level) {
            Logger[level] = function () {
              for (var args = [], _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }

              var content = "";
              args.forEach(function (log) {
                "object" == _typeof(log) && (log = _JSON$stringify(log)), content += log;
              }), content = level + " " + dayjs_min().format("YYYY-MM-DD HH:mm:ss,sss") + " " + content.length + " " + content, getEnv().isProd || console[level](content);
              var log = content.length < 3e3 ? content : _sliceInstanceProperty(content).call(content, 0, 3e3) + " --- 日志量大于3000";
              Bridge$1.call("log_logan", {
                type: 6,
                log: log
              });
            };
          });

          var Bridge = function () {
            function Bridge() {
              var _this = this,
                  self = this,
                  obj = createBaseBridge({
                ypp: ypp,
                system: system,
                app: app
              });

              _Object$keys(obj).forEach(function (k) {
                self[k] = obj[k];
              }), this.getApiList().forEach(function (name) {
                var fn = function fn(params, callback) {
                  return _this.call(name, params, callback);
                };

                self[name] = fn;
                var parts = name.split("_");
                !function (obj, path, value) {
                  for (var ref = obj, len = path.length, i = 0; i < len; i++) {
                    var key = path[i];
                    if (i === len - 1) ref[key] = value;else {
                      if (ref.hasOwnProperty(key) || (ref[key] = {}), "object" != _typeof(ref[key])) {
                        Logger.warn('Property "' + key + '" already exists');
                        break;
                      }

                      ref = ref[key];
                    }
                  }
                }(self, parts, fn);
              });
            }

            return Bridge.prototype.getApiList = function () {
              return [];
            }, Bridge.prototype.hook = function (name, params, callback, isInvoke) {
              return [name, params, callback, isInvoke];
            }, Bridge.prototype.isReady = function () {
              return !!getBridgeSDK();
            }, Bridge.prototype.bindEvent = function (event, listener) {
              exec(function (sdk) {
                if (Logger.info("bridge.bindEvent", event), !sdk.bindEvent) throw new Error("YPP: 当前容器版本太旧，不支持事件监听");
                sdk.bindEvent(event, listener);
              });
            }, Bridge.prototype.unbindEvent = function (event, listener) {
              exec(function (sdk) {
                if (Logger.info("bridge.unbindEvent", event), !sdk.unbindEvent) throw new Error("YPP: 当前容器版本太旧，不支持事件监听");
                sdk.unbindEvent(event, listener);
              });
            }, Bridge.prototype.dispatchEvent = function (event, payload) {
              return void 0 === payload && (payload = {}), this.invoke("app_dispatchEvent", {
                event: event,
                payload: payload
              });
            }, Bridge.prototype.invoke = function (name, params) {
              var _this = this;

              return void 0 === params && (params = {}), new _Promise(function (resolve, reject) {
                _this.call(name, params, function (res) {
                  if (res || (res = {}), !isCodeOk(res.code)) return reject(res);
                  resolve(res.result);
                }, !0);
              });
            }, Bridge.prototype.call = function (name) {
              for (var _this = this, args = [], _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
              }

              var lastArg = args[args.length - 1],
                  isInvoke = !1;
              "boolean" == typeof lastArg && (isInvoke = lastArg, args.pop());

              var a = args[0],
                  b = args[1],
                  callback = function callback() {},
                  params = {};

              return "function" == typeof b ? (callback = b, params = a) : a && ("function" == typeof a ? callback = a : params = a), null != params && "object" == _typeof(params) || (params = {}), exec(function (sdk) {
                var version = _this.version;
                if (!(version && Number(version) >= 2)) throw version ? new Error("YPP: 当前容器版本太旧") : new Error("YPP: 无法识别容器版本");

                var result = _this.hook(name, params, callback, isInvoke);

                if (result && Array.isArray(result) && result.length >= 3) {
                  var cb_1 = (result = _sliceInstanceProperty(result).call(result, 0, 4))[2];

                  result[2] = function () {
                    for (var args = [], _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }

                    return cb_1.apply(void 0, args);
                  }, sdk.call.apply(sdk, result);
                }
              });
            }, Bridge.HOST = "_YPP_JS_BRIDGE_", Bridge.EVENT_READY = "YppJsBridgeReady", Bridge;
          }();

          function exec(fn) {
            var cb = function cb() {
              return fn(system.isAndroid ? resetNativeBridge(getBridgeSDK()) : getBridgeSDK());
            };

            getBridgeSDK() ? cb() : document.addEventListener(Bridge.EVENT_READY, cb, !1);
          }

          function getBridgeSDK() {
            return window[Bridge.HOST];
          }

          var n,
              APP_KEYS = ["bixin", "yuer", "yrlive"],
              OLD_API_WITH_CALLBACKS = ["getDeviceInfo", "getAuthInfo", "issueNativeRequest", "isSpecifiedAppInstalled", "issueAuthPicker", "checkAudioMode", "openAudioMemosInHeadless", "openAudioMemos", "openImageMemos"],
              NEW_API_WITHOUT_NAMESPACE = ["bixin_authCodeHeadless", "bixin_createTimeline", "bixin_openPaymentDialog", "bixin_pushToZhimaCredit", "bixin_alifaceCertResult", "bixin_openZhimaCertification"],
              NEW_API_TO_OLD_API = {
            image_pickAndUploadImage: "openImageMemos",
            network_mapi: "issueNativeRequest",
            page_close: "closeWebview",
            page_triggerError: "triggerWebviewError",
            ui_disableBounces: "closePullEffect",
            ui_setNavbarType: "setNavbarType",
            ui_setDisplayType: "setWebviewDisplayType",
            ui_enablePullToRefresh: "enablePullToRefresh",
            ui_refreshComplete: "closeLoading",
            share_setOptions: "setShareOptions",
            share_openSharePicker: "openSharePicker",
            device_getDeviceInfo: "getDeviceInfo",
            ui_disableSwipeBack: "disableSwipeBack",
            app_dispatchEvent: "dispatchEvent",
            image_saveToAlbum: "saveImage",
            audio_simpleRecord: "openAudioMemos",
            audio_recordService: "openAudioMemosInHeadless",
            audio_checkMode: "checkAudioMode",
            audio_checkRecordGranted: "getAuthInfo",
            audio_acquireRecordAuth: "issueAuthPicker",
            app_isAppInstalled: "isSpecifiedAppInstalled",
            app_openApp: "openSpecifiedApp",
            log_trackEvent: "issueCollectRequest"
          },
              config = {
            APP_KEYS: APP_KEYS,
            OLD_API_WITH_CALLBACKS: OLD_API_WITH_CALLBACKS,
            NEW_API_WITHOUT_NAMESPACE: NEW_API_WITHOUT_NAMESPACE,
            NEW_API_TO_OLD_API: NEW_API_TO_OLD_API
          },
              config$2 = (n = _Object$freeze({
            __proto__: null,
            APP_KEYS: APP_KEYS,
            OLD_API_WITH_CALLBACKS: OLD_API_WITH_CALLBACKS,
            NEW_API_WITHOUT_NAMESPACE: NEW_API_WITHOUT_NAMESPACE,
            NEW_API_TO_OLD_API: NEW_API_TO_OLD_API,
            "default": config
          })) && n["default"] || n,
              NEW_API_TO_OLD_API$1 = config$2.NEW_API_TO_OLD_API,
              OLD_API_WITH_CALLBACKS$1 = config$2.OLD_API_WITH_CALLBACKS,
              McBridge = function (_super) {
            function McBridge() {
              return null !== _super && _super.apply(this, arguments) || this;
            }

            return __extends(McBridge, _super), McBridge.prototype.getApiList = function () {
              var _context6, _context7;

              var _this = this;

              return _filterInstanceProperty(_context6 = _mapInstanceProperty(_context7 = _Object$keys(NEW_API_TO_OLD_API$1)).call(_context7, function (k) {
                return NEW_API_TO_OLD_API$1[k];
              })).call(_context6, function (k) {
                return !_this[k];
              });
            }, McBridge.prototype.hook = function (name, params, callback, isInvoke) {
              var isBridge2 = this.ltVersion("3"),
                  callbacks = [],
                  inject = function inject(fn) {
                return callbacks.push(fn);
              },
                  preferOldName = NEW_API_TO_OLD_API$1[name] || name,
                  hasShell = function hasShell(obj) {
                return obj && "object" == _typeof(obj) && "code" in obj && "result" in obj;
              };

              isInvoke && isBridge2 && inject(function (result) {
                return {
                  code: 0,
                  msg: "",
                  result: result
                };
              });

              if (inject(function (res) {
                return function () {
                  if (contains(["openAudioMemos", "openAudioMemosInHeadless", "openImageMemos", "image_uploadImage"], preferOldName)) {
                    if (!res || "object" != _typeof(res)) return;
                    var target = "object" == _typeof(res.result) ? res.result : res,
                        key = target.key;
                    if ("string" != typeof key || target.url) return;
                    /^https?:\/\//.test(key) ? target.url = key : _startsWithInstanceProperty(key).call(key, "bx-user/") ? target.url = "https://p6.hibixin.com/" + key : target.url = "https://yphoto.eryufm.cn/" + key;
                  }
                }(), "issueNativeRequest" === preferOldName && res && hasShell(res) && hasShell(res.result) && (res = res.result), res;
              }), isInvoke && isBridge2 && NEW_API_TO_OLD_API$1[name] && (name = NEW_API_TO_OLD_API$1[name], !contains(OLD_API_WITH_CALLBACKS$1, name))) {
                var originalCallback_1 = callback;
                callback = function callback() {}, setTimeout(function () {
                  Logger.info("bridge " + name + " auto run callback"), originalCallback_1();
                }, 20);
              }

              if (contains(["openSharePicker", "setShareOptions"], preferOldName) && (params.templateId || (this.app.isBixin ? params.templateId = "838" : this.app.isYuer && (params.templateId = ""))), "issueNativeRequest" === preferOldName) if (params.headers) {
                var headers_1 = _assign({}, params.headers);

                "Content-Type X-User-Agent X-Client-Time X-AccessToken X-NetWork Framework_Trace_Id X-Sign X-Authentication".split(" ").forEach(function (k) {
                  return delete headers_1[k];
                }), params.headers = headers_1;
              } else params.headers = {};

              if (app.isBixin ? (system.isAndroid && ("openAudioMemosInHeadless" === preferOldName && params.action && (params.actionType = params.action, this.ltVersion("5.1.0", !0) && (name = "openAudioMemosInHeadless")), "image_pickAndUploadImage" !== name || params.isNew || (name = "openImageMemos"), "network_mapi" !== name || params.params || (params.params = {})), system.isIOS && ("image_pickAndUploadImage" === name && this.ltVersion("5.0.0", !0) && (name = "openImageMemos"), "openImageMemos" === name && this.gteVersion("5.2.0", !0) && (name = "image_pickAndUploadImage"))) : app.isYrlive && system.isIOS && "openImageMemos" === name && this.gteVersion("3.2.0", !0) && (name = "image_pickAndUploadImage"), "undefined" != typeof window) {
                var log = window.YppDebug;

                if ("function" == typeof log) {
                  var done_1 = log("BRIDGE", {
                    name: name,
                    params: params
                  });
                  "function" == typeof done_1 && inject(function (res) {
                    return done_1(res), res;
                  });
                }
              }

              return [name, params, function (res) {
                return callback(_reduceInstanceProperty(callbacks).call(callbacks, function (prev, fn) {
                  return fn(prev);
                }, res));
              }, isInvoke];
            }, McBridge.prototype.call = function () {
              for (var args = [], _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }

              if (!app.isYppPC) return _super.prototype.call.apply(this, args);
            }, McBridge.prototype.go = function (schema, params) {
              var href, paramsString;

              if (!this.isServer) {
                var _context8;

                if (schema && "object" == _typeof(schema)) {
                  var iOS = schema.iOS,
                      android = schema.android;
                  href = this.isIOS ? iOS : android;
                } else href = schema;

                if (params) paramsString = (paramsString = _mapInstanceProperty(_context8 = _Object$keys(params)).call(_context8, function (key) {
                  return key + "=" + params[key];
                })).join("&");
                if (!href) throw new Error("YPP: $bridge.go 方法的 schema 参数不能为空");

                if (paramsString) {
                  var hasParams = -1 !== _indexOfInstanceProperty(href).call(href, "?");

                  href = href + (hasParams ? "&" : "?") + paramsString;
                }

                window.location.href = href;
              }
            }, McBridge;
          }(Bridge),
              QWebChannelMessageTypes_signal = 1,
              QWebChannelMessageTypes_propertyUpdate = 2,
              QWebChannelMessageTypes_init = 3,
              QWebChannelMessageTypes_idle = 4,
              QWebChannelMessageTypes_debug = 5,
              QWebChannelMessageTypes_invokeMethod = 6,
              QWebChannelMessageTypes_connectToSignal = 7,
              QWebChannelMessageTypes_disconnectFromSignal = 8,
              QWebChannelMessageTypes_setProperty = 9,
              QWebChannelMessageTypes_response = 10,
              QWebChannel = function QWebChannel(transport, initCallback) {
            if ("object" == _typeof(transport) && "function" == typeof transport.send) {
              var channel = this;
              this.transport = transport, this.send = function (data) {
                "string" != typeof data && (data = _JSON$stringify(data)), channel.transport.send(data);
              }, this.transport.onmessage = function (message) {
                var data = message.data;

                switch ("string" == typeof data && (data = JSON.parse(data)), data.type) {
                  case QWebChannelMessageTypes_signal:
                    channel.handleSignal(data);
                    break;

                  case QWebChannelMessageTypes_response:
                    channel.handleResponse(data);
                    break;

                  case QWebChannelMessageTypes_propertyUpdate:
                    channel.handlePropertyUpdate(data);
                    break;

                  default:
                    Logger.error("invalid message received:", message.data);
                }
              }, this.execCallbacks = {}, this.execId = 0, this.exec = function (data, callback) {
                callback ? (channel.execId === Number.MAX_VALUE && (channel.execId = Number.MIN_VALUE), data.hasOwnProperty("id") ? Logger.error("Cannot exec message with property id: " + _JSON$stringify(data)) : (data.id = channel.execId++, channel.execCallbacks[data.id] = callback, channel.send(data))) : channel.send(data);
              }, this.objects = {}, this.handleSignal = function (message) {
                var object = channel.objects[message.object];
                object ? object.signalEmitted(message.signal, message.args) : Logger.warn("Unhandled signal: " + message.object + "::" + message.signal);
              }, this.handleResponse = function (message) {
                message.hasOwnProperty("id") ? (channel.execCallbacks[message.id](message.data), delete channel.execCallbacks[message.id]) : Logger.error("Invalid response message received: ", _JSON$stringify(message));
              }, this.handlePropertyUpdate = function (message) {
                message.data.forEach(function (data) {
                  var object = channel.objects[data.object];
                  object ? object.propertyUpdate(data.signals, data.properties) : Logger.warn("Unhandled property update: " + data.object + "::" + data.signal);
                }), channel.exec({
                  type: QWebChannelMessageTypes_idle
                });
              }, this.debug = function (message) {
                channel.send({
                  type: QWebChannelMessageTypes_debug,
                  data: message
                });
              }, channel.exec({
                type: QWebChannelMessageTypes_init
              }, function (data) {
                for (var _i = 0, _a = _Object$keys(data); _i < _a.length; _i++) {
                  new QObject(objectName = _a[_i], data[objectName], channel);
                }

                for (var _b = 0, _c = _Object$keys(channel.objects); _b < _c.length; _b++) {
                  var objectName = _c[_b];
                  channel.objects[objectName].unwrapProperties();
                }

                initCallback && initCallback(channel), channel.exec({
                  type: QWebChannelMessageTypes_idle
                });
              });
            } else Logger.error("The QWebChannel expects a transport object with a send function and onmessage callback property. Given is: transport: " + _typeof(transport) + ", transport.send: " + _typeof(transport.send));
          };

          function QObject(name, data, webChannel) {
            this.__id__ = name, webChannel.objects[name] = this, this.__objectSignals__ = {}, this.__propertyCache__ = {};
            var object = this;

            function addSignal(signalData, isPropertyNotifySignal) {
              var signalName = signalData[0],
                  signalIndex = signalData[1];
              object[signalName] = {
                connect: function connect(callback) {
                  "function" == typeof callback ? (object.__objectSignals__[signalIndex] = object.__objectSignals__[signalIndex] || [], object.__objectSignals__[signalIndex].push(callback), isPropertyNotifySignal || "destroyed" !== signalName && "destroyed()" !== signalName && "destroyed(QObject*)" !== signalName && 1 == object.__objectSignals__[signalIndex].length && webChannel.exec({
                    type: QWebChannelMessageTypes_connectToSignal,
                    object: object.__id__,
                    signal: signalIndex
                  })) : Logger.error("Bad callback given to connect to signal " + signalName);
                },
                disconnect: function disconnect(callback) {
                  if ("function" == typeof callback) {
                    var _context9, _context10;

                    object.__objectSignals__[signalIndex] = object.__objectSignals__[signalIndex] || [];

                    var idx = _indexOfInstanceProperty(_context9 = object.__objectSignals__[signalIndex]).call(_context9, callback);

                    -1 !== idx ? (_spliceInstanceProperty(_context10 = object.__objectSignals__[signalIndex]).call(_context10, idx, 1), isPropertyNotifySignal || 0 !== object.__objectSignals__[signalIndex].length || webChannel.exec({
                      type: QWebChannelMessageTypes_disconnectFromSignal,
                      object: object.__id__,
                      signal: signalIndex
                    })) : Logger.error("Cannot find connection of signal " + signalName + " to " + callback.name);
                  } else Logger.error("Bad callback given to disconnect from signal " + signalName);
                }
              };
            }

            function invokeSignalCallbacks(signalName, signalArgs) {
              var connections = object.__objectSignals__[signalName];
              connections && connections.forEach(function (callback) {
                callback.apply(callback, signalArgs);
              });
            }

            this.unwrapQObject = function (response) {
              if (response instanceof Array) return _mapInstanceProperty(response).call(response, function (qobj) {
                return object.unwrapQObject(qobj);
              });
              if (!(response instanceof Object)) return response;

              if (!response["__QObject*__"] || void 0 === response.id) {
                for (var jObj = {}, _i = 0, _a = _Object$keys(response); _i < _a.length; _i++) {
                  var propName = _a[_i];
                  jObj[propName] = object.unwrapQObject(response[propName]);
                }

                return jObj;
              }

              var objectId = response.id;
              if (webChannel.objects[objectId]) return webChannel.objects[objectId];

              if (response.data) {
                var qObject = new QObject(objectId, response.data, webChannel);
                return qObject.destroyed.connect(function () {
                  webChannel.objects[objectId] === qObject && (delete webChannel.objects[objectId], _Object$keys(qObject).forEach(function (name) {
                    return delete qObject[name];
                  }));
                }), qObject.unwrapProperties(), qObject;
              }

              Logger.error("Cannot unwrap unknown QObject " + objectId + " without data.");
            }, this.unwrapProperties = function () {
              for (var _i = 0, _a = _Object$keys(object.__propertyCache__); _i < _a.length; _i++) {
                var propertyIdx = _a[_i];
                object.__propertyCache__[propertyIdx] = object.unwrapQObject(object.__propertyCache__[propertyIdx]);
              }
            }, this.propertyUpdate = function (signals, propertyMap) {
              for (var _i = 0, _a = _Object$keys(propertyMap); _i < _a.length; _i++) {
                var propertyIndex = _a[_i],
                    propertyValue = propertyMap[propertyIndex];
                object.__propertyCache__[propertyIndex] = this.unwrapQObject(propertyValue);
              }

              for (var _b = 0, _c = _Object$keys(signals); _b < _c.length; _b++) {
                var signalName = _c[_b];
                invokeSignalCallbacks(signalName, signals[signalName]);
              }
            }, this.signalEmitted = function (signalName, signalArgs) {
              invokeSignalCallbacks(signalName, this.unwrapQObject(signalArgs));
            }, data.methods.forEach(function (methodData) {
              var methodName = methodData[0],
                  methodIdx = methodData[1],
                  invokedMethod = ")" === methodName[methodName.length - 1] ? methodIdx : methodName;

              object[methodName] = function () {
                for (var callback, errCallback, result, args = [], i = 0; i < arguments.length; ++i) {
                  var argument = arguments[i];
                  "function" == typeof argument ? callback = argument : argument instanceof QObject && void 0 !== webChannel.objects[argument.__id__] ? args.push({
                    id: argument.__id__
                  }) : args.push(argument);
                }

                return callback || "function" != typeof _Promise || (result = new _Promise(function (resolve, reject) {
                  callback = resolve, errCallback = reject;
                })), webChannel.exec({
                  type: QWebChannelMessageTypes_invokeMethod,
                  object: object.__id__,
                  method: invokedMethod,
                  args: args
                }, function (response) {
                  if (void 0 !== response) {
                    var result = object.unwrapQObject(response);
                    callback && callback(result);
                  } else errCallback && errCallback();
                }), result;
              };
            }), data.properties.forEach(function (propertyInfo) {
              var propertyIndex = propertyInfo[0],
                  propertyName = propertyInfo[1],
                  notifySignalData = propertyInfo[2];
              object.__propertyCache__[propertyIndex] = propertyInfo[3], notifySignalData && (1 === notifySignalData[0] && (notifySignalData[0] = propertyName + "Changed"), addSignal(notifySignalData, !0)), Object.defineProperty(object, propertyName, {
                configurable: !0,
                get: function get() {
                  var propertyValue = object.__propertyCache__[propertyIndex];
                  return void 0 === propertyValue && Logger.warn('Undefined value in property cache for property "' + propertyName + '" in object ' + object.__id__), propertyValue;
                },
                set: function set(value) {
                  if (void 0 !== value) {
                    object.__propertyCache__[propertyIndex] = value;
                    var valueToSend = value;
                    valueToSend instanceof QObject && void 0 !== webChannel.objects[valueToSend.__id__] && (valueToSend = {
                      id: valueToSend.__id__
                    }), webChannel.exec({
                      type: QWebChannelMessageTypes_setProperty,
                      object: object.__id__,
                      property: propertyIndex,
                      value: valueToSend
                    });
                  } else Logger.warn("Property setter for " + propertyName + " called with undefined value!");
                }
              });
            }), data.signals.forEach(function (signal) {
              addSignal(signal, !1);
            }), _Object$assign(object, data.enums);
          }

          var isServer = "undefined" == typeof window,
              ID = 0,
              CALLBACKS = {},
              HOST = {
            callbackToWeb: function callbackToWeb(callbackId, result) {
              var fn = CALLBACKS[callbackId];
              fn && fn(result), delete CALLBACKS[callbackId];
            }
          };
          isServer || (window._YPP_PC_BRIDGE_ = HOST);

          var PcBridge = function () {
            function PcBridge(options) {
              var _this = this;

              void 0 === options && (options = {}), this.options = options, this.qweb = null, this.callsBeforeInited = [];
              var self = this,
                  obj = createBaseBridge({
                ypp: ypp,
                system: system,
                app: app
              });
              _Object$keys(obj).forEach(function (k) {
                self[k] = obj[k];
              }), this.isInYpp = "undefined" != typeof qt && app.isYppPC, this.isInYpp && !isServer && new QWebChannel(qt.webChannelTransport, function (channel) {
                _this.qweb = channel.objects.bridge;

                for (var calls = _this.callsBeforeInited; calls.length;) {
                  var _a = calls.shift(),
                      action = _a.action,
                      params = _a.params,
                      resolve = _a.resolve,
                      reject = _a.reject,
                      callback = _a.callback;

                  call(_this.qweb, action, params, resolve, reject, callback);
                }
              });
            }

            return PcBridge.prototype.bindEvent = function (event, listener) {
              exec$1(function (sdk) {
                if (!sdk.bindEvent) throw new Error("YPP: 当前容器版本太旧，不支持事件监听");
                sdk.bindEvent(event, listener);
              });
            }, PcBridge.prototype.unbindEvent = function (event, listener) {
              exec$1(function (sdk) {
                if (!sdk.unbindEvent) throw new Error("YPP: 当前容器版本太旧，不支持事件监听");
                sdk.unbindEvent(event, listener);
              });
            }, PcBridge.prototype.dispatchEvent = function (event, payload) {
              return void 0 === payload && (payload = {}), this.invoke("app_dispatchEvent", {
                event: event,
                payload: payload
              });
            }, Object.defineProperty(PcBridge.prototype, "invoke", {
              get: function get() {
                return this.call.bind(this);
              },
              enumerable: !1,
              configurable: !0
            }), PcBridge.prototype.hook = function (name, params, callback) {
              return [name, params, callback];
            }, PcBridge.prototype.call = function (action, a, b) {
              var _this = this,
                  callback = function callback() {},
                  params = {};

              "function" == typeof b ? (callback = b, params = a) : a && ("function" == typeof a ? callback = a : params = a), null != params && "object" == _typeof(params) || (params = {});
              var args = this.hook(action, params, callback);
              return new _Promise(function (resolve, reject) {
                _this.isInYpp ? _this.qweb ? call(_this.qweb, args[0], args[1], resolve, reject, args[2]) : _this.callsBeforeInited.push({
                  action: args[0],
                  params: args[1],
                  resolve: resolve,
                  reject: reject,
                  callback: args[2]
                }) : console.error("NOT IN YPP");
              });
            }, PcBridge;
          }();

          function call(qweb, action, params, resolve, reject, callback) {
            var done = function done(res) {
              "network_mapi" === action && hasShell(res) && hasShell(res.result) && (res = res.result), callback && callback(res), isCodeOk(res.code) ? resolve(res.result) : reject(res);
            };

            if (app.isPcChatroom || ypp && compareVersion(ypp.version, "3.1") >= 0) {
              var callbackId = "cb_" + ID++;
              CALLBACKS[callbackId] = done, qweb.call(action, params, callbackId);
            } else qweb.call(action, params, done);
          }

          function hasShell(obj) {
            return obj && "object" == _typeof(obj) && "code" in obj && "result" in obj;
          }

          function exec$1(fn) {
            getBridgeSDK$1() && fn(resetNativeBridge(getBridgeSDK$1()));
          }

          function getBridgeSDK$1() {
            return window._YPP_PC_BRIDGE_;
          }

          var WebSocketEnum,
              SchedulerName,
              CatType,
              Bridge$1 = app.isYppMC ? new McBridge() : new PcBridge(),
              $event = function () {
            function EventDispatcher() {
              this._handles = {};
            }

            return EventDispatcher.getInstance = function () {
              return EventDispatcher._instance || (EventDispatcher._instance = new EventDispatcher()), EventDispatcher._instance;
            }, Object.defineProperty(EventDispatcher.prototype, "handles", {
              get: function get() {
                return this._handles;
              },
              enumerable: !1,
              configurable: !0
            }), EventDispatcher.prototype.emit = function (eventName, data, extra) {
              for (var findEvenName in this._handles) {
                if (findEvenName == eventName) {
                  var eventList = this._handles[findEvenName];
                  if (eventList) for (var i = 0; i < eventList.length; i++) {
                    var obj = eventList[i];
                    obj.callback.bind(obj.target)(data, extra);
                  }
                }
              }

              return [];
            }, EventDispatcher.prototype.on = function (eventName, callback, target) {
              this._handles[eventName] = this._handles[eventName] || [], this._handles[eventName].push({
                callback: callback,
                target: target
              });
            }, EventDispatcher.prototype.off = function (eventName, callback, target) {
              var handlerList = this._handles[eventName];

              if (handlerList) {
                for (var i = handlerList.length - 1; i >= 0; i--) {
                  var obj = handlerList[i];
                  obj.callback == callback && obj.target == target && _spliceInstanceProperty(handlerList).call(handlerList, i, 1);
                }

                0 == handlerList.length && delete this._handles[eventName];
              }
            }, EventDispatcher.prototype.exist = function (eventName) {
              return this._handles.hasOwnProperty(eventName);
            }, EventDispatcher;
          }().getInstance();

          !function (WebSocketEnum) {
            WebSocketEnum.Handshake = "WebSocket_Handshake", WebSocketEnum.SocketOpen = "webSocket_SocketOpen", WebSocketEnum.Message = "webSocket_Message", WebSocketEnum.ErrorCode = "webSocket_ErrorCode", WebSocketEnum.SocketClose = "webSocket_SocketClose", WebSocketEnum.SocketError = "webSocket_SocketError", WebSocketEnum.ReconnectOverTime = "webSocket_ReconnectOverTime", WebSocketEnum.StartReconnect = "webSocket_StartReconnect";
          }(WebSocketEnum || (WebSocketEnum = {})), function (SchedulerName) {
            SchedulerName.HeartBreakFunc = "Heart_Break_Func", SchedulerName.ConnectOverTime = "Connect_Over_Time", SchedulerName.DelayReconnect = "Delay_Reconnect", SchedulerName.GatewayPull = "Gateway_Pull";
          }(SchedulerName || (SchedulerName = {})), function (CatType) {
            CatType.CONNECT = "game/connect", CatType.LOAD_TIME = "game/loadtime", CatType.GAME_START = "game/gameStart";
          }(CatType || (CatType = {}));

          var isHttps = function isHttps() {
            return "https:" === location.protocol || "";
          },
              Config$1 = function () {
            function Config() {
              this._debug = !0, this._maxReconntTime = 1e4, this._url = getEnv().prefix + "game.bxyuer.com", this._token = "", this._uid = "", this._gameId = 0, this._heartTime = 2e3, this._roomId = "", this._appVersion = 0, this._netType = -1, this._gameScene = "yuer", this._viewerId = "", this._instanceIndex = 0, this.unProdUrl = "https://" + getEnv().prefix + "gateway.yupaopao.com/yuer/game/gate/domain", this.prodUrl = "https://gateway.hibixin.com/yuer/game/gate/domain";
            }

            return Config.getInstance = function () {
              return this._instance || (this._instance = new this());
            }, Object.defineProperty(Config.prototype, "debug", {
              get: function get() {
                return this._debug;
              },
              set: function set(v) {
                getEnv().isProd ? this._debug = !0 : this._debug = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "instanceIndex", {
              get: function get() {
                return this._instanceIndex;
              },
              enumerable: !1,
              configurable: !0
            }), Config.prototype.getNextInstanceIndex = function () {
              return ++this._instanceIndex;
            }, Object.defineProperty(Config.prototype, "url", {
              set: function set(url) {
                getEnv().isProd || (this._url = url);
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "maxReconntTime", {
              get: function get() {
                return this._maxReconntTime;
              },
              set: function set(v) {
                this._maxReconntTime = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "socketUrl", {
              get: function get() {
                var prefix = isHttps() ? "wss:" : "ws:",
                    host = isHttps() ? "" : ":8888";
                getEnv().isTest || (prefix = "wss:", host = "");
                var params = "?instance=" + this.instanceIndex + "&token=" + (this.token || "") + "&uid=" + (this.uid || "") + "&roomId=" + (this.roomId || "") + "&gameId=" + (this.gameId || "");
                return prefix + "//" + this._url + host + "/g" + params;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "token", {
              get: function get() {
                return this._token || (this._viewerId ? "viewer_" + this._viewerId : "") || (Bridge$1 && Bridge$1.detail ? Bridge$1.detail.accessToken : "");
              },
              set: function set(v) {
                this._token = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "uid", {
              get: function get() {
                return this._uid;
              },
              set: function set(v) {
                this._uid = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "gameId", {
              get: function get() {
                return this._gameId;
              },
              set: function set(v) {
                this._gameId = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "heartTime", {
              get: function get() {
                return this._heartTime;
              },
              set: function set(v) {
                if (v > 2e4) return console.warn("心跳间隔太大，已恢复至2000ms"), void (this._heartTime = 2e3);
                this._heartTime = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "roomId", {
              get: function get() {
                return this._roomId;
              },
              set: function set(v) {
                this._roomId = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "appVersion", {
              get: function get() {
                return this._appVersion;
              },
              set: function set(v) {
                this._appVersion = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "netType", {
              get: function get() {
                return this._netType;
              },
              set: function set(v) {
                this._netType = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "gameScene", {
              get: function get() {
                return this._gameScene;
              },
              set: function set(v) {
                this._gameScene = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "viewerId", {
              get: function get() {
                return this._viewerId;
              },
              set: function set(v) {
                this._viewerId = v;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(Config.prototype, "appVersionInfo", {
              get: function get() {
                return {
                  ios: {
                    enterVersion: "5.5.0",
                    des: "ios需求最低版本,每个小数点最大支持3位eg:xxx.xxx.xxx.xxx或xxx.xxx.xxx"
                  },
                  android: {
                    enterVersion: "5.5.0",
                    des: "android需求最低版本,每个小数点最大支持3位eg:xxx.xxx.xxx.xxx或xxx.xxx.xxx"
                  }
                };
              },
              enumerable: !1,
              configurable: !0
            }), Config.prototype.requestURI = function () {
              var _this = this;

              return new _Promise(function (resolve, reject) {
                return __awaiter(_this, void 0, void 0, function () {
                  var _a,
                      header,
                      body,
                      options,
                      err_1,
                      _this = this;

                  return __generator(this, function (_b) {
                    switch (_b.label) {
                      case 0:
                        return _b.trys.push([0, 2,, 3]), isLocal() ? (reject("本地测试"), [2]) : [4, Bridge$1.invoke("network_encrypt", {
                          body: {}
                        })];

                      case 1:
                        return _a = _b.sent(), header = _a.header, body = _a.body, options = {
                          method: "POST",
                          body: body,
                          headers: header
                        }, fetch(getEnv().isProd ? this.prodUrl : this.unProdUrl, options).then(function (res) {
                          return res.text();
                        }).then(function (res) {
                          return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                              switch (_a.label) {
                                case 0:
                                  return [4, Bridge$1.invoke("network_decrypt", {
                                    response: res
                                  })];

                                case 1:
                                  return result = _a.sent().result, Logger.info("请求wss返回结果：", result), result && result.result && (this._url = result.result), resolve(!0), [2];
                              }
                            });
                          });
                        })["catch"](function (err) {
                          Logger.error("请求Wss错误：", err), reject(err);
                        }), [3, 3];

                      case 2:
                        return err_1 = _b.sent(), Logger.error("获取Wss失败：", err_1), reject(err_1), [3, 3];

                      case 3:
                        return [2];
                    }
                  });
                });
              });
            }, Config;
          }().getInstance(),
              SetInterval = createCommonjsModule(function (module, exports) {
            module.exports = new function () {
              this.key = {}, this.start = function (fn, interval, key) {
                this.key[key] || (this.key[key] = setInterval(function () {
                  fn();
                }, interval));
              }, this.clear = function (key) {
                this.key[key] && (clearInterval(this.key[key]), delete this.key[key]);
              };
            }();
          }),
              ByteArray = function () {
            function ByteArray(buffer, bufferExtSize) {
              void 0 === bufferExtSize && (bufferExtSize = 0), this.bufferExtSize = 0, this.EofByte = 0, this.EofCodePoint = 0, this.writePosition = 0, this._position = 0, this.$endian = 0, this.div = function (n, d) {
                return Math.floor(n / d);
              }, this.bufferExtSize = 0, this.EofByte = -1, this.EofCodePoint = -1, bufferExtSize < 0 && (bufferExtSize = 0), this.bufferExtSize = bufferExtSize;
              var bytes,
                  wpos = 0;

              if (buffer) {
                var uint8 = void 0;
                if (buffer instanceof Uint8Array ? (uint8 = buffer, wpos = buffer.length) : (wpos = buffer.byteLength, uint8 = new Uint8Array(buffer)), 0 == bufferExtSize) bytes = new Uint8Array(wpos);else bytes = new Uint8Array((1 + (wpos / bufferExtSize | 0)) * bufferExtSize);
                bytes.set(uint8);
              } else bytes = new Uint8Array(bufferExtSize);

              this.writePosition = wpos, this._position = 0, this._bytes = bytes, this.data = new DataView(bytes.buffer), this.endian = "bigEndian";
            }

            return Object.defineProperty(ByteArray.prototype, "endian", {
              get: function get() {
                return 0 == this.$endian ? "littleEndian" : "bigEndian";
              },
              set: function set(value) {
                this.$endian = "littleEndian" == value ? 0 : 1;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(ByteArray.prototype, "readAvailable", {
              get: function get() {
                return this.writePosition - this._position;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(ByteArray.prototype, "buffer", {
              get: function get() {
                var _context11;

                return _sliceInstanceProperty(_context11 = this.data.buffer).call(_context11, 0, this.writePosition);
              },
              set: function set(value) {
                var bytes,
                    wpos = value.byteLength,
                    uint8 = new Uint8Array(value),
                    bufferExtSize = this.bufferExtSize;
                0 == bufferExtSize ? bytes = new Uint8Array(wpos) : bytes = new Uint8Array((1 + (wpos / bufferExtSize | 0)) * bufferExtSize);
                bytes.set(uint8), this.writePosition = wpos, this._bytes = bytes, this.data = new DataView(bytes.buffer);
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(ByteArray.prototype, "rawBuffer", {
              get: function get() {
                return this.data.buffer;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(ByteArray.prototype, "bytes", {
              get: function get() {
                return this._bytes;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(ByteArray.prototype, "dataView", {
              get: function get() {
                return this.data;
              },
              set: function set(value) {
                this.buffer = value.buffer;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(ByteArray.prototype, "bufferOffset", {
              get: function get() {
                return this.data.byteOffset;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(ByteArray.prototype, "position", {
              get: function get() {
                return this._position;
              },
              set: function set(value) {
                this._position = value, value > this.writePosition && (this.writePosition = value);
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(ByteArray.prototype, "length", {
              get: function get() {
                return this.writePosition;
              },
              set: function set(value) {
                this.writePosition = value, this.data.byteLength > value && (this._position = value), this._validateBuffer(value);
              },
              enumerable: !1,
              configurable: !0
            }), ByteArray.prototype._validateBuffer = function (value) {
              if (this.data.byteLength < value) {
                var be = this.bufferExtSize,
                    tmp = void 0;
                if (0 == be) tmp = new Uint8Array(value);else tmp = new Uint8Array((1 + (value / be >> 0)) * be);
                tmp.set(this._bytes), this._bytes = tmp, this.data = new DataView(tmp.buffer);
              }
            }, Object.defineProperty(ByteArray.prototype, "bytesAvailable", {
              get: function get() {
                return this.data.byteLength - this._position;
              },
              enumerable: !1,
              configurable: !0
            }), ByteArray.prototype.clear = function () {
              var buffer = new ArrayBuffer(this.bufferExtSize);
              this.data = new DataView(buffer), this._bytes = new Uint8Array(buffer), this._position = 0, this.writePosition = 0;
            }, ByteArray.prototype.readBoolean = function () {
              return !!this.validate(1) && !!this._bytes[this.position++];
            }, ByteArray.prototype.readByte = function () {
              if (this.validate(1)) return this.data.getInt8(this.position++);
            }, ByteArray.prototype.readBytes = function (bytes, offset, length) {
              if (void 0 === offset && (offset = 0), void 0 === length && (length = 0), bytes) {
                var pos = this._position,
                    available = this.writePosition - pos;

                if (!(available < 0)) {
                  if (0 == length) length = available;else if (length > available) return;
                  bytes.validateBuffer(offset + length), bytes._bytes.set(this._bytes.subarray(pos, pos + length), offset), this.position += length;
                }
              }
            }, ByteArray.prototype.readDouble = function () {
              if (this.validate(8)) {
                var value = this.data.getFloat64(this._position, 0 == this.$endian);
                return this.position += 8, value;
              }
            }, ByteArray.prototype.readFloat = function () {
              if (this.validate(4)) {
                var value = this.data.getFloat32(this._position, 0 == this.$endian);
                return this.position += 4, value;
              }
            }, ByteArray.prototype.readInt = function () {
              if (this.validate(4)) {
                var value = this.data.getInt32(this._position, 0 == this.$endian);
                return this.position += 4, value;
              }
            }, ByteArray.prototype.readShort = function () {
              if (this.validate(2)) {
                var value = this.data.getInt16(this._position, 0 == this.$endian);
                return this.position += 2, value;
              }
            }, ByteArray.prototype.readUnsignedByte = function () {
              if (this.validate(1)) return this._bytes[this.position++];
            }, ByteArray.prototype.readUnsignedInt = function () {
              if (this.validate(4)) {
                var value = this.data.getUint32(this._position, 0 == this.$endian);
                return this.position += 4, value;
              }
            }, ByteArray.prototype.readUnsignedShort = function () {
              if (this.validate(2)) {
                var value = this.data.getUint16(this._position, 0 == this.$endian);
                return this.position += 2, value;
              }
            }, ByteArray.prototype.readUTF = function () {
              var length = this.readUnsignedShort();
              return length && length > 0 ? this.readUTFBytes(length) : "";
            }, ByteArray.prototype.readUTFBytes = function (length) {
              if (this.validate(length)) {
                var data = this.data,
                    bytes = new Uint8Array(data.buffer, data.byteOffset + this._position, length);
                return this.position += length, this.decodeUTF8(bytes);
              }
            }, ByteArray.prototype.writeBoolean = function (value) {
              this.validateBuffer(1), this._bytes[this.position++] = +value;
            }, ByteArray.prototype.writeByte = function (value) {
              this.validateBuffer(1), this._bytes[this.position++] = 255 & value;
            }, ByteArray.prototype.writeBytes = function (bytes, offset, length) {
              var writeLength;
              void 0 === offset && (offset = 0), void 0 === length && (length = 0), void 0 === offset && (offset = 0), void 0 === length && (length = 0), offset < 0 || length < 0 || (writeLength = 0 == length ? bytes.length - offset : Math.min(bytes.length - offset, length)) > 0 && (this.validateBuffer(writeLength), this._bytes.set(bytes._bytes.subarray(offset, offset + writeLength), this._position), this.position = this._position + writeLength);
            }, ByteArray.prototype.writeDouble = function (value) {
              this.validateBuffer(8), this.data.setFloat64(this._position, value, 0 == this.$endian), this.position += 8;
            }, ByteArray.prototype.writeFloat = function (value) {
              this.validateBuffer(4), this.data.setFloat32(this._position, value, 0 == this.$endian), this.position += 4;
            }, ByteArray.prototype.writeInt = function (value) {
              this.validateBuffer(4), this.data.setInt32(this._position, value, 0 == this.$endian), this.position += 4;
            }, ByteArray.prototype.writeShort = function (value) {
              this.validateBuffer(2), this.data.setInt16(this._position, value, 0 == this.$endian), this.position += 2;
            }, ByteArray.prototype.writeUnsignedInt = function (value) {
              this.validateBuffer(4), this.data.setUint32(this._position, value, 0 == this.$endian), this.position += 4;
            }, ByteArray.prototype.writeUnsignedShort = function (value) {
              this.validateBuffer(2), this.data.setUint16(this._position, value, 0 == this.$endian), this.position += 2;
            }, ByteArray.prototype.writeUTF = function (value) {
              var utf8bytes = this.encodeUTF8(value),
                  length = utf8bytes.length;
              this.validateBuffer(2 + length), this.data.setUint16(this._position, length, 0 == this.$endian), this.position += 2, this._writeUint8Array(utf8bytes, !1);
            }, ByteArray.prototype.writeUTFBytes = function (value) {
              this._writeUint8Array(this.encodeUTF8(value), !0);
            }, ByteArray.prototype.toString = function () {
              return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable;
            }, ByteArray.prototype._writeUint8Array = function (bytes, validateBuffer) {
              void 0 === validateBuffer && (validateBuffer = !0);
              var pos = this._position,
                  npos = pos + bytes.length;
              validateBuffer && this.validateBuffer(npos), this.bytes.set(bytes, pos), this.position = npos;
            }, ByteArray.prototype.validate = function (len) {
              var bl = this._bytes.length;
              return bl > 0 && this._position + len <= bl;
            }, ByteArray.prototype.validateBuffer = function (len) {
              this.writePosition = len > this.writePosition ? len : this.writePosition, len += this._position, this._validateBuffer(len);
            }, ByteArray.prototype.encodeUTF8 = function (str) {
              for (var pos = 0, codePoints = this.stringToCodePoints(str), outputBytes = []; codePoints.length > pos;) {
                var codePoint = codePoints[pos++];
                if (this.inRange(codePoint, 55296, 57343)) this.encoderError(codePoint);else if (this.inRange(codePoint, 0, 127)) outputBytes.push(codePoint);else {
                  var count = 0,
                      offset = 0;

                  for (this.inRange(codePoint, 128, 2047) ? (count = 1, offset = 192) : this.inRange(codePoint, 2048, 65535) ? (count = 2, offset = 224) : this.inRange(codePoint, 65536, 1114111) && (count = 3, offset = 240), outputBytes.push(this.div(codePoint, Math.pow(64, count)) + offset); count > 0;) {
                    var temp = this.div(codePoint, Math.pow(64, count - 1));
                    outputBytes.push(128 + temp % 64), count -= 1;
                  }
                }
              }

              return new Uint8Array(outputBytes);
            }, ByteArray.prototype.decodeUTF8 = function (data) {
              for (var codePoint, pos = 0, result = "", utf8CodePoint = 0, utf8BytesNeeded = 0, utf8BytesSeen = 0, utf8LowerBoundary = 0; data.length > pos;) {
                var _byte = data[pos++];
                if (_byte == this.EofByte) codePoint = 0 != utf8BytesNeeded ? this.decoderError(!1, 0) : this.EofCodePoint;else if (0 == utf8BytesNeeded) this.inRange(_byte, 0, 127) ? codePoint = _byte : (this.inRange(_byte, 194, 223) ? (utf8BytesNeeded = 1, utf8LowerBoundary = 128, utf8CodePoint = _byte - 192) : this.inRange(_byte, 224, 239) ? (utf8BytesNeeded = 2, utf8LowerBoundary = 2048, utf8CodePoint = _byte - 224) : this.inRange(_byte, 240, 244) ? (utf8BytesNeeded = 3, utf8LowerBoundary = 65536, utf8CodePoint = _byte - 240) : this.decoderError(!1, 0), utf8CodePoint *= Math.pow(64, utf8BytesNeeded), codePoint = null);else if (this.inRange(_byte, 128, 191)) {
                  if (utf8BytesSeen += 1, utf8CodePoint += (_byte - 128) * Math.pow(64, utf8BytesNeeded - utf8BytesSeen), utf8BytesSeen !== utf8BytesNeeded) codePoint = null;else {
                    var cp = utf8CodePoint,
                        lowerBoundary = utf8LowerBoundary;
                    utf8CodePoint = 0, utf8BytesNeeded = 0, utf8BytesSeen = 0, utf8LowerBoundary = 0, codePoint = this.inRange(cp, lowerBoundary, 1114111) && !this.inRange(cp, 55296, 57343) ? cp : this.decoderError(!1, _byte);
                  }
                } else utf8CodePoint = 0, utf8BytesNeeded = 0, utf8BytesSeen = 0, utf8LowerBoundary = 0, pos--, codePoint = this.decoderError(!1, _byte);
                null !== codePoint && codePoint !== this.EofCodePoint && (codePoint <= 65535 ? codePoint > 0 && (result += String.fromCharCode(codePoint)) : (codePoint -= 65536, result += String.fromCharCode(55296 + (codePoint >> 10 & 1023)), result += String.fromCharCode(56320 + (1023 & codePoint))));
              }

              return result;
            }, ByteArray.prototype.encoderError = function (codePoint) {}, ByteArray.prototype.decoderError = function (fatal, optCodePoint) {
              return optCodePoint || 65533;
            }, ByteArray.prototype.inRange = function (a, min, max) {
              return min <= a && a <= max;
            }, ByteArray.prototype.stringToCodePoints = function (string) {
              for (var cps = [], i = 0, n = string.length; i < string.length;) {
                var c = string.charCodeAt(i);

                if (this.inRange(c, 55296, 57343)) {
                  if (this.inRange(c, 56320, 57343)) cps.push(65533);else if (i == n - 1) cps.push(65533);else {
                    var d = string.charCodeAt(i + 1);

                    if (this.inRange(d, 56320, 57343)) {
                      var a = 1023 & c,
                          b = 1023 & d;
                      i += 1, cps.push(65536 + (a << 10) + b);
                    } else cps.push(65533);
                  }
                } else cps.push(c);

                i += 1;
              }

              return cps;
            }, ByteArray;
          }(),
              BaseMsgEnum = function () {
            function BaseMsgEnum() {}

            return BaseMsgEnum.getMsgId = function (serviceNo, msgNo) {
              return msgNo < 0 ? -(1e4 * serviceNo - msgNo) : 1e4 * serviceNo + msgNo;
            }, BaseMsgEnum;
          }(),
              CacheManager$1 = function () {
            function CacheManager() {
              this._cache = {};
            }

            return CacheManager.getInstance = function () {
              return null == CacheManager._instance && (CacheManager._instance = new CacheManager()), CacheManager._instance;
            }, CacheManager.prototype.getObject = function (key) {
              if (this._cache[key] && this._cache[key].length > 0) {
                var cacheObject = this._cache[key].shift();

                return cacheObject.isJsonCache = !1, cacheObject;
              }

              return null;
            }, CacheManager.prototype.cacheObject = function (key, value) {
              value.isJsonCache || (null == this._cache[key] && (this._cache[key] = []), value.isJsonCache = !0, this._cache[key].push(value));
            }, CacheManager.prototype.deleteAllCache = function () {
              for (var key in this._cache) {
                var list = this._cache[key];
                if (list) for (; list.length > 0;) {
                  var value = list.shift();
                  value && "function" == typeof value.destroy && value.destroy(), value = null;
                }
              }
            }, CacheManager;
          }().getInstance(),
              MessageVo = function () {
            function MessageVo() {
              this.msgId = 0, this.createFunc = function () {}, this.encodeFuc = function () {}, this.decodeFuc = function () {};
            }

            return MessageVo.create = function () {
              var vo = CacheManager$1.getObject("MessageVo");
              return null === vo && (vo = new MessageVo()), vo;
            }, MessageVo.prototype.update = function (msgId, classObject, className) {
              return void 0 === className && (className = null), this.msgId = msgId, this.createFunc = classObject.create, this.encodeFuc = classObject.encode, this.decodeFuc = classObject.decode, this.className = className, this;
            }, MessageVo.prototype.getmsgId = function () {
              return this.msgId;
            }, MessageVo.prototype.setmsgId = function (value) {
              this.msgId = value;
            }, MessageVo.prototype.getCreateFunc = function () {
              return this.createFunc;
            }, MessageVo.prototype.getEncodeFuc = function () {
              return this.encodeFuc;
            }, MessageVo.prototype.getDecodeFuc = function () {
              return this.decodeFuc;
            }, MessageVo.prototype.getclassName = function () {
              return this.className;
            }, MessageVo.prototype.setclassName = function (value) {
              this.className = value;
            }, MessageVo.prototype.dispose = function () {
              return !0;
            }, MessageVo;
          }(),
              BaseMsgManager$1 = function () {
            function BaseMsgManager() {
              this._msgQueue = [], this._msgMap = {};
            }

            return BaseMsgManager.getInstance = function () {
              return BaseMsgManager._instance || (BaseMsgManager._instance = new BaseMsgManager()), BaseMsgManager._instance;
            }, Object.defineProperty(BaseMsgManager.prototype, "msgQueue", {
              get: function get() {
                return this._msgQueue;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(BaseMsgManager.prototype, "msgMap", {
              get: function get() {
                return this._msgMap;
              },
              enumerable: !1,
              configurable: !0
            }), BaseMsgManager.prototype.registerMsg = function () {
              var _this = this,
                  MsgObj = window.$msgmap || {},
                  MsgModels = _Object$keys(MsgObj);

              0 !== MsgModels.length && MsgModels.forEach(function (modelKey) {
                var model = MsgObj[modelKey],
                    events = _Object$keys(model);

                _this._msgMap[modelKey] = {}, events.forEach(function (eventKey) {
                  var event = model[eventKey],
                      msgId = BaseMsgEnum.getMsgId(event.serviceNo || 0, event.msgNo);
                  _this._msgQueue.push(MessageVo.create().update(msgId, window[modelKey][eventKey])), _this._msgMap[modelKey][eventKey] = msgId;
                });
              });
            }, BaseMsgManager;
          }().getInstance(),
              MsgRegisterManager$1 = function () {
            function MsgRegisterManager() {}

            return MsgRegisterManager.getInstance = function () {
              return MsgRegisterManager._instance || (MsgRegisterManager._instance = new MsgRegisterManager()), MsgRegisterManager._instance;
            }, Object.defineProperty(MsgRegisterManager.prototype, "msgQueue", {
              get: function get() {
                return BaseMsgManager$1.msgQueue;
              },
              enumerable: !1,
              configurable: !0
            }), MsgRegisterManager.prototype.registerMsg = function () {
              BaseMsgManager$1.registerMsg();
            }, MsgRegisterManager;
          }().getInstance(),
              MsgManager$1 = function () {
            function MsgManager() {}

            return MsgManager.getInstance = function () {
              return MsgManager._instance || (MsgManager._instance = new MsgManager(), MsgManager._instance.initMsgQuenu()), MsgManager._instance;
            }, MsgManager.prototype.initMsgQuenu = function () {
              MsgRegisterManager$1.registerMsg();
            }, MsgManager.prototype.getMessageInfo = function (msgId) {
              for (var msgQueue = MsgRegisterManager$1.msgQueue, len = msgQueue.length, i = 0; i < len; i++) {
                var vo = msgQueue[i];
                if (vo.getmsgId() == msgId) return vo;
              }

              return null;
            }, MsgManager.NullMsg = {}, MsgManager;
          }().getInstance(),
              GameUtil = function () {
            function GameUtil() {}

            return GameUtil.setServerTime = function (serverTime) {
              this._serverTimeInterval = Date.now() - serverTime;
            }, GameUtil.getFixTime = function () {
              return Date.now() - this._serverTimeInterval;
            }, GameUtil.encodeProto = function (msgId, jsonData) {
              var msgVo = MsgManager$1.getMessageInfo(msgId);

              if (msgVo) {
                var msg = msgVo.getCreateFunc().call(this, jsonData),
                    bytes = msgVo.getEncodeFuc().call(this, msg).finish(),
                    msgByteArr = new ByteArray(bytes, 0);
                return msgByteArr.endian = "bigEndian", msgByteArr.position = 0, msgByteArr;
              }

              return Logger.warn("msgId尚未注册：", msgId), null;
            }, GameUtil.decodeProto = function (msgId, buffer) {
              var msgInfo = MsgManager$1.getMessageInfo(msgId);

              if (msgInfo) {
                var msgProto = msgInfo.getDecodeFuc().call(this, new Uint8Array(buffer));

                if (msgInfo.getclassName()) {
                  var msg = msgInfo.getclassName().create();
                  return msg.update(msgProto), msg;
                }

                return msgProto;
              }

              return null;
            }, GameUtil._serverTimeInterval = 0, GameUtil;
          }(),
              GateWay = function () {
            function GateWay() {
              this.anchor = 0, this.waitMs = 200, this.battleId = "", this.messageMap = {}, this.overTime = 3e3, this.lastReqSeqId = 0, this._isStart = !1;
            }

            return GateWay.prototype.isStart = function () {
              return this._isStart;
            }, GateWay.prototype.setIsStart = function (v) {
              this._isStart = v;
            }, GateWay.prototype.getBattleId = function () {
              return this.battleId;
            }, GateWay.getInstance = function () {
              return GateWay._instance || (GateWay._instance = new GateWay()), GateWay._instance;
            }, GateWay.prototype.send = function () {
              this.lastReqSeqId = SocketManager$1().socket.getSeqId(), SocketManager$1().sendMessage(40101, {
                anchor: this.anchor,
                battleId: this.battleId,
                seqId: this.lastReqSeqId
              });
            }, GateWay.prototype.onPullRes = function (msgData, ext) {
              var _this = this,
                  waitMs = msgData.waitMs,
                  msgList = msgData.msgList,
                  seqId = ext.seqId;

              this.messageMap = {}, msgList.forEach(function (item) {
                var body = item.body,
                    command = item.command,
                    seq = item.seq,
                    decodeMsgData = GameUtil.decodeProto(command, body);
                (long_1.isLong(seq) ? seq : createLong(String(seq))).lte(_this.anchor) || command && (Config$1.debug && Logger.info("decodeMsgData: " + decodeMsgData), _this.messageMap[command] ? _this.messageMap[command].push(decodeMsgData) : _this.messageMap[command] = [decodeMsgData]);
              }), Config$1.debug && Logger.info("过滤消息后的集合messageMap：", this.messageMap);

              var messageMapKeys = _Object$keys(this.messageMap);

              if (messageMapKeys.forEach(function (key) {
                try {
                  $event.emit(key, _this.messageMap[key], {
                    isMaster: !1
                  });
                } catch (error) {
                  Logger.error("gateway emit报错: key: " + key + "; error: ", error);
                }
              }), _includesInstanceProperty(messageMapKeys).call(messageMapKeys, (-999).toString())) return SetInterval.clear(SchedulerName.GatewayPull), this._isStart = !1, this.anchor = 0, this.messageMap = {}, this.gameEndHook(), void (Config$1.debug && Logger.info("监听游戏结束：-999 anchor: " + this.anchor));
              if (msgList && msgList.length) if (1 !== msgList.length) {
                var _context12;

                var maxStr = _sortInstanceProperty(_context12 = _mapInstanceProperty(msgList).call(msgList, function (item) {
                  return item.seq.toString();
                })).call(_context12, function (x, y) {
                  return y - x;
                });

                createLong(maxStr[0]).gt(this.anchor) && (this.anchor = createLong(maxStr[0])), Config$1.debug && Logger.info("01-msgList中最大的seq为：", maxStr[0], "｜ 当前anchor：", this.anchor.toString());
              } else {
                var seq = msgList[0].seq;
                (long_1.isLong(seq) ? seq : createLong(String(seq))).gt(this.anchor) && (this.anchor = msgList[0].seq), Config$1.debug && Logger.info("02-msgList中最大的seq为：", msgList[0].seq.toString(), "｜ 当前anchor：", this.anchor.toString());
              }
              this.waitMs = waitMs ? Number(waitMs.toString()) : 0, this.lastReqSeqId == seqId && this.pull();
            }, GateWay.prototype.gameEndHook = function () {}, GateWay.prototype.start = function (params) {
              this._isStart = !0, this.anchor = params.msgId || this.anchor, this.battleId = params.battleId || this.battleId, Config$1.debug && Logger.info("gateway start:", this.anchor, this.battleId), this.send(), $event.off(-40101, this.onPullRes, this), $event.on(-40101, this.onPullRes, this);
            }, GateWay.prototype.pull = function () {
              var _this = this;

              Config$1.debug && Logger.info("gateway pull:", this.waitMs, this.anchor.toString()), SetInterval.clear(SchedulerName.GatewayPull), 0 === this.waitMs ? (this.send(), SetInterval.start(function () {
                _this.send();
              }, this.overTime, SchedulerName.GatewayPull)) : SetInterval.start(function () {
                _this.send();
              }, this.waitMs, SchedulerName.GatewayPull);
            }, GateWay;
          }(),
              XxqGateWay = function (_super) {
            function XxqGateWay() {
              return null !== _super && _super.apply(this, arguments) || this;
            }

            return __extends(XxqGateWay, _super), XxqGateWay;
          }(GateWay),
              YuerGateWay = function (_super) {
            function YuerGateWay() {
              return null !== _super && _super.apply(this, arguments) || this;
            }

            return __extends(YuerGateWay, _super), YuerGateWay.prototype.gameEndHook = function () {
              var _context13, _context14;

              GameBridge$1.removeAvatarTags(_mapInstanceProperty(_context13 = SocketManager$1().userInfos).call(_context13, function (item) {
                return item.uid.toString();
              })), Config$1.debug && Logger.info("游戏结束清除tag", _mapInstanceProperty(_context14 = SocketManager$1().userInfos).call(_context14, function (item) {
                return item.uid.toString();
              })), GameBridge$1.setJoinUser([]);
            }, YuerGateWay;
          }(GateWay),
              GateWay$1 = function GateWay$1() {
            return "xxq-pk" === Config$1.gameScene ? new XxqGateWay() : new YuerGateWay();
          },
              positionItems = ["topLeft", "topCenter", "topRight", "bottomLeft", "bottomCenter", "bottomRight"],
              GameBridge$1 = function () {
            function GameBridge() {
              this.visibilitychangeStack = [], this.areaChangeCallback = function () {}, this.x = 0, this.y = 0, this.h = 0, this.w = 0, this.init();
            }

            return GameBridge.getInstance = function () {
              return this._instance || (this._instance = new this());
            }, GameBridge.prototype.init = function () {
              var _this = this,
                  gameSize = getUrlKey("gameSize");

              if (gameSize) {
                var gameSplits = gameSize.split("_");
                gameSplits && 4 === gameSplits.length && (this.x = Number(gameSplits[0]), this.y = Number(gameSplits[1]), this.w = Number(gameSplits[2]), this.h = Number(gameSplits[3]));
              }

              document.addEventListener("visibilitychange", function () {
                !document.hidden && _this.visibilitychangeStack.length && (_this.visibilitychangeStack.forEach(function (func) {
                  _this.getRoomInfo().then(function (res) {
                    func(res.gameArea);
                  });
                }), _this.visibilitychangeStack = []);
              }), Bridge$1.bindEvent("cr_game_seat_area_update", function (_a) {
                _this.getRoomInfo().then(function (res) {
                  _this.areaChangeCallback(res.gameArea);
                });
              });
            }, GameBridge.prototype.checkValue = function (target) {
              return !!target || 0 === target;
            }, GameBridge.prototype.setGameArea = function (cb) {
              this.areaChangeCallback = cb, this.visibilitychangeStack.push(cb), this.getRoomInfo().then(function (res) {
                cb(res.gameArea);
              });
            }, GameBridge.prototype.getGameArea = function () {
              var _this = this;

              return new _Promise(function (resolve, reject) {
                0 === _this.x && 0 === _this.y && 0 === _this.w && 0 === _this.h ? reject("获取游戏区域失败，请检查gameSize参数") : resolve({
                  x: _this.x,
                  y: _this.y,
                  w: _this.w,
                  h: _this.h
                });
              });
            }, GameBridge.prototype.updateGameArea = function (param) {
              var x = param.x,
                  y = param.y,
                  w = param.w,
                  h = param.h;
              return Bridge$1.invoke("cr_game_gamearea", {
                x: this.checkValue(x) ? Number(x) : this.x,
                y: this.checkValue(y) ? Number(y) : this.y,
                h: this.checkValue(h) ? Number(h) : this.h,
                w: this.checkValue(w) ? Number(w) : this.w
              });
            }, GameBridge.prototype.updateAvatarsStatus = function (data) {
              Bridge$1.call("cr_game_updateAvatarsStatus", {
                data: data
              });
            }, GameBridge.prototype.removeAvatarTags = function (uids) {
              if (uids && uids.length > 0) {
                var removeList = _mapInstanceProperty(uids).call(uids, function (uid) {
                  return {
                    uid: uid,
                    status: "default",
                    borderColor: "#ffffff",
                    tags: _mapInstanceProperty(positionItems).call(positionItems, function (position) {
                      return {
                        isShow: !1,
                        position: position
                      };
                    })
                  };
                });

                this.updateAvatarsStatus(removeList);
              }
            }, GameBridge.prototype.setInitiator = function (uid) {
              this.updateAvatarsStatus([{
                uid: uid,
                status: "default",
                borderColor: "#FFD476",
                tags: [{
                  isShow: !0,
                  position: "bottomCenter",
                  style: "corners",
                  backgroundColor: "#FFD476",
                  content: "发起者",
                  height: 12,
                  fontSize: 7
                }]
              }]);
            }, GameBridge.prototype.setJoiners = function (uids) {
              uids && uids.length > 0 && this.updateAvatarsStatus(_mapInstanceProperty(uids).call(uids, function (uid) {
                return {
                  uid: uid,
                  status: "default",
                  borderColor: "#78FFE0",
                  tags: [{
                    isShow: !0,
                    position: "bottomCenter",
                    style: "corners",
                    backgroundColor: "#78FFE0",
                    content: "已加入",
                    fontSize: 7,
                    height: 12
                  }]
                };
              }));
            }, GameBridge.prototype.setWatchers = function (uids) {
              uids && uids.length > 0 && this.updateAvatarsStatus(_mapInstanceProperty(uids).call(uids, function (uid) {
                return {
                  uid: uid,
                  status: "watching"
                };
              }));
            }, GameBridge.prototype.setJoinUser = function (uids) {
              Bridge$1.call("cr_game_updatePlayingUserList", {
                data: uids
              });
            }, GameBridge.prototype.getRoomInfo = function () {
              return Bridge$1.invoke("cr_game_roominfo");
            }, GameBridge.prototype.setNetwork = function (uid, ifBadNetwork) {
              void 0 === ifBadNetwork && (ifBadNetwork = !0), this.updateAvatarsStatus([{
                uid: uid,
                status: ifBadNetwork ? "bad_network" : "default"
              }]);
            }, GameBridge.prototype.loadSuccess = function () {
              Bridge$1.call("cr_game_loadSuccess"), Bridge$1.call("page_loadProgress", {
                value: 100
              }), Bridge$1.call("page_complete");
            }, GameBridge.prototype.loadFail = function () {
              Bridge$1.call("cr_game_loadFailure");
            }, GameBridge.prototype.openGiftBoard = function () {
              Bridge$1.call("cr_game_openGiftBoard");
            }, GameBridge.prototype.exitGame = function (delayTime) {
              var _this = this;

              return new _Promise(function (resolve) {
                _this.confirm({
                  title: "确定要解散游戏吗？",
                  msg: "退出游戏模式将结束游戏并回到普通模式，确定退出吗？",
                  okButtonText: "确定",
                  cancelButtonText: "取消"
                }).then(function (res) {
                  if (resolve(res), res && "ok" === res.clickResult) {
                    var battleId = GateWay$1().getBattleId(),
                        param = {
                      uid: Config$1.uid.toString(),
                      roomId: Config$1.roomId
                    };
                    battleId && (param.battleId = battleId), Config$1.debug && Logger.info("解散游戏入参：" + _JSON$stringify(param)), Ws.sendMessage(10205, param), setTimeout(function () {
                      Bridge$1.call("cr_game_exitGame");
                    }, delayTime || 0);
                  }
                })["catch"](function (err) {
                  console.error("解散游戏回调catch：", err);
                });
              });
            }, GameBridge.prototype.exitRoom = function () {
              Bridge$1.call("cr_game_exitRoom");
            }, GameBridge.prototype.getkicked = function () {
              var _this = this;

              return new _Promise(function (resolve) {
                _this.confirm({
                  title: "已在其他客户端登录是否重连游戏？",
                  okButtonText: "重连",
                  cancelButtonText: "取消"
                }).then(function (res) {
                  resolve(res), res && ("ok" === res.clickResult ? SocketManager$1().reConnectWebSocket() : "cancel" === res.clickResult && _this.exitRoom());
                });
              });
            }, GameBridge.prototype.noticeJoinGame = function () {
              Bridge$1.call("cr_game_onMicrophone");
            }, GameBridge.prototype.toast = function (data) {
              Bridge$1.call("ui_showToast", data);
            }, GameBridge.prototype.confirm = function (data) {
              return Bridge$1.invoke("cr_game_showConfirm", data);
            }, GameBridge;
          }().getInstance(),
              ClientSocket = function () {
            function ClientSocket() {
              this.socket = null, this.connectUrl = "", this.socketOpenStatus = !1, this.startReconnectTime = 0, this.startReconnectCount = 0, this._canReconnect = !0, this._isReconnect = !1, this.seqId = 0, this.isDelaySchedule = !1;
            }

            return Object.defineProperty(ClientSocket.prototype, "canReconnect", {
              set: function set(value) {
                this._canReconnect = value;
              },
              enumerable: !1,
              configurable: !0
            }), Object.defineProperty(ClientSocket.prototype, "isReconnect", {
              get: function get() {
                return this._isReconnect;
              },
              enumerable: !1,
              configurable: !0
            }), ClientSocket.prototype.getSeqId = function () {
              return ++this.seqId;
            }, ClientSocket.prototype.connectByURl = function () {
              Config$1.getNextInstanceIndex();
              var url = Config$1.socketUrl;
              this.connectUrl = url, null === this.socket && (this.socket = new WebSocket(url), this.socket.binaryType = "arraybuffer"), Config$1.debug && (Logger.info("-------开始连接websocket------"), Logger.info(url)), this.registerWebSocketEvents();
            }, ClientSocket.prototype.registerWebSocketEvents = function () {
              this.socket && (this.socket.onopen = this.socketOpen.bind(this), this.socket.onclose = this.socketClose.bind(this), this.socket.onmessage = this.socketMesssage.bind(this), this.socket.onerror = this.socketError.bind(this));
            }, ClientSocket.prototype.socketOpen = function (event) {
              Config$1.debug && (Logger.info("--------webSocket socketOpen---------"), Logger.info(event)), this.socketOpenStatus = !0, this.startReconnectTime = 0, this.startReconnectCount > 3 && this.reConnectHook(), this.startReconnectCount = 0, this._canReconnect = !0, this._isReconnect = !1, SetInterval.clear(SchedulerName.ConnectOverTime), SocketManager$1().socketOpen(), $event.emit(WebSocketEnum.SocketOpen, event);
            }, ClientSocket.prototype.socketClose = function (event) {
              if (Config$1.debug) {
                Logger.info("--------webSocket socketClose---------");
                var code = event.code,
                    reason = event.reason,
                    wasClean = event.wasClean,
                    target = event.target;
                Logger.info("closeError: code: " + code + "; reason: " + reason + "; wasClean: " + wasClean + "; readyState: " + (target || {}).readyState + "; url: " + (target || {}).url);
              }

              var currentSocketUrl = (event.target || event.currentTarget || {}).url;

              if (currentSocketUrl) {
                var currentInstance = getUrlKey("instance", currentSocketUrl);
                if (Logger.info("onclose：close-socketUrl：" + currentSocketUrl + "; config-socketUrl：" + Config$1.socketUrl), currentInstance && Number(currentInstance) !== Config$1.instanceIndex) return void Logger.info("socket close instanceIndex 不匹配，拒绝重连...");
              }

              Logger.info("socket close后准备重连..."), this.socketOpenStatus = !1, this.clean(), $event.emit(WebSocketEnum.SocketClose, event), this.reConnectWebSocket();
            }, ClientSocket.prototype.socketMesssage = function (event) {
              this.readMessage(event.data);
            }, ClientSocket.prototype.socketError = function (event) {
              Config$1.debug && (Logger.info("--------webSocket socketError---------"), Logger.error(event)), this.socketOpenStatus = !1, $event.emit(WebSocketEnum.SocketError, event), this.reConnectWebSocket();
            }, ClientSocket.prototype.getMsgData = function (msgLen, msgId, data) {
              var protoLen = msgLen - 14,
                  protoByte = new ByteArray(null, 0);
              data.readBytes(protoByte, 0, protoLen);
              var msgData = GameUtil.decodeProto(msgId, protoByte.buffer);
              return protoByte.clear(), msgData;
            }, ClientSocket.prototype.readMessage = function (msg) {
              var data = new ByteArray(msg, 0),
                  msgLen = data.readInt();
              data.readByte();
              var gameId = data.readInt(),
                  msgId = data.readInt(),
                  seqId = data.readInt(),
                  msgState = data.readByte();

              if (0 == msgState) {
                var msgData = this.getMsgData(msgLen, msgId, data);

                if (Config$1.debug && msgId !== BaseMsgManager$1.msgMap.ProMessage.HeartBeatRes) {
                  var lllog = Date.now() + ";msgId:" + msgId + ";seqId:" + seqId + ";gameId:" + gameId + ";msgLen:" + msgLen;
                  msgData && (lllog = lllog + ";data:" + _JSON$stringify(msgData)), Logger.info(lllog);
                }

                if (-40005 === msgId) return Logger.info("拦截 -40005 啦！"), this.canReconnect = !1, SetInterval.clear(SchedulerName.GatewayPull), void this.kickedHook();
                seqId < 0 && (Config$1.debug && Logger.info("点对点ack发送: msgId: " + msgId + "; seqId: " + seqId + "; $gameId: " + gameId), this.sendMessage(msgId, {
                  seqId: seqId
                })), $event.emit(msgId, msgData, {
                  seqId: seqId,
                  msgId: msgId,
                  isMaster: !0
                });
              } else {
                (msgData = this.getMsgData(msgLen, -8001, data)) && msgData.notify && GameBridge$1.toast({
                  message: msgData.notify
                }), Config$1.debug && Logger.error("~~~~<<<< msgId: " + msgId + "; seqId: " + seqId + "; 错误码: " + msgState + "; 错误消息: " + _JSON$stringify(msgData));
              }
            }, ClientSocket.prototype.sendMessage = function (msgId, msg) {
              var _a;

              if (this.socketOpenStatus) {
                var protoByteArr = GameUtil.encodeProto(msgId, msg),
                    msgByteArr = new ByteArray(null, 0),
                    seqId = 0 === msg.seqId ? 0 : msg.seqId || ++this.seqId;

                if (msgByteArr.writeInt(protoByteArr.length + 14), msgByteArr.writeByte(1), msgByteArr.writeInt(Config$1.gameId), msgByteArr.writeInt(msgId), msgByteArr.writeInt(seqId), msgByteArr.writeByte(0), msgByteArr.writeBytes(protoByteArr, 0, protoByteArr.length), null === (_a = this.socket) || void 0 === _a || _a.send(msgByteArr.buffer), protoByteArr.clear(), msgByteArr.clear(), Config$1.debug && msgId !== BaseMsgManager$1.msgMap.ProMessage.HeartBeatReq) {
                  var llog = "~~~~>>>> msgId: " + msgId + "; seqId: " + seqId + "; gameId: " + Config$1.gameId + "; " + _JSON$stringify(msg);

                  Logger.info(llog);
                }
              } else Logger.info("socket未打开:", "msgId:", msgId);
            }, ClientSocket.prototype.reConnectWebSocket = function () {
              if (Config$1.debug && Logger.info("------websocket重连：是否能重连------", this._canReconnect), this._canReconnect) {
                this._isReconnect = !0, Config$1.debug && Logger.info("------websocket重连：正式开始重连------");
                var curTime = Date.now();
                0 === this.startReconnectTime ? (this.startReconnectTime = curTime, this.delayReconnect()) : this.addOrRemoveDelaySchedule(!0);
              }
            }, ClientSocket.prototype.addOrRemoveDelaySchedule = function (value) {
              value ? this.isDelaySchedule || (this.isDelaySchedule = !0, SetInterval.clear(SchedulerName.DelayReconnect), SetInterval.start(this.delayReconnect.bind(this), 1e3, SchedulerName.DelayReconnect)) : (this.isDelaySchedule = !1, SetInterval.clear(SchedulerName.DelayReconnect));
            }, ClientSocket.prototype.delayReconnect = function () {
              this.addOrRemoveDelaySchedule(!1), this.reconnectImmediately();
            }, ClientSocket.prototype.reconnectImmediately = function () {
              Config$1.debug && Logger.info("----websocket开始重连-----"), this.startReconnectCount++, 3 !== this.startReconnectCount && this.startReconnectCount % 10 != 8 || GameBridge$1.toast({
                message: "当前网络状态异常，正在重连"
              }), $event.emit(WebSocketEnum.StartReconnect, null), this.clean(), this.connectByURl();
            }, ClientSocket.prototype.isConnect = function () {
              return !(!this.socket || 1 != this.socket.readyState);
            }, ClientSocket.prototype.close = function () {
              this.socket && this.socket.close();
            }, ClientSocket.prototype.clean = function () {
              this.socket && (this.socketOpenStatus && this.socket.close(), this.socket = null);
            }, ClientSocket.prototype.reConnectHook = function () {}, ClientSocket.prototype.kickedHook = function () {}, ClientSocket;
          }(),
              XxqClientSocket = function (_super) {
            function XxqClientSocket() {
              return null !== _super && _super.apply(this, arguments) || this;
            }

            return __extends(XxqClientSocket, _super), XxqClientSocket;
          }(ClientSocket),
              YuerClientSocket = function (_super) {
            function YuerClientSocket() {
              return null !== _super && _super.apply(this, arguments) || this;
            }

            return __extends(YuerClientSocket, _super), YuerClientSocket.prototype.reConnectHook = function () {
              GameBridge$1.toast({
                message: "重连成功"
              });
            }, YuerClientSocket.prototype.kickedHook = function () {
              GameBridge$1.getkicked();
            }, YuerClientSocket;
          }(ClientSocket),
              ClientSocket$1 = function ClientSocket$1() {
            return "xxq-pk" === Config$1.gameScene ? new XxqClientSocket() : new YuerClientSocket();
          },
              SocketManager = function () {
            function SocketManager() {
              this.socket = ClientSocket$1(), this.lastGetHeartTime = 0, this.timeOutId = -1, this.heartIndex = 0, this.isGameHide = !1, this.joinUsers = [], this.noJoinUsers = [], this.initiator = "", this.userInfos = [], this.offlineUsers = [];
            }

            return SocketManager.prototype.connectWebsocket = function () {
              this.socket && !this.socket.isConnect() && (this.socket.connectByURl(), this.connectWebsocketHook());
            }, SocketManager.prototype.isConnect = function () {
              return this.socket && this.socket.isConnect();
            }, SocketManager.prototype.sendMessage = function (msgId, content) {
              if (!this.socket.isConnect()) return Config$1.debug && Logger.info("SocketManager websocket未连接:", "msgId:", msgId, ";isReconnect:", this.socket.isReconnect), void (this.socket.isReconnect || this.reConnectWebSocket());
              this.joinGameHook(msgId, content), this.socket.sendMessage(msgId, content);
            }, SocketManager.prototype.reConnectWebSocket = function () {
              this.socket.isConnect() || (Config$1.debug && Logger.info("SocketManager 断线重连"), this.socket.canReconnect = !0, this.socket.reConnectWebSocket());
            }, SocketManager.prototype.close = function () {
              this.socket && this.socket.close();
            }, SocketManager.prototype.socketOpen = function () {
              this.startHandShake();
            }, SocketManager.prototype.startHandShake = function () {
              if (this.socket.isConnect()) {
                this.lastGetHeartTime = Date.now(), SetInterval.clear(SchedulerName.HeartBreakFunc), SetInterval.start(this.heartBreakFunc.bind(this), Config$1.heartTime, SchedulerName.HeartBreakFunc), this.heartBreakFunc();
                var EnterGameReq = BaseMsgManager$1.msgMap.Message.EnterGameReq;
                EnterGameReq ? this.sendMessage(EnterGameReq, {
                  roomId: Config$1.roomId,
                  uid: Config$1.uid
                }) : Config$1.debug && Logger.warn("EnterGameReq 未注册成功！");
              } else Config$1.debug && Logger.info("websocket未连接：握手");
            }, SocketManager.prototype.startGateway = function (params) {
              GateWay$1().isStart() ? Logger.warn("start gateway只能调用一次") : GateWay$1().start(params);
            }, SocketManager.prototype.heartBreakFunc = function () {
              var _this = this;

              return this.timeOutId > -1 && (clearTimeout(this.timeOutId), this.timeOutId = -1), this.socket.isConnect() ? Date.now() - this.lastGetHeartTime > 4 * Config$1.heartTime ? (Config$1.debug && Logger.warn("-------SocketManager heartBreakFunc 心跳异常-------"), void this.close()) : (this.socket.sendMessage(BaseMsgManager$1.msgMap.ProMessage.HeartBeatReq, {
                index: this.getSocketMsgIndex()
              }), void (this.isGameHide && (this.timeOutId = setTimeout(function () {
                _this.heartBreakFunc();
              }, Config$1.heartTime)))) : (Config$1.debug && Logger.info("websocket未连接：心跳"), void SetInterval.clear(SchedulerName.HeartBreakFunc));
            }, SocketManager.prototype.getSocketMsgIndex = function () {
              return this.heartIndex += 1, this.heartIndex = this.heartIndex % 1e15, this.heartIndex;
            }, SocketManager.prototype.initData = function () {
              var _this = this;

              if (this.socket || (this.socket = ClientSocket$1()), BaseMsgManager$1.msgMap.Message) {
                var _a = BaseMsgManager$1.msgMap.Message,
                    GameSnapshotResp = _a.GameSnapshotResp,
                    GameStatusResp = _a.GameStatusResp,
                    HeartBeatRes = BaseMsgManager$1.msgMap.ProMessage.HeartBeatRes;
                HeartBeatRes ? $event.on(HeartBeatRes, this.heartBeatRes, this) : Config$1.debug && Logger.warn("HeartBeatRes 未注册成功！"), GameSnapshotResp ? $event.on(GameSnapshotResp, this.sendIdentityBridge, this) : Config$1.debug && Logger.warn("GameSnapshotResp 未注册成功！"), GameStatusResp ? $event.on(GameStatusResp, function (res) {
                  var success = res.success,
                      battleId = res.battleId;
                  Config$1.debug && Logger.info("监听-10204，启动消息体gateway: " + battleId), success && _this.startGateway({
                    battleId: battleId
                  }), _this.gameStartHook(res);
                }, this) : Config$1.debug && Logger.warn("GameStatusResp 未注册成功！"), $event.on(-500, function (res) {
                  var battleId = res.battleId,
                      seqId = res.seqId;
                  Config$1.debug && Logger.info("监听-500，重启消息体gateway: " + battleId + ", " + seqId), SetInterval.clear(SchedulerName.GatewayPull), GateWay$1().setIsStart(!1), _this.startGateway({
                    battleId: battleId,
                    msgId: seqId
                  }), _this.userReEnterHook();
                }, this), this.batNetworkHook(), this.msgToastHook();
              }
            }, SocketManager.prototype.heartBeatRes = function (data) {
              this.lastGetHeartTime = Date.now();
            }, SocketManager.prototype.connectWebsocketHook = function () {}, SocketManager.prototype.joinGameHook = function (msgId, content) {}, SocketManager.prototype.gameStartHook = function (res) {}, SocketManager.prototype.userReEnterHook = function () {}, SocketManager.prototype.batNetworkHook = function () {}, SocketManager.prototype.msgToastHook = function () {}, SocketManager.prototype.sendIdentityBridge = function (data) {}, SocketManager;
          }(),
              YuerSocketManager = function (_super) {
            function YuerSocketManager() {
              return null !== _super && _super.apply(this, arguments) || this;
            }

            return __extends(YuerSocketManager, _super), YuerSocketManager.prototype.connectWebsocketHook = function () {
              var _this = this,
                  KickingPeopleReq = BaseMsgManager$1.msgMap.Message.KickingPeopleReq;

              Bridge$1.bindEvent("cr_game_kickOut", function (e) {
                if (console.log(e), e && e.data) {
                  var _context15;

                  var res = "string" == typeof e.data ? JSON.parse(e.data) : e.data;
                  if (!_includesInstanceProperty(_context15 = _this.joinUsers).call(_context15, res.uid)) return;
                  Logger.info("cr_game_kickOut回调成功", res), KickingPeopleReq ? (_this.sendMessage(KickingPeopleReq, {
                    roomId: Config$1.roomId,
                    uid: res.uid
                  }), GameBridge$1.toast({
                    message: "已踢出该用户"
                  })) : Logger.info("KickingPeopleReq未注册成功！");
                }
              });
            }, YuerSocketManager.prototype.joinGameHook = function (msgId, content) {
              msgId === BaseMsgManager$1.msgMap.Message.PrepareJoinGame && content && 1 === content.readyStatus && GameBridge$1.noticeJoinGame();
            }, YuerSocketManager.prototype.sendIdentityBridge = function (data) {
              var _this = this;

              if (this.userInfos = data.userInfos || [], this.initiator = "", this.joinUsers = [], this.noJoinUsers = [], this.offlineUsers = [], this.userInfos.forEach(function (v) {
                switch (v.identity) {
                  case 1:
                    _this.initiator = v.uid.toString();
                    break;

                  case 2:
                    _this.joinUsers.push(v.uid.toString());

                    break;

                  case 3:
                    _this.noJoinUsers.push(v.uid.toString());

                }

                1 !== v.status && _this.offlineUsers.push(v.uid.toString());
              }), this.noJoinUsers.length && GameBridge$1.removeAvatarTags(this.noJoinUsers), Logger.warn("battleIdbattleId ", data.battleId.toString()), data.battleId.toString() && "0" !== data.battleId.toString()) return GameBridge$1.setWatchers(this.noJoinUsers), Logger.info("当前掉线人：", this.offlineUsers), void this.offlineUsers.forEach(function (offlineUser) {
                GameBridge$1.setNetwork(offlineUser, !0);
              });
              this.initiator && GameBridge$1.setInitiator(this.initiator), this.joinUsers.length && GameBridge$1.setJoiners(this.joinUsers);
            }, YuerSocketManager.prototype.gameStartHook = function (res) {
              var success = res.success,
                  msg = res.msg;
              success ? (Bridge$1.call("cr_game_minipage", {
                type: "hide"
              }), GameBridge$1.removeAvatarTags(__spreadArrays(this.joinUsers, [this.initiator])), this.noJoinUsers.length && GameBridge$1.setWatchers(this.noJoinUsers), GameBridge$1.setJoinUser(__spreadArrays(this.joinUsers, [this.initiator]))) : msg && GameBridge$1.toast({
                message: msg
              });
            }, YuerSocketManager.prototype.userReEnterHook = function () {
              GameBridge$1.setJoinUser(__spreadArrays(this.joinUsers, [this.initiator]));
            }, YuerSocketManager.prototype.batNetworkHook = function () {
              $event.on(-600, function (res) {
                if (res && res[0]) {
                  var info = res[0];
                  2 === info.changeType ? GameBridge$1.setNetwork(info.uid.toString(), !1) : 3 === info.changeType && GameBridge$1.setNetwork(info.uid.toString(), !0);
                }
              }, this);
            }, YuerSocketManager.prototype.msgToastHook = function () {
              var MsgToast = BaseMsgManager$1.msgMap.Message.MsgToast;
              MsgToast && $event.on(MsgToast, function (res) {
                res && GameBridge$1.toast({
                  message: res.msg
                });
              }, this);
            }, YuerSocketManager.getInstance = function () {
              return YuerSocketManager._instance || (YuerSocketManager._instance = new YuerSocketManager(), YuerSocketManager._instance.initData()), YuerSocketManager._instance;
            }, YuerSocketManager;
          }(SocketManager),
              XxqSocketManager = function (_super) {
            function XxqSocketManager() {
              return null !== _super && _super.apply(this, arguments) || this;
            }

            return __extends(XxqSocketManager, _super), XxqSocketManager.getInstance = function () {
              return XxqSocketManager._instance || (XxqSocketManager._instance = new XxqSocketManager(), XxqSocketManager._instance.initData()), XxqSocketManager._instance;
            }, XxqSocketManager;
          }(SocketManager),
              SocketManager$1 = function SocketManager$1() {
            return "xxq-pk" === Config$1.gameScene ? XxqSocketManager.getInstance() : YuerSocketManager.getInstance();
          };

          function parseDataToUrl(url, data) {
            var dataStr = "";
            return "object" == _typeof(data) && null !== data && _Object$keys(data).length > 0 && _Object$keys(data).forEach(function (key) {
              dataStr += key + "=" + data[key] + "&";
            }), "" !== dataStr && (url = url + "?" + (dataStr = dataStr.substr(0, _lastIndexOfInstanceProperty(dataStr).call(dataStr, "&")))), url;
          }

          var Request = {
            post: function post(url, data, headers) {
              return void 0 === headers && (headers = {}), fetch(url, {
                body: isPlainObject(data) ? _JSON$stringify(data) : data,
                headers: _assign({
                  "Content-Type": "application/json;charset=utf-8"
                }, headers),
                method: "POST"
              }).then(function (response) {
                return response.json();
              });
            },
            get: function get(url, data, headers) {
              return void 0 === data && (data = {}), void 0 === headers && (headers = {}), fetch(parseDataToUrl(url, data), {
                headers: _assign({
                  "Content-Type": "application/x-www-form-urlencoded"
                }, headers),
                method: "GET"
              }).then(function (response) {
                return response.json();
              });
            },
            sendDelete: function sendDelete(url, data, headers) {
              return void 0 === data && (data = {}), void 0 === headers && (headers = {}), fetch(parseDataToUrl(url, data), {
                headers: _assign({
                  "Content-Type": "application/x-www-form-urlencoded"
                }, headers),
                method: "DELETE"
              }).then(function (response) {
                return response.json();
              });
            }
          },
              CatManager$1 = function () {
            function CatManager() {
              this.catArrayCache = [], this.appId = 210006, this.init();
            }

            return CatManager.getInstance = function () {
              return this._instance || (this._instance = new CatManager());
            }, CatManager.prototype.init = function () {
              _Promise.all([this.checkAppVersion(), this.getNetType()]).then(function () {
                Logger.info("CatManager init success: 该版本信息：", Config$1.appVersion, ", 该网络信息：", Config$1.netType);
              })["catch"](function (e) {
                Logger.error("CatManager init error:", e);
              });
            }, CatManager.prototype.pushCat = function (cmd, reqTime, stateCode) {
              var paramString = this.getCatParam(cmd, reqTime, stateCode);
              0 !== Config$1.appVersion && -1 !== Config$1.netType ? (this.sendCat(paramString), this.putCatCache()) : this.catArrayCache.push(paramString);
            }, CatManager.prototype.sendCat = function (paramString) {
              var param = function (str) {
                return gzipSync$1(str);
              }(function (str) {
                for (var arr = [], i = 0, j = str.length; i < j; ++i) {
                  arr.push(str.charCodeAt(i));
                }

                return new Uint8Array(arr);
              }(paramString));

              Request.post(this.getCatPath(), param, {
                "Content-type": "application/x-www-form-urlencoded",
                "Content-Encoding": "gzip"
              }).then(function () {
                return Logger.info("cat 上报成功:", paramString);
              })["catch"](function () {
                return Logger.info("cat 上报失败:", paramString);
              });
            }, CatManager.prototype.getCatPath = function () {
              return {
                local: "https://test-cat-broker.yupaopao.cn",
                test: "https://test-cat-broker.yupaopao.cn",
                uat: "https://cat-broker.yupaopao.cn",
                pro: "https://cat-broker.yupaopao.cn"
              }[getEnv().name] + ("/broker-service/commandbatch?v=5&unionId=&p=" + this.appId);
            }, CatManager.prototype.getCatParam = function (cmd, reqTime, stateCode) {
              var now = Date.now(),
                  network = -1 === Config$1.netType ? "netType" : Config$1.netType,
                  appVersion = 0 == Config$1.appVersion ? "appVersion" : Config$1.appVersion,
                  platform = 2,
                  time = reqTime;
              return Bridge$1.isAndroid && (platform = 1), "unionid=&c=\n" + now + "\t" + network + "\t" + appVersion + "\t0\t" + cmd + "\t" + stateCode + "\t" + platform + "\t0\t0\t" + time + "\t\t\t\n";
            }, CatManager.prototype.checkAppVersion = function () {
              return new _Promise(function (resolve, reject) {
                var _a,
                    _b,
                    version = (null === (_b = null === (_a = null == Bridge$1 ? void 0 : Bridge$1.detail) || void 0 === _a ? void 0 : _a.bundle) || void 0 === _b ? void 0 : _b.version) || "0";

                Config$1.appVersion = _parseInt(version.replace(/\./g, "")), resolve(!0);
              });
            }, CatManager.prototype.getNetType = function () {
              return new _Promise(function (resolve, reject) {
                Bridge$1.call("device_reachability", function (res) {
                  var netType = res.status;
                  Config$1.netType = function (str) {
                    var networkType;

                    switch (str) {
                      case "WIFI":
                        networkType = 1;
                        break;

                      case "4G":
                        networkType = 4;
                        break;

                      case "3G":
                        networkType = 3;
                        break;

                      case "2G":
                        networkType = 2;
                        break;

                      default:
                        networkType = 0;
                    }

                    return networkType;
                  }(netType), resolve(!0);
                });
              });
            }, CatManager.prototype.putCatCache = function () {
              var _this = this;

              this.catArrayCache.forEach(function (item) {
                var paramstring = item.replace(/appVersion/, Config$1.appVersion.toString());
                paramstring = paramstring.replace(/netType/, Config$1.netType.toString()), _this.sendCat(paramstring);
              }), this.catArrayCache = [];
            }, CatManager;
          }().getInstance(),
              event = $event;

          var Ws = {
            isConnect: function isConnect() {
              return SocketManager$1().isConnect();
            },
            connectWebsocket: function connectWebsocket() {
              return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  return Config$1.requestURI().then(function (e) {
                    Logger.info("动态的长连地址：", Config$1.socketUrl), SocketManager$1().connectWebsocket();
                  })["catch"](function (err) {
                    Logger.info("静态的长连地址：", Config$1.socketUrl), SocketManager$1().connectWebsocket();
                  }), [2];
                });
              });
            },
            sendMessage: function sendMessage(msgId, content) {
              SocketManager$1().sendMessage(msgId, content);
            },
            startGateway: function startGateway(params) {
              SocketManager$1().startGateway(params);
            },
            onOpen: function onOpen(callback) {
              event.on(WebSocketEnum.SocketOpen, callback, event);
            },
            on: function on(eventName, callback) {
              event.on(eventName, callback, event);
            },
            emit: function emit(eventName, data, extra) {
              event.emit(eventName, data, extra);
            },
            off: function off(eventName, callback) {
              event.off(eventName, callback, event);
            },
            onClose: function onClose(callback) {
              event.on(WebSocketEnum.SocketClose, callback, event);
            },
            onError: function onError(callback) {
              event.on(WebSocketEnum.SocketError, function (data) {
                return callback(data);
              }, event);
            },
            config: Config$1,
            pushCat: function pushCat(cmd, reqTime, stateCode) {
              CatManager$1.pushCat(cmd, reqTime, stateCode);
            },
            getMsgMap: function getMsgMap() {
              return BaseMsgManager$1.msgMap;
            }
          };

          function useLocalstorage(localName) {
            return {
              set: function set(value) {
                localStorage.setItem(localName, _JSON$stringify(value));
              },
              get: function get() {
                return JSON.parse(localStorage.getItem(localName));
              },
              remove: function remove() {
                localStorage.removeItem(localName);
              },
              clear: function clear() {
                localStorage.clear();
              }
            };
          }

          var listener = null,
              Webview = function () {
            function Webview(gameId, isDev) {
              if (void 0 === isDev && (isDev = !1), !gameId) throw new Error("请填写gameId");
              this.gameId = gameId, this.isDev = isDev, this.isConnect = !1, this.cacheEvents = [], isDev && console.warn("警告：new Webview第二个参数只有本地开发时才能启用！！"), this.rootName = "bxyuer_gamePlay_" + gameId, this.init();
            }

            return Webview.prototype.storageListener = function (event) {
              if (this.isDev) {
                var key = event.key,
                    newValue = event.newValue;
                key && $event.exist(key) && $event.emit(key, newValue ? JSON.parse(newValue) : "");
              }
            }, Webview.prototype.init = function () {
              this.isDev && null === listener && (window.addEventListener("storage", this.storageListener.bind(this)), listener = this.storageListener);
            }, Webview.prototype.destory = function () {
              this.isDev && window.removeEventListener("storage", this.storageListener.bind(this));
            }, Webview.prototype.create = function (url, localloadKey) {
              var _this = this;

              if (void 0 === localloadKey && (localloadKey = ""), !url) throw new Error("创建webview需要填写url");
              return new _Promise(function (resolve) {
                _this.on("bxyuer_test_connect_success", function () {
                  Config$1.debug && Logger.info("webview 创建成功！"), resolve(!0), _this.isConnect = !0, _this.cacheEvents.length > 0 && (_this.cacheEvents.forEach(function (cache) {
                    _this.emit(cache.eventName, cache.data);
                  }), _this.cacheEvents = []);
                });

                var param = {
                  type: "init",
                  data: url
                };
                localloadKey && (param.localload = localloadKey), Bridge$1.call("cr_game_minipage", param);
              });
            }, Webview.prototype.load = function () {
              this.emit("bxyuer_test_connect_success", {}), this.isConnect = !0;
            }, Webview.prototype.show = function () {
              Bridge$1.call("cr_game_minipage", {
                type: "show"
              });
            }, Webview.prototype.hide = function () {
              Bridge$1.call("cr_game_minipage", {
                type: "hide"
              });
            }, Webview.prototype.on = function (eventName, callback) {
              if (eventName) {
                var name = this.rootName + "_" + eventName;

                if (this.isDev) {
                  var _a = useLocalstorage(name),
                      get = _a.get,
                      set = _a.set;

                  return get() || set({}), void $event.on(name, callback, $event);
                }

                $event.on(name, callback, $event), window["bxyuer_gameEvents_" + this.gameId] = {}, window["bxyuer_gameEvents_" + this.gameId].emitFunc = this.emitFunc.bind(this);
              }
            }, Webview.prototype.emitFunc = function (eventName, data) {
              var name = this.rootName + "_" + eventName;
              $event.emit(name, data);
            }, Webview.prototype.emit = function (eventName, data) {
              var name = this.rootName + "_" + eventName;

              if (this.isConnect || "bxyuer_test_connect_success" === eventName) {
                if (this.isDev) {
                  (0, useLocalstorage(name).set)(_assign(_assign({}, data), {
                    heartbeat: Math.random()
                  }));
                } else {
                  var func = "window.bxyuer_gameEvents_" + this.gameId;
                  Bridge$1.call("cr_game_minipage_event", {
                    data: "javascript:" + func + " && " + func + ".emitFunc && " + func + '.emitFunc("' + eventName + '", ' + _JSON$stringify(data) + ")"
                  });
                }
              } else this.cacheEvents.push({
                eventName: eventName,
                data: data
              });
            }, Webview;
          }(),
              listener$1 = null,
              Webview$1 = function () {
            function Webview(gameId, isDev) {
              if (void 0 === isDev && (isDev = !1), !gameId) throw new Error("请填写gameId");
              this.gameId = gameId, this.isDev = isDev, this.isConnect = !1, this.cacheEvents = [], isDev && console.warn("警告：new Webview第二个参数只有本地开发时才能启用！！"), this.rootName = "xxq_gamePlay_" + gameId, this.init();
            }

            return Webview.prototype.storageListener = function (event) {
              if (this.isDev) {
                var key = event.key,
                    newValue = event.newValue;
                key && $event.exist(key) && $event.emit(key, newValue ? JSON.parse(newValue) : "");
              }
            }, Webview.prototype.init = function () {
              this.isDev && null === listener$1 && (window.addEventListener("storage", this.storageListener.bind(this)), listener$1 = this.storageListener);
            }, Webview.prototype.destory = function () {
              this.isDev && window.removeEventListener("storage", this.storageListener.bind(this));
            }, Webview.prototype.create = function () {
              var _this = this;

              return new _Promise(function (resolve) {
                _this.on("pk_dialog_connect_success", function () {
                  Config$1.debug && Logger.info("webview 创建成功！"), resolve(!0), _this.isConnect = !0, _this.cacheEvents.length > 0 && (_this.cacheEvents.forEach(function (cache) {
                    _this.emit(cache.eventName, cache.data);
                  }), _this.cacheEvents = []);
                }), _this.emit("pk_webview_connect_success", {});
              });
            }, Webview.prototype.load = function () {
              var _this = this;

              this.on("pk_webview_connect_success", function () {
                _this.emit("pk_dialog_connect_success", {});
              }), this.emit("pk_dialog_connect_success", {}), this.isConnect = !0;
            }, Webview.prototype.show = function () {
              Bridge$1.call("pk_game_minipage", {
                type: 1
              });
            }, Webview.prototype.hide = function () {
              Bridge$1.call("pk_game_minipage", {
                type: 0
              });
            }, Webview.prototype.on = function (eventName, callback) {
              if (eventName) {
                var name = this.rootName + "_" + eventName;

                if (this.isDev) {
                  var _a = useLocalstorage(name),
                      get = _a.get,
                      set = _a.set;

                  return get() || set({}), void $event.on(name, callback, $event);
                }

                $event.on(name, callback, $event), window["xxq_gameEvents_" + this.gameId] = {}, window["xxq_gameEvents_" + this.gameId].emitFunc = this.emitFunc.bind(this);
              }
            }, Webview.prototype.emitFunc = function (eventName, data) {
              var name = this.rootName + "_" + eventName;
              $event.emit(name, data);
            }, Webview.prototype.emit = function (eventName, data) {
              var name = this.rootName + "_" + eventName;

              if (this.isConnect || "pk_webview_connect_success" === eventName || "pk_dialog_connect_success" === eventName) {
                if (this.isDev) {
                  (0, useLocalstorage(name).set)(_assign(_assign({}, data), {
                    heartbeat: Math.random()
                  }));
                } else {
                  var func = "window.xxq_gameEvents_" + this.gameId;
                  Bridge$1.call("pk_game_minipage_event", {
                    event: "javascript:" + func + " && " + func + ".emitFunc && " + func + '.emitFunc("' + eventName + '", ' + _JSON$stringify(data) + ")"
                  });
                }
              } else this.cacheEvents.push({
                eventName: eventName,
                data: data
              });
            }, Webview;
          }(),
              pkBridge = function () {
            function PkBridge() {}

            return PkBridge.getInstance = function () {
              return this._instance || (this._instance = new this());
            }, PkBridge.prototype.gameLoadSuccess = function () {
              Bridge$1.call("pk_game_loadSuccess");
            }, PkBridge.prototype.getRoomInfo = function () {
              return Bridge$1.invoke("pk_game_roomInfo");
            }, PkBridge.prototype.gameMinimum = function () {
              Bridge$1.call("pk_game_minimum");
            }, PkBridge.prototype.gameEnd = function (param) {
              Bridge$1.call("pk_game_end_info", _assign({}, param || {}));
            }, PkBridge.prototype.gameMicStatus = function () {
              return Bridge$1.invoke("pk_game_mic_status");
            }, PkBridge.prototype.gameTalkNotify = function (callback) {
              Bridge$1.bindEvent("pk_game_talk_info", function (e) {
                e = "string" == typeof e ? JSON.parse(e) : e, console.log("Bridge: 麦位涟漪event：", e.type, "结果：", e.data);
                var result = "string" == typeof e.data ? JSON.parse(e.data) : e.data;
                console.log("Bridge: 麦位涟漪callback:", result.res || {}), callback && callback(result.res || {});
              });
            }, PkBridge.prototype.gameMicNotify = function (callback) {
              Bridge$1.bindEvent("pk_game_mic_status", function (e) {
                e = "string" == typeof e ? JSON.parse(e) : e, console.log("Bridge: 麦位状态变更event：", e.type, "结果：", e.data);
                var result = "string" == typeof e.data ? JSON.parse(e.data) : e.data;
                console.log("Bridge: 麦位状态变更callback:", result.res || {}), callback && callback(result.res || {});
              });
            }, PkBridge.prototype.onKeyboard = function (callback) {
              Bridge$1.app.isYppPC ? Bridge$1.bindEvent("pk_game_keyboard_event", function (e) {
                e = "string" == typeof e ? JSON.parse(e) : e, console.log("Bridge: 当前键盘点击", _JSON$stringify(e));
                var result = "string" == typeof e.data ? JSON.parse(e.data) : e.data;
                callback && callback(result.res || {});
              }) : console.log("Bridge: 当前不是PC环境，不用监听");
            }, PkBridge.prototype.handleGameAvatar = function (uid) {
              Bridge$1.call("pk_game_avatar_click", {
                uid: uid
              });
            }, PkBridge.prototype.handleShake = function (type, duration) {
              duration = duration || 300, Bridge$1.call("pk_game_shake", {
                type: type,
                duration: duration
              });
            }, PkBridge;
          }().getInstance(),
              Env = getEnv();

          exports$1.Bridge = Bridge$1, exports$1.Env = Env, exports$1.GameBridge = GameBridge$1, exports$1.Logger = Logger, exports$1.PkBridge = pkBridge, exports$1.PkWebview = Webview$1, exports$1.Request = Request, exports$1.Utils = index, exports$1.Webview = Webview, exports$1.Ws = Ws;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/long.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = Long;
          /**
           * wasm optimizations, to do native i64 multiplication and divide
           */

          var wasm = null;

          try {
            wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
          } catch (e) {// no wasm support :(
          }
          /**
           * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
           *  See the from* functions below for more convenient ways of constructing Longs.
           * @exports Long
           * @class A Long class for representing a 64 bit two's-complement integer value.
           * @param {number} low The low (signed) 32 bits of the long
           * @param {number} high The high (signed) 32 bits of the long
           * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
           * @constructor
           */


          function Long(low, high, unsigned) {
            /**
             * The low 32 bits as a signed value.
             * @type {number}
             */
            this.low = low | 0;
            /**
             * The high 32 bits as a signed value.
             * @type {number}
             */

            this.high = high | 0;
            /**
             * Whether unsigned or not.
             * @type {boolean}
             */

            this.unsigned = !!unsigned;
          } // The internal representation of a long is the two given signed, 32-bit values.
          // We use 32-bit pieces because these are the size of integers on which
          // Javascript performs bit-operations.  For operations like addition and
          // multiplication, we split each number into 16 bit pieces, which can easily be
          // multiplied within Javascript's floating-point representation without overflow
          // or change in sign.
          //
          // In the algorithms below, we frequently reduce the negative case to the
          // positive case by negating the input(s) and then post-processing the result.
          // Note that we must ALWAYS check specially whether those values are MIN_VALUE
          // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
          // a positive number, it overflows back into a negative).  Not handling this
          // case would often result in infinite recursion.
          //
          // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
          // methods on which they depend.

          /**
           * An indicator used to reliably determine if an object is a Long or not.
           * @type {boolean}
           * @const
           * @private
           */


          Long.prototype.__isLong__;
          Object.defineProperty(Long.prototype, "__isLong__", {
            value: true
          });
          /**
           * @function
           * @param {*} obj Object
           * @returns {boolean}
           * @inner
           */

          function isLong(obj) {
            return (obj && obj["__isLong__"]) === true;
          }
          /**
           * Tests if the specified object is a Long.
           * @function
           * @param {*} obj Object
           * @returns {boolean}
           */


          Long.isLong = isLong;
          /**
           * A cache of the Long representations of small integer values.
           * @type {!Object}
           * @inner
           */

          var INT_CACHE = {};
          /**
           * A cache of the Long representations of small unsigned integer values.
           * @type {!Object}
           * @inner
           */

          var UINT_CACHE = {};
          /**
           * @param {number} value
           * @param {boolean=} unsigned
           * @returns {!Long}
           * @inner
           */

          function fromInt(value, unsigned) {
            var obj, cachedObj, cache;

            if (unsigned) {
              value >>>= 0;

              if (cache = 0 <= value && value < 256) {
                cachedObj = UINT_CACHE[value];
                if (cachedObj) return cachedObj;
              }

              obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
              if (cache) UINT_CACHE[value] = obj;
              return obj;
            } else {
              value |= 0;

              if (cache = -128 <= value && value < 128) {
                cachedObj = INT_CACHE[value];
                if (cachedObj) return cachedObj;
              }

              obj = fromBits(value, value < 0 ? -1 : 0, false);
              if (cache) INT_CACHE[value] = obj;
              return obj;
            }
          }
          /**
           * Returns a Long representing the given 32 bit integer value.
           * @function
           * @param {number} value The 32 bit integer in question
           * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
           * @returns {!Long} The corresponding Long value
           */


          Long.fromInt = fromInt;
          /**
           * @param {number} value
           * @param {boolean=} unsigned
           * @returns {!Long}
           * @inner
           */

          function fromNumber(value, unsigned) {
            if (isNaN(value)) return unsigned ? UZERO : ZERO;

            if (unsigned) {
              if (value < 0) return UZERO;
              if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
            } else {
              if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
              if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
            }

            if (value < 0) return fromNumber(-value, unsigned).neg();
            return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
          }
          /**
           * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
           * @function
           * @param {number} value The number in question
           * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
           * @returns {!Long} The corresponding Long value
           */


          Long.fromNumber = fromNumber;
          /**
           * @param {number} lowBits
           * @param {number} highBits
           * @param {boolean=} unsigned
           * @returns {!Long}
           * @inner
           */

          function fromBits(lowBits, highBits, unsigned) {
            return new Long(lowBits, highBits, unsigned);
          }
          /**
           * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
           *  assumed to use 32 bits.
           * @function
           * @param {number} lowBits The low 32 bits
           * @param {number} highBits The high 32 bits
           * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
           * @returns {!Long} The corresponding Long value
           */


          Long.fromBits = fromBits;
          /**
           * @function
           * @param {number} base
           * @param {number} exponent
           * @returns {number}
           * @inner
           */

          var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

          /**
           * @param {string} str
           * @param {(boolean|number)=} unsigned
           * @param {number=} radix
           * @returns {!Long}
           * @inner
           */

          function fromString(str, unsigned, radix) {
            if (str.length === 0) throw Error('empty string');
            if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity") return ZERO;

            if (typeof unsigned === 'number') {
              // For goog.math.long compatibility
              radix = unsigned, unsigned = false;
            } else {
              unsigned = !!unsigned;
            }

            radix = radix || 10;
            if (radix < 2 || 36 < radix) throw RangeError('radix');
            var p;
            if ((p = str.indexOf('-')) > 0) throw Error('interior hyphen');else if (p === 0) {
              return fromString(str.substring(1), unsigned, radix).neg();
            } // Do several (8) digits each time through the loop, so as to
            // minimize the calls to the very expensive emulated div.

            var radixToPower = fromNumber(pow_dbl(radix, 8));
            var result = ZERO;

            for (var i = 0; i < str.length; i += 8) {
              var size = Math.min(8, str.length - i),
                  value = parseInt(str.substring(i, i + size), radix);

              if (size < 8) {
                var power = fromNumber(pow_dbl(radix, size));
                result = result.mul(power).add(fromNumber(value));
              } else {
                result = result.mul(radixToPower);
                result = result.add(fromNumber(value));
              }
            }

            result.unsigned = unsigned;
            return result;
          }
          /**
           * Returns a Long representation of the given string, written using the specified radix.
           * @function
           * @param {string} str The textual representation of the Long
           * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
           * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
           * @returns {!Long} The corresponding Long value
           */


          Long.fromString = fromString;
          /**
           * @function
           * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
           * @param {boolean=} unsigned
           * @returns {!Long}
           * @inner
           */

          function fromValue(val, unsigned) {
            if (typeof val === 'number') return fromNumber(val, unsigned);
            if (typeof val === 'string') return fromString(val, unsigned); // Throws for non-objects, converts non-instanceof Long:

            return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
          }
          /**
           * Converts the specified value to a Long using the appropriate from* function for its type.
           * @function
           * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
           * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
           * @returns {!Long}
           */


          Long.fromValue = fromValue; // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
          // no runtime penalty for these.

          /**
           * @type {number}
           * @const
           * @inner
           */

          var TWO_PWR_16_DBL = 1 << 16;
          /**
           * @type {number}
           * @const
           * @inner
           */

          var TWO_PWR_24_DBL = 1 << 24;
          /**
           * @type {number}
           * @const
           * @inner
           */

          var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
          /**
           * @type {number}
           * @const
           * @inner
           */

          var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
          /**
           * @type {number}
           * @const
           * @inner
           */

          var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
          /**
           * @type {!Long}
           * @const
           * @inner
           */

          var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
          /**
           * @type {!Long}
           * @inner
           */

          var ZERO = fromInt(0);
          /**
           * Signed zero.
           * @type {!Long}
           */

          Long.ZERO = ZERO;
          /**
           * @type {!Long}
           * @inner
           */

          var UZERO = fromInt(0, true);
          /**
           * Unsigned zero.
           * @type {!Long}
           */

          Long.UZERO = UZERO;
          /**
           * @type {!Long}
           * @inner
           */

          var ONE = fromInt(1);
          /**
           * Signed one.
           * @type {!Long}
           */

          Long.ONE = ONE;
          /**
           * @type {!Long}
           * @inner
           */

          var UONE = fromInt(1, true);
          /**
           * Unsigned one.
           * @type {!Long}
           */

          Long.UONE = UONE;
          /**
           * @type {!Long}
           * @inner
           */

          var NEG_ONE = fromInt(-1);
          /**
           * Signed negative one.
           * @type {!Long}
           */

          Long.NEG_ONE = NEG_ONE;
          /**
           * @type {!Long}
           * @inner
           */

          var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
          /**
           * Maximum signed value.
           * @type {!Long}
           */

          Long.MAX_VALUE = MAX_VALUE;
          /**
           * @type {!Long}
           * @inner
           */

          var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
          /**
           * Maximum unsigned value.
           * @type {!Long}
           */

          Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
          /**
           * @type {!Long}
           * @inner
           */

          var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);
          /**
           * Minimum signed value.
           * @type {!Long}
           */

          Long.MIN_VALUE = MIN_VALUE;
          /**
           * @alias Long.prototype
           * @inner
           */

          var LongPrototype = Long.prototype;
          /**
           * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
           * @returns {number}
           */

          LongPrototype.toInt = function toInt() {
            return this.unsigned ? this.low >>> 0 : this.low;
          };
          /**
           * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
           * @returns {number}
           */


          LongPrototype.toNumber = function toNumber() {
            if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
            return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
          };
          /**
           * Converts the Long to a string written in the specified radix.
           * @param {number=} radix Radix (2-36), defaults to 10
           * @returns {string}
           * @override
           * @throws {RangeError} If `radix` is out of range
           */


          LongPrototype.toString = function toString(radix) {
            radix = radix || 10;
            if (radix < 2 || 36 < radix) throw RangeError('radix');
            if (this.isZero()) return '0';

            if (this.isNegative()) {
              // Unsigned Longs are never negative
              if (this.eq(MIN_VALUE)) {
                // We need to change the Long value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixLong = fromNumber(radix),
                    div = this.div(radixLong),
                    rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
              } else return '-' + this.neg().toString(radix);
            } // Do several (6) digits each time through the loop, so as to
            // minimize the calls to the very expensive emulated div.


            var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
                rem = this;
            var result = '';

            while (true) {
              var remDiv = rem.div(radixToPower),
                  intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
                  digits = intval.toString(radix);
              rem = remDiv;
              if (rem.isZero()) return digits + result;else {
                while (digits.length < 6) {
                  digits = '0' + digits;
                }

                result = '' + digits + result;
              }
            }
          };
          /**
           * Gets the high 32 bits as a signed integer.
           * @returns {number} Signed high bits
           */


          LongPrototype.getHighBits = function getHighBits() {
            return this.high;
          };
          /**
           * Gets the high 32 bits as an unsigned integer.
           * @returns {number} Unsigned high bits
           */


          LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
            return this.high >>> 0;
          };
          /**
           * Gets the low 32 bits as a signed integer.
           * @returns {number} Signed low bits
           */


          LongPrototype.getLowBits = function getLowBits() {
            return this.low;
          };
          /**
           * Gets the low 32 bits as an unsigned integer.
           * @returns {number} Unsigned low bits
           */


          LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
            return this.low >>> 0;
          };
          /**
           * Gets the number of bits needed to represent the absolute value of this Long.
           * @returns {number}
           */


          LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
            if (this.isNegative()) // Unsigned Longs are never negative
              return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
            var val = this.high != 0 ? this.high : this.low;

            for (var bit = 31; bit > 0; bit--) {
              if ((val & 1 << bit) != 0) break;
            }

            return this.high != 0 ? bit + 33 : bit + 1;
          };
          /**
           * Tests if this Long's value equals zero.
           * @returns {boolean}
           */


          LongPrototype.isZero = function isZero() {
            return this.high === 0 && this.low === 0;
          };
          /**
           * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
           * @returns {boolean}
           */


          LongPrototype.eqz = LongPrototype.isZero;
          /**
           * Tests if this Long's value is negative.
           * @returns {boolean}
           */

          LongPrototype.isNegative = function isNegative() {
            return !this.unsigned && this.high < 0;
          };
          /**
           * Tests if this Long's value is positive.
           * @returns {boolean}
           */


          LongPrototype.isPositive = function isPositive() {
            return this.unsigned || this.high >= 0;
          };
          /**
           * Tests if this Long's value is odd.
           * @returns {boolean}
           */


          LongPrototype.isOdd = function isOdd() {
            return (this.low & 1) === 1;
          };
          /**
           * Tests if this Long's value is even.
           * @returns {boolean}
           */


          LongPrototype.isEven = function isEven() {
            return (this.low & 1) === 0;
          };
          /**
           * Tests if this Long's value equals the specified's.
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */


          LongPrototype.equals = function equals(other) {
            if (!isLong(other)) other = fromValue(other);
            if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
            return this.high === other.high && this.low === other.low;
          };
          /**
           * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
           * @function
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */


          LongPrototype.eq = LongPrototype.equals;
          /**
           * Tests if this Long's value differs from the specified's.
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */

          LongPrototype.notEquals = function notEquals(other) {
            return !this.eq(
            /* validates */
            other);
          };
          /**
           * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
           * @function
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */


          LongPrototype.neq = LongPrototype.notEquals;
          /**
           * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
           * @function
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */

          LongPrototype.ne = LongPrototype.notEquals;
          /**
           * Tests if this Long's value is less than the specified's.
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */

          LongPrototype.lessThan = function lessThan(other) {
            return this.comp(
            /* validates */
            other) < 0;
          };
          /**
           * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
           * @function
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */


          LongPrototype.lt = LongPrototype.lessThan;
          /**
           * Tests if this Long's value is less than or equal the specified's.
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */

          LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
            return this.comp(
            /* validates */
            other) <= 0;
          };
          /**
           * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
           * @function
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */


          LongPrototype.lte = LongPrototype.lessThanOrEqual;
          /**
           * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
           * @function
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */

          LongPrototype.le = LongPrototype.lessThanOrEqual;
          /**
           * Tests if this Long's value is greater than the specified's.
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */

          LongPrototype.greaterThan = function greaterThan(other) {
            return this.comp(
            /* validates */
            other) > 0;
          };
          /**
           * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
           * @function
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */


          LongPrototype.gt = LongPrototype.greaterThan;
          /**
           * Tests if this Long's value is greater than or equal the specified's.
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */

          LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
            return this.comp(
            /* validates */
            other) >= 0;
          };
          /**
           * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
           * @function
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */


          LongPrototype.gte = LongPrototype.greaterThanOrEqual;
          /**
           * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
           * @function
           * @param {!Long|number|string} other Other value
           * @returns {boolean}
           */

          LongPrototype.ge = LongPrototype.greaterThanOrEqual;
          /**
           * Compares this Long's value with the specified's.
           * @param {!Long|number|string} other Other value
           * @returns {number} 0 if they are the same, 1 if the this is greater and -1
           *  if the given one is greater
           */

          LongPrototype.compare = function compare(other) {
            if (!isLong(other)) other = fromValue(other);
            if (this.eq(other)) return 0;
            var thisNeg = this.isNegative(),
                otherNeg = other.isNegative();
            if (thisNeg && !otherNeg) return -1;
            if (!thisNeg && otherNeg) return 1; // At this point the sign bits are the same

            if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1; // Both are positive if at least one is unsigned

            return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
          };
          /**
           * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
           * @function
           * @param {!Long|number|string} other Other value
           * @returns {number} 0 if they are the same, 1 if the this is greater and -1
           *  if the given one is greater
           */


          LongPrototype.comp = LongPrototype.compare;
          /**
           * Negates this Long's value.
           * @returns {!Long} Negated Long
           */

          LongPrototype.negate = function negate() {
            if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
            return this.not().add(ONE);
          };
          /**
           * Negates this Long's value. This is an alias of {@link Long#negate}.
           * @function
           * @returns {!Long} Negated Long
           */


          LongPrototype.neg = LongPrototype.negate;
          /**
           * Returns the sum of this and the specified Long.
           * @param {!Long|number|string} addend Addend
           * @returns {!Long} Sum
           */

          LongPrototype.add = function add(addend) {
            if (!isLong(addend)) addend = fromValue(addend); // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

            var a48 = this.high >>> 16;
            var a32 = this.high & 0xFFFF;
            var a16 = this.low >>> 16;
            var a00 = this.low & 0xFFFF;
            var b48 = addend.high >>> 16;
            var b32 = addend.high & 0xFFFF;
            var b16 = addend.low >>> 16;
            var b00 = addend.low & 0xFFFF;
            var c48 = 0,
                c32 = 0,
                c16 = 0,
                c00 = 0;
            c00 += a00 + b00;
            c16 += c00 >>> 16;
            c00 &= 0xFFFF;
            c16 += a16 + b16;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c32 += a32 + b32;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c48 += a48 + b48;
            c48 &= 0xFFFF;
            return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
          };
          /**
           * Returns the difference of this and the specified Long.
           * @param {!Long|number|string} subtrahend Subtrahend
           * @returns {!Long} Difference
           */


          LongPrototype.subtract = function subtract(subtrahend) {
            if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
            return this.add(subtrahend.neg());
          };
          /**
           * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
           * @function
           * @param {!Long|number|string} subtrahend Subtrahend
           * @returns {!Long} Difference
           */


          LongPrototype.sub = LongPrototype.subtract;
          /**
           * Returns the product of this and the specified Long.
           * @param {!Long|number|string} multiplier Multiplier
           * @returns {!Long} Product
           */

          LongPrototype.multiply = function multiply(multiplier) {
            if (this.isZero()) return ZERO;
            if (!isLong(multiplier)) multiplier = fromValue(multiplier); // use wasm support if present

            if (wasm) {
              var low = wasm.mul(this.low, this.high, multiplier.low, multiplier.high);
              return fromBits(low, wasm.get_high(), this.unsigned);
            }

            if (multiplier.isZero()) return ZERO;
            if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
            if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;

            if (this.isNegative()) {
              if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());else return this.neg().mul(multiplier).neg();
            } else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg(); // If both longs are small, use float multiplication


            if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned); // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
            // We can skip products that would overflow.

            var a48 = this.high >>> 16;
            var a32 = this.high & 0xFFFF;
            var a16 = this.low >>> 16;
            var a00 = this.low & 0xFFFF;
            var b48 = multiplier.high >>> 16;
            var b32 = multiplier.high & 0xFFFF;
            var b16 = multiplier.low >>> 16;
            var b00 = multiplier.low & 0xFFFF;
            var c48 = 0,
                c32 = 0,
                c16 = 0,
                c00 = 0;
            c00 += a00 * b00;
            c16 += c00 >>> 16;
            c00 &= 0xFFFF;
            c16 += a16 * b00;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c16 += a00 * b16;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c32 += a32 * b00;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c32 += a16 * b16;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c32 += a00 * b32;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
            c48 &= 0xFFFF;
            return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
          };
          /**
           * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
           * @function
           * @param {!Long|number|string} multiplier Multiplier
           * @returns {!Long} Product
           */


          LongPrototype.mul = LongPrototype.multiply;
          /**
           * Returns this Long divided by the specified. The result is signed if this Long is signed or
           *  unsigned if this Long is unsigned.
           * @param {!Long|number|string} divisor Divisor
           * @returns {!Long} Quotient
           */

          LongPrototype.divide = function divide(divisor) {
            if (!isLong(divisor)) divisor = fromValue(divisor);
            if (divisor.isZero()) throw Error('division by zero'); // use wasm support if present

            if (wasm) {
              // guard against signed division overflow: the largest
              // negative number / -1 would be 1 larger than the largest
              // positive number, due to two's complement.
              if (!this.unsigned && this.high === -0x80000000 && divisor.low === -1 && divisor.high === -1) {
                // be consistent with non-wasm code path
                return this;
              }

              var low = (this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, divisor.low, divisor.high);
              return fromBits(low, wasm.get_high(), this.unsigned);
            }

            if (this.isZero()) return this.unsigned ? UZERO : ZERO;
            var approx, rem, res;

            if (!this.unsigned) {
              // This section is only relevant for signed longs and is derived from the
              // closure library as a whole.
              if (this.eq(MIN_VALUE)) {
                if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
                else if (divisor.eq(MIN_VALUE)) return ONE;else {
                    // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                    var halfThis = this.shr(1);
                    approx = halfThis.div(divisor).shl(1);

                    if (approx.eq(ZERO)) {
                      return divisor.isNegative() ? ONE : NEG_ONE;
                    } else {
                      rem = this.sub(divisor.mul(approx));
                      res = approx.add(rem.div(divisor));
                      return res;
                    }
                  }
              } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;

              if (this.isNegative()) {
                if (divisor.isNegative()) return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
              } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();

              res = ZERO;
            } else {
              // The algorithm below has not been made for unsigned longs. It's therefore
              // required to take special care of the MSB prior to running it.
              if (!divisor.unsigned) divisor = divisor.toUnsigned();
              if (divisor.gt(this)) return UZERO;
              if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
                return UONE;
              res = UZERO;
            } // Repeat the following until the remainder is less than other:  find a
            // floating-point that approximates remainder / other *from below*, add this
            // into the result, and subtract it from the remainder.  It is critical that
            // the approximate value is less than or equal to the real value so that the
            // remainder never becomes negative.


            rem = this;

            while (rem.gte(divisor)) {
              // Approximate the result of division. This may be a little greater or
              // smaller than the actual value.
              approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber())); // We will tweak the approximate result by changing it in the 48-th digit or
              // the smallest non-fractional digit, whichever is larger.

              var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                  delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48),
                  // Decrease the approximation until it is smaller than the remainder.  Note
              // that if it is too large, the product overflows and is negative.
              approxRes = fromNumber(approx),
                  approxRem = approxRes.mul(divisor);

              while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
              } // We know the answer can't be zero... and actually, zero would cause
              // infinite recursion since we would make no progress.


              if (approxRes.isZero()) approxRes = ONE;
              res = res.add(approxRes);
              rem = rem.sub(approxRem);
            }

            return res;
          };
          /**
           * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
           * @function
           * @param {!Long|number|string} divisor Divisor
           * @returns {!Long} Quotient
           */


          LongPrototype.div = LongPrototype.divide;
          /**
           * Returns this Long modulo the specified.
           * @param {!Long|number|string} divisor Divisor
           * @returns {!Long} Remainder
           */

          LongPrototype.modulo = function modulo(divisor) {
            if (!isLong(divisor)) divisor = fromValue(divisor); // use wasm support if present

            if (wasm) {
              var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, divisor.low, divisor.high);
              return fromBits(low, wasm.get_high(), this.unsigned);
            }

            return this.sub(this.div(divisor).mul(divisor));
          };
          /**
           * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
           * @function
           * @param {!Long|number|string} divisor Divisor
           * @returns {!Long} Remainder
           */


          LongPrototype.mod = LongPrototype.modulo;
          /**
           * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
           * @function
           * @param {!Long|number|string} divisor Divisor
           * @returns {!Long} Remainder
           */

          LongPrototype.rem = LongPrototype.modulo;
          /**
           * Returns the bitwise NOT of this Long.
           * @returns {!Long}
           */

          LongPrototype.not = function not() {
            return fromBits(~this.low, ~this.high, this.unsigned);
          };
          /**
           * Returns the bitwise AND of this Long and the specified.
           * @param {!Long|number|string} other Other Long
           * @returns {!Long}
           */


          LongPrototype.and = function and(other) {
            if (!isLong(other)) other = fromValue(other);
            return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
          };
          /**
           * Returns the bitwise OR of this Long and the specified.
           * @param {!Long|number|string} other Other Long
           * @returns {!Long}
           */


          LongPrototype.or = function or(other) {
            if (!isLong(other)) other = fromValue(other);
            return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
          };
          /**
           * Returns the bitwise XOR of this Long and the given one.
           * @param {!Long|number|string} other Other Long
           * @returns {!Long}
           */


          LongPrototype.xor = function xor(other) {
            if (!isLong(other)) other = fromValue(other);
            return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
          };
          /**
           * Returns this Long with bits shifted to the left by the given amount.
           * @param {number|!Long} numBits Number of bits
           * @returns {!Long} Shifted Long
           */


          LongPrototype.shiftLeft = function shiftLeft(numBits) {
            if (isLong(numBits)) numBits = numBits.toInt();
            if ((numBits &= 63) === 0) return this;else if (numBits < 32) return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);else return fromBits(0, this.low << numBits - 32, this.unsigned);
          };
          /**
           * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
           * @function
           * @param {number|!Long} numBits Number of bits
           * @returns {!Long} Shifted Long
           */


          LongPrototype.shl = LongPrototype.shiftLeft;
          /**
           * Returns this Long with bits arithmetically shifted to the right by the given amount.
           * @param {number|!Long} numBits Number of bits
           * @returns {!Long} Shifted Long
           */

          LongPrototype.shiftRight = function shiftRight(numBits) {
            if (isLong(numBits)) numBits = numBits.toInt();
            if ((numBits &= 63) === 0) return this;else if (numBits < 32) return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);else return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
          };
          /**
           * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
           * @function
           * @param {number|!Long} numBits Number of bits
           * @returns {!Long} Shifted Long
           */


          LongPrototype.shr = LongPrototype.shiftRight;
          /**
           * Returns this Long with bits logically shifted to the right by the given amount.
           * @param {number|!Long} numBits Number of bits
           * @returns {!Long} Shifted Long
           */

          LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
            if (isLong(numBits)) numBits = numBits.toInt();
            numBits &= 63;
            if (numBits === 0) return this;else {
              var high = this.high;

              if (numBits < 32) {
                var low = this.low;
                return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
              } else if (numBits === 32) return fromBits(high, 0, this.unsigned);else return fromBits(high >>> numBits - 32, 0, this.unsigned);
            }
          };
          /**
           * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
           * @function
           * @param {number|!Long} numBits Number of bits
           * @returns {!Long} Shifted Long
           */


          LongPrototype.shru = LongPrototype.shiftRightUnsigned;
          /**
           * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
           * @function
           * @param {number|!Long} numBits Number of bits
           * @returns {!Long} Shifted Long
           */

          LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
          /**
           * Converts this Long to signed.
           * @returns {!Long} Signed long
           */

          LongPrototype.toSigned = function toSigned() {
            if (!this.unsigned) return this;
            return fromBits(this.low, this.high, false);
          };
          /**
           * Converts this Long to unsigned.
           * @returns {!Long} Unsigned long
           */


          LongPrototype.toUnsigned = function toUnsigned() {
            if (this.unsigned) return this;
            return fromBits(this.low, this.high, true);
          };
          /**
           * Converts this Long to its byte representation.
           * @param {boolean=} le Whether little or big endian, defaults to big endian
           * @returns {!Array.<number>} Byte representation
           */


          LongPrototype.toBytes = function toBytes(le) {
            return le ? this.toBytesLE() : this.toBytesBE();
          };
          /**
           * Converts this Long to its little endian byte representation.
           * @returns {!Array.<number>} Little endian byte representation
           */


          LongPrototype.toBytesLE = function toBytesLE() {
            var hi = this.high,
                lo = this.low;
            return [lo & 0xff, lo >>> 8 & 0xff, lo >>> 16 & 0xff, lo >>> 24, hi & 0xff, hi >>> 8 & 0xff, hi >>> 16 & 0xff, hi >>> 24];
          };
          /**
           * Converts this Long to its big endian byte representation.
           * @returns {!Array.<number>} Big endian byte representation
           */


          LongPrototype.toBytesBE = function toBytesBE() {
            var hi = this.high,
                lo = this.low;
            return [hi >>> 24, hi >>> 16 & 0xff, hi >>> 8 & 0xff, hi & 0xff, lo >>> 24, lo >>> 16 & 0xff, lo >>> 8 & 0xff, lo & 0xff];
          };
          /**
           * Creates a Long from its byte representation.
           * @param {!Array.<number>} bytes Byte representation
           * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
           * @param {boolean=} le Whether little or big endian, defaults to big endian
           * @returns {Long} The corresponding Long value
           */


          Long.fromBytes = function fromBytes(bytes, unsigned, le) {
            return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
          };
          /**
           * Creates a Long from its little endian byte representation.
           * @param {!Array.<number>} bytes Little endian byte representation
           * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
           * @returns {Long} The corresponding Long value
           */


          Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
            return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
          };
          /**
           * Creates a Long from its big endian byte representation.
           * @param {!Array.<number>} bytes Big endian byte representation
           * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
           * @returns {Long} The corresponding Long value
           */


          Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
            return new Long(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/symbol.js", ['./cjs-loader.mjs', './index.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/symbol");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/promise.js", ['./cjs-loader.mjs', './index2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/promise": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/promise");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/typeof.js", ['./cjs-loader.mjs', './symbol2.js', './iterator2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "@babel/runtime-corejs3/core-js/symbol": __cjsMetaURL$1,
          "@babel/runtime-corejs3/core-js/symbol/iterator": __cjsMetaURL$2
        }, _require);

        (function () {
          var _Symbol = require("@babel/runtime-corejs3/core-js/symbol");

          var _Symbol$iterator = require("@babel/runtime-corejs3/core-js/symbol/iterator");

          function _typeof(obj) {
            "@babel/helpers - typeof";

            if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") {
              module.exports = _typeof = function _typeof(obj) {
                return typeof obj;
              };

              module.exports["default"] = module.exports, module.exports.__esModule = true;
            } else {
              module.exports = _typeof = function _typeof(obj) {
                return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj;
              };

              module.exports["default"] = module.exports, module.exports.__esModule = true;
            }

            return _typeof(obj);
          }

          module.exports = _typeof;
          module.exports["default"] = module.exports, module.exports.__esModule = true;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/assign.js", ['./cjs-loader.mjs', './assign2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/object/assign": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/object/assign");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/parse-int.js", ['./cjs-loader.mjs', './parse-int2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/parse-int": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/parse-int");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/slice.js", ['./cjs-loader.mjs', './slice2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/slice": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/slice");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/index-of.js", ['./cjs-loader.mjs', './index-of2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/index-of": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/index-of");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/set-prototype-of.js", ['./cjs-loader.mjs', './set-prototype-of2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/object/set-prototype-of": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/object/set-prototype-of");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/iterator.js", ['./cjs-loader.mjs', './iterator3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/symbol/iterator": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/symbol/iterator");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/trim.js", ['./cjs-loader.mjs', './trim2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/trim": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/trim");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/sort.js", ['./cjs-loader.mjs', './sort2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/sort": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/sort");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/starts-with.js", ['./cjs-loader.mjs', './starts-with2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/starts-with": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/starts-with");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/reduce.js", ['./cjs-loader.mjs', './reduce2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/reduce": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/reduce");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/includes.js", ['./cjs-loader.mjs', './includes2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/includes": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/includes");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/freeze.js", ['./cjs-loader.mjs', './freeze2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/object/freeze": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/object/freeze");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/filter.js", ['./cjs-loader.mjs', './filter2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/filter": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/filter");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/keys.js", ['./cjs-loader.mjs', './keys2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/object/keys": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/object/keys");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/last-index-of.js", ['./cjs-loader.mjs', './last-index-of2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/last-index-of": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/last-index-of");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/splice.js", ['./cjs-loader.mjs', './splice2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/splice": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/splice");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/map.js", ['./cjs-loader.mjs', './map2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/instance/map": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/instance/map");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/stringify.js", ['./cjs-loader.mjs', './stringify2.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/stable/json/stringify": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/stable/json/stringify");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/symbol2.js", ['./cjs-loader.mjs', './index3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/features/symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/features/symbol");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/iterator2.js", ['./cjs-loader.mjs', './iterator5.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "core-js-pure/features/symbol/iterator": __cjsMetaURL$1
        }, _require);

        (function () {
          module.exports = require("core-js-pure/features/symbol/iterator");
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/parse-int2.js", ['./cjs-loader.mjs', './parse-int3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../es/parse-int": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../es/parse-int');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/assign2.js", ['./cjs-loader.mjs', './assign3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/object/assign": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/object/assign');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/set-prototype-of2.js", ['./cjs-loader.mjs', './set-prototype-of3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/object/set-prototype-of": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/object/set-prototype-of');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/trim2.js", ['./cjs-loader.mjs', './trim3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/trim": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/trim');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/index-of2.js", ['./cjs-loader.mjs', './index-of3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/index-of": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/index-of');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/keys2.js", ['./cjs-loader.mjs', './keys3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/object/keys": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/object/keys');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/reduce2.js", ['./cjs-loader.mjs', './reduce3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/reduce": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/reduce');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/starts-with2.js", ['./cjs-loader.mjs', './starts-with3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/starts-with": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/starts-with');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/sort2.js", ['./cjs-loader.mjs', './sort3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/sort": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/sort');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/slice2.js", ['./cjs-loader.mjs', './slice3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/slice": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/slice');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/splice2.js", ['./cjs-loader.mjs', './splice3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/splice": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/splice');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/freeze2.js", ['./cjs-loader.mjs', './freeze3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/object/freeze": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/object/freeze');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/includes2.js", ['./cjs-loader.mjs', './includes3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/includes": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/includes');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/iterator3.js", ['./cjs-loader.mjs', './web.dom-collections.iterator.js', './iterator4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/symbol/iterator": __cjsMetaURL$1,
          "../../modules/web.dom-collections.iterator": __cjsMetaURL$2
        }, _require);

        (function () {
          var parent = require('../../es/symbol/iterator');

          require('../../modules/web.dom-collections.iterator');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/last-index-of2.js", ['./cjs-loader.mjs', './last-index-of3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/last-index-of": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/last-index-of');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/filter2.js", ['./cjs-loader.mjs', './filter3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/filter": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/filter');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/map2.js", ['./cjs-loader.mjs', './map3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/instance/map": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/instance/map');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/stringify2.js", ['./cjs-loader.mjs', './stringify3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/json/stringify": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../es/json/stringify');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/index.js", ['./cjs-loader.mjs', './index4.js', './web.dom-collections.iterator.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/symbol": __cjsMetaURL$1,
          "../../modules/web.dom-collections.iterator": __cjsMetaURL$2
        }, _require);

        (function () {
          var parent = require('../../es/symbol');

          require('../../modules/web.dom-collections.iterator');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/index2.js", ['./cjs-loader.mjs', './web.dom-collections.iterator.js', './index5.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../es/promise": __cjsMetaURL$1,
          "../../modules/web.dom-collections.iterator": __cjsMetaURL$2
        }, _require);

        (function () {
          var parent = require('../../es/promise');

          require('../../modules/web.dom-collections.iterator');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/parse-int3.js", ['./cjs-loader.mjs', './path.js', './es.parse-int.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../modules/es.parse-int": __cjsMetaURL$1,
          "../internals/path": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../modules/es.parse-int');

          var path = require('../internals/path');

          module.exports = path.parseInt;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/set-prototype-of3.js", ['./cjs-loader.mjs', './path.js', './es.object.set-prototype-of.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../modules/es.object.set-prototype-of": __cjsMetaURL$1,
          "../../internals/path": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../modules/es.object.set-prototype-of');

          var path = require('../../internals/path');

          module.exports = path.Object.setPrototypeOf;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/index-of3.js", ['./cjs-loader.mjs', './index-of4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../array/virtual/index-of": __cjsMetaURL$1
        }, _require);

        (function () {
          var indexOf = require('../array/virtual/index-of');

          var ArrayPrototype = Array.prototype;

          module.exports = function (it) {
            var own = it.indexOf;
            return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.indexOf ? indexOf : own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/reduce3.js", ['./cjs-loader.mjs', './reduce4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../array/virtual/reduce": __cjsMetaURL$1
        }, _require);

        (function () {
          var reduce = require('../array/virtual/reduce');

          var ArrayPrototype = Array.prototype;

          module.exports = function (it) {
            var own = it.reduce;
            return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.reduce ? reduce : own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/trim3.js", ['./cjs-loader.mjs', './trim4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../string/virtual/trim": __cjsMetaURL$1
        }, _require);

        (function () {
          var trim = require('../string/virtual/trim');

          var StringPrototype = String.prototype;

          module.exports = function (it) {
            var own = it.trim;
            return typeof it === 'string' || it === StringPrototype || it instanceof String && own === StringPrototype.trim ? trim : own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/assign3.js", ['./cjs-loader.mjs', './path.js', './es.object.assign.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../modules/es.object.assign": __cjsMetaURL$1,
          "../../internals/path": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../modules/es.object.assign');

          var path = require('../../internals/path');

          module.exports = path.Object.assign;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/starts-with3.js", ['./cjs-loader.mjs', './starts-with4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../string/virtual/starts-with": __cjsMetaURL$1
        }, _require);

        (function () {
          var startsWith = require('../string/virtual/starts-with');

          var StringPrototype = String.prototype;

          module.exports = function (it) {
            var own = it.startsWith;
            return typeof it === 'string' || it === StringPrototype || it instanceof String && own === StringPrototype.startsWith ? startsWith : own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/slice3.js", ['./cjs-loader.mjs', './slice4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../array/virtual/slice": __cjsMetaURL$1
        }, _require);

        (function () {
          var slice = require('../array/virtual/slice');

          var ArrayPrototype = Array.prototype;

          module.exports = function (it) {
            var own = it.slice;
            return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.slice ? slice : own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/keys3.js", ['./cjs-loader.mjs', './path.js', './es.object.keys.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../modules/es.object.keys": __cjsMetaURL$1,
          "../../internals/path": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../modules/es.object.keys');

          var path = require('../../internals/path');

          module.exports = path.Object.keys;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/web.dom-collections.iterator.js", ['./cjs-loader.mjs', './global.js', './well-known-symbol.js', './create-non-enumerable-property.js', './classof.js', './iterators.js', './es.array.iterator.js', './dom-iterables.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$7, __cjsMetaURL$5, __cjsMetaURL$4, __cjsMetaURL$6, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../modules/es.array.iterator": __cjsMetaURL$1,
          "../internals/dom-iterables": __cjsMetaURL$2,
          "../internals/global": __cjsMetaURL$3,
          "../internals/classof": __cjsMetaURL$4,
          "../internals/create-non-enumerable-property": __cjsMetaURL$5,
          "../internals/iterators": __cjsMetaURL$6,
          "../internals/well-known-symbol": __cjsMetaURL$7
        }, _require);

        (function () {
          require('../modules/es.array.iterator');

          var DOMIterables = require('../internals/dom-iterables');

          var global = require('../internals/global');

          var classof = require('../internals/classof');

          var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

          var Iterators = require('../internals/iterators');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var TO_STRING_TAG = wellKnownSymbol('toStringTag');

          for (var COLLECTION_NAME in DOMIterables) {
            var Collection = global[COLLECTION_NAME];
            var CollectionPrototype = Collection && Collection.prototype;

            if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
              createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
            }

            Iterators[COLLECTION_NAME] = Iterators.Array;
          }
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/sort3.js", ['./cjs-loader.mjs', './sort4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../array/virtual/sort": __cjsMetaURL$1
        }, _require);

        (function () {
          var sort = require('../array/virtual/sort');

          var ArrayPrototype = Array.prototype;

          module.exports = function (it) {
            var own = it.sort;
            return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.sort ? sort : own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/splice3.js", ['./cjs-loader.mjs', './splice4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../array/virtual/splice": __cjsMetaURL$1
        }, _require);

        (function () {
          var splice = require('../array/virtual/splice');

          var ArrayPrototype = Array.prototype;

          module.exports = function (it) {
            var own = it.splice;
            return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.splice ? splice : own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/includes3.js", ['./cjs-loader.mjs', './includes5.js', './includes4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../array/virtual/includes": __cjsMetaURL$1,
          "../string/virtual/includes": __cjsMetaURL$2
        }, _require);

        (function () {
          var arrayIncludes = require('../array/virtual/includes');

          var stringIncludes = require('../string/virtual/includes');

          var ArrayPrototype = Array.prototype;
          var StringPrototype = String.prototype;

          module.exports = function (it) {
            var own = it.includes;
            if (it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.includes) return arrayIncludes;

            if (typeof it === 'string' || it === StringPrototype || it instanceof String && own === StringPrototype.includes) {
              return stringIncludes;
            }

            return own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/iterator4.js", ['./cjs-loader.mjs', './es.object.to-string.js', './well-known-symbol-wrapped.js', './es.symbol.iterator.js', './es.array.iterator.js', './es.string.iterator.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$5, __cjsMetaURL$4, __cjsMetaURL$1, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../modules/es.array.iterator": __cjsMetaURL$1,
          "../../modules/es.object.to-string": __cjsMetaURL$2,
          "../../modules/es.string.iterator": __cjsMetaURL$3,
          "../../modules/es.symbol.iterator": __cjsMetaURL$4,
          "../../internals/well-known-symbol-wrapped": __cjsMetaURL$5
        }, _require);

        (function () {
          require('../../modules/es.array.iterator');

          require('../../modules/es.object.to-string');

          require('../../modules/es.string.iterator');

          require('../../modules/es.symbol.iterator');

          var WrappedWellKnownSymbolModule = require('../../internals/well-known-symbol-wrapped');

          module.exports = WrappedWellKnownSymbolModule.f('iterator');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/freeze3.js", ['./cjs-loader.mjs', './path.js', './es.object.freeze.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../modules/es.object.freeze": __cjsMetaURL$1,
          "../../internals/path": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../modules/es.object.freeze');

          var path = require('../../internals/path');

          module.exports = path.Object.freeze;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/map3.js", ['./cjs-loader.mjs', './map4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../array/virtual/map": __cjsMetaURL$1
        }, _require);

        (function () {
          var map = require('../array/virtual/map');

          var ArrayPrototype = Array.prototype;

          module.exports = function (it) {
            var own = it.map;
            return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.map ? map : own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/filter3.js", ['./cjs-loader.mjs', './filter4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../array/virtual/filter": __cjsMetaURL$1
        }, _require);

        (function () {
          var filter = require('../array/virtual/filter');

          var ArrayPrototype = Array.prototype;

          module.exports = function (it) {
            var own = it.filter;
            return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.filter ? filter : own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/last-index-of3.js", ['./cjs-loader.mjs', './last-index-of4.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../array/virtual/last-index-of": __cjsMetaURL$1
        }, _require);

        (function () {
          var lastIndexOf = require('../array/virtual/last-index-of');

          var ArrayPrototype = Array.prototype;

          module.exports = function (it) {
            var own = it.lastIndexOf;
            return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.lastIndexOf ? lastIndexOf : own;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/iterator5.js", ['./cjs-loader.mjs', './iterator3.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../stable/symbol/iterator": __cjsMetaURL$1
        }, _require);

        (function () {
          var parent = require('../../stable/symbol/iterator');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/stringify3.js", ['./cjs-loader.mjs', './path.js', './es.json.stringify.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../modules/es.json.stringify": __cjsMetaURL$1,
          "../../internals/path": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../modules/es.json.stringify');

          var core = require('../../internals/path'); // eslint-disable-next-line es/no-json -- safe


          if (!core.JSON) core.JSON = {
            stringify: JSON.stringify
          }; // eslint-disable-next-line no-unused-vars -- required for `.length`

          module.exports = function stringify(it, replacer, space) {
            return core.JSON.stringify.apply(null, arguments);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/index3.js", ['./cjs-loader.mjs', './index.js', './esnext.symbol.async-dispose.js', './esnext.symbol.dispose.js', './esnext.symbol.matcher.js', './esnext.symbol.metadata.js', './esnext.symbol.observable.js', './esnext.symbol.pattern-match.js', './esnext.symbol.replace-all.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$6, __cjsMetaURL$7, __cjsMetaURL$8;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../stable/symbol": __cjsMetaURL$1,
          "../../modules/esnext.symbol.async-dispose": __cjsMetaURL$2,
          "../../modules/esnext.symbol.dispose": __cjsMetaURL$3,
          "../../modules/esnext.symbol.matcher": __cjsMetaURL$4,
          "../../modules/esnext.symbol.metadata": __cjsMetaURL$5,
          "../../modules/esnext.symbol.observable": __cjsMetaURL$6,
          "../../modules/esnext.symbol.pattern-match": __cjsMetaURL$7,
          "../../modules/esnext.symbol.replace-all": __cjsMetaURL$8
        }, _require);

        (function () {
          var parent = require('../../stable/symbol');

          require('../../modules/esnext.symbol.async-dispose');

          require('../../modules/esnext.symbol.dispose');

          require('../../modules/esnext.symbol.matcher');

          require('../../modules/esnext.symbol.metadata');

          require('../../modules/esnext.symbol.observable'); // TODO: Remove from `core-js@4`


          require('../../modules/esnext.symbol.pattern-match'); // TODO: Remove from `core-js@4`


          require('../../modules/esnext.symbol.replace-all');

          module.exports = parent;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.parse-int.js", ['./cjs-loader.mjs', './export.js', './number-parse-int.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/number-parse-int": __cjsMetaURL$2
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var $parseInt = require('../internals/number-parse-int'); // `parseInt` method
          // https://tc39.es/ecma262/#sec-parseint-string-radix


          $({
            global: true,
            forced: parseInt != $parseInt
          }, {
            parseInt: $parseInt
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/path.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = {};
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/dom-iterables.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          // iterable DOM collections
          // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
          module.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/create-non-enumerable-property.js", ['./cjs-loader.mjs', './descriptors.js', './create-property-descriptor.js', './object-define-property.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/descriptors": __cjsMetaURL$1,
          "../internals/object-define-property": __cjsMetaURL$2,
          "../internals/create-property-descriptor": __cjsMetaURL$3
        }, _require);

        (function () {
          var DESCRIPTORS = require('../internals/descriptors');

          var definePropertyModule = require('../internals/object-define-property');

          var createPropertyDescriptor = require('../internals/create-property-descriptor');

          module.exports = DESCRIPTORS ? function (object, key, value) {
            return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
          } : function (object, key, value) {
            object[key] = value;
            return object;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.iterator.js", ['./cjs-loader.mjs', './to-indexed-object.js', './internal-state.js', './add-to-unscopables.js', './iterators.js', './define-iterator.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$4, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$5;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-indexed-object": __cjsMetaURL$1,
          "../internals/add-to-unscopables": __cjsMetaURL$2,
          "../internals/iterators": __cjsMetaURL$3,
          "../internals/internal-state": __cjsMetaURL$4,
          "../internals/define-iterator": __cjsMetaURL$5
        }, _require);

        (function () {
          var toIndexedObject = require('../internals/to-indexed-object');

          var addToUnscopables = require('../internals/add-to-unscopables');

          var Iterators = require('../internals/iterators');

          var InternalStateModule = require('../internals/internal-state');

          var defineIterator = require('../internals/define-iterator');

          var ARRAY_ITERATOR = 'Array Iterator';
          var setInternalState = InternalStateModule.set;
          var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
          // https://tc39.es/ecma262/#sec-array.prototype.entries
          // `Array.prototype.keys` method
          // https://tc39.es/ecma262/#sec-array.prototype.keys
          // `Array.prototype.values` method
          // https://tc39.es/ecma262/#sec-array.prototype.values
          // `Array.prototype[@@iterator]` method
          // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
          // `CreateArrayIterator` internal method
          // https://tc39.es/ecma262/#sec-createarrayiterator

          module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
            setInternalState(this, {
              type: ARRAY_ITERATOR,
              target: toIndexedObject(iterated),
              // target
              index: 0,
              // next index
              kind: kind // kind

            }); // `%ArrayIteratorPrototype%.next` method
            // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
          }, function () {
            var state = getInternalState(this);
            var target = state.target;
            var kind = state.kind;
            var index = state.index++;

            if (!target || index >= target.length) {
              state.target = undefined;
              return {
                value: undefined,
                done: true
              };
            }

            if (kind == 'keys') return {
              value: index,
              done: false
            };
            if (kind == 'values') return {
              value: target[index],
              done: false
            };
            return {
              value: [index, target[index]],
              done: false
            };
          }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
          // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
          // https://tc39.es/ecma262/#sec-createmappedargumentsobject

          Iterators.Arguments = Iterators.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

          addToUnscopables('keys');
          addToUnscopables('values');
          addToUnscopables('entries');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/classof.js", ['./cjs-loader.mjs', './is-callable.js', './classof-raw.js', './well-known-symbol.js', './to-string-tag-support.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-string-tag-support": __cjsMetaURL$1,
          "../internals/is-callable": __cjsMetaURL$2,
          "../internals/classof-raw": __cjsMetaURL$3,
          "../internals/well-known-symbol": __cjsMetaURL$4
        }, _require);

        (function () {
          var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');

          var isCallable = require('../internals/is-callable');

          var classofRaw = require('../internals/classof-raw');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var TO_STRING_TAG = wellKnownSymbol('toStringTag'); // ES3 wrong here

          var CORRECT_ARGUMENTS = classofRaw(function () {
            return arguments;
          }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

          var tryGet = function tryGet(it, key) {
            try {
              return it[key];
            } catch (error) {
              /* empty */
            }
          }; // getting tag from ES6+ `Object.prototype.toString`


          module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
            var O, tag, result;
            return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
            : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
            : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
            : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/global.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          var check = function check(it) {
            return it && it.Math == Math && it;
          }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


          module.exports = // eslint-disable-next-line es/no-global-this -- safe
          check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
          check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func -- fallback
          function () {
            return this;
          }() || Function('return this')();
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/well-known-symbol.js", ['./cjs-loader.mjs', './global.js', './native-symbol.js', './use-symbol-as-uid.js', './shared.js', './has-own-property.js', './uid.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$5, __cjsMetaURL$6, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1,
          "../internals/shared": __cjsMetaURL$2,
          "../internals/has-own-property": __cjsMetaURL$3,
          "../internals/uid": __cjsMetaURL$4,
          "../internals/native-symbol": __cjsMetaURL$5,
          "../internals/use-symbol-as-uid": __cjsMetaURL$6
        }, _require);

        (function () {
          var global = require('../internals/global');

          var shared = require('../internals/shared');

          var hasOwn = require('../internals/has-own-property');

          var uid = require('../internals/uid');

          var NATIVE_SYMBOL = require('../internals/native-symbol');

          var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

          var WellKnownSymbolsStore = shared('wks');
          var Symbol = global.Symbol;
          var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

          module.exports = function (name) {
            if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
              if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
                WellKnownSymbolsStore[name] = Symbol[name];
              } else {
                WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
              }
            }

            return WellKnownSymbolsStore[name];
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/iterators.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = {};
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/index4.js", ['./cjs-loader.mjs', './path.js', './es.array.concat.js', './es.object.to-string.js', './es.symbol.js', './es.symbol.async-iterator.js', './es.symbol.description.js', './es.symbol.has-instance.js', './es.symbol.is-concat-spreadable.js', './es.symbol.iterator.js', './es.symbol.match.js', './es.symbol.match-all.js', './es.symbol.replace.js', './es.symbol.search.js', './es.symbol.species.js', './es.symbol.split.js', './es.symbol.to-primitive.js', './es.symbol.to-string-tag.js', './es.symbol.unscopables.js', './es.json.to-string-tag.js', './es.math.to-string-tag.js', './es.reflect.to-string-tag.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$l, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$6, __cjsMetaURL$7, __cjsMetaURL$8, __cjsMetaURL$9, __cjsMetaURL$a, __cjsMetaURL$b, __cjsMetaURL$c, __cjsMetaURL$d, __cjsMetaURL$e, __cjsMetaURL$f, __cjsMetaURL$g, __cjsMetaURL$h, __cjsMetaURL$i, __cjsMetaURL$j, __cjsMetaURL$k;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$l = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$a = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$b = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$c = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$d = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$e = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$f = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$g = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$h = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$i = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$j = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$k = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../modules/es.array.concat": __cjsMetaURL$1,
          "../../modules/es.object.to-string": __cjsMetaURL$2,
          "../../modules/es.symbol": __cjsMetaURL$3,
          "../../modules/es.symbol.async-iterator": __cjsMetaURL$4,
          "../../modules/es.symbol.description": __cjsMetaURL$5,
          "../../modules/es.symbol.has-instance": __cjsMetaURL$6,
          "../../modules/es.symbol.is-concat-spreadable": __cjsMetaURL$7,
          "../../modules/es.symbol.iterator": __cjsMetaURL$8,
          "../../modules/es.symbol.match": __cjsMetaURL$9,
          "../../modules/es.symbol.match-all": __cjsMetaURL$a,
          "../../modules/es.symbol.replace": __cjsMetaURL$b,
          "../../modules/es.symbol.search": __cjsMetaURL$c,
          "../../modules/es.symbol.species": __cjsMetaURL$d,
          "../../modules/es.symbol.split": __cjsMetaURL$e,
          "../../modules/es.symbol.to-primitive": __cjsMetaURL$f,
          "../../modules/es.symbol.to-string-tag": __cjsMetaURL$g,
          "../../modules/es.symbol.unscopables": __cjsMetaURL$h,
          "../../modules/es.json.to-string-tag": __cjsMetaURL$i,
          "../../modules/es.math.to-string-tag": __cjsMetaURL$j,
          "../../modules/es.reflect.to-string-tag": __cjsMetaURL$k,
          "../../internals/path": __cjsMetaURL$l
        }, _require);

        (function () {
          require('../../modules/es.array.concat');

          require('../../modules/es.object.to-string');

          require('../../modules/es.symbol');

          require('../../modules/es.symbol.async-iterator');

          require('../../modules/es.symbol.description');

          require('../../modules/es.symbol.has-instance');

          require('../../modules/es.symbol.is-concat-spreadable');

          require('../../modules/es.symbol.iterator');

          require('../../modules/es.symbol.match');

          require('../../modules/es.symbol.match-all');

          require('../../modules/es.symbol.replace');

          require('../../modules/es.symbol.search');

          require('../../modules/es.symbol.species');

          require('../../modules/es.symbol.split');

          require('../../modules/es.symbol.to-primitive');

          require('../../modules/es.symbol.to-string-tag');

          require('../../modules/es.symbol.unscopables');

          require('../../modules/es.json.to-string-tag');

          require('../../modules/es.math.to-string-tag');

          require('../../modules/es.reflect.to-string-tag');

          var path = require('../../internals/path');

          module.exports = path.Symbol;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.object.assign.js", ['./cjs-loader.mjs', './export.js', './object-assign.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/object-assign": __cjsMetaURL$2
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var assign = require('../internals/object-assign'); // `Object.assign` method
          // https://tc39.es/ecma262/#sec-object.assign
          // eslint-disable-next-line es/no-object-assign -- required for testing


          $({
            target: 'Object',
            stat: true,
            forced: Object.assign !== assign
          }, {
            assign: assign
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.object.set-prototype-of.js", ['./cjs-loader.mjs', './export.js', './object-set-prototype-of.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/object-set-prototype-of": __cjsMetaURL$2
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var setPrototypeOf = require('../internals/object-set-prototype-of'); // `Object.setPrototypeOf` method
          // https://tc39.es/ecma262/#sec-object.setprototypeof


          $({
            target: 'Object',
            stat: true
          }, {
            setPrototypeOf: setPrototypeOf
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.object.keys.js", ['./cjs-loader.mjs', './fails.js', './to-object.js', './export.js', './object-keys.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$4, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/to-object": __cjsMetaURL$2,
          "../internals/object-keys": __cjsMetaURL$3,
          "../internals/fails": __cjsMetaURL$4
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var toObject = require('../internals/to-object');

          var nativeKeys = require('../internals/object-keys');

          var fails = require('../internals/fails');

          var FAILS_ON_PRIMITIVES = fails(function () {
            nativeKeys(1);
          }); // `Object.keys` method
          // https://tc39.es/ecma262/#sec-object.keys

          $({
            target: 'Object',
            stat: true,
            forced: FAILS_ON_PRIMITIVES
          }, {
            keys: function keys(it) {
              return nativeKeys(toObject(it));
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/index5.js", ['./cjs-loader.mjs', './path.js', './es.object.to-string.js', './es.array.iterator.js', './es.string.iterator.js', './es.aggregate-error.js', './es.promise.js', './es.promise.all-settled.js', './es.promise.any.js', './es.promise.finally.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$9, __cjsMetaURL$3, __cjsMetaURL$2, __cjsMetaURL$8, __cjsMetaURL$1, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$6, __cjsMetaURL$7;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../modules/es.aggregate-error": __cjsMetaURL$1,
          "../../modules/es.array.iterator": __cjsMetaURL$2,
          "../../modules/es.object.to-string": __cjsMetaURL$3,
          "../../modules/es.promise": __cjsMetaURL$4,
          "../../modules/es.promise.all-settled": __cjsMetaURL$5,
          "../../modules/es.promise.any": __cjsMetaURL$6,
          "../../modules/es.promise.finally": __cjsMetaURL$7,
          "../../modules/es.string.iterator": __cjsMetaURL$8,
          "../../internals/path": __cjsMetaURL$9
        }, _require);

        (function () {
          require('../../modules/es.aggregate-error');

          require('../../modules/es.array.iterator');

          require('../../modules/es.object.to-string');

          require('../../modules/es.promise');

          require('../../modules/es.promise.all-settled');

          require('../../modules/es.promise.any');

          require('../../modules/es.promise.finally');

          require('../../modules/es.string.iterator');

          var path = require('../../internals/path');

          module.exports = path.Promise;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.object.to-string.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0); // empty

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.object.freeze.js", ['./cjs-loader.mjs', './fails.js', './is-object.js', './export.js', './freezing.js', './internal-metadata.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$5;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/freezing": __cjsMetaURL$2,
          "../internals/fails": __cjsMetaURL$3,
          "../internals/is-object": __cjsMetaURL$4,
          "../internals/internal-metadata": __cjsMetaURL$5
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var FREEZING = require('../internals/freezing');

          var fails = require('../internals/fails');

          var isObject = require('../internals/is-object');

          var onFreeze = require('../internals/internal-metadata').onFreeze; // eslint-disable-next-line es/no-object-freeze -- safe


          var $freeze = Object.freeze;
          var FAILS_ON_PRIMITIVES = fails(function () {
            $freeze(1);
          }); // `Object.freeze` method
          // https://tc39.es/ecma262/#sec-object.freeze

          $({
            target: 'Object',
            stat: true,
            forced: FAILS_ON_PRIMITIVES,
            sham: !FREEZING
          }, {
            freeze: function freeze(it) {
              return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it;
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.string.iterator.js", ['./cjs-loader.mjs', './to-string.js', './internal-state.js', './define-iterator.js', './string-multibyte.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/string-multibyte": __cjsMetaURL$1,
          "../internals/to-string": __cjsMetaURL$2,
          "../internals/internal-state": __cjsMetaURL$3,
          "../internals/define-iterator": __cjsMetaURL$4
        }, _require);

        (function () {
          var charAt = require('../internals/string-multibyte').charAt;

          var toString = require('../internals/to-string');

          var InternalStateModule = require('../internals/internal-state');

          var defineIterator = require('../internals/define-iterator');

          var STRING_ITERATOR = 'String Iterator';
          var setInternalState = InternalStateModule.set;
          var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
          // https://tc39.es/ecma262/#sec-string.prototype-@@iterator

          defineIterator(String, 'String', function (iterated) {
            setInternalState(this, {
              type: STRING_ITERATOR,
              string: toString(iterated),
              index: 0
            }); // `%StringIteratorPrototype%.next` method
            // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
          }, function next() {
            var state = getInternalState(this);
            var string = state.string;
            var index = state.index;
            var point;
            if (index >= string.length) return {
              value: undefined,
              done: true
            };
            point = charAt(string, index);
            state.index += point.length;
            return {
              value: point,
              done: false
            };
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.iterator.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.iterator` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.iterator


          defineWellKnownSymbol('iterator');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/well-known-symbol-wrapped.js", ['./cjs-loader.mjs', './well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var wellKnownSymbol = require('../internals/well-known-symbol');

          exports$1.f = wellKnownSymbol;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/reduce4.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.array.reduce.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.array.reduce": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.array.reduce');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('Array').reduce;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/slice4.js", ['./cjs-loader.mjs', './es.array.slice.js', './entry-virtual.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.array.slice": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.array.slice');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('Array').slice;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/index-of4.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.array.index-of.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.array.index-of": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.array.index-of');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('Array').indexOf;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/splice4.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.array.splice.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.array.splice": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.array.splice');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('Array').splice;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/trim4.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.string.trim.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.string.trim": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.string.trim');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('String').trim;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/starts-with4.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.string.starts-with.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.string.starts-with": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.string.starts-with');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('String').startsWith;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/sort4.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.array.sort.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.array.sort": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.array.sort');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('Array').sort;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/includes4.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.string.includes.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.string.includes": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.string.includes');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('String').includes;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/includes5.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.array.includes.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.array.includes": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.array.includes');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('Array').includes;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/last-index-of4.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.array.last-index-of.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.array.last-index-of": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.array.last-index-of');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('Array').lastIndexOf;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/map4.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.array.map.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.array.map": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.array.map');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('Array').map;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/filter4.js", ['./cjs-loader.mjs', './entry-virtual.js', './es.array.filter.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../../../modules/es.array.filter": __cjsMetaURL$1,
          "../../../internals/entry-virtual": __cjsMetaURL$2
        }, _require);

        (function () {
          require('../../../modules/es.array.filter');

          var entryVirtual = require('../../../internals/entry-virtual');

          module.exports = entryVirtual('Array').filter;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.json.stringify.js", ['./cjs-loader.mjs', './fails.js', './get-built-in.js', './export.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/get-built-in": __cjsMetaURL$2,
          "../internals/fails": __cjsMetaURL$3
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var getBuiltIn = require('../internals/get-built-in');

          var fails = require('../internals/fails');

          var $stringify = getBuiltIn('JSON', 'stringify');
          var re = /[\uD800-\uDFFF]/g;
          var low = /^[\uD800-\uDBFF]$/;
          var hi = /^[\uDC00-\uDFFF]$/;

          var fix = function fix(match, offset, string) {
            var prev = string.charAt(offset - 1);
            var next = string.charAt(offset + 1);

            if (low.test(match) && !hi.test(next) || hi.test(match) && !low.test(prev)) {
              return "\\u" + match.charCodeAt(0).toString(16);
            }

            return match;
          };

          var FORCED = fails(function () {
            return $stringify("\uDF06\uD834") !== "\"\\udf06\\ud834\"" || $stringify("\uDEAD") !== "\"\\udead\"";
          });

          if ($stringify) {
            // `JSON.stringify` method
            // https://tc39.es/ecma262/#sec-json.stringify
            // https://github.com/tc39/proposal-well-formed-stringify
            $({
              target: 'JSON',
              stat: true,
              forced: FORCED
            }, {
              // eslint-disable-next-line no-unused-vars -- required for `.length`
              stringify: function stringify(it, replacer, space) {
                var result = $stringify.apply(null, arguments);
                return typeof result == 'string' ? result.replace(re, fix) : result;
              }
            });
          }
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/esnext.symbol.async-dispose.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.asyncDispose` well-known symbol
          // https://github.com/tc39/proposal-using-statement


          defineWellKnownSymbol('asyncDispose');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/esnext.symbol.dispose.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.dispose` well-known symbol
          // https://github.com/tc39/proposal-using-statement


          defineWellKnownSymbol('dispose');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/esnext.symbol.matcher.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.matcher` well-known symbol
          // https://github.com/tc39/proposal-pattern-matching


          defineWellKnownSymbol('matcher');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/esnext.symbol.observable.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.observable` well-known symbol
          // https://github.com/tc39/proposal-observable


          defineWellKnownSymbol('observable');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/esnext.symbol.metadata.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.metadata` well-known symbol
          // https://github.com/tc39/proposal-decorators


          defineWellKnownSymbol('metadata');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/esnext.symbol.replace-all.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          // TODO: remove from `core-js@4`
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

          defineWellKnownSymbol('replaceAll');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/esnext.symbol.pattern-match.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          // TODO: remove from `core-js@4`
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.patternMatch` well-known symbol
          // https://github.com/tc39/proposal-pattern-matching


          defineWellKnownSymbol('patternMatch');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/export.js", ['./cjs-loader.mjs', './global.js', './is-callable.js', './path.js', './has-own-property.js', './object-get-own-property-descriptor.js', './is-forced.js', './function-bind-context.js', './create-non-enumerable-property.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$5, __cjsMetaURL$8, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$6, __cjsMetaURL$7;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1,
          "../internals/is-callable": __cjsMetaURL$2,
          "../internals/object-get-own-property-descriptor": __cjsMetaURL$3,
          "../internals/is-forced": __cjsMetaURL$4,
          "../internals/path": __cjsMetaURL$5,
          "../internals/function-bind-context": __cjsMetaURL$6,
          "../internals/create-non-enumerable-property": __cjsMetaURL$7,
          "../internals/has-own-property": __cjsMetaURL$8
        }, _require);

        (function () {
          var global = require('../internals/global');

          var isCallable = require('../internals/is-callable');

          var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

          var isForced = require('../internals/is-forced');

          var path = require('../internals/path');

          var bind = require('../internals/function-bind-context');

          var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

          var hasOwn = require('../internals/has-own-property');

          var wrapConstructor = function wrapConstructor(NativeConstructor) {
            var Wrapper = function Wrapper(a, b, c) {
              if (this instanceof NativeConstructor) {
                switch (arguments.length) {
                  case 0:
                    return new NativeConstructor();

                  case 1:
                    return new NativeConstructor(a);

                  case 2:
                    return new NativeConstructor(a, b);
                }

                return new NativeConstructor(a, b, c);
              }

              return NativeConstructor.apply(this, arguments);
            };

            Wrapper.prototype = NativeConstructor.prototype;
            return Wrapper;
          };
          /*
            options.target      - name of the target object
            options.global      - target is the global object
            options.stat        - export as static methods of target
            options.proto       - export as prototype methods of target
            options.real        - real prototype method for the `pure` version
            options.forced      - export even if the native feature is available
            options.bind        - bind methods to the target, required for the `pure` version
            options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
            options.unsafe      - use the simple assignment of property instead of delete + defineProperty
            options.sham        - add a flag to not completely full polyfills
            options.enumerable  - export as enumerable property
            options.noTargetGet - prevent calling a getter on target
            options.name        - the .name of the function if it does not match the key
          */


          module.exports = function (options, source) {
            var TARGET = options.target;
            var GLOBAL = options.global;
            var STATIC = options.stat;
            var PROTO = options.proto;
            var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;
            var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
            var targetPrototype = target.prototype;
            var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
            var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

            for (key in source) {
              FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

              USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);
              targetProperty = target[key];
              if (USE_NATIVE) if (options.noTargetGet) {
                descriptor = getOwnPropertyDescriptor(nativeSource, key);
                nativeProperty = descriptor && descriptor.value;
              } else nativeProperty = nativeSource[key]; // export native or implementation

              sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
              if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue; // bind timers to global for call from export context

              if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global); // wrap global constructors for prevent changs in this version
              else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
                else if (PROTO && isCallable(sourceProperty)) resultProperty = bind(Function.call, sourceProperty); // default case
                  else resultProperty = sourceProperty; // add a flag to not completely full polyfills

              if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
                createNonEnumerableProperty(resultProperty, 'sham', true);
              }

              createNonEnumerableProperty(target, key, resultProperty);

              if (PROTO) {
                VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

                if (!hasOwn(path, VIRTUAL_PROTOTYPE)) {
                  createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
                } // export virtual prototype methods


                createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty); // export real prototype methods

                if (options.real && targetPrototype && !targetPrototype[key]) {
                  createNonEnumerableProperty(targetPrototype, key, sourceProperty);
                }
              }
            }
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/number-parse-int.js", ['./cjs-loader.mjs', './global.js', './fails.js', './to-string.js', './whitespaces.js', './string-trim.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$5, __cjsMetaURL$4;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1,
          "../internals/fails": __cjsMetaURL$2,
          "../internals/to-string": __cjsMetaURL$3,
          "../internals/string-trim": __cjsMetaURL$4,
          "../internals/whitespaces": __cjsMetaURL$5
        }, _require);

        (function () {
          var global = require('../internals/global');

          var fails = require('../internals/fails');

          var toString = require('../internals/to-string');

          var trim = require('../internals/string-trim').trim;

          var whitespaces = require('../internals/whitespaces');

          var $parseInt = global.parseInt;
          var Symbol = global.Symbol;
          var ITERATOR = Symbol && Symbol.iterator;
          var hex = /^[+-]?0x/i;
          var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22 // MS Edge 18- broken with boxed symbols
          || ITERATOR && !fails(function () {
            $parseInt(Object(ITERATOR));
          }); // `parseInt` method
          // https://tc39.es/ecma262/#sec-parseint-string-radix

          module.exports = FORCED ? function parseInt(string, radix) {
            var S = trim(toString(string));
            return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
          } : $parseInt;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/create-property-descriptor.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = function (bitmap, value) {
            return {
              enumerable: !(bitmap & 1),
              configurable: !(bitmap & 2),
              writable: !(bitmap & 4),
              value: value
            };
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/descriptors.js", ['./cjs-loader.mjs', './fails.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/fails": __cjsMetaURL$1
        }, _require);

        (function () {
          var fails = require('../internals/fails'); // Detect IE8's incomplete defineProperty implementation


          module.exports = !fails(function () {
            // eslint-disable-next-line es/no-object-defineproperty -- required for testing
            return Object.defineProperty({}, 1, {
              get: function get() {
                return 7;
              }
            })[1] != 7;
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-define-property.js", ['./cjs-loader.mjs', './descriptors.js', './to-property-key.js', './ie8-dom-define.js', './an-object.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$4, __cjsMetaURL$2, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/descriptors": __cjsMetaURL$1,
          "../internals/ie8-dom-define": __cjsMetaURL$2,
          "../internals/an-object": __cjsMetaURL$3,
          "../internals/to-property-key": __cjsMetaURL$4
        }, _require);

        (function () {
          var DESCRIPTORS = require('../internals/descriptors');

          var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

          var anObject = require('../internals/an-object');

          var toPropertyKey = require('../internals/to-property-key'); // eslint-disable-next-line es/no-object-defineproperty -- safe


          var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
          // https://tc39.es/ecma262/#sec-object.defineproperty

          exports$1.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPropertyKey(P);
            anObject(Attributes);
            if (IE8_DOM_DEFINE) try {
              return $defineProperty(O, P, Attributes);
            } catch (error) {
              /* empty */
            }
            if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
            if ('value' in Attributes) O[P] = Attributes.value;
            return O;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/to-string-tag-support.js", ['./cjs-loader.mjs', './well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var wellKnownSymbol = require('../internals/well-known-symbol');

          var TO_STRING_TAG = wellKnownSymbol('toStringTag');
          var test = {};
          test[TO_STRING_TAG] = 'z';
          module.exports = String(test) === '[object z]';
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/classof-raw.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          var toString = {}.toString;

          module.exports = function (it) {
            return toString.call(it).slice(8, -1);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/is-callable.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          // `IsCallable` abstract operation
          // https://tc39.es/ecma262/#sec-iscallable
          module.exports = function (argument) {
            return typeof argument === 'function';
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/define-iterator.js", ['./cjs-loader.mjs', './is-callable.js', './is-pure.js', './well-known-symbol.js', './create-non-enumerable-property.js', './export.js', './redefine.js', './set-to-string-tag.js', './iterators.js', './function-name.js', './object-get-prototype-of.js', './iterators-core.js', './create-iterator-constructor.js', './object-set-prototype-of.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$4, __cjsMetaURL$2, __cjsMetaURL$b, __cjsMetaURL$9, __cjsMetaURL$1, __cjsMetaURL$a, __cjsMetaURL$8, __cjsMetaURL$c, __cjsMetaURL$3, __cjsMetaURL$6, __cjsMetaURL$d, __cjsMetaURL$5, __cjsMetaURL$7;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$b = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$a = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$c = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$d = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/is-pure": __cjsMetaURL$2,
          "../internals/function-name": __cjsMetaURL$3,
          "../internals/is-callable": __cjsMetaURL$4,
          "../internals/create-iterator-constructor": __cjsMetaURL$5,
          "../internals/object-get-prototype-of": __cjsMetaURL$6,
          "../internals/object-set-prototype-of": __cjsMetaURL$7,
          "../internals/set-to-string-tag": __cjsMetaURL$8,
          "../internals/create-non-enumerable-property": __cjsMetaURL$9,
          "../internals/redefine": __cjsMetaURL$a,
          "../internals/well-known-symbol": __cjsMetaURL$b,
          "../internals/iterators": __cjsMetaURL$c,
          "../internals/iterators-core": __cjsMetaURL$d
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var IS_PURE = require('../internals/is-pure');

          var FunctionName = require('../internals/function-name');

          var isCallable = require('../internals/is-callable');

          var createIteratorConstructor = require('../internals/create-iterator-constructor');

          var getPrototypeOf = require('../internals/object-get-prototype-of');

          var setPrototypeOf = require('../internals/object-set-prototype-of');

          var setToStringTag = require('../internals/set-to-string-tag');

          var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

          var redefine = require('../internals/redefine');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var Iterators = require('../internals/iterators');

          var IteratorsCore = require('../internals/iterators-core');

          var PROPER_FUNCTION_NAME = FunctionName.PROPER;
          var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
          var IteratorPrototype = IteratorsCore.IteratorPrototype;
          var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
          var ITERATOR = wellKnownSymbol('iterator');
          var KEYS = 'keys';
          var VALUES = 'values';
          var ENTRIES = 'entries';

          var returnThis = function returnThis() {
            return this;
          };

          module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
            createIteratorConstructor(IteratorConstructor, NAME, next);

            var getIterationMethod = function getIterationMethod(KIND) {
              if (KIND === DEFAULT && defaultIterator) return defaultIterator;
              if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

              switch (KIND) {
                case KEYS:
                  return function keys() {
                    return new IteratorConstructor(this, KIND);
                  };

                case VALUES:
                  return function values() {
                    return new IteratorConstructor(this, KIND);
                  };

                case ENTRIES:
                  return function entries() {
                    return new IteratorConstructor(this, KIND);
                  };
              }

              return function () {
                return new IteratorConstructor(this);
              };
            };

            var TO_STRING_TAG = NAME + ' Iterator';
            var INCORRECT_VALUES_NAME = false;
            var IterablePrototype = Iterable.prototype;
            var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
            var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
            var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
            var CurrentIteratorPrototype, methods, KEY; // fix native

            if (anyNativeIterator) {
              CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));

              if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
                if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                  if (setPrototypeOf) {
                    setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                  } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
                    redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
                  }
                } // Set @@toStringTag to native iterators


                setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
                if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
              }
            } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


            if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
              if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
                createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
              } else {
                INCORRECT_VALUES_NAME = true;

                defaultIterator = function values() {
                  return nativeIterator.call(this);
                };
              }
            } // export additional methods


            if (DEFAULT) {
              methods = {
                values: getIterationMethod(VALUES),
                keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                entries: getIterationMethod(ENTRIES)
              };
              if (FORCED) for (KEY in methods) {
                if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                  redefine(IterablePrototype, KEY, methods[KEY]);
                }
              } else $({
                target: NAME,
                proto: true,
                forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
              }, methods);
            } // define iterator


            if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
              redefine(IterablePrototype, ITERATOR, defaultIterator, {
                name: DEFAULT
              });
            }

            Iterators[NAME] = defaultIterator;
            return methods;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/add-to-unscopables.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = function () {
            /* empty */
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/to-indexed-object.js", ['./cjs-loader.mjs', './indexed-object.js', './require-object-coercible.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/indexed-object": __cjsMetaURL$1,
          "../internals/require-object-coercible": __cjsMetaURL$2
        }, _require);

        (function () {
          // toObject with fallback for non-array-like ES3 strings
          var IndexedObject = require('../internals/indexed-object');

          var requireObjectCoercible = require('../internals/require-object-coercible');

          module.exports = function (it) {
            return IndexedObject(requireObjectCoercible(it));
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/internal-state.js", ['./cjs-loader.mjs', './global.js', './is-object.js', './shared-store.js', './has-own-property.js', './create-non-enumerable-property.js', './hidden-keys.js', './shared-key.js', './native-weak-map.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$6, __cjsMetaURL$5, __cjsMetaURL$4, __cjsMetaURL$8, __cjsMetaURL$7, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/native-weak-map": __cjsMetaURL$1,
          "../internals/global": __cjsMetaURL$2,
          "../internals/is-object": __cjsMetaURL$3,
          "../internals/create-non-enumerable-property": __cjsMetaURL$4,
          "../internals/has-own-property": __cjsMetaURL$5,
          "../internals/shared-store": __cjsMetaURL$6,
          "../internals/shared-key": __cjsMetaURL$7,
          "../internals/hidden-keys": __cjsMetaURL$8
        }, _require);

        (function () {
          var NATIVE_WEAK_MAP = require('../internals/native-weak-map');

          var global = require('../internals/global');

          var isObject = require('../internals/is-object');

          var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

          var hasOwn = require('../internals/has-own-property');

          var shared = require('../internals/shared-store');

          var sharedKey = require('../internals/shared-key');

          var hiddenKeys = require('../internals/hidden-keys');

          var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
          var WeakMap = global.WeakMap;
          var set, get, has;

          var enforce = function enforce(it) {
            return has(it) ? get(it) : set(it, {});
          };

          var getterFor = function getterFor(TYPE) {
            return function (it) {
              var state;

              if (!isObject(it) || (state = get(it)).type !== TYPE) {
                throw TypeError('Incompatible receiver, ' + TYPE + ' required');
              }

              return state;
            };
          };

          if (NATIVE_WEAK_MAP || shared.state) {
            var store = shared.state || (shared.state = new WeakMap());
            var wmget = store.get;
            var wmhas = store.has;
            var wmset = store.set;

            set = function set(it, metadata) {
              if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
              metadata.facade = it;
              wmset.call(store, it, metadata);
              return metadata;
            };

            get = function get(it) {
              return wmget.call(store, it) || {};
            };

            has = function has(it) {
              return wmhas.call(store, it);
            };
          } else {
            var STATE = sharedKey('state');
            hiddenKeys[STATE] = true;

            set = function set(it, metadata) {
              if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
              metadata.facade = it;
              createNonEnumerableProperty(it, STATE, metadata);
              return metadata;
            };

            get = function get(it) {
              return hasOwn(it, STATE) ? it[STATE] : {};
            };

            has = function has(it) {
              return hasOwn(it, STATE);
            };
          }

          module.exports = {
            set: set,
            get: get,
            has: has,
            enforce: enforce,
            getterFor: getterFor
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/uid.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          var id = 0;
          var postfix = Math.random();

          module.exports = function (key) {
            return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/shared.js", ['./cjs-loader.mjs', './is-pure.js', './shared-store.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-pure": __cjsMetaURL$1,
          "../internals/shared-store": __cjsMetaURL$2
        }, _require);

        (function () {
          var IS_PURE = require('../internals/is-pure');

          var store = require('../internals/shared-store');

          (module.exports = function (key, value) {
            return store[key] || (store[key] = value !== undefined ? value : {});
          })('versions', []).push({
            version: '3.18.3',
            mode: IS_PURE ? 'pure' : 'global',
            copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/native-symbol.js", ['./cjs-loader.mjs', './fails.js', './engine-v8-version.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/engine-v8-version": __cjsMetaURL$1,
          "../internals/fails": __cjsMetaURL$2
        }, _require);

        (function () {
          /* eslint-disable es/no-symbol -- required for testing */
          var V8_VERSION = require('../internals/engine-v8-version');

          var fails = require('../internals/fails'); // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing


          module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
            var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
            // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

            return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
            !Symbol.sham && V8_VERSION && V8_VERSION < 41;
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/use-symbol-as-uid.js", ['./cjs-loader.mjs', './native-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/native-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          /* eslint-disable es/no-symbol -- required for testing */
          var NATIVE_SYMBOL = require('../internals/native-symbol');

          module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/has-own-property.js", ['./cjs-loader.mjs', './to-object.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-object": __cjsMetaURL$1
        }, _require);

        (function () {
          var toObject = require('../internals/to-object');

          var hasOwnProperty = {}.hasOwnProperty; // `HasOwnProperty` abstract operation
          // https://tc39.es/ecma262/#sec-hasownproperty

          module.exports = Object.hasOwn || function hasOwn(it, key) {
            return hasOwnProperty.call(toObject(it), key);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-assign.js", ['./cjs-loader.mjs', './fails.js', './descriptors.js', './object-property-is-enumerable.js', './indexed-object.js', './to-object.js', './object-keys.js', './object-get-own-property-symbols.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$5, __cjsMetaURL$7, __cjsMetaURL$6, __cjsMetaURL$3, __cjsMetaURL$4;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/descriptors": __cjsMetaURL$1,
          "../internals/fails": __cjsMetaURL$2,
          "../internals/object-keys": __cjsMetaURL$3,
          "../internals/object-get-own-property-symbols": __cjsMetaURL$4,
          "../internals/object-property-is-enumerable": __cjsMetaURL$5,
          "../internals/to-object": __cjsMetaURL$6,
          "../internals/indexed-object": __cjsMetaURL$7
        }, _require);

        (function () {
          var DESCRIPTORS = require('../internals/descriptors');

          var fails = require('../internals/fails');

          var objectKeys = require('../internals/object-keys');

          var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');

          var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');

          var toObject = require('../internals/to-object');

          var IndexedObject = require('../internals/indexed-object'); // eslint-disable-next-line es/no-object-assign -- safe


          var $assign = Object.assign; // eslint-disable-next-line es/no-object-defineproperty -- required for testing

          var defineProperty = Object.defineProperty; // `Object.assign` method
          // https://tc39.es/ecma262/#sec-object.assign

          module.exports = !$assign || fails(function () {
            // should have correct order of operations (Edge bug)
            if (DESCRIPTORS && $assign({
              b: 1
            }, $assign(defineProperty({}, 'a', {
              enumerable: true,
              get: function get() {
                defineProperty(this, 'b', {
                  value: 3,
                  enumerable: false
                });
              }
            }), {
              b: 2
            })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

            var A = {};
            var B = {}; // eslint-disable-next-line es/no-symbol -- safe

            var symbol = Symbol();
            var alphabet = 'abcdefghijklmnopqrst';
            A[symbol] = 7;
            alphabet.split('').forEach(function (chr) {
              B[chr] = chr;
            });
            return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
          }) ? function assign(target, source) {
            // eslint-disable-line no-unused-vars -- required for `.length`
            var T = toObject(target);
            var argumentsLength = arguments.length;
            var index = 1;
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            var propertyIsEnumerable = propertyIsEnumerableModule.f;

            while (argumentsLength > index) {
              var S = IndexedObject(arguments[index++]);
              var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
              var length = keys.length;
              var j = 0;
              var key;

              while (length > j) {
                key = keys[j++];
                if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
              }
            }

            return T;
          } : $assign;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.description.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0); // empty

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.js", ['./cjs-loader.mjs', './global.js', './is-callable.js', './fails.js', './descriptors.js', './object-property-is-enumerable.js', './create-property-descriptor.js', './to-indexed-object.js', './is-object.js', './get-built-in.js', './native-symbol.js', './is-symbol.js', './is-pure.js', './shared.js', './to-object.js', './has-own-property.js', './uid.js', './well-known-symbol.js', './to-property-key.js', './object-get-own-property-descriptor.js', './an-object.js', './object-define-property.js', './export.js', './is-array.js', './to-string.js', './hidden-keys.js', './object-keys.js', './shared-key.js', './object-create.js', './object-get-own-property-names.js', './object-get-own-property-names-external.js', './object-get-own-property-symbols.js', './redefine.js', './well-known-symbol-wrapped.js', './define-well-known-symbol.js', './set-to-string-tag.js', './internal-state.js', './array-iteration.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$a, __cjsMetaURL$7, __cjsMetaURL$5, __cjsMetaURL$q, __cjsMetaURL$i, __cjsMetaURL$f, __cjsMetaURL$b, __cjsMetaURL$3, __cjsMetaURL$6, __cjsMetaURL$c, __cjsMetaURL$4, __cjsMetaURL$s, __cjsMetaURL$e, __cjsMetaURL$8, __cjsMetaURL$v, __cjsMetaURL$w, __cjsMetaURL$g, __cjsMetaURL$o, __cjsMetaURL$d, __cjsMetaURL$p, __cjsMetaURL$1, __cjsMetaURL$9, __cjsMetaURL$h, __cjsMetaURL$u, __cjsMetaURL$k, __cjsMetaURL$t, __cjsMetaURL$j, __cjsMetaURL$l, __cjsMetaURL$m, __cjsMetaURL$n, __cjsMetaURL$r, __cjsMetaURL$x, __cjsMetaURL$y, __cjsMetaURL$z, __cjsMetaURL$A, __cjsMetaURL$B;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$a = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$q = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$i = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$f = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$b = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$c = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$s = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$e = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$v = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$w = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$g = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$o = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$d = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$p = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$h = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$u = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$k = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$t = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$j = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$l = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$m = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$n = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$r = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$x = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$y = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$z = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$A = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$B = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/global": __cjsMetaURL$2,
          "../internals/get-built-in": __cjsMetaURL$3,
          "../internals/is-pure": __cjsMetaURL$4,
          "../internals/descriptors": __cjsMetaURL$5,
          "../internals/native-symbol": __cjsMetaURL$6,
          "../internals/fails": __cjsMetaURL$7,
          "../internals/has-own-property": __cjsMetaURL$8,
          "../internals/is-array": __cjsMetaURL$9,
          "../internals/is-callable": __cjsMetaURL$a,
          "../internals/is-object": __cjsMetaURL$b,
          "../internals/is-symbol": __cjsMetaURL$c,
          "../internals/an-object": __cjsMetaURL$d,
          "../internals/to-object": __cjsMetaURL$e,
          "../internals/to-indexed-object": __cjsMetaURL$f,
          "../internals/to-property-key": __cjsMetaURL$g,
          "../internals/to-string": __cjsMetaURL$h,
          "../internals/create-property-descriptor": __cjsMetaURL$i,
          "../internals/object-create": __cjsMetaURL$j,
          "../internals/object-keys": __cjsMetaURL$k,
          "../internals/object-get-own-property-names": __cjsMetaURL$l,
          "../internals/object-get-own-property-names-external": __cjsMetaURL$m,
          "../internals/object-get-own-property-symbols": __cjsMetaURL$n,
          "../internals/object-get-own-property-descriptor": __cjsMetaURL$o,
          "../internals/object-define-property": __cjsMetaURL$p,
          "../internals/object-property-is-enumerable": __cjsMetaURL$q,
          "../internals/redefine": __cjsMetaURL$r,
          "../internals/shared": __cjsMetaURL$s,
          "../internals/shared-key": __cjsMetaURL$t,
          "../internals/hidden-keys": __cjsMetaURL$u,
          "../internals/uid": __cjsMetaURL$v,
          "../internals/well-known-symbol": __cjsMetaURL$w,
          "../internals/well-known-symbol-wrapped": __cjsMetaURL$x,
          "../internals/define-well-known-symbol": __cjsMetaURL$y,
          "../internals/set-to-string-tag": __cjsMetaURL$z,
          "../internals/internal-state": __cjsMetaURL$A,
          "../internals/array-iteration": __cjsMetaURL$B
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var global = require('../internals/global');

          var getBuiltIn = require('../internals/get-built-in');

          var IS_PURE = require('../internals/is-pure');

          var DESCRIPTORS = require('../internals/descriptors');

          var NATIVE_SYMBOL = require('../internals/native-symbol');

          var fails = require('../internals/fails');

          var hasOwn = require('../internals/has-own-property');

          var isArray = require('../internals/is-array');

          var isCallable = require('../internals/is-callable');

          var isObject = require('../internals/is-object');

          var isSymbol = require('../internals/is-symbol');

          var anObject = require('../internals/an-object');

          var toObject = require('../internals/to-object');

          var toIndexedObject = require('../internals/to-indexed-object');

          var toPropertyKey = require('../internals/to-property-key');

          var $toString = require('../internals/to-string');

          var createPropertyDescriptor = require('../internals/create-property-descriptor');

          var nativeObjectCreate = require('../internals/object-create');

          var objectKeys = require('../internals/object-keys');

          var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');

          var getOwnPropertyNamesExternal = require('../internals/object-get-own-property-names-external');

          var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');

          var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');

          var definePropertyModule = require('../internals/object-define-property');

          var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');

          var redefine = require('../internals/redefine');

          var shared = require('../internals/shared');

          var sharedKey = require('../internals/shared-key');

          var hiddenKeys = require('../internals/hidden-keys');

          var uid = require('../internals/uid');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');

          var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

          var setToStringTag = require('../internals/set-to-string-tag');

          var InternalStateModule = require('../internals/internal-state');

          var $forEach = require('../internals/array-iteration').forEach;

          var HIDDEN = sharedKey('hidden');
          var SYMBOL = 'Symbol';
          var PROTOTYPE = 'prototype';
          var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
          var setInternalState = InternalStateModule.set;
          var getInternalState = InternalStateModule.getterFor(SYMBOL);
          var ObjectPrototype = Object[PROTOTYPE];
          var $Symbol = global.Symbol;
          var $stringify = getBuiltIn('JSON', 'stringify');
          var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
          var nativeDefineProperty = definePropertyModule.f;
          var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
          var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
          var AllSymbols = shared('symbols');
          var ObjectPrototypeSymbols = shared('op-symbols');
          var StringToSymbolRegistry = shared('string-to-symbol-registry');
          var SymbolToStringRegistry = shared('symbol-to-string-registry');
          var WellKnownSymbolsStore = shared('wks');
          var QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

          var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

          var setSymbolDescriptor = DESCRIPTORS && fails(function () {
            return nativeObjectCreate(nativeDefineProperty({}, 'a', {
              get: function get() {
                return nativeDefineProperty(this, 'a', {
                  value: 7
                }).a;
              }
            })).a != 7;
          }) ? function (O, P, Attributes) {
            var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
            if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
            nativeDefineProperty(O, P, Attributes);

            if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
              nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
            }
          } : nativeDefineProperty;

          var wrap = function wrap(tag, description) {
            var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
            setInternalState(symbol, {
              type: SYMBOL,
              tag: tag,
              description: description
            });
            if (!DESCRIPTORS) symbol.description = description;
            return symbol;
          };

          var $defineProperty = function defineProperty(O, P, Attributes) {
            if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
            anObject(O);
            var key = toPropertyKey(P);
            anObject(Attributes);

            if (hasOwn(AllSymbols, key)) {
              if (!Attributes.enumerable) {
                if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
                O[HIDDEN][key] = true;
              } else {
                if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
                Attributes = nativeObjectCreate(Attributes, {
                  enumerable: createPropertyDescriptor(0, false)
                });
              }

              return setSymbolDescriptor(O, key, Attributes);
            }

            return nativeDefineProperty(O, key, Attributes);
          };

          var $defineProperties = function defineProperties(O, Properties) {
            anObject(O);
            var properties = toIndexedObject(Properties);
            var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
            $forEach(keys, function (key) {
              if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
            });
            return O;
          };

          var $create = function create(O, Properties) {
            return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
          };

          var $propertyIsEnumerable = function propertyIsEnumerable(V) {
            var P = toPropertyKey(V);
            var enumerable = nativePropertyIsEnumerable.call(this, P);
            if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
            return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
          };

          var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
            var it = toIndexedObject(O);
            var key = toPropertyKey(P);
            if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
            var descriptor = nativeGetOwnPropertyDescriptor(it, key);

            if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
              descriptor.enumerable = true;
            }

            return descriptor;
          };

          var $getOwnPropertyNames = function getOwnPropertyNames(O) {
            var names = nativeGetOwnPropertyNames(toIndexedObject(O));
            var result = [];
            $forEach(names, function (key) {
              if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) result.push(key);
            });
            return result;
          };

          var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
            var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
            var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
            var result = [];
            $forEach(names, function (key) {
              if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
                result.push(AllSymbols[key]);
              }
            });
            return result;
          }; // `Symbol` constructor
          // https://tc39.es/ecma262/#sec-symbol-constructor


          if (!NATIVE_SYMBOL) {
            $Symbol = function Symbol() {
              if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
              var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
              var tag = uid(description);

              var setter = function setter(value) {
                if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
                if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
              };

              if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
                configurable: true,
                set: setter
              });
              return wrap(tag, description);
            };

            redefine($Symbol[PROTOTYPE], 'toString', function toString() {
              return getInternalState(this).tag;
            });
            redefine($Symbol, 'withoutSetter', function (description) {
              return wrap(uid(description), description);
            });
            propertyIsEnumerableModule.f = $propertyIsEnumerable;
            definePropertyModule.f = $defineProperty;
            getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
            getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
            getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

            wrappedWellKnownSymbolModule.f = function (name) {
              return wrap(wellKnownSymbol(name), name);
            };

            if (DESCRIPTORS) {
              // https://github.com/tc39/proposal-Symbol-description
              nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
                configurable: true,
                get: function description() {
                  return getInternalState(this).description;
                }
              });

              if (!IS_PURE) {
                redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
                  unsafe: true
                });
              }
            }
          }

          $({
            global: true,
            wrap: true,
            forced: !NATIVE_SYMBOL,
            sham: !NATIVE_SYMBOL
          }, {
            Symbol: $Symbol
          });
          $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
            defineWellKnownSymbol(name);
          });
          $({
            target: SYMBOL,
            stat: true,
            forced: !NATIVE_SYMBOL
          }, {
            // `Symbol.for` method
            // https://tc39.es/ecma262/#sec-symbol.for
            'for': function _for(key) {
              var string = $toString(key);
              if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
              var symbol = $Symbol(string);
              StringToSymbolRegistry[string] = symbol;
              SymbolToStringRegistry[symbol] = string;
              return symbol;
            },
            // `Symbol.keyFor` method
            // https://tc39.es/ecma262/#sec-symbol.keyfor
            keyFor: function keyFor(sym) {
              if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
              if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
            },
            useSetter: function useSetter() {
              USE_SETTER = true;
            },
            useSimple: function useSimple() {
              USE_SETTER = false;
            }
          });
          $({
            target: 'Object',
            stat: true,
            forced: !NATIVE_SYMBOL,
            sham: !DESCRIPTORS
          }, {
            // `Object.create` method
            // https://tc39.es/ecma262/#sec-object.create
            create: $create,
            // `Object.defineProperty` method
            // https://tc39.es/ecma262/#sec-object.defineproperty
            defineProperty: $defineProperty,
            // `Object.defineProperties` method
            // https://tc39.es/ecma262/#sec-object.defineproperties
            defineProperties: $defineProperties,
            // `Object.getOwnPropertyDescriptor` method
            // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor
          });
          $({
            target: 'Object',
            stat: true,
            forced: !NATIVE_SYMBOL
          }, {
            // `Object.getOwnPropertyNames` method
            // https://tc39.es/ecma262/#sec-object.getownpropertynames
            getOwnPropertyNames: $getOwnPropertyNames,
            // `Object.getOwnPropertySymbols` method
            // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
            getOwnPropertySymbols: $getOwnPropertySymbols
          }); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
          // https://bugs.chromium.org/p/v8/issues/detail?id=3443

          $({
            target: 'Object',
            stat: true,
            forced: fails(function () {
              getOwnPropertySymbolsModule.f(1);
            })
          }, {
            getOwnPropertySymbols: function getOwnPropertySymbols(it) {
              return getOwnPropertySymbolsModule.f(toObject(it));
            }
          }); // `JSON.stringify` method behavior with symbols
          // https://tc39.es/ecma262/#sec-json.stringify

          if ($stringify) {
            var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
              var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

              return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
              || $stringify({
                a: symbol
              }) != '{}' // V8 throws on boxed symbols
              || $stringify(Object(symbol)) != '{}';
            });
            $({
              target: 'JSON',
              stat: true,
              forced: FORCED_JSON_STRINGIFY
            }, {
              // eslint-disable-next-line no-unused-vars -- required for `.length`
              stringify: function stringify(it, replacer, space) {
                var args = [it];
                var index = 1;
                var $replacer;

                while (arguments.length > index) {
                  args.push(arguments[index++]);
                }

                $replacer = replacer;
                if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

                if (!isArray(replacer)) replacer = function replacer(key, value) {
                  if (isCallable($replacer)) value = $replacer.call(this, key, value);
                  if (!isSymbol(value)) return value;
                };
                args[1] = replacer;
                return $stringify.apply(null, args);
              }
            });
          } // `Symbol.prototype[@@toPrimitive]` method
          // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


          if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
            var valueOf = $Symbol[PROTOTYPE].valueOf;
            redefine($Symbol[PROTOTYPE], TO_PRIMITIVE, function () {
              return valueOf.apply(this, arguments);
            });
          } // `Symbol.prototype[@@toStringTag]` property
          // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


          setToStringTag($Symbol, SYMBOL);
          hiddenKeys[HIDDEN] = true;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.concat.js", ['./cjs-loader.mjs', './fails.js', './is-object.js', './engine-v8-version.js', './to-object.js', './well-known-symbol.js', './export.js', './is-array.js', './length-of-array-like.js', './create-property.js', './array-species-create.js', './array-method-has-species-support.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$4, __cjsMetaURL$b, __cjsMetaURL$5, __cjsMetaURL$a, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$6, __cjsMetaURL$7, __cjsMetaURL$8, __cjsMetaURL$9;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$b = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$a = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/fails": __cjsMetaURL$2,
          "../internals/is-array": __cjsMetaURL$3,
          "../internals/is-object": __cjsMetaURL$4,
          "../internals/to-object": __cjsMetaURL$5,
          "../internals/length-of-array-like": __cjsMetaURL$6,
          "../internals/create-property": __cjsMetaURL$7,
          "../internals/array-species-create": __cjsMetaURL$8,
          "../internals/array-method-has-species-support": __cjsMetaURL$9,
          "../internals/well-known-symbol": __cjsMetaURL$a,
          "../internals/engine-v8-version": __cjsMetaURL$b
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var fails = require('../internals/fails');

          var isArray = require('../internals/is-array');

          var isObject = require('../internals/is-object');

          var toObject = require('../internals/to-object');

          var lengthOfArrayLike = require('../internals/length-of-array-like');

          var createProperty = require('../internals/create-property');

          var arraySpeciesCreate = require('../internals/array-species-create');

          var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var V8_VERSION = require('../internals/engine-v8-version');

          var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
          var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
          var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
          // deoptimization and serious performance degradation
          // https://github.com/zloirock/core-js/issues/679

          var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
            var array = [];
            array[IS_CONCAT_SPREADABLE] = false;
            return array.concat()[0] !== array;
          });
          var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

          var isConcatSpreadable = function isConcatSpreadable(O) {
            if (!isObject(O)) return false;
            var spreadable = O[IS_CONCAT_SPREADABLE];
            return spreadable !== undefined ? !!spreadable : isArray(O);
          };

          var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
          // https://tc39.es/ecma262/#sec-array.prototype.concat
          // with adding support of @@isConcatSpreadable and @@species

          $({
            target: 'Array',
            proto: true,
            forced: FORCED
          }, {
            // eslint-disable-next-line no-unused-vars -- required for `.length`
            concat: function concat(arg) {
              var O = toObject(this);
              var A = arraySpeciesCreate(O, 0);
              var n = 0;
              var i, k, length, len, E;

              for (i = -1, length = arguments.length; i < length; i++) {
                E = i === -1 ? O : arguments[i];

                if (isConcatSpreadable(E)) {
                  len = lengthOfArrayLike(E);
                  if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

                  for (k = 0; k < len; k++, n++) {
                    if (k in E) createProperty(A, n, E[k]);
                  }
                } else {
                  if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                  createProperty(A, n++, E);
                }
              }

              A.length = n;
              return A;
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.match.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.match` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.match


          defineWellKnownSymbol('match');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.async-iterator.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.asyncIterator` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.asynciterator


          defineWellKnownSymbol('asyncIterator');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.match-all.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.matchAll` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.matchall


          defineWellKnownSymbol('matchAll');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.has-instance.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.hasInstance` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.hasinstance


          defineWellKnownSymbol('hasInstance');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.is-concat-spreadable.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.isConcatSpreadable` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.isconcatspreadable


          defineWellKnownSymbol('isConcatSpreadable');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.search.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.search` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.search


          defineWellKnownSymbol('search');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.split.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.split` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.split


          defineWellKnownSymbol('split');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.replace.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.replace` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.replace


          defineWellKnownSymbol('replace');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.species.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.species` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.species


          defineWellKnownSymbol('species');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.to-string-tag.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.toStringTag` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.tostringtag


          defineWellKnownSymbol('toStringTag');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.json.to-string-tag.js", ['./cjs-loader.mjs', './global.js', './set-to-string-tag.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1,
          "../internals/set-to-string-tag": __cjsMetaURL$2
        }, _require);

        (function () {
          var global = require('../internals/global');

          var setToStringTag = require('../internals/set-to-string-tag'); // JSON[@@toStringTag] property
          // https://tc39.es/ecma262/#sec-json-@@tostringtag


          setToStringTag(global.JSON, 'JSON', true);
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.unscopables.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.unscopables` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.unscopables


          defineWellKnownSymbol('unscopables');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.symbol.to-primitive.js", ['./cjs-loader.mjs', './define-well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/define-well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var defineWellKnownSymbol = require('../internals/define-well-known-symbol'); // `Symbol.toPrimitive` well-known symbol
          // https://tc39.es/ecma262/#sec-symbol.toprimitive


          defineWellKnownSymbol('toPrimitive');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.math.to-string-tag.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0); // empty

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.reflect.to-string-tag.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0); // empty

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-set-prototype-of.js", ['./cjs-loader.mjs', './an-object.js', './a-possible-prototype.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/an-object": __cjsMetaURL$1,
          "../internals/a-possible-prototype": __cjsMetaURL$2
        }, _require);

        (function () {
          /* eslint-disable no-proto -- safe */
          var anObject = require('../internals/an-object');

          var aPossiblePrototype = require('../internals/a-possible-prototype'); // `Object.setPrototypeOf` method
          // https://tc39.es/ecma262/#sec-object.setprototypeof
          // Works with __proto__ only. Old v8 can't work with null proto objects.
          // eslint-disable-next-line es/no-object-setprototypeof -- safe


          module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
            var CORRECT_SETTER = false;
            var test = {};
            var setter;

            try {
              // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
              setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
              setter.call(test, []);
              CORRECT_SETTER = test instanceof Array;
            } catch (error) {
              /* empty */
            }

            return function setPrototypeOf(O, proto) {
              anObject(O);
              aPossiblePrototype(proto);
              if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
              return O;
            };
          }() : undefined);
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/fails.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = function (exec) {
            try {
              return !!exec();
            } catch (error) {
              return true;
            }
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/to-object.js", ['./cjs-loader.mjs', './require-object-coercible.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/require-object-coercible": __cjsMetaURL$1
        }, _require);

        (function () {
          var requireObjectCoercible = require('../internals/require-object-coercible'); // `ToObject` abstract operation
          // https://tc39.es/ecma262/#sec-toobject


          module.exports = function (argument) {
            return Object(requireObjectCoercible(argument));
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-keys.js", ['./cjs-loader.mjs', './object-keys-internal.js', './enum-bug-keys.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/object-keys-internal": __cjsMetaURL$1,
          "../internals/enum-bug-keys": __cjsMetaURL$2
        }, _require);

        (function () {
          var internalObjectKeys = require('../internals/object-keys-internal');

          var enumBugKeys = require('../internals/enum-bug-keys'); // `Object.keys` method
          // https://tc39.es/ecma262/#sec-object.keys
          // eslint-disable-next-line es/no-object-keys -- safe


          module.exports = Object.keys || function keys(O) {
            return internalObjectKeys(O, enumBugKeys);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/freezing.js", ['./cjs-loader.mjs', './fails.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/fails": __cjsMetaURL$1
        }, _require);

        (function () {
          var fails = require('../internals/fails');

          module.exports = !fails(function () {
            // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
            return Object.isExtensible(Object.preventExtensions({}));
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/is-object.js", ['./cjs-loader.mjs', './is-callable.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-callable": __cjsMetaURL$1
        }, _require);

        (function () {
          var isCallable = require('../internals/is-callable');

          module.exports = function (it) {
            return typeof it === 'object' ? it !== null : isCallable(it);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/string-multibyte.js", ['./cjs-loader.mjs', './require-object-coercible.js', './to-integer-or-infinity.js', './to-string.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-integer-or-infinity": __cjsMetaURL$1,
          "../internals/to-string": __cjsMetaURL$2,
          "../internals/require-object-coercible": __cjsMetaURL$3
        }, _require);

        (function () {
          var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

          var toString = require('../internals/to-string');

          var requireObjectCoercible = require('../internals/require-object-coercible');

          var createMethod = function createMethod(CONVERT_TO_STRING) {
            return function ($this, pos) {
              var S = toString(requireObjectCoercible($this));
              var position = toIntegerOrInfinity(pos);
              var size = S.length;
              var first, second;
              if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
              first = S.charCodeAt(position);
              return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
            };
          };

          module.exports = {
            // `String.prototype.codePointAt` method
            // https://tc39.es/ecma262/#sec-string.prototype.codepointat
            codeAt: createMethod(false),
            // `String.prototype.at` method
            // https://github.com/mathiasbynens/String.prototype.at
            charAt: createMethod(true)
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/define-well-known-symbol.js", ['./cjs-loader.mjs', './path.js', './has-own-property.js', './object-define-property.js', './well-known-symbol-wrapped.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$4, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/path": __cjsMetaURL$1,
          "../internals/has-own-property": __cjsMetaURL$2,
          "../internals/well-known-symbol-wrapped": __cjsMetaURL$3,
          "../internals/object-define-property": __cjsMetaURL$4
        }, _require);

        (function () {
          var path = require('../internals/path');

          var hasOwn = require('../internals/has-own-property');

          var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');

          var defineProperty = require('../internals/object-define-property').f;

          module.exports = function (NAME) {
            var Symbol = path.Symbol || (path.Symbol = {});
            if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
              value: wrappedWellKnownSymbolModule.f(NAME)
            });
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/to-string.js", ['./cjs-loader.mjs', './classof.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/classof": __cjsMetaURL$1
        }, _require);

        (function () {
          var classof = require('../internals/classof');

          module.exports = function (argument) {
            if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
            return String(argument);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/internal-metadata.js", ['./cjs-loader.mjs', './is-object.js', './has-own-property.js', './uid.js', './object-define-property.js', './export.js', './hidden-keys.js', './object-get-own-property-names.js', './object-get-own-property-names-external.js', './freezing.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$8, __cjsMetaURL$5, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$6, __cjsMetaURL$7, __cjsMetaURL$9;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/hidden-keys": __cjsMetaURL$2,
          "../internals/is-object": __cjsMetaURL$3,
          "../internals/has-own-property": __cjsMetaURL$4,
          "../internals/object-define-property": __cjsMetaURL$5,
          "../internals/object-get-own-property-names": __cjsMetaURL$6,
          "../internals/object-get-own-property-names-external": __cjsMetaURL$7,
          "../internals/uid": __cjsMetaURL$8,
          "../internals/freezing": __cjsMetaURL$9
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var hiddenKeys = require('../internals/hidden-keys');

          var isObject = require('../internals/is-object');

          var hasOwn = require('../internals/has-own-property');

          var defineProperty = require('../internals/object-define-property').f;

          var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');

          var getOwnPropertyNamesExternalModule = require('../internals/object-get-own-property-names-external');

          var uid = require('../internals/uid');

          var FREEZING = require('../internals/freezing');

          var REQUIRED = false;
          var METADATA = uid('meta');
          var id = 0; // eslint-disable-next-line es/no-object-isextensible -- safe

          var isExtensible = Object.isExtensible || function () {
            return true;
          };

          var setMetadata = function setMetadata(it) {
            defineProperty(it, METADATA, {
              value: {
                objectID: 'O' + id++,
                // object ID
                weakData: {} // weak collections IDs

              }
            });
          };

          var fastKey = function fastKey(it, create) {
            // return a primitive with prefix
            if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

            if (!hasOwn(it, METADATA)) {
              // can't set metadata to uncaught frozen object
              if (!isExtensible(it)) return 'F'; // not necessary to add metadata

              if (!create) return 'E'; // add missing metadata

              setMetadata(it); // return object ID
            }

            return it[METADATA].objectID;
          };

          var getWeakData = function getWeakData(it, create) {
            if (!hasOwn(it, METADATA)) {
              // can't set metadata to uncaught frozen object
              if (!isExtensible(it)) return true; // not necessary to add metadata

              if (!create) return false; // add missing metadata

              setMetadata(it); // return the store of weak collections IDs
            }

            return it[METADATA].weakData;
          }; // add metadata on freeze-family methods calling


          var onFreeze = function onFreeze(it) {
            if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
            return it;
          };

          var enable = function enable() {
            meta.enable = function () {
              /* empty */
            };

            REQUIRED = true;
            var getOwnPropertyNames = getOwnPropertyNamesModule.f;
            var splice = [].splice;
            var test = {};
            test[METADATA] = 1; // prevent exposing of metadata key

            if (getOwnPropertyNames(test).length) {
              getOwnPropertyNamesModule.f = function (it) {
                var result = getOwnPropertyNames(it);

                for (var i = 0, length = result.length; i < length; i++) {
                  if (result[i] === METADATA) {
                    splice.call(result, i, 1);
                    break;
                  }
                }

                return result;
              };

              $({
                target: 'Object',
                stat: true,
                forced: true
              }, {
                getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
              });
            }
          };

          var meta = module.exports = {
            enable: enable,
            fastKey: fastKey,
            getWeakData: getWeakData,
            onFreeze: onFreeze
          };
          hiddenKeys[METADATA] = true;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.aggregate-error.js", ['./cjs-loader.mjs', './create-property-descriptor.js', './create-non-enumerable-property.js', './export.js', './to-string.js', './object-create.js', './object-get-prototype-of.js', './object-set-prototype-of.js', './copy-constructor-properties.js', './install-error-cause.js', './iterate.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$7, __cjsMetaURL$6, __cjsMetaURL$1, __cjsMetaURL$a, __cjsMetaURL$5, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$8, __cjsMetaURL$9;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$a = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/object-get-prototype-of": __cjsMetaURL$2,
          "../internals/object-set-prototype-of": __cjsMetaURL$3,
          "../internals/copy-constructor-properties": __cjsMetaURL$4,
          "../internals/object-create": __cjsMetaURL$5,
          "../internals/create-non-enumerable-property": __cjsMetaURL$6,
          "../internals/create-property-descriptor": __cjsMetaURL$7,
          "../internals/install-error-cause": __cjsMetaURL$8,
          "../internals/iterate": __cjsMetaURL$9,
          "../internals/to-string": __cjsMetaURL$a
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var getPrototypeOf = require('../internals/object-get-prototype-of');

          var setPrototypeOf = require('../internals/object-set-prototype-of');

          var copyConstructorProperties = require('../internals/copy-constructor-properties');

          var create = require('../internals/object-create');

          var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

          var createPropertyDescriptor = require('../internals/create-property-descriptor');

          var installErrorCause = require('../internals/install-error-cause');

          var iterate = require('../internals/iterate');

          var toString = require('../internals/to-string');

          var $AggregateError = function AggregateError(errors, message
          /* , options */
          ) {
            var that = this;
            var options = arguments.length > 2 ? arguments[2] : undefined;
            if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message, options);

            if (setPrototypeOf) {
              // eslint-disable-next-line unicorn/error-message -- expected
              that = setPrototypeOf(new Error(undefined), getPrototypeOf(that));
            }

            if (message !== undefined) createNonEnumerableProperty(that, 'message', toString(message));
            installErrorCause(that, options);
            var errorsArray = [];
            iterate(errors, errorsArray.push, {
              that: errorsArray
            });
            createNonEnumerableProperty(that, 'errors', errorsArray);
            return that;
          };

          if (setPrototypeOf) setPrototypeOf($AggregateError, Error);else copyConstructorProperties($AggregateError, Error);
          $AggregateError.prototype = create(Error.prototype, {
            constructor: createPropertyDescriptor(1, $AggregateError),
            message: createPropertyDescriptor(1, ''),
            name: createPropertyDescriptor(1, 'AggregateError')
          }); // `AggregateError` constructor
          // https://tc39.es/ecma262/#sec-aggregate-error-constructor

          $({
            global: true
          }, {
            AggregateError: $AggregateError
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.promise.all-settled.js", ['./cjs-loader.mjs', './a-callable.js', './export.js', './iterate.js', './new-promise-capability.js', './perform.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$5, __cjsMetaURL$3, __cjsMetaURL$4;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/a-callable": __cjsMetaURL$2,
          "../internals/new-promise-capability": __cjsMetaURL$3,
          "../internals/perform": __cjsMetaURL$4,
          "../internals/iterate": __cjsMetaURL$5
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var aCallable = require('../internals/a-callable');

          var newPromiseCapabilityModule = require('../internals/new-promise-capability');

          var perform = require('../internals/perform');

          var iterate = require('../internals/iterate'); // `Promise.allSettled` method
          // https://tc39.es/ecma262/#sec-promise.allsettled


          $({
            target: 'Promise',
            stat: true
          }, {
            allSettled: function allSettled(iterable) {
              var C = this;
              var capability = newPromiseCapabilityModule.f(C);
              var resolve = capability.resolve;
              var reject = capability.reject;
              var result = perform(function () {
                var promiseResolve = aCallable(C.resolve);
                var values = [];
                var counter = 0;
                var remaining = 1;
                iterate(iterable, function (promise) {
                  var index = counter++;
                  var alreadyCalled = false;
                  values.push(undefined);
                  remaining++;
                  promiseResolve.call(C, promise).then(function (value) {
                    if (alreadyCalled) return;
                    alreadyCalled = true;
                    values[index] = {
                      status: 'fulfilled',
                      value: value
                    };
                    --remaining || resolve(values);
                  }, function (error) {
                    if (alreadyCalled) return;
                    alreadyCalled = true;
                    values[index] = {
                      status: 'rejected',
                      reason: error
                    };
                    --remaining || resolve(values);
                  });
                });
                --remaining || resolve(values);
              });
              if (result.error) reject(result.value);
              return capability.promise;
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.promise.js", ['./cjs-loader.mjs', './global.js', './is-callable.js', './is-object.js', './get-built-in.js', './engine-v8-version.js', './a-callable.js', './is-pure.js', './well-known-symbol.js', './is-forced.js', './export.js', './inspect-source.js', './redefine.js', './set-to-string-tag.js', './internal-state.js', './object-set-prototype-of.js', './iterate.js', './native-promise-constructor.js', './redefine-all.js', './set-species.js', './an-instance.js', './check-correctness-of-iteration.js', './species-constructor.js', './engine-is-node.js', './task.js', './microtask.js', './new-promise-capability.js', './promise-resolve.js', './host-report-errors.js', './perform.js', './engine-is-browser.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$c, __cjsMetaURL$d, __cjsMetaURL$4, __cjsMetaURL$u, __cjsMetaURL$b, __cjsMetaURL$2, __cjsMetaURL$r, __cjsMetaURL$q, __cjsMetaURL$1, __cjsMetaURL$f, __cjsMetaURL$6, __cjsMetaURL$9, __cjsMetaURL$p, __cjsMetaURL$8, __cjsMetaURL$g, __cjsMetaURL$5, __cjsMetaURL$7, __cjsMetaURL$a, __cjsMetaURL$e, __cjsMetaURL$h, __cjsMetaURL$i, __cjsMetaURL$t, __cjsMetaURL$j, __cjsMetaURL$k, __cjsMetaURL$n, __cjsMetaURL$l, __cjsMetaURL$m, __cjsMetaURL$o, __cjsMetaURL$s;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$c = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$d = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$u = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$b = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$r = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$q = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$f = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$p = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$g = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$a = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$e = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$h = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$i = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$t = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$j = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$k = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$n = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$l = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$m = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$o = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$s = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/is-pure": __cjsMetaURL$2,
          "../internals/global": __cjsMetaURL$3,
          "../internals/get-built-in": __cjsMetaURL$4,
          "../internals/native-promise-constructor": __cjsMetaURL$5,
          "../internals/redefine": __cjsMetaURL$6,
          "../internals/redefine-all": __cjsMetaURL$7,
          "../internals/object-set-prototype-of": __cjsMetaURL$8,
          "../internals/set-to-string-tag": __cjsMetaURL$9,
          "../internals/set-species": __cjsMetaURL$a,
          "../internals/a-callable": __cjsMetaURL$b,
          "../internals/is-callable": __cjsMetaURL$c,
          "../internals/is-object": __cjsMetaURL$d,
          "../internals/an-instance": __cjsMetaURL$e,
          "../internals/inspect-source": __cjsMetaURL$f,
          "../internals/iterate": __cjsMetaURL$g,
          "../internals/check-correctness-of-iteration": __cjsMetaURL$h,
          "../internals/species-constructor": __cjsMetaURL$i,
          "../internals/task": __cjsMetaURL$j,
          "../internals/microtask": __cjsMetaURL$k,
          "../internals/promise-resolve": __cjsMetaURL$l,
          "../internals/host-report-errors": __cjsMetaURL$m,
          "../internals/new-promise-capability": __cjsMetaURL$n,
          "../internals/perform": __cjsMetaURL$o,
          "../internals/internal-state": __cjsMetaURL$p,
          "../internals/is-forced": __cjsMetaURL$q,
          "../internals/well-known-symbol": __cjsMetaURL$r,
          "../internals/engine-is-browser": __cjsMetaURL$s,
          "../internals/engine-is-node": __cjsMetaURL$t,
          "../internals/engine-v8-version": __cjsMetaURL$u
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var IS_PURE = require('../internals/is-pure');

          var global = require('../internals/global');

          var getBuiltIn = require('../internals/get-built-in');

          var NativePromise = require('../internals/native-promise-constructor');

          var redefine = require('../internals/redefine');

          var redefineAll = require('../internals/redefine-all');

          var setPrototypeOf = require('../internals/object-set-prototype-of');

          var setToStringTag = require('../internals/set-to-string-tag');

          var setSpecies = require('../internals/set-species');

          var aCallable = require('../internals/a-callable');

          var isCallable = require('../internals/is-callable');

          var isObject = require('../internals/is-object');

          var anInstance = require('../internals/an-instance');

          var inspectSource = require('../internals/inspect-source');

          var iterate = require('../internals/iterate');

          var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

          var speciesConstructor = require('../internals/species-constructor');

          var task = require('../internals/task').set;

          var microtask = require('../internals/microtask');

          var promiseResolve = require('../internals/promise-resolve');

          var hostReportErrors = require('../internals/host-report-errors');

          var newPromiseCapabilityModule = require('../internals/new-promise-capability');

          var perform = require('../internals/perform');

          var InternalStateModule = require('../internals/internal-state');

          var isForced = require('../internals/is-forced');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var IS_BROWSER = require('../internals/engine-is-browser');

          var IS_NODE = require('../internals/engine-is-node');

          var V8_VERSION = require('../internals/engine-v8-version');

          var SPECIES = wellKnownSymbol('species');
          var PROMISE = 'Promise';
          var getInternalState = InternalStateModule.get;
          var setInternalState = InternalStateModule.set;
          var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
          var NativePromisePrototype = NativePromise && NativePromise.prototype;
          var PromiseConstructor = NativePromise;
          var PromiseConstructorPrototype = NativePromisePrototype;
          var TypeError = global.TypeError;
          var document = global.document;
          var process = global.process;
          var newPromiseCapability = newPromiseCapabilityModule.f;
          var newGenericPromiseCapability = newPromiseCapability;
          var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
          var NATIVE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);
          var UNHANDLED_REJECTION = 'unhandledrejection';
          var REJECTION_HANDLED = 'rejectionhandled';
          var PENDING = 0;
          var FULFILLED = 1;
          var REJECTED = 2;
          var HANDLED = 1;
          var UNHANDLED = 2;
          var SUBCLASSING = false;
          var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
          var FORCED = isForced(PROMISE, function () {
            var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
            var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor); // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
            // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
            // We can't detect it synchronously, so just check versions

            if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true; // We need Promise#finally in the pure version for preventing prototype pollution

            if (IS_PURE && !PromiseConstructorPrototype['finally']) return true; // We can't use @@species feature detection in V8 since it causes
            // deoptimization and performance degradation
            // https://github.com/zloirock/core-js/issues/679

            if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false; // Detect correctness of subclassing with @@species support

            var promise = new PromiseConstructor(function (resolve) {
              resolve(1);
            });

            var FakePromise = function FakePromise(exec) {
              exec(function () {
                /* empty */
              }, function () {
                /* empty */
              });
            };

            var constructor = promise.constructor = {};
            constructor[SPECIES] = FakePromise;
            SUBCLASSING = promise.then(function () {
              /* empty */
            }) instanceof FakePromise;
            if (!SUBCLASSING) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

            return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
          });
          var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
            PromiseConstructor.all(iterable)['catch'](function () {
              /* empty */
            });
          }); // helpers

          var isThenable = function isThenable(it) {
            var then;
            return isObject(it) && isCallable(then = it.then) ? then : false;
          };

          var notify = function notify(state, isReject) {
            if (state.notified) return;
            state.notified = true;
            var chain = state.reactions;
            microtask(function () {
              var value = state.value;
              var ok = state.state == FULFILLED;
              var index = 0; // variable length - can't use forEach

              while (chain.length > index) {
                var reaction = chain[index++];
                var handler = ok ? reaction.ok : reaction.fail;
                var resolve = reaction.resolve;
                var reject = reaction.reject;
                var domain = reaction.domain;
                var result, then, exited;

                try {
                  if (handler) {
                    if (!ok) {
                      if (state.rejection === UNHANDLED) onHandleUnhandled(state);
                      state.rejection = HANDLED;
                    }

                    if (handler === true) result = value;else {
                      if (domain) domain.enter();
                      result = handler(value); // can throw

                      if (domain) {
                        domain.exit();
                        exited = true;
                      }
                    }

                    if (result === reaction.promise) {
                      reject(TypeError('Promise-chain cycle'));
                    } else if (then = isThenable(result)) {
                      then.call(result, resolve, reject);
                    } else resolve(result);
                  } else reject(value);
                } catch (error) {
                  if (domain && !exited) domain.exit();
                  reject(error);
                }
              }

              state.reactions = [];
              state.notified = false;
              if (isReject && !state.rejection) onUnhandled(state);
            });
          };

          var dispatchEvent = function dispatchEvent(name, promise, reason) {
            var event, handler;

            if (DISPATCH_EVENT) {
              event = document.createEvent('Event');
              event.promise = promise;
              event.reason = reason;
              event.initEvent(name, false, true);
              global.dispatchEvent(event);
            } else event = {
              promise: promise,
              reason: reason
            };

            if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
          };

          var onUnhandled = function onUnhandled(state) {
            task.call(global, function () {
              var promise = state.facade;
              var value = state.value;
              var IS_UNHANDLED = isUnhandled(state);
              var result;

              if (IS_UNHANDLED) {
                result = perform(function () {
                  if (IS_NODE) {
                    process.emit('unhandledRejection', value, promise);
                  } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
                }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

                state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
                if (result.error) throw result.value;
              }
            });
          };

          var isUnhandled = function isUnhandled(state) {
            return state.rejection !== HANDLED && !state.parent;
          };

          var onHandleUnhandled = function onHandleUnhandled(state) {
            task.call(global, function () {
              var promise = state.facade;

              if (IS_NODE) {
                process.emit('rejectionHandled', promise);
              } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
            });
          };

          var bind = function bind(fn, state, unwrap) {
            return function (value) {
              fn(state, value, unwrap);
            };
          };

          var internalReject = function internalReject(state, value, unwrap) {
            if (state.done) return;
            state.done = true;
            if (unwrap) state = unwrap;
            state.value = value;
            state.state = REJECTED;
            notify(state, true);
          };

          var internalResolve = function internalResolve(state, value, unwrap) {
            if (state.done) return;
            state.done = true;
            if (unwrap) state = unwrap;

            try {
              if (state.facade === value) throw TypeError("Promise can't be resolved itself");
              var then = isThenable(value);

              if (then) {
                microtask(function () {
                  var wrapper = {
                    done: false
                  };

                  try {
                    then.call(value, bind(internalResolve, wrapper, state), bind(internalReject, wrapper, state));
                  } catch (error) {
                    internalReject(wrapper, error, state);
                  }
                });
              } else {
                state.value = value;
                state.state = FULFILLED;
                notify(state, false);
              }
            } catch (error) {
              internalReject({
                done: false
              }, error, state);
            }
          }; // constructor polyfill


          if (FORCED) {
            // 25.4.3.1 Promise(executor)
            PromiseConstructor = function Promise(executor) {
              anInstance(this, PromiseConstructor, PROMISE);
              aCallable(executor);
              Internal.call(this);
              var state = getInternalState(this);

              try {
                executor(bind(internalResolve, state), bind(internalReject, state));
              } catch (error) {
                internalReject(state, error);
              }
            };

            PromiseConstructorPrototype = PromiseConstructor.prototype; // eslint-disable-next-line no-unused-vars -- required for `.length`

            Internal = function Promise(executor) {
              setInternalState(this, {
                type: PROMISE,
                done: false,
                notified: false,
                parent: false,
                reactions: [],
                rejection: false,
                state: PENDING,
                value: undefined
              });
            };

            Internal.prototype = redefineAll(PromiseConstructorPrototype, {
              // `Promise.prototype.then` method
              // https://tc39.es/ecma262/#sec-promise.prototype.then
              then: function then(onFulfilled, onRejected) {
                var state = getInternalPromiseState(this);
                var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
                reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
                reaction.fail = isCallable(onRejected) && onRejected;
                reaction.domain = IS_NODE ? process.domain : undefined;
                state.parent = true;
                state.reactions.push(reaction);
                if (state.state != PENDING) notify(state, false);
                return reaction.promise;
              },
              // `Promise.prototype.catch` method
              // https://tc39.es/ecma262/#sec-promise.prototype.catch
              'catch': function _catch(onRejected) {
                return this.then(undefined, onRejected);
              }
            });

            OwnPromiseCapability = function OwnPromiseCapability() {
              var promise = new Internal();
              var state = getInternalState(promise);
              this.promise = promise;
              this.resolve = bind(internalResolve, state);
              this.reject = bind(internalReject, state);
            };

            newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
              return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
            };

            if (!IS_PURE && isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
              nativeThen = NativePromisePrototype.then;

              if (!SUBCLASSING) {
                // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
                redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
                  var that = this;
                  return new PromiseConstructor(function (resolve, reject) {
                    nativeThen.call(that, resolve, reject);
                  }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
                }, {
                  unsafe: true
                }); // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

                redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], {
                  unsafe: true
                });
              } // make `.constructor === Promise` work for native promise-based APIs


              try {
                delete NativePromisePrototype.constructor;
              } catch (error) {
                /* empty */
              } // make `instanceof Promise` work for native promise-based APIs


              if (setPrototypeOf) {
                setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
              }
            }
          }

          $({
            global: true,
            wrap: true,
            forced: FORCED
          }, {
            Promise: PromiseConstructor
          });
          setToStringTag(PromiseConstructor, PROMISE, false, true);
          setSpecies(PROMISE);
          PromiseWrapper = getBuiltIn(PROMISE); // statics

          $({
            target: PROMISE,
            stat: true,
            forced: FORCED
          }, {
            // `Promise.reject` method
            // https://tc39.es/ecma262/#sec-promise.reject
            reject: function reject(r) {
              var capability = newPromiseCapability(this);
              capability.reject.call(undefined, r);
              return capability.promise;
            }
          });
          $({
            target: PROMISE,
            stat: true,
            forced: IS_PURE || FORCED
          }, {
            // `Promise.resolve` method
            // https://tc39.es/ecma262/#sec-promise.resolve
            resolve: function resolve(x) {
              return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
            }
          });
          $({
            target: PROMISE,
            stat: true,
            forced: INCORRECT_ITERATION
          }, {
            // `Promise.all` method
            // https://tc39.es/ecma262/#sec-promise.all
            all: function all(iterable) {
              var C = this;
              var capability = newPromiseCapability(C);
              var resolve = capability.resolve;
              var reject = capability.reject;
              var result = perform(function () {
                var $promiseResolve = aCallable(C.resolve);
                var values = [];
                var counter = 0;
                var remaining = 1;
                iterate(iterable, function (promise) {
                  var index = counter++;
                  var alreadyCalled = false;
                  values.push(undefined);
                  remaining++;
                  $promiseResolve.call(C, promise).then(function (value) {
                    if (alreadyCalled) return;
                    alreadyCalled = true;
                    values[index] = value;
                    --remaining || resolve(values);
                  }, reject);
                });
                --remaining || resolve(values);
              });
              if (result.error) reject(result.value);
              return capability.promise;
            },
            // `Promise.race` method
            // https://tc39.es/ecma262/#sec-promise.race
            race: function race(iterable) {
              var C = this;
              var capability = newPromiseCapability(C);
              var reject = capability.reject;
              var result = perform(function () {
                var $promiseResolve = aCallable(C.resolve);
                iterate(iterable, function (promise) {
                  $promiseResolve.call(C, promise).then(capability.resolve, reject);
                });
              });
              if (result.error) reject(result.value);
              return capability.promise;
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.promise.finally.js", ['./cjs-loader.mjs', './is-callable.js', './fails.js', './get-built-in.js', './is-pure.js', './export.js', './redefine.js', './native-promise-constructor.js', './species-constructor.js', './promise-resolve.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$6, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$9, __cjsMetaURL$3, __cjsMetaURL$7, __cjsMetaURL$8;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/is-pure": __cjsMetaURL$2,
          "../internals/native-promise-constructor": __cjsMetaURL$3,
          "../internals/fails": __cjsMetaURL$4,
          "../internals/get-built-in": __cjsMetaURL$5,
          "../internals/is-callable": __cjsMetaURL$6,
          "../internals/species-constructor": __cjsMetaURL$7,
          "../internals/promise-resolve": __cjsMetaURL$8,
          "../internals/redefine": __cjsMetaURL$9
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var IS_PURE = require('../internals/is-pure');

          var NativePromise = require('../internals/native-promise-constructor');

          var fails = require('../internals/fails');

          var getBuiltIn = require('../internals/get-built-in');

          var isCallable = require('../internals/is-callable');

          var speciesConstructor = require('../internals/species-constructor');

          var promiseResolve = require('../internals/promise-resolve');

          var redefine = require('../internals/redefine'); // Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829


          var NON_GENERIC = !!NativePromise && fails(function () {
            NativePromise.prototype['finally'].call({
              then: function then() {
                /* empty */
              }
            }, function () {
              /* empty */
            });
          }); // `Promise.prototype.finally` method
          // https://tc39.es/ecma262/#sec-promise.prototype.finally

          $({
            target: 'Promise',
            proto: true,
            real: true,
            forced: NON_GENERIC
          }, {
            'finally': function _finally(onFinally) {
              var C = speciesConstructor(this, getBuiltIn('Promise'));
              var isFunction = isCallable(onFinally);
              return this.then(isFunction ? function (x) {
                return promiseResolve(C, onFinally()).then(function () {
                  return x;
                });
              } : onFinally, isFunction ? function (e) {
                return promiseResolve(C, onFinally()).then(function () {
                  throw e;
                });
              } : onFinally);
            }
          }); // makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`

          if (!IS_PURE && isCallable(NativePromise)) {
            var method = getBuiltIn('Promise').prototype['finally'];

            if (NativePromise.prototype['finally'] !== method) {
              redefine(NativePromise.prototype, 'finally', method, {
                unsafe: true
              });
            }
          }
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.promise.any.js", ['./cjs-loader.mjs', './get-built-in.js', './a-callable.js', './export.js', './iterate.js', './new-promise-capability.js', './perform.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$6, __cjsMetaURL$4, __cjsMetaURL$5;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/a-callable": __cjsMetaURL$2,
          "../internals/get-built-in": __cjsMetaURL$3,
          "../internals/new-promise-capability": __cjsMetaURL$4,
          "../internals/perform": __cjsMetaURL$5,
          "../internals/iterate": __cjsMetaURL$6
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var aCallable = require('../internals/a-callable');

          var getBuiltIn = require('../internals/get-built-in');

          var newPromiseCapabilityModule = require('../internals/new-promise-capability');

          var perform = require('../internals/perform');

          var iterate = require('../internals/iterate');

          var PROMISE_ANY_ERROR = 'No one promise resolved'; // `Promise.any` method
          // https://tc39.es/ecma262/#sec-promise.any

          $({
            target: 'Promise',
            stat: true
          }, {
            any: function any(iterable) {
              var C = this;
              var capability = newPromiseCapabilityModule.f(C);
              var resolve = capability.resolve;
              var reject = capability.reject;
              var result = perform(function () {
                var promiseResolve = aCallable(C.resolve);
                var errors = [];
                var counter = 0;
                var remaining = 1;
                var alreadyResolved = false;
                iterate(iterable, function (promise) {
                  var index = counter++;
                  var alreadyRejected = false;
                  errors.push(undefined);
                  remaining++;
                  promiseResolve.call(C, promise).then(function (value) {
                    if (alreadyRejected || alreadyResolved) return;
                    alreadyResolved = true;
                    resolve(value);
                  }, function (error) {
                    if (alreadyRejected || alreadyResolved) return;
                    alreadyRejected = true;
                    errors[index] = error;
                    --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
                  });
                });
                --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
              });
              if (result.error) reject(result.value);
              return capability.promise;
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.reduce.js", ['./cjs-loader.mjs', './engine-v8-version.js', './export.js', './engine-is-node.js', './array-method-is-strict.js', './array-reduce.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$4, __cjsMetaURL$1, __cjsMetaURL$5, __cjsMetaURL$3, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/array-reduce": __cjsMetaURL$2,
          "../internals/array-method-is-strict": __cjsMetaURL$3,
          "../internals/engine-v8-version": __cjsMetaURL$4,
          "../internals/engine-is-node": __cjsMetaURL$5
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var $reduce = require('../internals/array-reduce').left;

          var arrayMethodIsStrict = require('../internals/array-method-is-strict');

          var CHROME_VERSION = require('../internals/engine-v8-version');

          var IS_NODE = require('../internals/engine-is-node');

          var STRICT_METHOD = arrayMethodIsStrict('reduce'); // Chrome 80-82 has a critical bug
          // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

          var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83; // `Array.prototype.reduce` method
          // https://tc39.es/ecma262/#sec-array.prototype.reduce

          $({
            target: 'Array',
            proto: true,
            forced: !STRICT_METHOD || CHROME_BUG
          }, {
            reduce: function reduce(callbackfn
            /* , initialValue */
            ) {
              return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/entry-virtual.js", ['./cjs-loader.mjs', './path.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/path": __cjsMetaURL$1
        }, _require);

        (function () {
          var path = require('../internals/path');

          module.exports = function (CONSTRUCTOR) {
            return path[CONSTRUCTOR + 'Prototype'];
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.splice.js", ['./cjs-loader.mjs', './to-object.js', './export.js', './to-integer-or-infinity.js', './length-of-array-like.js', './create-property.js', './array-species-create.js', './array-method-has-species-support.js', './to-absolute-index.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$5, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$7, __cjsMetaURL$6, __cjsMetaURL$8, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/to-absolute-index": __cjsMetaURL$2,
          "../internals/to-integer-or-infinity": __cjsMetaURL$3,
          "../internals/length-of-array-like": __cjsMetaURL$4,
          "../internals/to-object": __cjsMetaURL$5,
          "../internals/array-species-create": __cjsMetaURL$6,
          "../internals/create-property": __cjsMetaURL$7,
          "../internals/array-method-has-species-support": __cjsMetaURL$8
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var toAbsoluteIndex = require('../internals/to-absolute-index');

          var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

          var lengthOfArrayLike = require('../internals/length-of-array-like');

          var toObject = require('../internals/to-object');

          var arraySpeciesCreate = require('../internals/array-species-create');

          var createProperty = require('../internals/create-property');

          var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
          var max = Math.max;
          var min = Math.min;
          var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
          var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
          // https://tc39.es/ecma262/#sec-array.prototype.splice
          // with adding support of @@species

          $({
            target: 'Array',
            proto: true,
            forced: !HAS_SPECIES_SUPPORT
          }, {
            splice: function splice(start, deleteCount
            /* , ...items */
            ) {
              var O = toObject(this);
              var len = lengthOfArrayLike(O);
              var actualStart = toAbsoluteIndex(start, len);
              var argumentsLength = arguments.length;
              var insertCount, actualDeleteCount, A, k, from, to;

              if (argumentsLength === 0) {
                insertCount = actualDeleteCount = 0;
              } else if (argumentsLength === 1) {
                insertCount = 0;
                actualDeleteCount = len - actualStart;
              } else {
                insertCount = argumentsLength - 2;
                actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
              }

              if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
                throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
              }

              A = arraySpeciesCreate(O, actualDeleteCount);

              for (k = 0; k < actualDeleteCount; k++) {
                from = actualStart + k;
                if (from in O) createProperty(A, k, O[from]);
              }

              A.length = actualDeleteCount;

              if (insertCount < actualDeleteCount) {
                for (k = actualStart; k < len - actualDeleteCount; k++) {
                  from = k + actualDeleteCount;
                  to = k + insertCount;
                  if (from in O) O[to] = O[from];else delete O[to];
                }

                for (k = len; k > len - actualDeleteCount + insertCount; k--) {
                  delete O[k - 1];
                }
              } else if (insertCount > actualDeleteCount) {
                for (k = len - actualDeleteCount; k > actualStart; k--) {
                  from = k + actualDeleteCount - 1;
                  to = k + insertCount - 1;
                  if (from in O) O[to] = O[from];else delete O[to];
                }
              }

              for (k = 0; k < insertCount; k++) {
                O[k + actualStart] = arguments[k + 2];
              }

              O.length = len - actualDeleteCount + insertCount;
              return A;
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.string.starts-with.js", ['./cjs-loader.mjs', './require-object-coercible.js', './is-pure.js', './object-get-own-property-descriptor.js', './export.js', './to-length.js', './to-string.js', './not-a-regexp.js', './correct-is-regexp-logic.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$6, __cjsMetaURL$8, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$7;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/object-get-own-property-descriptor": __cjsMetaURL$2,
          "../internals/to-length": __cjsMetaURL$3,
          "../internals/to-string": __cjsMetaURL$4,
          "../internals/not-a-regexp": __cjsMetaURL$5,
          "../internals/require-object-coercible": __cjsMetaURL$6,
          "../internals/correct-is-regexp-logic": __cjsMetaURL$7,
          "../internals/is-pure": __cjsMetaURL$8
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

          var toLength = require('../internals/to-length');

          var toString = require('../internals/to-string');

          var notARegExp = require('../internals/not-a-regexp');

          var requireObjectCoercible = require('../internals/require-object-coercible');

          var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');

          var IS_PURE = require('../internals/is-pure'); // eslint-disable-next-line es/no-string-prototype-startswith -- safe


          var $startsWith = ''.startsWith;
          var min = Math.min;
          var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith'); // https://github.com/zloirock/core-js/pull/702

          var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
            var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
            return descriptor && !descriptor.writable;
          }(); // `String.prototype.startsWith` method
          // https://tc39.es/ecma262/#sec-string.prototype.startswith

          $({
            target: 'String',
            proto: true,
            forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
          }, {
            startsWith: function startsWith(searchString
            /* , position = 0 */
            ) {
              var that = toString(requireObjectCoercible(this));
              notARegExp(searchString);
              var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
              var search = toString(searchString);
              return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.index-of.js", ['./cjs-loader.mjs', './export.js', './array-includes.js', './array-method-is-strict.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/array-includes": __cjsMetaURL$2,
          "../internals/array-method-is-strict": __cjsMetaURL$3
        }, _require);

        (function () {
          /* eslint-disable es/no-array-prototype-indexof -- required for testing */
          var $ = require('../internals/export');

          var $indexOf = require('../internals/array-includes').indexOf;

          var arrayMethodIsStrict = require('../internals/array-method-is-strict');

          var nativeIndexOf = [].indexOf;
          var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
          var STRICT_METHOD = arrayMethodIsStrict('indexOf'); // `Array.prototype.indexOf` method
          // https://tc39.es/ecma262/#sec-array.prototype.indexof

          $({
            target: 'Array',
            proto: true,
            forced: NEGATIVE_ZERO || !STRICT_METHOD
          }, {
            indexOf: function indexOf(searchElement
            /* , fromIndex = 0 */
            ) {
              return NEGATIVE_ZERO // convert -0 to +0
              ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.slice.js", ['./cjs-loader.mjs', './to-indexed-object.js', './is-object.js', './well-known-symbol.js', './export.js', './is-array.js', './length-of-array-like.js', './create-property.js', './is-constructor.js', './array-method-has-species-support.js', './to-absolute-index.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$7, __cjsMetaURL$4, __cjsMetaURL$9, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$6, __cjsMetaURL$8, __cjsMetaURL$3, __cjsMetaURL$a, __cjsMetaURL$5;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$a = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/is-array": __cjsMetaURL$2,
          "../internals/is-constructor": __cjsMetaURL$3,
          "../internals/is-object": __cjsMetaURL$4,
          "../internals/to-absolute-index": __cjsMetaURL$5,
          "../internals/length-of-array-like": __cjsMetaURL$6,
          "../internals/to-indexed-object": __cjsMetaURL$7,
          "../internals/create-property": __cjsMetaURL$8,
          "../internals/well-known-symbol": __cjsMetaURL$9,
          "../internals/array-method-has-species-support": __cjsMetaURL$a
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var isArray = require('../internals/is-array');

          var isConstructor = require('../internals/is-constructor');

          var isObject = require('../internals/is-object');

          var toAbsoluteIndex = require('../internals/to-absolute-index');

          var lengthOfArrayLike = require('../internals/length-of-array-like');

          var toIndexedObject = require('../internals/to-indexed-object');

          var createProperty = require('../internals/create-property');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
          var SPECIES = wellKnownSymbol('species');
          var nativeSlice = [].slice;
          var max = Math.max; // `Array.prototype.slice` method
          // https://tc39.es/ecma262/#sec-array.prototype.slice
          // fallback for not array-like ES3 strings and DOM objects

          $({
            target: 'Array',
            proto: true,
            forced: !HAS_SPECIES_SUPPORT
          }, {
            slice: function slice(start, end) {
              var O = toIndexedObject(this);
              var length = lengthOfArrayLike(O);
              var k = toAbsoluteIndex(start, length);
              var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

              var Constructor, result, n;

              if (isArray(O)) {
                Constructor = O.constructor; // cross-realm fallback

                if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
                  Constructor = undefined;
                } else if (isObject(Constructor)) {
                  Constructor = Constructor[SPECIES];
                  if (Constructor === null) Constructor = undefined;
                }

                if (Constructor === Array || Constructor === undefined) {
                  return nativeSlice.call(O, k, fin);
                }
              }

              result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));

              for (n = 0; k < fin; k++, n++) {
                if (k in O) createProperty(result, n, O[k]);
              }

              result.length = n;
              return result;
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.string.trim.js", ['./cjs-loader.mjs', './export.js', './string-trim.js', './string-trim-forced.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/string-trim": __cjsMetaURL$2,
          "../internals/string-trim-forced": __cjsMetaURL$3
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var $trim = require('../internals/string-trim').trim;

          var forcedStringTrimMethod = require('../internals/string-trim-forced'); // `String.prototype.trim` method
          // https://tc39.es/ecma262/#sec-string.prototype.trim


          $({
            target: 'String',
            proto: true,
            forced: forcedStringTrimMethod('trim')
          }, {
            trim: function trim() {
              return $trim(this);
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.sort.js", ['./cjs-loader.mjs', './fails.js', './engine-v8-version.js', './a-callable.js', './to-object.js', './export.js', './length-of-array-like.js', './to-string.js', './array-sort.js', './array-method-is-strict.js', './engine-ff-version.js', './engine-is-ie-or-edge.js', './engine-webkit-version.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$6, __cjsMetaURL$b, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$1, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$7, __cjsMetaURL$8, __cjsMetaURL$9, __cjsMetaURL$a, __cjsMetaURL$c;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$b = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$9 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$a = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$c = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/a-callable": __cjsMetaURL$2,
          "../internals/to-object": __cjsMetaURL$3,
          "../internals/length-of-array-like": __cjsMetaURL$4,
          "../internals/to-string": __cjsMetaURL$5,
          "../internals/fails": __cjsMetaURL$6,
          "../internals/array-sort": __cjsMetaURL$7,
          "../internals/array-method-is-strict": __cjsMetaURL$8,
          "../internals/engine-ff-version": __cjsMetaURL$9,
          "../internals/engine-is-ie-or-edge": __cjsMetaURL$a,
          "../internals/engine-v8-version": __cjsMetaURL$b,
          "../internals/engine-webkit-version": __cjsMetaURL$c
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var aCallable = require('../internals/a-callable');

          var toObject = require('../internals/to-object');

          var lengthOfArrayLike = require('../internals/length-of-array-like');

          var toString = require('../internals/to-string');

          var fails = require('../internals/fails');

          var internalSort = require('../internals/array-sort');

          var arrayMethodIsStrict = require('../internals/array-method-is-strict');

          var FF = require('../internals/engine-ff-version');

          var IE_OR_EDGE = require('../internals/engine-is-ie-or-edge');

          var V8 = require('../internals/engine-v8-version');

          var WEBKIT = require('../internals/engine-webkit-version');

          var test = [];
          var nativeSort = test.sort; // IE8-

          var FAILS_ON_UNDEFINED = fails(function () {
            test.sort(undefined);
          }); // V8 bug

          var FAILS_ON_NULL = fails(function () {
            test.sort(null);
          }); // Old WebKit

          var STRICT_METHOD = arrayMethodIsStrict('sort');
          var STABLE_SORT = !fails(function () {
            // feature detection can be too slow, so check engines versions
            if (V8) return V8 < 70;
            if (FF && FF > 3) return;
            if (IE_OR_EDGE) return true;
            if (WEBKIT) return WEBKIT < 603;
            var result = '';
            var code, chr, value, index; // generate an array with more 512 elements (Chakra and old V8 fails only in this case)

            for (code = 65; code < 76; code++) {
              chr = String.fromCharCode(code);

              switch (code) {
                case 66:
                case 69:
                case 70:
                case 72:
                  value = 3;
                  break;

                case 68:
                case 71:
                  value = 4;
                  break;

                default:
                  value = 2;
              }

              for (index = 0; index < 47; index++) {
                test.push({
                  k: chr + index,
                  v: value
                });
              }
            }

            test.sort(function (a, b) {
              return b.v - a.v;
            });

            for (index = 0; index < test.length; index++) {
              chr = test[index].k.charAt(0);
              if (result.charAt(result.length - 1) !== chr) result += chr;
            }

            return result !== 'DGBEFHACIJK';
          });
          var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

          var getSortCompare = function getSortCompare(comparefn) {
            return function (x, y) {
              if (y === undefined) return -1;
              if (x === undefined) return 1;
              if (comparefn !== undefined) return +comparefn(x, y) || 0;
              return toString(x) > toString(y) ? 1 : -1;
            };
          }; // `Array.prototype.sort` method
          // https://tc39.es/ecma262/#sec-array.prototype.sort


          $({
            target: 'Array',
            proto: true,
            forced: FORCED
          }, {
            sort: function sort(comparefn) {
              if (comparefn !== undefined) aCallable(comparefn);
              var array = toObject(this);
              if (STABLE_SORT) return comparefn === undefined ? nativeSort.call(array) : nativeSort.call(array, comparefn);
              var items = [];
              var arrayLength = lengthOfArrayLike(array);
              var itemsLength, index;

              for (index = 0; index < arrayLength; index++) {
                if (index in array) items.push(array[index]);
              }

              items = internalSort(items, getSortCompare(comparefn));
              itemsLength = items.length;
              index = 0;

              while (index < itemsLength) {
                array[index] = items[index++];
              }

              while (index < arrayLength) {
                delete array[index++];
              }

              return array;
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.includes.js", ['./cjs-loader.mjs', './export.js', './array-includes.js', './add-to-unscopables.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/array-includes": __cjsMetaURL$2,
          "../internals/add-to-unscopables": __cjsMetaURL$3
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var $includes = require('../internals/array-includes').includes;

          var addToUnscopables = require('../internals/add-to-unscopables'); // `Array.prototype.includes` method
          // https://tc39.es/ecma262/#sec-array.prototype.includes


          $({
            target: 'Array',
            proto: true
          }, {
            includes: function includes(el
            /* , fromIndex = 0 */
            ) {
              return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
            }
          }); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

          addToUnscopables('includes');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/get-built-in.js", ['./cjs-loader.mjs', './global.js', './is-callable.js', './path.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/path": __cjsMetaURL$1,
          "../internals/global": __cjsMetaURL$2,
          "../internals/is-callable": __cjsMetaURL$3
        }, _require);

        (function () {
          var path = require('../internals/path');

          var global = require('../internals/global');

          var isCallable = require('../internals/is-callable');

          var aFunction = function aFunction(variable) {
            return isCallable(variable) ? variable : undefined;
          };

          module.exports = function (namespace, method) {
            return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.string.includes.js", ['./cjs-loader.mjs', './require-object-coercible.js', './export.js', './to-string.js', './not-a-regexp.js', './correct-is-regexp-logic.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$1, __cjsMetaURL$4, __cjsMetaURL$2, __cjsMetaURL$5;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/not-a-regexp": __cjsMetaURL$2,
          "../internals/require-object-coercible": __cjsMetaURL$3,
          "../internals/to-string": __cjsMetaURL$4,
          "../internals/correct-is-regexp-logic": __cjsMetaURL$5
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var notARegExp = require('../internals/not-a-regexp');

          var requireObjectCoercible = require('../internals/require-object-coercible');

          var toString = require('../internals/to-string');

          var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic'); // `String.prototype.includes` method
          // https://tc39.es/ecma262/#sec-string.prototype.includes


          $({
            target: 'String',
            proto: true,
            forced: !correctIsRegExpLogic('includes')
          }, {
            includes: function includes(searchString
            /* , position = 0 */
            ) {
              return !!~toString(requireObjectCoercible(this)).indexOf(toString(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.last-index-of.js", ['./cjs-loader.mjs', './export.js', './array-last-index-of.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/array-last-index-of": __cjsMetaURL$2
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var lastIndexOf = require('../internals/array-last-index-of'); // `Array.prototype.lastIndexOf` method
          // https://tc39.es/ecma262/#sec-array.prototype.lastindexof
          // eslint-disable-next-line es/no-array-prototype-lastindexof -- required for testing


          $({
            target: 'Array',
            proto: true,
            forced: lastIndexOf !== [].lastIndexOf
          }, {
            lastIndexOf: lastIndexOf
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.map.js", ['./cjs-loader.mjs', './export.js', './array-method-has-species-support.js', './array-iteration.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/array-iteration": __cjsMetaURL$2,
          "../internals/array-method-has-species-support": __cjsMetaURL$3
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var $map = require('../internals/array-iteration').map;

          var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map'); // `Array.prototype.map` method
          // https://tc39.es/ecma262/#sec-array.prototype.map
          // with adding support of @@species

          $({
            target: 'Array',
            proto: true,
            forced: !HAS_SPECIES_SUPPORT
          }, {
            map: function map(callbackfn
            /* , thisArg */
            ) {
              return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/es.array.filter.js", ['./cjs-loader.mjs', './export.js', './array-method-has-species-support.js', './array-iteration.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/export": __cjsMetaURL$1,
          "../internals/array-iteration": __cjsMetaURL$2,
          "../internals/array-method-has-species-support": __cjsMetaURL$3
        }, _require);

        (function () {
          var $ = require('../internals/export');

          var $filter = require('../internals/array-iteration').filter;

          var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // `Array.prototype.filter` method
          // https://tc39.es/ecma262/#sec-array.prototype.filter
          // with adding support of @@species

          $({
            target: 'Array',
            proto: true,
            forced: !HAS_SPECIES_SUPPORT
          }, {
            filter: function filter(callbackfn
            /* , thisArg */
            ) {
              return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
            }
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/whitespaces.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          // a string of all valid unicode whitespaces
          module.exports = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002" + "\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/string-trim.js", ['./cjs-loader.mjs', './require-object-coercible.js', './to-string.js', './whitespaces.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/require-object-coercible": __cjsMetaURL$1,
          "../internals/to-string": __cjsMetaURL$2,
          "../internals/whitespaces": __cjsMetaURL$3
        }, _require);

        (function () {
          var requireObjectCoercible = require('../internals/require-object-coercible');

          var toString = require('../internals/to-string');

          var whitespaces = require('../internals/whitespaces');

          var whitespace = '[' + whitespaces + ']';
          var ltrim = RegExp('^' + whitespace + whitespace + '*');
          var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

          var createMethod = function createMethod(TYPE) {
            return function ($this) {
              var string = toString(requireObjectCoercible($this));
              if (TYPE & 1) string = string.replace(ltrim, '');
              if (TYPE & 2) string = string.replace(rtrim, '');
              return string;
            };
          };

          module.exports = {
            // `String.prototype.{ trimLeft, trimStart }` methods
            // https://tc39.es/ecma262/#sec-string.prototype.trimstart
            start: createMethod(1),
            // `String.prototype.{ trimRight, trimEnd }` methods
            // https://tc39.es/ecma262/#sec-string.prototype.trimend
            end: createMethod(2),
            // `String.prototype.trim` method
            // https://tc39.es/ecma262/#sec-string.prototype.trim
            trim: createMethod(3)
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-get-own-property-descriptor.js", ['./cjs-loader.mjs', './descriptors.js', './object-property-is-enumerable.js', './create-property-descriptor.js', './to-indexed-object.js', './has-own-property.js', './to-property-key.js', './ie8-dom-define.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$6, __cjsMetaURL$5, __cjsMetaURL$7;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/descriptors": __cjsMetaURL$1,
          "../internals/object-property-is-enumerable": __cjsMetaURL$2,
          "../internals/create-property-descriptor": __cjsMetaURL$3,
          "../internals/to-indexed-object": __cjsMetaURL$4,
          "../internals/to-property-key": __cjsMetaURL$5,
          "../internals/has-own-property": __cjsMetaURL$6,
          "../internals/ie8-dom-define": __cjsMetaURL$7
        }, _require);

        (function () {
          var DESCRIPTORS = require('../internals/descriptors');

          var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');

          var createPropertyDescriptor = require('../internals/create-property-descriptor');

          var toIndexedObject = require('../internals/to-indexed-object');

          var toPropertyKey = require('../internals/to-property-key');

          var hasOwn = require('../internals/has-own-property');

          var IE8_DOM_DEFINE = require('../internals/ie8-dom-define'); // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe


          var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
          // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

          exports$1.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
            O = toIndexedObject(O);
            P = toPropertyKey(P);
            if (IE8_DOM_DEFINE) try {
              return $getOwnPropertyDescriptor(O, P);
            } catch (error) {
              /* empty */
            }
            if (hasOwn(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/function-bind-context.js", ['./cjs-loader.mjs', './a-callable.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/a-callable": __cjsMetaURL$1
        }, _require);

        (function () {
          var aCallable = require('../internals/a-callable'); // optional / simple context binding


          module.exports = function (fn, that, length) {
            aCallable(fn);
            if (that === undefined) return fn;

            switch (length) {
              case 0:
                return function () {
                  return fn.call(that);
                };

              case 1:
                return function (a) {
                  return fn.call(that, a);
                };

              case 2:
                return function (a, b) {
                  return fn.call(that, a, b);
                };

              case 3:
                return function (a, b, c) {
                  return fn.call(that, a, b, c);
                };
            }

            return function ()
            /* ...args */
            {
              return fn.apply(that, arguments);
            };
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/is-forced.js", ['./cjs-loader.mjs', './is-callable.js', './fails.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/fails": __cjsMetaURL$1,
          "../internals/is-callable": __cjsMetaURL$2
        }, _require);

        (function () {
          var fails = require('../internals/fails');

          var isCallable = require('../internals/is-callable');

          var replacement = /#|\.prototype\./;

          var isForced = function isForced(feature, detection) {
            var value = data[normalize(feature)];
            return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
          };

          var normalize = isForced.normalize = function (string) {
            return String(string).replace(replacement, '.').toLowerCase();
          };

          var data = isForced.data = {};
          var NATIVE = isForced.NATIVE = 'N';
          var POLYFILL = isForced.POLYFILL = 'P';
          module.exports = isForced;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/to-property-key.js", ['./cjs-loader.mjs', './is-symbol.js', './to-primitive.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-primitive": __cjsMetaURL$1,
          "../internals/is-symbol": __cjsMetaURL$2
        }, _require);

        (function () {
          var toPrimitive = require('../internals/to-primitive');

          var isSymbol = require('../internals/is-symbol'); // `ToPropertyKey` abstract operation
          // https://tc39.es/ecma262/#sec-topropertykey


          module.exports = function (argument) {
            var key = toPrimitive(argument, 'string');
            return isSymbol(key) ? key : String(key);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/an-object.js", ['./cjs-loader.mjs', './is-object.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-object": __cjsMetaURL$1
        }, _require);

        (function () {
          var isObject = require('../internals/is-object'); // `Assert: Type(argument) is Object`


          module.exports = function (argument) {
            if (isObject(argument)) return argument;
            throw TypeError(String(argument) + ' is not an object');
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/ie8-dom-define.js", ['./cjs-loader.mjs', './fails.js', './descriptors.js', './document-create-element.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/descriptors": __cjsMetaURL$1,
          "../internals/fails": __cjsMetaURL$2,
          "../internals/document-create-element": __cjsMetaURL$3
        }, _require);

        (function () {
          var DESCRIPTORS = require('../internals/descriptors');

          var fails = require('../internals/fails');

          var createElement = require('../internals/document-create-element'); // Thank's IE8 for his funny defineProperty


          module.exports = !DESCRIPTORS && !fails(function () {
            // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
            return Object.defineProperty(createElement('div'), 'a', {
              get: function get() {
                return 7;
              }
            }).a != 7;
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/is-pure.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = true;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/function-name.js", ['./cjs-loader.mjs', './descriptors.js', './has-own-property.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/descriptors": __cjsMetaURL$1,
          "../internals/has-own-property": __cjsMetaURL$2
        }, _require);

        (function () {
          var DESCRIPTORS = require('../internals/descriptors');

          var hasOwn = require('../internals/has-own-property');

          var FunctionPrototype = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

          var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
          var EXISTS = hasOwn(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

          var PROPER = EXISTS && function something() {
            /* empty */
          }.name === 'something';

          var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
          module.exports = {
            EXISTS: EXISTS,
            PROPER: PROPER,
            CONFIGURABLE: CONFIGURABLE
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-get-prototype-of.js", ['./cjs-loader.mjs', './is-callable.js', './to-object.js', './has-own-property.js', './shared-key.js', './correct-prototype-getter.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$1, __cjsMetaURL$4, __cjsMetaURL$5;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/has-own-property": __cjsMetaURL$1,
          "../internals/is-callable": __cjsMetaURL$2,
          "../internals/to-object": __cjsMetaURL$3,
          "../internals/shared-key": __cjsMetaURL$4,
          "../internals/correct-prototype-getter": __cjsMetaURL$5
        }, _require);

        (function () {
          var hasOwn = require('../internals/has-own-property');

          var isCallable = require('../internals/is-callable');

          var toObject = require('../internals/to-object');

          var sharedKey = require('../internals/shared-key');

          var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

          var IE_PROTO = sharedKey('IE_PROTO');
          var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
          // https://tc39.es/ecma262/#sec-object.getprototypeof
          // eslint-disable-next-line es/no-object-getprototypeof -- safe

          module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
            var object = toObject(O);
            if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
            var constructor = object.constructor;

            if (isCallable(constructor) && object instanceof constructor) {
              return constructor.prototype;
            }

            return object instanceof Object ? ObjectPrototype : null;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/set-to-string-tag.js", ['./cjs-loader.mjs', './has-own-property.js', './well-known-symbol.js', './object-define-property.js', './create-non-enumerable-property.js', './to-string-tag-support.js', './object-to-string.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$4, __cjsMetaURL$6, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$1, __cjsMetaURL$5;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-string-tag-support": __cjsMetaURL$1,
          "../internals/object-define-property": __cjsMetaURL$2,
          "../internals/create-non-enumerable-property": __cjsMetaURL$3,
          "../internals/has-own-property": __cjsMetaURL$4,
          "../internals/object-to-string": __cjsMetaURL$5,
          "../internals/well-known-symbol": __cjsMetaURL$6
        }, _require);

        (function () {
          var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');

          var defineProperty = require('../internals/object-define-property').f;

          var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

          var hasOwn = require('../internals/has-own-property');

          var toString = require('../internals/object-to-string');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var TO_STRING_TAG = wellKnownSymbol('toStringTag');

          module.exports = function (it, TAG, STATIC, SET_METHOD) {
            if (it) {
              var target = STATIC ? it : it.prototype;

              if (!hasOwn(target, TO_STRING_TAG)) {
                defineProperty(target, TO_STRING_TAG, {
                  configurable: true,
                  value: TAG
                });
              }

              if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
                createNonEnumerableProperty(target, 'toString', toString);
              }
            }
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/redefine.js", ['./cjs-loader.mjs', './create-non-enumerable-property.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/create-non-enumerable-property": __cjsMetaURL$1
        }, _require);

        (function () {
          var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

          module.exports = function (target, key, value, options) {
            if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty(target, key, value);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/create-iterator-constructor.js", ['./cjs-loader.mjs', './create-property-descriptor.js', './object-create.js', './set-to-string-tag.js', './iterators.js', './iterators-core.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$2, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/iterators-core": __cjsMetaURL$1,
          "../internals/object-create": __cjsMetaURL$2,
          "../internals/create-property-descriptor": __cjsMetaURL$3,
          "../internals/set-to-string-tag": __cjsMetaURL$4,
          "../internals/iterators": __cjsMetaURL$5
        }, _require);

        (function () {
          var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;

          var create = require('../internals/object-create');

          var createPropertyDescriptor = require('../internals/create-property-descriptor');

          var setToStringTag = require('../internals/set-to-string-tag');

          var Iterators = require('../internals/iterators');

          var returnThis = function returnThis() {
            return this;
          };

          module.exports = function (IteratorConstructor, NAME, next) {
            var TO_STRING_TAG = NAME + ' Iterator';
            IteratorConstructor.prototype = create(IteratorPrototype, {
              next: createPropertyDescriptor(1, next)
            });
            setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
            Iterators[TO_STRING_TAG] = returnThis;
            return IteratorConstructor;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/iterators-core.js", ['./cjs-loader.mjs', './is-callable.js', './fails.js', './is-pure.js', './well-known-symbol.js', './object-create.js', './redefine.js', './object-get-prototype-of.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$7, __cjsMetaURL$6, __cjsMetaURL$3, __cjsMetaURL$5, __cjsMetaURL$4;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/fails": __cjsMetaURL$1,
          "../internals/is-callable": __cjsMetaURL$2,
          "../internals/object-create": __cjsMetaURL$3,
          "../internals/object-get-prototype-of": __cjsMetaURL$4,
          "../internals/redefine": __cjsMetaURL$5,
          "../internals/well-known-symbol": __cjsMetaURL$6,
          "../internals/is-pure": __cjsMetaURL$7
        }, _require);

        (function () {
          var fails = require('../internals/fails');

          var isCallable = require('../internals/is-callable');

          var create = require('../internals/object-create');

          var getPrototypeOf = require('../internals/object-get-prototype-of');

          var redefine = require('../internals/redefine');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var IS_PURE = require('../internals/is-pure');

          var ITERATOR = wellKnownSymbol('iterator');
          var BUGGY_SAFARI_ITERATORS = false; // `%IteratorPrototype%` object
          // https://tc39.es/ecma262/#sec-%iteratorprototype%-object

          var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
          /* eslint-disable es/no-array-prototype-keys -- safe */

          if ([].keys) {
            arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

            if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
              PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
              if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
            }
          }

          var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
            var test = {}; // FF44- legacy iterators case

            return IteratorPrototype[ITERATOR].call(test) !== test;
          });
          if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};else if (IS_PURE) IteratorPrototype = create(IteratorPrototype); // `%IteratorPrototype%[@@iterator]()` method
          // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

          if (!isCallable(IteratorPrototype[ITERATOR])) {
            redefine(IteratorPrototype, ITERATOR, function () {
              return this;
            });
          }

          module.exports = {
            IteratorPrototype: IteratorPrototype,
            BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/native-weak-map.js", ['./cjs-loader.mjs', './global.js', './is-callable.js', './inspect-source.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1,
          "../internals/is-callable": __cjsMetaURL$2,
          "../internals/inspect-source": __cjsMetaURL$3
        }, _require);

        (function () {
          var global = require('../internals/global');

          var isCallable = require('../internals/is-callable');

          var inspectSource = require('../internals/inspect-source');

          var WeakMap = global.WeakMap;
          module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/shared-key.js", ['./cjs-loader.mjs', './shared.js', './uid.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/shared": __cjsMetaURL$1,
          "../internals/uid": __cjsMetaURL$2
        }, _require);

        (function () {
          var shared = require('../internals/shared');

          var uid = require('../internals/uid');

          var keys = shared('keys');

          module.exports = function (key) {
            return keys[key] || (keys[key] = uid(key));
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/shared-store.js", ['./cjs-loader.mjs', './global.js', './set-global.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1,
          "../internals/set-global": __cjsMetaURL$2
        }, _require);

        (function () {
          var global = require('../internals/global');

          var setGlobal = require('../internals/set-global');

          var SHARED = '__core-js_shared__';
          var store = global[SHARED] || setGlobal(SHARED, {});
          module.exports = store;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/hidden-keys.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = {};
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/indexed-object.js", ['./cjs-loader.mjs', './fails.js', './classof-raw.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/fails": __cjsMetaURL$1,
          "../internals/classof-raw": __cjsMetaURL$2
        }, _require);

        (function () {
          var fails = require('../internals/fails');

          var classof = require('../internals/classof-raw');

          var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

          module.exports = fails(function () {
            // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
            // eslint-disable-next-line no-prototype-builtins -- safe
            return !Object('z').propertyIsEnumerable(0);
          }) ? function (it) {
            return classof(it) == 'String' ? split.call(it, '') : Object(it);
          } : Object;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/require-object-coercible.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          // `RequireObjectCoercible` abstract operation
          // https://tc39.es/ecma262/#sec-requireobjectcoercible
          module.exports = function (it) {
            if (it == undefined) throw TypeError("Can't call method on " + it);
            return it;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/engine-v8-version.js", ['./cjs-loader.mjs', './global.js', './engine-user-agent.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1,
          "../internals/engine-user-agent": __cjsMetaURL$2
        }, _require);

        (function () {
          var global = require('../internals/global');

          var userAgent = require('../internals/engine-user-agent');

          var process = global.process;
          var Deno = global.Deno;
          var versions = process && process.versions || Deno && Deno.version;
          var v8 = versions && versions.v8;
          var match, version;

          if (v8) {
            match = v8.split('.');
            version = match[0] < 4 ? 1 : match[0] + match[1];
          } else if (userAgent) {
            match = userAgent.match(/Edge\/(\d+)/);

            if (!match || match[1] >= 74) {
              match = userAgent.match(/Chrome\/(\d+)/);
              if (match) version = match[1];
            }
          }

          module.exports = version && +version;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-property-is-enumerable.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

          var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

          var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
            1: 2
          }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
          // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

          exports$1.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
            var descriptor = getOwnPropertyDescriptor(this, V);
            return !!descriptor && descriptor.enumerable;
          } : $propertyIsEnumerable;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-get-own-property-symbols.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
          exports$1.f = Object.getOwnPropertySymbols;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/is-array.js", ['./cjs-loader.mjs', './classof-raw.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/classof-raw": __cjsMetaURL$1
        }, _require);

        (function () {
          var classof = require('../internals/classof-raw'); // `IsArray` abstract operation
          // https://tc39.es/ecma262/#sec-isarray
          // eslint-disable-next-line es/no-array-isarray -- safe


          module.exports = Array.isArray || function isArray(argument) {
            return classof(argument) == 'Array';
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/length-of-array-like.js", ['./cjs-loader.mjs', './to-length.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-length": __cjsMetaURL$1
        }, _require);

        (function () {
          var toLength = require('../internals/to-length'); // `LengthOfArrayLike` abstract operation
          // https://tc39.es/ecma262/#sec-lengthofarraylike


          module.exports = function (obj) {
            return toLength(obj.length);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/array-method-has-species-support.js", ['./cjs-loader.mjs', './fails.js', './engine-v8-version.js', './well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/fails": __cjsMetaURL$1,
          "../internals/well-known-symbol": __cjsMetaURL$2,
          "../internals/engine-v8-version": __cjsMetaURL$3
        }, _require);

        (function () {
          var fails = require('../internals/fails');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var V8_VERSION = require('../internals/engine-v8-version');

          var SPECIES = wellKnownSymbol('species');

          module.exports = function (METHOD_NAME) {
            // We can't use this feature detection in V8 since it causes
            // deoptimization and serious performance degradation
            // https://github.com/zloirock/core-js/issues/677
            return V8_VERSION >= 51 || !fails(function () {
              var array = [];
              var constructor = array.constructor = {};

              constructor[SPECIES] = function () {
                return {
                  foo: 1
                };
              };

              return array[METHOD_NAME](Boolean).foo !== 1;
            });
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/create-property.js", ['./cjs-loader.mjs', './create-property-descriptor.js', './to-property-key.js', './object-define-property.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-property-key": __cjsMetaURL$1,
          "../internals/object-define-property": __cjsMetaURL$2,
          "../internals/create-property-descriptor": __cjsMetaURL$3
        }, _require);

        (function () {
          var toPropertyKey = require('../internals/to-property-key');

          var definePropertyModule = require('../internals/object-define-property');

          var createPropertyDescriptor = require('../internals/create-property-descriptor');

          module.exports = function (object, key, value) {
            var propertyKey = toPropertyKey(key);
            if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/array-species-create.js", ['./cjs-loader.mjs', './array-species-constructor.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/array-species-constructor": __cjsMetaURL$1
        }, _require);

        (function () {
          var arraySpeciesConstructor = require('../internals/array-species-constructor'); // `ArraySpeciesCreate` abstract operation
          // https://tc39.es/ecma262/#sec-arrayspeciescreate


          module.exports = function (originalArray, length) {
            return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/is-symbol.js", ['./cjs-loader.mjs', './is-callable.js', './get-built-in.js', './use-symbol-as-uid.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-callable": __cjsMetaURL$1,
          "../internals/get-built-in": __cjsMetaURL$2,
          "../internals/use-symbol-as-uid": __cjsMetaURL$3
        }, _require);

        (function () {
          var isCallable = require('../internals/is-callable');

          var getBuiltIn = require('../internals/get-built-in');

          var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

          module.exports = USE_SYMBOL_AS_UID ? function (it) {
            return typeof it == 'symbol';
          } : function (it) {
            var $Symbol = getBuiltIn('Symbol');
            return isCallable($Symbol) && Object(it) instanceof $Symbol;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-create.js", ['./cjs-loader.mjs', './document-create-element.js', './an-object.js', './hidden-keys.js', './enum-bug-keys.js', './object-define-properties.js', './html.js', './shared-key.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$6, __cjsMetaURL$1, __cjsMetaURL$4, __cjsMetaURL$3, __cjsMetaURL$2, __cjsMetaURL$5, __cjsMetaURL$7;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/an-object": __cjsMetaURL$1,
          "../internals/object-define-properties": __cjsMetaURL$2,
          "../internals/enum-bug-keys": __cjsMetaURL$3,
          "../internals/hidden-keys": __cjsMetaURL$4,
          "../internals/html": __cjsMetaURL$5,
          "../internals/document-create-element": __cjsMetaURL$6,
          "../internals/shared-key": __cjsMetaURL$7
        }, _require);

        (function () {
          /* global ActiveXObject -- old IE, WSH */
          var anObject = require('../internals/an-object');

          var defineProperties = require('../internals/object-define-properties');

          var enumBugKeys = require('../internals/enum-bug-keys');

          var hiddenKeys = require('../internals/hidden-keys');

          var html = require('../internals/html');

          var documentCreateElement = require('../internals/document-create-element');

          var sharedKey = require('../internals/shared-key');

          var GT = '>';
          var LT = '<';
          var PROTOTYPE = 'prototype';
          var SCRIPT = 'script';
          var IE_PROTO = sharedKey('IE_PROTO');

          var EmptyConstructor = function EmptyConstructor() {
            /* empty */
          };

          var scriptTag = function scriptTag(content) {
            return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
          }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


          var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
            activeXDocument.write(scriptTag(''));
            activeXDocument.close();
            var temp = activeXDocument.parentWindow.Object;
            activeXDocument = null; // avoid memory leak

            return temp;
          }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


          var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
            // Thrash, waste and sodomy: IE GC bug
            var iframe = documentCreateElement('iframe');
            var JS = 'java' + SCRIPT + ':';
            var iframeDocument;
            iframe.style.display = 'none';
            html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

            iframe.src = String(JS);
            iframeDocument = iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(scriptTag('document.F=Object'));
            iframeDocument.close();
            return iframeDocument.F;
          }; // Check for document.domain and active x support
          // No need to use active x approach when document.domain is not set
          // see https://github.com/es-shims/es5-shim/issues/150
          // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
          // avoid IE GC bug


          var activeXDocument;

          var _NullProtoObject = function NullProtoObject() {
            try {
              activeXDocument = new ActiveXObject('htmlfile');
            } catch (error) {
              /* ignore */
            }

            _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
            : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

            var length = enumBugKeys.length;

            while (length--) {
              delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
            }

            return _NullProtoObject();
          };

          hiddenKeys[IE_PROTO] = true; // `Object.create` method
          // https://tc39.es/ecma262/#sec-object.create

          module.exports = Object.create || function create(O, Properties) {
            var result;

            if (O !== null) {
              EmptyConstructor[PROTOTYPE] = anObject(O);
              result = new EmptyConstructor();
              EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

              result[IE_PROTO] = O;
            } else result = _NullProtoObject();

            return Properties === undefined ? result : defineProperties(result, Properties);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-get-own-property-names.js", ['./cjs-loader.mjs', './object-keys-internal.js', './enum-bug-keys.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/object-keys-internal": __cjsMetaURL$1,
          "../internals/enum-bug-keys": __cjsMetaURL$2
        }, _require);

        (function () {
          var internalObjectKeys = require('../internals/object-keys-internal');

          var enumBugKeys = require('../internals/enum-bug-keys');

          var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
          // https://tc39.es/ecma262/#sec-object.getownpropertynames
          // eslint-disable-next-line es/no-object-getownpropertynames -- safe

          exports$1.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
            return internalObjectKeys(O, hiddenKeys);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/array-iteration.js", ['./cjs-loader.mjs', './indexed-object.js', './to-object.js', './function-bind-context.js', './length-of-array-like.js', './array-species-create.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$1, __cjsMetaURL$4, __cjsMetaURL$5;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/function-bind-context": __cjsMetaURL$1,
          "../internals/indexed-object": __cjsMetaURL$2,
          "../internals/to-object": __cjsMetaURL$3,
          "../internals/length-of-array-like": __cjsMetaURL$4,
          "../internals/array-species-create": __cjsMetaURL$5
        }, _require);

        (function () {
          var bind = require('../internals/function-bind-context');

          var IndexedObject = require('../internals/indexed-object');

          var toObject = require('../internals/to-object');

          var lengthOfArrayLike = require('../internals/length-of-array-like');

          var arraySpeciesCreate = require('../internals/array-species-create');

          var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

          var createMethod = function createMethod(TYPE) {
            var IS_MAP = TYPE == 1;
            var IS_FILTER = TYPE == 2;
            var IS_SOME = TYPE == 3;
            var IS_EVERY = TYPE == 4;
            var IS_FIND_INDEX = TYPE == 6;
            var IS_FILTER_REJECT = TYPE == 7;
            var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
            return function ($this, callbackfn, that, specificCreate) {
              var O = toObject($this);
              var self = IndexedObject(O);
              var boundFunction = bind(callbackfn, that, 3);
              var length = lengthOfArrayLike(self);
              var index = 0;
              var create = specificCreate || arraySpeciesCreate;
              var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
              var value, result;

              for (; length > index; index++) {
                if (NO_HOLES || index in self) {
                  value = self[index];
                  result = boundFunction(value, index, O);

                  if (TYPE) {
                    if (IS_MAP) target[index] = result; // map
                    else if (result) switch (TYPE) {
                        case 3:
                          return true;
                        // some

                        case 5:
                          return value;
                        // find

                        case 6:
                          return index;
                        // findIndex

                        case 2:
                          push.call(target, value);
                        // filter
                      } else switch (TYPE) {
                        case 4:
                          return false;
                        // every

                        case 7:
                          push.call(target, value);
                        // filterReject
                      }
                  }
                }
              }

              return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
            };
          };

          module.exports = {
            // `Array.prototype.forEach` method
            // https://tc39.es/ecma262/#sec-array.prototype.foreach
            forEach: createMethod(0),
            // `Array.prototype.map` method
            // https://tc39.es/ecma262/#sec-array.prototype.map
            map: createMethod(1),
            // `Array.prototype.filter` method
            // https://tc39.es/ecma262/#sec-array.prototype.filter
            filter: createMethod(2),
            // `Array.prototype.some` method
            // https://tc39.es/ecma262/#sec-array.prototype.some
            some: createMethod(3),
            // `Array.prototype.every` method
            // https://tc39.es/ecma262/#sec-array.prototype.every
            every: createMethod(4),
            // `Array.prototype.find` method
            // https://tc39.es/ecma262/#sec-array.prototype.find
            find: createMethod(5),
            // `Array.prototype.findIndex` method
            // https://tc39.es/ecma262/#sec-array.prototype.findIndex
            findIndex: createMethod(6),
            // `Array.prototype.filterReject` method
            // https://github.com/tc39/proposal-array-filtering
            filterReject: createMethod(7)
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-get-own-property-names-external.js", ['./cjs-loader.mjs', './to-indexed-object.js', './object-get-own-property-names.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-indexed-object": __cjsMetaURL$1,
          "../internals/object-get-own-property-names": __cjsMetaURL$2
        }, _require);

        (function () {
          /* eslint-disable es/no-object-getownpropertynames -- safe */
          var toIndexedObject = require('../internals/to-indexed-object');

          var $getOwnPropertyNames = require('../internals/object-get-own-property-names').f;

          var toString = {}.toString;
          var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

          var getWindowNames = function getWindowNames(it) {
            try {
              return $getOwnPropertyNames(it);
            } catch (error) {
              return windowNames.slice();
            }
          }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


          module.exports.f = function getOwnPropertyNames(it) {
            return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : $getOwnPropertyNames(toIndexedObject(it));
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/a-possible-prototype.js", ['./cjs-loader.mjs', './is-callable.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-callable": __cjsMetaURL$1
        }, _require);

        (function () {
          var isCallable = require('../internals/is-callable');

          module.exports = function (argument) {
            if (typeof argument === 'object' || isCallable(argument)) return argument;
            throw TypeError("Can't set " + String(argument) + ' as a prototype');
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-keys-internal.js", ['./cjs-loader.mjs', './to-indexed-object.js', './has-own-property.js', './array-includes.js', './hidden-keys.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$4;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/has-own-property": __cjsMetaURL$1,
          "../internals/to-indexed-object": __cjsMetaURL$2,
          "../internals/array-includes": __cjsMetaURL$3,
          "../internals/hidden-keys": __cjsMetaURL$4
        }, _require);

        (function () {
          var hasOwn = require('../internals/has-own-property');

          var toIndexedObject = require('../internals/to-indexed-object');

          var indexOf = require('../internals/array-includes').indexOf;

          var hiddenKeys = require('../internals/hidden-keys');

          module.exports = function (object, names) {
            var O = toIndexedObject(object);
            var i = 0;
            var result = [];
            var key;

            for (key in O) {
              !hasOwn(hiddenKeys, key) && hasOwn(O, key) && result.push(key);
            } // Don't enum bug & hidden keys


            while (names.length > i) {
              if (hasOwn(O, key = names[i++])) {
                ~indexOf(result, key) || result.push(key);
              }
            }

            return result;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/enum-bug-keys.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          // IE8- don't enum bug keys
          module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/to-integer-or-infinity.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          var ceil = Math.ceil;
          var floor = Math.floor; // `ToIntegerOrInfinity` abstract operation
          // https://tc39.es/ecma262/#sec-tointegerorinfinity

          module.exports = function (argument) {
            var number = +argument; // eslint-disable-next-line no-self-compare -- safe

            return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/iterate.js", ['./cjs-loader.mjs', './function-bind-context.js', './an-object.js', './length-of-array-like.js', './is-array-iterator-method.js', './get-iterator-method.js', './get-iterator.js', './iterator-close.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$4, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$2, __cjsMetaURL$6, __cjsMetaURL$5, __cjsMetaURL$7;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/an-object": __cjsMetaURL$1,
          "../internals/is-array-iterator-method": __cjsMetaURL$2,
          "../internals/length-of-array-like": __cjsMetaURL$3,
          "../internals/function-bind-context": __cjsMetaURL$4,
          "../internals/get-iterator": __cjsMetaURL$5,
          "../internals/get-iterator-method": __cjsMetaURL$6,
          "../internals/iterator-close": __cjsMetaURL$7
        }, _require);

        (function () {
          var anObject = require('../internals/an-object');

          var isArrayIteratorMethod = require('../internals/is-array-iterator-method');

          var lengthOfArrayLike = require('../internals/length-of-array-like');

          var bind = require('../internals/function-bind-context');

          var getIterator = require('../internals/get-iterator');

          var getIteratorMethod = require('../internals/get-iterator-method');

          var iteratorClose = require('../internals/iterator-close');

          var Result = function Result(stopped, result) {
            this.stopped = stopped;
            this.result = result;
          };

          module.exports = function (iterable, unboundFunction, options) {
            var that = options && options.that;
            var AS_ENTRIES = !!(options && options.AS_ENTRIES);
            var IS_ITERATOR = !!(options && options.IS_ITERATOR);
            var INTERRUPTED = !!(options && options.INTERRUPTED);
            var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
            var iterator, iterFn, index, length, result, next, step;

            var stop = function stop(condition) {
              if (iterator) iteratorClose(iterator, 'normal', condition);
              return new Result(true, condition);
            };

            var callFn = function callFn(value) {
              if (AS_ENTRIES) {
                anObject(value);
                return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
              }

              return INTERRUPTED ? fn(value, stop) : fn(value);
            };

            if (IS_ITERATOR) {
              iterator = iterable;
            } else {
              iterFn = getIteratorMethod(iterable);
              if (!iterFn) throw TypeError(String(iterable) + ' is not iterable'); // optimisation for array iterators

              if (isArrayIteratorMethod(iterFn)) {
                for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
                  result = callFn(iterable[index]);
                  if (result && result instanceof Result) return result;
                }

                return new Result(false);
              }

              iterator = getIterator(iterable, iterFn);
            }

            next = iterator.next;

            while (!(step = next.call(iterator)).done) {
              try {
                result = callFn(step.value);
              } catch (error) {
                iteratorClose(iterator, 'throw', error);
              }

              if (typeof result == 'object' && result && result instanceof Result) return result;
            }

            return new Result(false);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/install-error-cause.js", ['./cjs-loader.mjs', './is-object.js', './create-non-enumerable-property.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-object": __cjsMetaURL$1,
          "../internals/create-non-enumerable-property": __cjsMetaURL$2
        }, _require);

        (function () {
          var isObject = require('../internals/is-object');

          var createNonEnumerableProperty = require('../internals/create-non-enumerable-property'); // `InstallErrorCause` abstract operation
          // https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause


          module.exports = function (O, options) {
            if (isObject(options) && 'cause' in options) {
              createNonEnumerableProperty(O, 'cause', options.cause);
            }
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/a-callable.js", ['./cjs-loader.mjs', './is-callable.js', './try-to-string.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-callable": __cjsMetaURL$1,
          "../internals/try-to-string": __cjsMetaURL$2
        }, _require);

        (function () {
          var isCallable = require('../internals/is-callable');

          var tryToString = require('../internals/try-to-string'); // `Assert: IsCallable(argument) is true`


          module.exports = function (argument) {
            if (isCallable(argument)) return argument;
            throw TypeError(tryToString(argument) + ' is not a function');
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/perform.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = function (exec) {
            try {
              return {
                error: false,
                value: exec()
              };
            } catch (error) {
              return {
                error: true,
                value: error
              };
            }
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/new-promise-capability.js", ['./cjs-loader.mjs', './a-callable.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/a-callable": __cjsMetaURL$1
        }, _require);

        (function () {
          var aCallable = require('../internals/a-callable');

          var PromiseCapability = function PromiseCapability(C) {
            var resolve, reject;
            this.promise = new C(function ($$resolve, $$reject) {
              if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
              resolve = $$resolve;
              reject = $$reject;
            });
            this.resolve = aCallable(resolve);
            this.reject = aCallable(reject);
          }; // `NewPromiseCapability` abstract operation
          // https://tc39.es/ecma262/#sec-newpromisecapability


          module.exports.f = function (C) {
            return new PromiseCapability(C);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/native-promise-constructor.js", ['./cjs-loader.mjs', './global.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1
        }, _require);

        (function () {
          var global = require('../internals/global');

          module.exports = global.Promise;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/promise-resolve.js", ['./cjs-loader.mjs', './is-object.js', './an-object.js', './new-promise-capability.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/an-object": __cjsMetaURL$1,
          "../internals/is-object": __cjsMetaURL$2,
          "../internals/new-promise-capability": __cjsMetaURL$3
        }, _require);

        (function () {
          var anObject = require('../internals/an-object');

          var isObject = require('../internals/is-object');

          var newPromiseCapability = require('../internals/new-promise-capability');

          module.exports = function (C, x) {
            anObject(C);
            if (isObject(x) && x.constructor === C) return x;
            var promiseCapability = newPromiseCapability.f(C);
            var resolve = promiseCapability.resolve;
            resolve(x);
            return promiseCapability.promise;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/species-constructor.js", ['./cjs-loader.mjs', './well-known-symbol.js', './an-object.js', './a-constructor.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/an-object": __cjsMetaURL$1,
          "../internals/a-constructor": __cjsMetaURL$2,
          "../internals/well-known-symbol": __cjsMetaURL$3
        }, _require);

        (function () {
          var anObject = require('../internals/an-object');

          var aConstructor = require('../internals/a-constructor');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var SPECIES = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
          // https://tc39.es/ecma262/#sec-speciesconstructor

          module.exports = function (O, defaultConstructor) {
            var C = anObject(O).constructor;
            var S;
            return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/redefine-all.js", ['./cjs-loader.mjs', './redefine.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/redefine": __cjsMetaURL$1
        }, _require);

        (function () {
          var redefine = require('../internals/redefine');

          module.exports = function (target, src, options) {
            for (var key in src) {
              if (options && options.unsafe && target[key]) target[key] = src[key];else redefine(target, key, src[key], options);
            }

            return target;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/set-species.js", ['./cjs-loader.mjs', './descriptors.js', './get-built-in.js', './well-known-symbol.js', './object-define-property.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$4, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/get-built-in": __cjsMetaURL$1,
          "../internals/object-define-property": __cjsMetaURL$2,
          "../internals/well-known-symbol": __cjsMetaURL$3,
          "../internals/descriptors": __cjsMetaURL$4
        }, _require);

        (function () {
          var getBuiltIn = require('../internals/get-built-in');

          var definePropertyModule = require('../internals/object-define-property');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var DESCRIPTORS = require('../internals/descriptors');

          var SPECIES = wellKnownSymbol('species');

          module.exports = function (CONSTRUCTOR_NAME) {
            var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
            var defineProperty = definePropertyModule.f;

            if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
              defineProperty(Constructor, SPECIES, {
                configurable: true,
                get: function get() {
                  return this;
                }
              });
            }
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/an-instance.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = function (it, Constructor, name) {
            if (it instanceof Constructor) return it;
            throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/inspect-source.js", ['./cjs-loader.mjs', './is-callable.js', './shared-store.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-callable": __cjsMetaURL$1,
          "../internals/shared-store": __cjsMetaURL$2
        }, _require);

        (function () {
          var isCallable = require('../internals/is-callable');

          var store = require('../internals/shared-store');

          var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

          if (!isCallable(store.inspectSource)) {
            store.inspectSource = function (it) {
              return functionToString.call(it);
            };
          }

          module.exports = store.inspectSource;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/check-correctness-of-iteration.js", ['./cjs-loader.mjs', './well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var wellKnownSymbol = require('../internals/well-known-symbol');

          var ITERATOR = wellKnownSymbol('iterator');
          var SAFE_CLOSING = false;

          try {
            var called = 0;
            var iteratorWithReturn = {
              next: function next() {
                return {
                  done: !!called++
                };
              },
              'return': function _return() {
                SAFE_CLOSING = true;
              }
            };

            iteratorWithReturn[ITERATOR] = function () {
              return this;
            }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


            Array.from(iteratorWithReturn, function () {
              throw 2;
            });
          } catch (error) {
            /* empty */
          }

          module.exports = function (exec, SKIP_CLOSING) {
            if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
            var ITERATION_SUPPORT = false;

            try {
              var object = {};

              object[ITERATOR] = function () {
                return {
                  next: function next() {
                    return {
                      done: ITERATION_SUPPORT = true
                    };
                  }
                };
              };

              exec(object);
            } catch (error) {
              /* empty */
            }

            return ITERATION_SUPPORT;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/task.js", ['./cjs-loader.mjs', './global.js', './is-callable.js', './fails.js', './document-create-element.js', './function-bind-context.js', './html.js', './engine-is-ios.js', './engine-is-node.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$6, __cjsMetaURL$4, __cjsMetaURL$5, __cjsMetaURL$7, __cjsMetaURL$8;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$8 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1,
          "../internals/is-callable": __cjsMetaURL$2,
          "../internals/fails": __cjsMetaURL$3,
          "../internals/function-bind-context": __cjsMetaURL$4,
          "../internals/html": __cjsMetaURL$5,
          "../internals/document-create-element": __cjsMetaURL$6,
          "../internals/engine-is-ios": __cjsMetaURL$7,
          "../internals/engine-is-node": __cjsMetaURL$8
        }, _require);

        (function () {
          var global = require('../internals/global');

          var isCallable = require('../internals/is-callable');

          var fails = require('../internals/fails');

          var bind = require('../internals/function-bind-context');

          var html = require('../internals/html');

          var createElement = require('../internals/document-create-element');

          var IS_IOS = require('../internals/engine-is-ios');

          var IS_NODE = require('../internals/engine-is-node');

          var set = global.setImmediate;
          var clear = global.clearImmediate;
          var process = global.process;
          var MessageChannel = global.MessageChannel;
          var Dispatch = global.Dispatch;
          var counter = 0;
          var queue = {};
          var ONREADYSTATECHANGE = 'onreadystatechange';
          var location, defer, channel, port;

          try {
            // Deno throws a ReferenceError on `location` access without `--location` flag
            location = global.location;
          } catch (error) {
            /* empty */
          }

          var run = function run(id) {
            // eslint-disable-next-line no-prototype-builtins -- safe
            if (queue.hasOwnProperty(id)) {
              var fn = queue[id];
              delete queue[id];
              fn();
            }
          };

          var runner = function runner(id) {
            return function () {
              run(id);
            };
          };

          var listener = function listener(event) {
            run(event.data);
          };

          var post = function post(id) {
            // old engines have not location.origin
            global.postMessage(String(id), location.protocol + '//' + location.host);
          }; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


          if (!set || !clear) {
            set = function setImmediate(fn) {
              var args = [];
              var argumentsLength = arguments.length;
              var i = 1;

              while (argumentsLength > i) {
                args.push(arguments[i++]);
              }

              queue[++counter] = function () {
                // eslint-disable-next-line no-new-func -- spec requirement
                (isCallable(fn) ? fn : Function(fn)).apply(undefined, args);
              };

              defer(counter);
              return counter;
            };

            clear = function clearImmediate(id) {
              delete queue[id];
            }; // Node.js 0.8-


            if (IS_NODE) {
              defer = function defer(id) {
                process.nextTick(runner(id));
              }; // Sphere (JS game engine) Dispatch API

            } else if (Dispatch && Dispatch.now) {
              defer = function defer(id) {
                Dispatch.now(runner(id));
              }; // Browsers with MessageChannel, includes WebWorkers
              // except iOS - https://github.com/zloirock/core-js/issues/624

            } else if (MessageChannel && !IS_IOS) {
              channel = new MessageChannel();
              port = channel.port2;
              channel.port1.onmessage = listener;
              defer = bind(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
              // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
            } else if (global.addEventListener && isCallable(global.postMessage) && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
              defer = post;
              global.addEventListener('message', listener, false); // IE8-
            } else if (ONREADYSTATECHANGE in createElement('script')) {
              defer = function defer(id) {
                html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
                  html.removeChild(this);
                  run(id);
                };
              }; // Rest old browsers

            } else {
              defer = function defer(id) {
                setTimeout(runner(id), 0);
              };
            }
          }

          module.exports = {
            set: set,
            clear: clear
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/microtask.js", ['./cjs-loader.mjs', './global.js', './object-get-own-property-descriptor.js', './engine-is-ios.js', './engine-is-node.js', './task.js', './engine-is-ios-pebble.js', './engine-is-webos-webkit.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$4, __cjsMetaURL$7, __cjsMetaURL$3, __cjsMetaURL$5, __cjsMetaURL$6;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$7 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$6 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1,
          "../internals/object-get-own-property-descriptor": __cjsMetaURL$2,
          "../internals/task": __cjsMetaURL$3,
          "../internals/engine-is-ios": __cjsMetaURL$4,
          "../internals/engine-is-ios-pebble": __cjsMetaURL$5,
          "../internals/engine-is-webos-webkit": __cjsMetaURL$6,
          "../internals/engine-is-node": __cjsMetaURL$7
        }, _require);

        (function () {
          var global = require('../internals/global');

          var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

          var macrotask = require('../internals/task').set;

          var IS_IOS = require('../internals/engine-is-ios');

          var IS_IOS_PEBBLE = require('../internals/engine-is-ios-pebble');

          var IS_WEBOS_WEBKIT = require('../internals/engine-is-webos-webkit');

          var IS_NODE = require('../internals/engine-is-node');

          var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
          var document = global.document;
          var process = global.process;
          var Promise = global.Promise; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

          var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
          var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
          var flush, head, last, notify, toggle, node, promise, then; // modern engines have queueMicrotask method

          if (!queueMicrotask) {
            flush = function flush() {
              var parent, fn;
              if (IS_NODE && (parent = process.domain)) parent.exit();

              while (head) {
                fn = head.fn;
                head = head.next;

                try {
                  fn();
                } catch (error) {
                  if (head) notify();else last = undefined;
                  throw error;
                }
              }

              last = undefined;
              if (parent) parent.enter();
            }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
            // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898


            if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
              toggle = true;
              node = document.createTextNode('');
              new MutationObserver(flush).observe(node, {
                characterData: true
              });

              notify = function notify() {
                node.data = toggle = !toggle;
              }; // environments with maybe non-completely correct, but existent Promise

            } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
              // Promise.resolve without an argument throws an error in LG WebOS 2
              promise = Promise.resolve(undefined); // workaround of WebKit ~ iOS Safari 10.1 bug

              promise.constructor = Promise;
              then = promise.then;

              notify = function notify() {
                then.call(promise, flush);
              }; // Node.js without promises

            } else if (IS_NODE) {
              notify = function notify() {
                process.nextTick(flush);
              }; // for other environments - macrotask based on:
              // - setImmediate
              // - MessageChannel
              // - window.postMessag
              // - onreadystatechange
              // - setTimeout

            } else {
              notify = function notify() {
                // strange IE + webpack dev server bug - use .call(global)
                macrotask.call(global, flush);
              };
            }
          }

          module.exports = queueMicrotask || function (fn) {
            var task = {
              fn: fn,
              next: undefined
            };
            if (last) last.next = task;

            if (!head) {
              head = task;
              notify();
            }

            last = task;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/host-report-errors.js", ['./cjs-loader.mjs', './global.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1
        }, _require);

        (function () {
          var global = require('../internals/global');

          module.exports = function (a, b) {
            var console = global.console;

            if (console && console.error) {
              arguments.length === 1 ? console.error(a) : console.error(a, b);
            }
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/engine-is-browser.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = typeof window == 'object';
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/engine-is-node.js", ['./cjs-loader.mjs', './global.js', './classof-raw.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/classof-raw": __cjsMetaURL$1,
          "../internals/global": __cjsMetaURL$2
        }, _require);

        (function () {
          var classof = require('../internals/classof-raw');

          var global = require('../internals/global');

          module.exports = classof(global.process) == 'process';
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/copy-constructor-properties.js", ['./cjs-loader.mjs', './has-own-property.js', './object-get-own-property-descriptor.js', './object-define-property.js', './own-keys.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/has-own-property": __cjsMetaURL$1,
          "../internals/own-keys": __cjsMetaURL$2,
          "../internals/object-get-own-property-descriptor": __cjsMetaURL$3,
          "../internals/object-define-property": __cjsMetaURL$4
        }, _require);

        (function () {
          var hasOwn = require('../internals/has-own-property');

          var ownKeys = require('../internals/own-keys');

          var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');

          var definePropertyModule = require('../internals/object-define-property');

          module.exports = function (target, source) {
            var keys = ownKeys(source);
            var defineProperty = definePropertyModule.f;
            var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
            }
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/not-a-regexp.js", ['./cjs-loader.mjs', './is-regexp.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-regexp": __cjsMetaURL$1
        }, _require);

        (function () {
          var isRegExp = require('../internals/is-regexp');

          module.exports = function (it) {
            if (isRegExp(it)) {
              throw TypeError("The method doesn't accept regular expressions");
            }

            return it;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/to-length.js", ['./cjs-loader.mjs', './to-integer-or-infinity.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-integer-or-infinity": __cjsMetaURL$1
        }, _require);

        (function () {
          var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

          var min = Math.min; // `ToLength` abstract operation
          // https://tc39.es/ecma262/#sec-tolength

          module.exports = function (argument) {
            return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/correct-is-regexp-logic.js", ['./cjs-loader.mjs', './well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/well-known-symbol": __cjsMetaURL$1
        }, _require);

        (function () {
          var wellKnownSymbol = require('../internals/well-known-symbol');

          var MATCH = wellKnownSymbol('match');

          module.exports = function (METHOD_NAME) {
            var regexp = /./;

            try {
              '/./'[METHOD_NAME](regexp);
            } catch (error1) {
              try {
                regexp[MATCH] = false;
                return '/./'[METHOD_NAME](regexp);
              } catch (error2) {
                /* empty */
              }
            }

            return false;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/to-absolute-index.js", ['./cjs-loader.mjs', './to-integer-or-infinity.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-integer-or-infinity": __cjsMetaURL$1
        }, _require);

        (function () {
          var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

          var max = Math.max;
          var min = Math.min; // Helper for a popular repeating case of the spec:
          // Let integer be ? ToInteger(index).
          // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

          module.exports = function (index, length) {
            var integer = toIntegerOrInfinity(index);
            return integer < 0 ? max(integer + length, 0) : min(integer, length);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/array-method-is-strict.js", ['./cjs-loader.mjs', './fails.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/fails": __cjsMetaURL$1
        }, _require);

        (function () {
          var fails = require('../internals/fails');

          module.exports = function (METHOD_NAME, argument) {
            var method = [][METHOD_NAME];
            return !!method && fails(function () {
              // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
              method.call(null, argument || function () {
                throw 1;
              }, 1);
            });
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/array-reduce.js", ['./cjs-loader.mjs', './indexed-object.js', './a-callable.js', './to-object.js', './length-of-array-like.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$4;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/a-callable": __cjsMetaURL$1,
          "../internals/to-object": __cjsMetaURL$2,
          "../internals/indexed-object": __cjsMetaURL$3,
          "../internals/length-of-array-like": __cjsMetaURL$4
        }, _require);

        (function () {
          var aCallable = require('../internals/a-callable');

          var toObject = require('../internals/to-object');

          var IndexedObject = require('../internals/indexed-object');

          var lengthOfArrayLike = require('../internals/length-of-array-like'); // `Array.prototype.{ reduce, reduceRight }` methods implementation


          var createMethod = function createMethod(IS_RIGHT) {
            return function (that, callbackfn, argumentsLength, memo) {
              aCallable(callbackfn);
              var O = toObject(that);
              var self = IndexedObject(O);
              var length = lengthOfArrayLike(O);
              var index = IS_RIGHT ? length - 1 : 0;
              var i = IS_RIGHT ? -1 : 1;
              if (argumentsLength < 2) while (true) {
                if (index in self) {
                  memo = self[index];
                  index += i;
                  break;
                }

                index += i;

                if (IS_RIGHT ? index < 0 : length <= index) {
                  throw TypeError('Reduce of empty array with no initial value');
                }
              }

              for (; IS_RIGHT ? index >= 0 : length > index; index += i) {
                if (index in self) {
                  memo = callbackfn(memo, self[index], index, O);
                }
              }

              return memo;
            };
          };

          module.exports = {
            // `Array.prototype.reduce` method
            // https://tc39.es/ecma262/#sec-array.prototype.reduce
            left: createMethod(false),
            // `Array.prototype.reduceRight` method
            // https://tc39.es/ecma262/#sec-array.prototype.reduceright
            right: createMethod(true)
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/string-trim-forced.js", ['./cjs-loader.mjs', './fails.js', './function-name.js', './whitespaces.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/function-name": __cjsMetaURL$1,
          "../internals/fails": __cjsMetaURL$2,
          "../internals/whitespaces": __cjsMetaURL$3
        }, _require);

        (function () {
          var PROPER_FUNCTION_NAME = require('../internals/function-name').PROPER;

          var fails = require('../internals/fails');

          var whitespaces = require('../internals/whitespaces');

          var non = "\u200B\x85\u180E"; // check that a method works with the correct list
          // of whitespaces and has a correct name

          module.exports = function (METHOD_NAME) {
            return fails(function () {
              return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() !== non || PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME;
            });
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/array-includes.js", ['./cjs-loader.mjs', './to-indexed-object.js', './length-of-array-like.js', './to-absolute-index.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-indexed-object": __cjsMetaURL$1,
          "../internals/to-absolute-index": __cjsMetaURL$2,
          "../internals/length-of-array-like": __cjsMetaURL$3
        }, _require);

        (function () {
          var toIndexedObject = require('../internals/to-indexed-object');

          var toAbsoluteIndex = require('../internals/to-absolute-index');

          var lengthOfArrayLike = require('../internals/length-of-array-like'); // `Array.prototype.{ indexOf, includes }` methods implementation


          var createMethod = function createMethod(IS_INCLUDES) {
            return function ($this, el, fromIndex) {
              var O = toIndexedObject($this);
              var length = lengthOfArrayLike(O);
              var index = toAbsoluteIndex(fromIndex, length);
              var value; // Array#includes uses SameValueZero equality algorithm
              // eslint-disable-next-line no-self-compare -- NaN check

              if (IS_INCLUDES && el != el) while (length > index) {
                value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

                if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
              } else for (; length > index; index++) {
                if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
              }
              return !IS_INCLUDES && -1;
            };
          };

          module.exports = {
            // `Array.prototype.includes` method
            // https://tc39.es/ecma262/#sec-array.prototype.includes
            includes: createMethod(true),
            // `Array.prototype.indexOf` method
            // https://tc39.es/ecma262/#sec-array.prototype.indexof
            indexOf: createMethod(false)
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/is-constructor.js", ['./cjs-loader.mjs', './is-callable.js', './fails.js', './get-built-in.js', './classof.js', './inspect-source.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$4, __cjsMetaURL$3, __cjsMetaURL$5;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/fails": __cjsMetaURL$1,
          "../internals/is-callable": __cjsMetaURL$2,
          "../internals/classof": __cjsMetaURL$3,
          "../internals/get-built-in": __cjsMetaURL$4,
          "../internals/inspect-source": __cjsMetaURL$5
        }, _require);

        (function () {
          var fails = require('../internals/fails');

          var isCallable = require('../internals/is-callable');

          var classof = require('../internals/classof');

          var getBuiltIn = require('../internals/get-built-in');

          var inspectSource = require('../internals/inspect-source');

          var empty = [];
          var construct = getBuiltIn('Reflect', 'construct');
          var constructorRegExp = /^\s*(?:class|function)\b/;
          var exec = constructorRegExp.exec;
          var INCORRECT_TO_STRING = !constructorRegExp.exec(function () {
            /* empty */
          });

          var isConstructorModern = function isConstructorModern(argument) {
            if (!isCallable(argument)) return false;

            try {
              construct(Object, empty, argument);
              return true;
            } catch (error) {
              return false;
            }
          };

          var isConstructorLegacy = function isConstructorLegacy(argument) {
            if (!isCallable(argument)) return false;

            switch (classof(argument)) {
              case 'AsyncFunction':
              case 'GeneratorFunction':
              case 'AsyncGeneratorFunction':
                return false;
              // we can't check .prototype since constructors produced by .bind haven't it
            }

            return INCORRECT_TO_STRING || !!exec.call(constructorRegExp, inspectSource(argument));
          }; // `IsConstructor` abstract operation
          // https://tc39.es/ecma262/#sec-isconstructor


          module.exports = !construct || fails(function () {
            var called;
            return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
              called = true;
            }) || called;
          }) ? isConstructorLegacy : isConstructorModern;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/array-sort.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          // TODO: use something more complex like timsort?
          var floor = Math.floor;

          var mergeSort = function mergeSort(array, comparefn) {
            var length = array.length;
            var middle = floor(length / 2);
            return length < 8 ? insertionSort(array, comparefn) : merge(mergeSort(array.slice(0, middle), comparefn), mergeSort(array.slice(middle), comparefn), comparefn);
          };

          var insertionSort = function insertionSort(array, comparefn) {
            var length = array.length;
            var i = 1;
            var element, j;

            while (i < length) {
              j = i;
              element = array[i];

              while (j && comparefn(array[j - 1], element) > 0) {
                array[j] = array[--j];
              }

              if (j !== i++) array[j] = element;
            }

            return array;
          };

          var merge = function merge(left, right, comparefn) {
            var llength = left.length;
            var rlength = right.length;
            var lindex = 0;
            var rindex = 0;
            var result = [];

            while (lindex < llength || rindex < rlength) {
              if (lindex < llength && rindex < rlength) {
                result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
              } else {
                result.push(lindex < llength ? left[lindex++] : right[rindex++]);
              }
            }

            return result;
          };

          module.exports = mergeSort;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/engine-ff-version.js", ['./cjs-loader.mjs', './engine-user-agent.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/engine-user-agent": __cjsMetaURL$1
        }, _require);

        (function () {
          var userAgent = require('../internals/engine-user-agent');

          var firefox = userAgent.match(/firefox\/(\d+)/i);
          module.exports = !!firefox && +firefox[1];
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/engine-webkit-version.js", ['./cjs-loader.mjs', './engine-user-agent.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/engine-user-agent": __cjsMetaURL$1
        }, _require);

        (function () {
          var userAgent = require('../internals/engine-user-agent');

          var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);
          module.exports = !!webkit && +webkit[1];
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/engine-is-ie-or-edge.js", ['./cjs-loader.mjs', './engine-user-agent.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/engine-user-agent": __cjsMetaURL$1
        }, _require);

        (function () {
          var UA = require('../internals/engine-user-agent');

          module.exports = /MSIE|Trident/.test(UA);
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/array-last-index-of.js", ['./cjs-loader.mjs', './to-indexed-object.js', './to-integer-or-infinity.js', './length-of-array-like.js', './array-method-is-strict.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-indexed-object": __cjsMetaURL$1,
          "../internals/to-integer-or-infinity": __cjsMetaURL$2,
          "../internals/length-of-array-like": __cjsMetaURL$3,
          "../internals/array-method-is-strict": __cjsMetaURL$4
        }, _require);

        (function () {
          /* eslint-disable es/no-array-prototype-lastindexof -- safe */
          var toIndexedObject = require('../internals/to-indexed-object');

          var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

          var lengthOfArrayLike = require('../internals/length-of-array-like');

          var arrayMethodIsStrict = require('../internals/array-method-is-strict');

          var min = Math.min;
          var $lastIndexOf = [].lastIndexOf;
          var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
          var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
          var FORCED = NEGATIVE_ZERO || !STRICT_METHOD; // `Array.prototype.lastIndexOf` method implementation
          // https://tc39.es/ecma262/#sec-array.prototype.lastindexof

          module.exports = FORCED ? function lastIndexOf(searchElement
          /* , fromIndex = @[*-1] */
          ) {
            // convert -0 to +0
            if (NEGATIVE_ZERO) return $lastIndexOf.apply(this, arguments) || 0;
            var O = toIndexedObject(this);
            var length = lengthOfArrayLike(O);
            var index = length - 1;
            if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
            if (index < 0) index = length + index;

            for (; index >= 0; index--) {
              if (index in O && O[index] === searchElement) return index || 0;
            }

            return -1;
          } : $lastIndexOf;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/to-primitive.js", ['./cjs-loader.mjs', './is-object.js', './is-symbol.js', './get-method.js', './ordinary-to-primitive.js', './well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$5;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$5 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-object": __cjsMetaURL$1,
          "../internals/is-symbol": __cjsMetaURL$2,
          "../internals/get-method": __cjsMetaURL$3,
          "../internals/ordinary-to-primitive": __cjsMetaURL$4,
          "../internals/well-known-symbol": __cjsMetaURL$5
        }, _require);

        (function () {
          var isObject = require('../internals/is-object');

          var isSymbol = require('../internals/is-symbol');

          var getMethod = require('../internals/get-method');

          var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
          // https://tc39.es/ecma262/#sec-toprimitive

          module.exports = function (input, pref) {
            if (!isObject(input) || isSymbol(input)) return input;
            var exoticToPrim = getMethod(input, TO_PRIMITIVE);
            var result;

            if (exoticToPrim) {
              if (pref === undefined) pref = 'default';
              result = exoticToPrim.call(input, pref);
              if (!isObject(result) || isSymbol(result)) return result;
              throw TypeError("Can't convert object to primitive value");
            }

            if (pref === undefined) pref = 'number';
            return ordinaryToPrimitive(input, pref);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/document-create-element.js", ['./cjs-loader.mjs', './global.js', './is-object.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1,
          "../internals/is-object": __cjsMetaURL$2
        }, _require);

        (function () {
          var global = require('../internals/global');

          var isObject = require('../internals/is-object');

          var document = global.document; // typeof document.createElement is 'object' in old IE

          var EXISTS = isObject(document) && isObject(document.createElement);

          module.exports = function (it) {
            return EXISTS ? document.createElement(it) : {};
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/correct-prototype-getter.js", ['./cjs-loader.mjs', './fails.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/fails": __cjsMetaURL$1
        }, _require);

        (function () {
          var fails = require('../internals/fails');

          module.exports = !fails(function () {
            function F() {
              /* empty */
            }

            F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

            return Object.getPrototypeOf(new F()) !== F.prototype;
          });
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-to-string.js", ['./cjs-loader.mjs', './to-string-tag-support.js', './classof.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/to-string-tag-support": __cjsMetaURL$1,
          "../internals/classof": __cjsMetaURL$2
        }, _require);

        (function () {
          var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');

          var classof = require('../internals/classof'); // `Object.prototype.toString` method implementation
          // https://tc39.es/ecma262/#sec-object.prototype.tostring


          module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
            return '[object ' + classof(this) + ']';
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/set-global.js", ['./cjs-loader.mjs', './global.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/global": __cjsMetaURL$1
        }, _require);

        (function () {
          var global = require('../internals/global');

          module.exports = function (key, value) {
            try {
              // eslint-disable-next-line es/no-object-defineproperty -- safe
              Object.defineProperty(global, key, {
                value: value,
                configurable: true,
                writable: true
              });
            } catch (error) {
              global[key] = value;
            }

            return value;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/engine-user-agent.js", ['./cjs-loader.mjs', './get-built-in.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/get-built-in": __cjsMetaURL$1
        }, _require);

        (function () {
          var getBuiltIn = require('../internals/get-built-in');

          module.exports = getBuiltIn('navigator', 'userAgent') || '';
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/object-define-properties.js", ['./cjs-loader.mjs', './descriptors.js', './an-object.js', './object-define-property.js', './object-keys.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$3, __cjsMetaURL$2, __cjsMetaURL$4;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/descriptors": __cjsMetaURL$1,
          "../internals/object-define-property": __cjsMetaURL$2,
          "../internals/an-object": __cjsMetaURL$3,
          "../internals/object-keys": __cjsMetaURL$4
        }, _require);

        (function () {
          var DESCRIPTORS = require('../internals/descriptors');

          var definePropertyModule = require('../internals/object-define-property');

          var anObject = require('../internals/an-object');

          var objectKeys = require('../internals/object-keys'); // `Object.defineProperties` method
          // https://tc39.es/ecma262/#sec-object.defineproperties
          // eslint-disable-next-line es/no-object-defineproperties -- safe


          module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
            anObject(O);
            var keys = objectKeys(Properties);
            var length = keys.length;
            var index = 0;
            var key;

            while (length > index) {
              definePropertyModule.f(O, key = keys[index++], Properties[key]);
            }

            return O;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/html.js", ['./cjs-loader.mjs', './get-built-in.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/get-built-in": __cjsMetaURL$1
        }, _require);

        (function () {
          var getBuiltIn = require('../internals/get-built-in');

          module.exports = getBuiltIn('document', 'documentElement');
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/array-species-constructor.js", ['./cjs-loader.mjs', './is-object.js', './well-known-symbol.js', './is-array.js', './is-constructor.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$3, __cjsMetaURL$4, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-array": __cjsMetaURL$1,
          "../internals/is-constructor": __cjsMetaURL$2,
          "../internals/is-object": __cjsMetaURL$3,
          "../internals/well-known-symbol": __cjsMetaURL$4
        }, _require);

        (function () {
          var isArray = require('../internals/is-array');

          var isConstructor = require('../internals/is-constructor');

          var isObject = require('../internals/is-object');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var SPECIES = wellKnownSymbol('species'); // a part of `ArraySpeciesCreate` abstract operation
          // https://tc39.es/ecma262/#sec-arrayspeciescreate

          module.exports = function (originalArray) {
            var C;

            if (isArray(originalArray)) {
              C = originalArray.constructor; // cross-realm fallback

              if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
                C = C[SPECIES];
                if (C === null) C = undefined;
              }
            }

            return C === undefined ? Array : C;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/is-array-iterator-method.js", ['./cjs-loader.mjs', './well-known-symbol.js', './iterators.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/well-known-symbol": __cjsMetaURL$1,
          "../internals/iterators": __cjsMetaURL$2
        }, _require);

        (function () {
          var wellKnownSymbol = require('../internals/well-known-symbol');

          var Iterators = require('../internals/iterators');

          var ITERATOR = wellKnownSymbol('iterator');
          var ArrayPrototype = Array.prototype; // check on default Array iterator

          module.exports = function (it) {
            return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/get-iterator.js", ['./cjs-loader.mjs', './a-callable.js', './an-object.js', './get-iterator-method.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/a-callable": __cjsMetaURL$1,
          "../internals/an-object": __cjsMetaURL$2,
          "../internals/get-iterator-method": __cjsMetaURL$3
        }, _require);

        (function () {
          var aCallable = require('../internals/a-callable');

          var anObject = require('../internals/an-object');

          var getIteratorMethod = require('../internals/get-iterator-method');

          module.exports = function (argument, usingIterator) {
            var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
            if (aCallable(iteratorMethod)) return anObject(iteratorMethod.call(argument));
            throw TypeError(String(argument) + ' is not iterable');
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/get-iterator-method.js", ['./cjs-loader.mjs', './get-method.js', './well-known-symbol.js', './classof.js', './iterators.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$4, __cjsMetaURL$1, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/classof": __cjsMetaURL$1,
          "../internals/get-method": __cjsMetaURL$2,
          "../internals/iterators": __cjsMetaURL$3,
          "../internals/well-known-symbol": __cjsMetaURL$4
        }, _require);

        (function () {
          var classof = require('../internals/classof');

          var getMethod = require('../internals/get-method');

          var Iterators = require('../internals/iterators');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var ITERATOR = wellKnownSymbol('iterator');

          module.exports = function (it) {
            if (it != undefined) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/iterator-close.js", ['./cjs-loader.mjs', './get-method.js', './an-object.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/an-object": __cjsMetaURL$1,
          "../internals/get-method": __cjsMetaURL$2
        }, _require);

        (function () {
          var anObject = require('../internals/an-object');

          var getMethod = require('../internals/get-method');

          module.exports = function (iterator, kind, value) {
            var innerResult, innerError;
            anObject(iterator);

            try {
              innerResult = getMethod(iterator, 'return');

              if (!innerResult) {
                if (kind === 'throw') throw value;
                return value;
              }

              innerResult = innerResult.call(iterator);
            } catch (error) {
              innerError = true;
              innerResult = error;
            }

            if (kind === 'throw') throw value;
            if (innerError) throw innerResult;
            anObject(innerResult);
            return value;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/try-to-string.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          module.exports = function (argument) {
            try {
              return String(argument);
            } catch (error) {
              return 'Object';
            }
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/a-constructor.js", ['./cjs-loader.mjs', './try-to-string.js', './is-constructor.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-constructor": __cjsMetaURL$1,
          "../internals/try-to-string": __cjsMetaURL$2
        }, _require);

        (function () {
          var isConstructor = require('../internals/is-constructor');

          var tryToString = require('../internals/try-to-string'); // `Assert: IsConstructor(argument) is true`


          module.exports = function (argument) {
            if (isConstructor(argument)) return argument;
            throw TypeError(tryToString(argument) + ' is not a constructor');
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/engine-is-ios-pebble.js", ['./cjs-loader.mjs', './global.js', './engine-user-agent.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/engine-user-agent": __cjsMetaURL$1,
          "../internals/global": __cjsMetaURL$2
        }, _require);

        (function () {
          var userAgent = require('../internals/engine-user-agent');

          var global = require('../internals/global');

          module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/engine-is-ios.js", ['./cjs-loader.mjs', './engine-user-agent.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/engine-user-agent": __cjsMetaURL$1
        }, _require);

        (function () {
          var userAgent = require('../internals/engine-user-agent');

          module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/engine-is-webos-webkit.js", ['./cjs-loader.mjs', './engine-user-agent.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/engine-user-agent": __cjsMetaURL$1
        }, _require);

        (function () {
          var userAgent = require('../internals/engine-user-agent');

          module.exports = /web0s(?!.*chrome)/i.test(userAgent);
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/own-keys.js", ['./cjs-loader.mjs', './get-built-in.js', './an-object.js', './object-get-own-property-names.js', './object-get-own-property-symbols.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$4, __cjsMetaURL$2, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$4 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/get-built-in": __cjsMetaURL$1,
          "../internals/object-get-own-property-names": __cjsMetaURL$2,
          "../internals/object-get-own-property-symbols": __cjsMetaURL$3,
          "../internals/an-object": __cjsMetaURL$4
        }, _require);

        (function () {
          var getBuiltIn = require('../internals/get-built-in');

          var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');

          var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');

          var anObject = require('../internals/an-object'); // all object keys, includes non-enumerable and symbols


          module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
            var keys = getOwnPropertyNamesModule.f(anObject(it));
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/is-regexp.js", ['./cjs-loader.mjs', './classof-raw.js', './is-object.js', './well-known-symbol.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$2, __cjsMetaURL$1, __cjsMetaURL$3;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$3 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-object": __cjsMetaURL$1,
          "../internals/classof-raw": __cjsMetaURL$2,
          "../internals/well-known-symbol": __cjsMetaURL$3
        }, _require);

        (function () {
          var isObject = require('../internals/is-object');

          var classof = require('../internals/classof-raw');

          var wellKnownSymbol = require('../internals/well-known-symbol');

          var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
          // https://tc39.es/ecma262/#sec-isregexp

          module.exports = function (it) {
            var isRegExp;
            return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/ordinary-to-primitive.js", ['./cjs-loader.mjs', './is-callable.js', './is-object.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1, __cjsMetaURL$2;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }, function (module) {
      __cjsMetaURL$2 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/is-callable": __cjsMetaURL$1,
          "../internals/is-object": __cjsMetaURL$2
        }, _require);

        (function () {
          var isCallable = require('../internals/is-callable');

          var isObject = require('../internals/is-object'); // `OrdinaryToPrimitive` abstract operation
          // https://tc39.es/ecma262/#sec-ordinarytoprimitive


          module.exports = function (input, pref) {
            var fn, val;
            if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = fn.call(input))) return val;
            if (isCallable(fn = input.valueOf) && !isObject(val = fn.call(input))) return val;
            if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = fn.call(input))) return val;
            throw TypeError("Can't convert object to primitive value");
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/get-method.js", ['./cjs-loader.mjs', './a-callable.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({
          "../internals/a-callable": __cjsMetaURL$1
        }, _require);

        (function () {
          var aCallable = require('../internals/a-callable'); // `GetMethod` abstract operation
          // https://tc39.es/ecma262/#sec-getmethod


          module.exports = function (V, P) {
            var func = V[P];
            return func == null ? undefined : aCallable(func);
          };
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

} }; });