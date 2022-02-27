// External modules
import Eris from 'eris'
import Env from 'dotenv'
import fs from 'fs'

// Interal modules
import { Log } from './Util'
import { Talk, Train } from './Tensor'

// Load environment variables
Env.config()
const Token = process.env.TOKEN || ''
const OpenAI_Token = process.env.OPENAI_API_KEY || ''

Log(0, "Starting up...")

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
            message.channel.sendTyping()
            let Result = await Talk(Words.slice(1).join(" "))
            Send(`${Result}`, message.channel.id)
            break
        case "train":
            let SpecIter = Words.length > 1 ? parseInt(Words[1]) : undefined
            Train(SpecIter)
            break
    }
})

// Connect to discord
Bot.connect()