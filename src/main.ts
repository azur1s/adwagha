import toml from "toml";
import fs from "fs";
import { Knex, knex } from "knex";

import { IConfig, defaultConfig } from "./config";
import { Logger } from "./log";
import { Database } from "./db";

let configData: string;
try { configData = fs.readFileSync("./botconfig.toml", "utf8"); }
catch (error) { configData = toml.parse(defaultConfig); }
let config: IConfig = toml.parse(configData);

let db = new Database(config.db);
let logger = new Logger(config.log);

(async () => {
    await db.init().then(() => {
        logger.info("Database initialized");
    });

    await db.newUser("testID").then(() => {
        logger.info("User created");
    });

    await db.getUser("testID").then((user: any) => {
        logger.info(JSON.stringify(user));
    });

    await db.addXP("testID", 10).then(() => {
        logger.info("XP added");
    });

    await db.getUser("testID").then((user: any) => {
        logger.info(JSON.stringify(user));
    });

    process.exit(0);
})();