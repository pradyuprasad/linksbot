"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._createClient = exports.createClient = void 0;
const api_js_1 = require("./api.js");
const config_js_1 = require("./config.js");
const util_js_1 = require("./util.js");
const ws_js_1 = require("./ws.js");
const http_js_1 = require("./http.js");
__exportStar(require("./api.js"), exports);
function createClient(config) {
    return _createClient((0, config_js_1.expandConfig)(config, true));
}
exports.createClient = createClient;
/** @private */
function _createClient(config) {
    if (config.scheme === "ws" || config.scheme === "wss") {
        return (0, ws_js_1._createClient)(config);
    }
    else if (config.scheme === "http" || config.scheme === "https") {
        return (0, http_js_1._createClient)(config);
    }
    else {
        throw new api_js_1.LibsqlError('The client that uses Web standard APIs supports only "libsql:", "wss:", "ws:", "https:" and "http:" URLs, ' +
            `got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${util_js_1.supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
    }
}
exports._createClient = _createClient;
