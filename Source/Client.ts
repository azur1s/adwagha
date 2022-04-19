import Eris, { User } from "eris"

import { Command } from "@types"
import { Database } from "./database"
import { getCommands } from "./commands/commands"
import { handle } from "./message"
import { log } from "./util"

export class Client {
    public internal: Eris.Client
    public database: Database

    public commands: Map<string, Command> = new Map()
    public prefix: string

    constructor(token: string) {
        this.internal = Eris(token, {
            intents: [ "guilds" , "guildMessages" ]
        })

        this.database = new Database()

        // Initialize commands
        this.prefix = process.env.PREFIX || "!"
        this.commands = getCommands()

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