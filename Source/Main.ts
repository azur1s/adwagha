// External modules
import Eris from "eris"
import Env from "dotenv"
import fs from "fs"

// Interal modules
import { log } from "./Util"
import { Handle } from "./Message"

// Load environment variables
Env.config()
const token = process.env.TOKEN || ""

log(0, "Starting up...")

// Create a new Discord client
const bot: Eris.Client = Eris(token, {
    intents: [ "guilds"
             , "guildMessages"
             ]
})

// On ready
bot.on("ready", () => {
    log(0, `Logged in as ${bot.user.username}#${bot.user.discriminator}`)
})

// On message creation event
bot.on("messageCreate", async (message: Eris.Message) => {
    Handle(bot, message)
})

// Connect to discord
bot.connect()