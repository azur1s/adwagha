import Eris, { User } from "eris"
import fs from "fs"

import { Command, UserData } from "@types"
import { getCommands } from "./commands/Index"
import { handle } from "./Message"
import { log } from "./Util"

export class Client {
    public internal: Eris.Client
    public users: UserData[]

    public commands: Map<string, Command> = new Map()
    public prefix: string

    constructor(token: string) {
        this.internal = Eris(token, {
            intents: [ "guilds" , "guildMessages" ]
        })

        this.users = []
        if (fs.existsSync("./data/users.json")) {
            this.users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"))
        }

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