import toml from "toml";
import fs from "fs";

import { IConfig, defaultConfig } from "./config";
import { Client } from "./client";

let configData: string;
try { configData = fs.readFileSync("./botconfig.toml", "utf8"); }
catch (error) { configData = toml.parse(defaultConfig); }
let config: IConfig = toml.parse(configData);

let client = new Client(config);