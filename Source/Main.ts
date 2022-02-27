// External modules
import Eris from 'eris'
import Env from 'dotenv'
import fs from 'fs'

// Interal modules
import { Log } from './Util'
import { GenerateResponse, Manager, Train } from './Chat'

// Load environment variables
Env.config()
const Token = process.env.TOKEN || ''
const OpenAI_Token = process.env.OPENAI_API_KEY || ''

Log(0, "Starting up...")

// Use NLP Manager
const NlpManager = Manager

// Create a new Discord client
const Bot: Eris.Client = Eris(Token, {
    intents: [ "guilds"
             , "guildMessages"
             ]
})

/*
    Event handlers
*/

const Send = (message: string, channel: string): void => {
    Bot.createMessage(channel, message)
}

// On ready
Bot.on("ready", () => {
    Log(0, `Logged in as ${Bot.user.username}#${Bot.user.discriminator}`)
})

// On message creation event
Bot.on("messageCreate", async (message: Eris.Message) => {
    // Return early if met one of this conditions
    if ( !message.content.startsWith("$")  // Not start with prefix
       || message.author.id == Bot.user.id // From bot itself
       || message.author.bot               // Is from another bot
       ) return

    Log(0, `${message.author.username}#${message.author.discriminator} ran: ${message.content}`)

    // Split the message into an array of words
    const Words: string[] = message.content.slice(1).split(" ")
    // Check if the message is null (probably will never happen, but here to eliminate null type)
    if (Words === null) return
    
    switch (Words[0].toLowerCase()) {
        case "test":
            Send("hi", message.channel.id)
            break
        case "$":
            Send(await GenerateResponse(Words.slice(1).join(" ")), message.channel.id)
            break
        case "train":
            if (Words.length < 4) {
                Send("Invalid arguments, Usage: `$train [input/output] type message`", message.channel.id)
                break
            }
            let result = Train(Words[1], Words[2], Words.slice(3).join(" "))
            if (result[0] === undefined) {
                Send("Unknown IO, please use `input` or `output`", message.channel.id)
            } else if (result[0] === false) {
                Send("Failed to add the message", message.channel.id)
            } else {
                Send("Added message! restarting due to changes...", message.channel.id)

                // Wait a bit so the message is sent
                await new Promise(resolve => setTimeout(resolve, 1000))

                fs.writeFileSync('./Data/data.json', result[1])
            }
    }
})

// Connect to discord
Bot.connect()