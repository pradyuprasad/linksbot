import type { Config, Client } from "./api.js";
import type { ExpandedConfig } from "./config.js";
export * from "./api.js";
export declare function createClient(config: Config): Client;
/** @private */
export declare function _createClient(config: ExpandedConfig): Client;
