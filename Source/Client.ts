import Eris from "eris";

import { Command } from "@types"
import { getCommands } from "./Commands/Index";
import { handle } from "./Message";
import { log } from "./Util";

export class Client {
    public internal: Eris.Client;
    public commands: Map<string, Command> = new Map();
    public prefix: string = "!";

    constructor(token: string) {
        this.internal = Eris(token, {
            intents: [ "guilds" , "guildMessages" ]
        })

        // Initialize commands
        this.prefix = process.env.PREFIX || "!"
        this.commands = getCommands();

        // On message creation event
        this.internal.on("messageCreate", async (message: Eris.Message) => {
            handle(this, message)
        })

        // On ready
        this.internal.on("ready", () => {
            log(0, `Logged in as ${this.internal.user.username}#${this.internal.user.discriminator}`)
        })

        // Connect to discord
        this.internal.connect()
    }
}