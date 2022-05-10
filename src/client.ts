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
        this.database.init();
        this.logger = new Logger(this.config.log);

        // Load commands
        this.commands = commandList;

        // Setup discord client
        this.internal = Eris(this.config.bot.token, {
            intents: [ "guilds" , "guildMessages" ]
        });

        // Handle messages
        this.internal.on("messageCreate", async (message: Eris.Message) => {
            // Check if message is from bot or not starting with prefix
            if (message.author.bot || !message.content.startsWith(this.config.bot.prefix)) return;

            // Find command
            const command = this.commands
                .find(c => c.name === message.content.split(" ")[0].replace(this.config.bot.prefix, ""));
            if (!command) return;

            const result = command.fn(this, message);
            if (result instanceof Promise) {
                await result.then(r => {
                    if (typeof r === "string") this.send(message.channel.id, r);
                })
            } else if (typeof result === "string") {
                this.send(message.channel.id, result);
            }

            this.logger.info(`${message.author.username}#${message.author.discriminator} ran command ${command.name}`);
        });

        this.internal.on("ready", () => {
            this.logger.info(`Logged in as ${this.internal.user.username}#${this.internal.user.discriminator}`);
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