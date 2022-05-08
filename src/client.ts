import Eris from "eris";
import { commandList } from "./commands";

import { IConfig } from "./config";
import { Database } from "./db";
import { Logger } from "./log";
import { Command } from "./types";

export class Client {
    public internal: Eris.Client;
    public commands: Command[];

    public database: Database;
    public logger: Logger;

    public config: IConfig;

    constructor(config: IConfig) {
        this.config = config;
        this.database = new Database(this.config.db);
        this.logger = new Logger(this.config.log);

        // Load commands
        this.commands = commandList;

        // Setup discord client
        this.internal = Eris(this.config.bot.token, {
            intents: [ "guilds" , "guildMessages" ]
        });

        this.internal.on("messageCreate", async (message: Eris.Message) => {
            if (message.author.bot) return;
            if (!message.content.startsWith(this.config.bot.prefix)) return;

            const calling = message.content.split(" ")[0].replace(this.config.bot.prefix, "");
            const command = this.commands.find(c => c.name === calling);

            if (!command) return;
            const result = command.fn(message);

            if (result instanceof Promise) {
                await result.then(r => {
                    if (typeof r === "string") message.channel.createMessage(r);
                })
            } else if (typeof result === "string") {
                message.channel.createMessage(result);
            }
        });

        this.internal.on("ready", () => {
            this.logger.info("Bot is ready!");
        });

        this.internal.connect();
    }

    public async init() {
        await this.database.init().then(() => {
            this.logger.info("Database initialized.");
        });
    }

    //
    // Message methods
    //

    public send(channel: string, message: string) {
        this.internal.createMessage(channel, message);
    }
}