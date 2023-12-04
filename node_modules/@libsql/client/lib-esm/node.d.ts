import type { Config, Client } from "./api.js";
export * from "./api.js";
/** Creates a {@link Client} object.
 *
 * You must pass at least an `url` in the {@link Config} object.
 */
export declare function createClient(config: Config): Client;
