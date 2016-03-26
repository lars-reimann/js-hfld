SystemJS.config({
    transpiler: "plugin-babel",
    trace: true,
    packages: {
        "@ignavia/hfld": {
            "defaultExtension": "js",
            "format": "esm",
            "main": "hfld.js",
            "meta": {
                "*js": {
                    "babelOptions": {
                        "plugins": [
                            "babel-plugin-transform-export-extensions"
                        ]
                    }
                },
                "*jsx": {
                    "babelOptions": {
                        "plugins": [
                            "babel-plugin-transform-object-rest-spread",
                            "babel-plugin-transform-export-extensions",
                            "babel-plugin-transform-function-bind"
                        ],
                        "presets": [
                            "babel-preset-react"
                        ]
                    }
                }
            }
        }
    }
});

SystemJS.config({
    packageConfigPaths: [
        "npm:@*/*.json",
        "npm:*.json",
        "github:*/*.json"
    ],
    map: {
        "@ignavia/earl": "npm:@ignavia/earl@1.2.2",
        "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
        "babel-plugin-transform-export-extensions": "npm:babel-plugin-transform-export-extensions@6.5.0",
        "babel-plugin-transform-function-bind": "npm:babel-plugin-transform-function-bind@6.5.2",
        "babel-plugin-transform-object-rest-spread": "npm:babel-plugin-transform-object-rest-spread@6.6.5",
        "babel-preset-react": "npm:babel-preset-react@6.5.0",
        "bootstrap": "github:twbs/bootstrap@3.3.6",
        "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
        "core-js": "npm:core-js@1.2.6",
        "css": "github:systemjs/plugin-css@0.1.20",
        "domain": "github:jspm/nodelibs-domain@0.2.0-alpha",
        "events": "github:jspm/nodelibs-events@0.2.0-alpha",
        "flux": "npm:flux@2.1.1",
        "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
        "http": "github:jspm/nodelibs-http@0.2.0-alpha",
        "https": "github:jspm/nodelibs-https@0.2.0-alpha",
        "lodash": "npm:lodash@4.6.1",
        "net": "github:jspm/nodelibs-net@0.2.0-alpha",
        "path": "github:jspm/nodelibs-path@0.2.0-alpha",
        "plugin-babel": "npm:systemjs-plugin-babel@0.0.2",
        "process": "github:jspm/nodelibs-process@0.2.0-alpha",
        "react": "npm:react@0.14.7",
        "react-bootstrap": "npm:react-bootstrap@0.28.3",
        "react-dom": "npm:react-dom@0.14.7",
        "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
        "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
        "systemjs-hot-reloader": "github:capaj/systemjs-hot-reloader@0.5.6",
        "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
        "url": "github:jspm/nodelibs-url@0.2.0-alpha",
        "util": "github:jspm/nodelibs-util@0.2.0-alpha",
        "zlib": "github:jspm/nodelibs-zlib@0.2.0-alpha"
    },
    packages: {
        "github:capaj/systemjs-hot-reloader@0.5.6": {
            "map": {
                "debug": "npm:debug@2.2.0",
                "socket.io-client": "github:socketio/socket.io-client@1.4.5",
                "weakee": "npm:weakee@1.0.0"
            }
        },
        "github:jspm/nodelibs-buffer@0.2.0-alpha": {
            "map": {
                "buffer-browserify": "npm:buffer@4.5.1"
            }
        },
        "github:jspm/nodelibs-domain@0.2.0-alpha": {
            "map": {
                "domain-browserify": "npm:domain-browser@1.1.7"
            }
        },
        "github:jspm/nodelibs-http@0.2.0-alpha": {
            "map": {
                "http-browserify": "npm:stream-http@2.2.0"
            }
        },
        "github:jspm/nodelibs-stream@0.2.0-alpha": {
            "map": {
                "stream-browserify": "npm:stream-browserify@2.0.1"
            }
        },
        "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
            "map": {
                "string_decoder-browserify": "npm:string_decoder@0.10.31"
            }
        },
        "github:jspm/nodelibs-url@0.2.0-alpha": {
            "map": {
                "url-browserify": "npm:url@0.11.0"
            }
        },
        "github:jspm/nodelibs-zlib@0.2.0-alpha": {
            "map": {
                "zlib-browserify": "npm:browserify-zlib@0.1.4"
            }
        },
        "github:twbs/bootstrap@3.3.6": {
            "map": {
                "jquery": "github:components/jquery@2.2.1"
            }
        },
        "npm:@ignavia/earl@1.2.2": {
            "map": {
                "@ignavia/util": "npm:@ignavia/util@1.1.7",
                "babel-regenerator-runtime": "npm:babel-regenerator-runtime@6.5.0"
            }
        },
        "npm:ansi-styles@2.2.0": {
            "map": {
                "color-convert": "npm:color-convert@1.0.0"
            }
        },
        "npm:babel-code-frame@6.7.4": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38",
                "chalk": "npm:chalk@1.1.1",
                "esutils": "npm:esutils@2.0.2",
                "js-tokens": "npm:js-tokens@1.0.2",
                "repeating": "npm:repeating@1.1.3"
            }
        },
        "npm:babel-helper-builder-react-jsx@6.6.5": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38",
                "babel-types": "npm:babel-types@6.7.2",
                "esutils": "npm:esutils@2.0.2",
                "lodash": "npm:lodash@3.10.1"
            }
        },
        "npm:babel-messages@6.7.2": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-syntax-export-extensions@6.5.0": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-syntax-flow@6.5.0": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-syntax-function-bind@6.5.0": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-syntax-jsx@6.5.0": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-syntax-object-rest-spread@6.5.0": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-transform-export-extensions@6.5.0": {
            "map": {
                "babel-plugin-syntax-export-extensions": "npm:babel-plugin-syntax-export-extensions@6.5.0",
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-transform-flow-strip-types@6.7.0": {
            "map": {
                "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.5.0",
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-transform-function-bind@6.5.2": {
            "map": {
                "babel-plugin-syntax-function-bind": "npm:babel-plugin-syntax-function-bind@6.5.0",
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-transform-object-rest-spread@6.6.5": {
            "map": {
                "babel-plugin-syntax-object-rest-spread": "npm:babel-plugin-syntax-object-rest-spread@6.5.0",
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-transform-react-display-name@6.5.0": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-transform-react-jsx-source@6.5.0": {
            "map": {
                "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.5.0",
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-plugin-transform-react-jsx@6.7.4": {
            "map": {
                "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.6.5",
                "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.5.0",
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:babel-preset-react@6.5.0": {
            "map": {
                "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.5.0",
                "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.5.0",
                "babel-plugin-transform-flow-strip-types": "npm:babel-plugin-transform-flow-strip-types@6.7.0",
                "babel-plugin-transform-react-display-name": "npm:babel-plugin-transform-react-display-name@6.5.0",
                "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.7.4",
                "babel-plugin-transform-react-jsx-source": "npm:babel-plugin-transform-react-jsx-source@6.5.0"
            }
        },
        "npm:babel-runtime@5.8.38": {
            "map": {
                "core-js": "npm:core-js@1.2.6"
            }
        },
        "npm:babel-traverse@6.7.4": {
            "map": {
                "babel-code-frame": "npm:babel-code-frame@6.7.4",
                "babel-messages": "npm:babel-messages@6.7.2",
                "babel-runtime": "npm:babel-runtime@5.8.38",
                "babel-types": "npm:babel-types@6.7.2",
                "babylon": "npm:babylon@6.7.0",
                "debug": "npm:debug@2.2.0",
                "globals": "npm:globals@8.18.0",
                "invariant": "npm:invariant@2.2.1",
                "lodash": "npm:lodash@3.10.1",
                "repeating": "npm:repeating@1.1.3"
            }
        },
        "npm:babel-types@6.7.2": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38",
                "babel-traverse": "npm:babel-traverse@6.7.4",
                "esutils": "npm:esutils@2.0.2",
                "lodash": "npm:lodash@3.10.1",
                "to-fast-properties": "npm:to-fast-properties@1.0.2"
            }
        },
        "npm:babylon@6.7.0": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38"
            }
        },
        "npm:browserify-zlib@0.1.4": {
            "map": {
                "pako": "npm:pako@0.2.8",
                "readable-stream": "npm:readable-stream@2.0.6"
            }
        },
        "npm:buffer@4.5.1": {
            "map": {
                "base64-js": "npm:base64-js@1.1.2",
                "ieee754": "npm:ieee754@1.1.6",
                "isarray": "npm:isarray@1.0.0"
            }
        },
        "npm:chalk@1.1.1": {
            "map": {
                "ansi-styles": "npm:ansi-styles@2.2.0",
                "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
                "has-ansi": "npm:has-ansi@2.0.0",
                "strip-ansi": "npm:strip-ansi@3.0.1",
                "supports-color": "npm:supports-color@2.0.0"
            }
        },
        "npm:debug@2.2.0": {
            "map": {
                "ms": "npm:ms@0.7.1"
            }
        },
        "npm:encoding@0.1.12": {
            "map": {
                "iconv-lite": "npm:iconv-lite@0.4.13"
            }
        },
        "npm:fbemitter@2.0.2": {
            "map": {
                "fbjs": "npm:fbjs@0.7.2"
            }
        },
        "npm:fbjs@0.1.0-alpha.7": {
            "map": {
                "core-js": "npm:core-js@1.2.6",
                "promise": "npm:promise@7.1.1",
                "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
            }
        },
        "npm:fbjs@0.7.2": {
            "map": {
                "core-js": "npm:core-js@1.2.6",
                "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
                "loose-envify": "npm:loose-envify@1.1.0",
                "promise": "npm:promise@7.1.1",
                "ua-parser-js": "npm:ua-parser-js@0.7.10"
            }
        },
        "npm:flux@2.1.1": {
            "map": {
                "fbemitter": "npm:fbemitter@2.0.2",
                "fbjs": "npm:fbjs@0.1.0-alpha.7",
                "immutable": "npm:immutable@3.7.6"
            }
        },
        "npm:has-ansi@2.0.0": {
            "map": {
                "ansi-regex": "npm:ansi-regex@2.0.0"
            }
        },
        "npm:invariant@2.2.1": {
            "map": {
                "loose-envify": "npm:loose-envify@1.1.0"
            }
        },
        "npm:is-finite@1.0.1": {
            "map": {
                "number-is-nan": "npm:number-is-nan@1.0.0"
            }
        },
        "npm:isomorphic-fetch@2.2.1": {
            "map": {
                "node-fetch": "npm:node-fetch@1.4.1",
                "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
            }
        },
        "npm:loose-envify@1.1.0": {
            "map": {
                "js-tokens": "npm:js-tokens@1.0.2"
            }
        },
        "npm:node-fetch@1.4.1": {
            "map": {
                "encoding": "npm:encoding@0.1.12",
                "is-stream": "npm:is-stream@1.0.1"
            }
        },
        "npm:promise@7.1.1": {
            "map": {
                "asap": "npm:asap@2.0.3"
            }
        },
        "npm:react-bootstrap@0.28.3": {
            "map": {
                "babel-runtime": "npm:babel-runtime@5.8.38",
                "classnames": "npm:classnames@2.2.3",
                "dom-helpers": "npm:dom-helpers@2.4.0",
                "invariant": "npm:invariant@2.2.1",
                "keycode": "npm:keycode@2.1.1",
                "lodash-compat": "npm:lodash-compat@3.10.2",
                "react-overlays": "npm:react-overlays@0.6.0",
                "react-prop-types": "npm:react-prop-types@0.3.0",
                "uncontrollable": "npm:uncontrollable@3.2.1",
                "warning": "npm:warning@2.1.0"
            }
        },
        "npm:react-overlays@0.6.0": {
            "map": {
                "classnames": "npm:classnames@2.2.3",
                "dom-helpers": "npm:dom-helpers@2.4.0",
                "react-prop-types": "npm:react-prop-types@0.2.2",
                "warning": "npm:warning@2.1.0"
            }
        },
        "npm:react-prop-types@0.2.2": {
            "map": {
                "warning": "npm:warning@2.1.0"
            }
        },
        "npm:react-prop-types@0.3.0": {
            "map": {
                "warning": "npm:warning@2.1.0"
            }
        },
        "npm:react@0.14.7": {
            "map": {
                "fbjs": "npm:fbjs@0.6.1"
            }
        },
        "npm:readable-stream@2.0.6": {
            "map": {
                "core-util-is": "npm:core-util-is@1.0.2",
                "inherits": "npm:inherits@2.0.1",
                "isarray": "npm:isarray@1.0.0",
                "process-nextick-args": "npm:process-nextick-args@1.0.6",
                "string_decoder": "npm:string_decoder@0.10.31",
                "util-deprecate": "npm:util-deprecate@1.0.2"
            }
        },
        "npm:repeating@1.1.3": {
            "map": {
                "is-finite": "npm:is-finite@1.0.1"
            }
        },
        "npm:stream-browserify@2.0.1": {
            "map": {
                "inherits": "npm:inherits@2.0.1",
                "readable-stream": "npm:readable-stream@2.0.6"
            }
        },
        "npm:stream-http@2.2.0": {
            "map": {
                "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
                "inherits": "npm:inherits@2.0.1",
                "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
                "xtend": "npm:xtend@4.0.1"
            }
        },
        "npm:strip-ansi@3.0.1": {
            "map": {
                "ansi-regex": "npm:ansi-regex@2.0.0"
            }
        },
        "npm:uncontrollable@3.2.1": {
            "map": {
                "invariant": "npm:invariant@2.2.1"
            }
        },
        "npm:url@0.11.0": {
            "map": {
                "punycode": "npm:punycode@1.3.2",
                "querystring": "npm:querystring@0.2.0"
            }
        },
        "npm:warning@2.1.0": {
            "map": {
                "loose-envify": "npm:loose-envify@1.1.0"
            }
        }
    }
});