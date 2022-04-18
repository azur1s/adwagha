import Eris from "eris"
import { getCommands } from "./Commands/Index"
import { log } from "./Util"

/**
 * Send a message to a channel
 * @param bot Eris client
 * @param message The message string
 * @param channel The channel to send the message to
 */
export const Send = (bot: Eris.Client, message: string, channel: string): void => {
    bot.createMessage(channel, message)
}

/**
 * Handle a message event
 * @param bot Eris client
 * @param message The Eris message object
 */
export const Handle = (bot: Eris.Client, message: Eris.Message): void => {
    if (message.author.bot) return

    // Get the command prefix
    const prefix = process.env.PREFIX || "!"

    // Check if the message starts with the prefix
    if (message.content.startsWith(prefix)) {
        // Get the command name
        const calling = message.content.slice(prefix.length).split(" ")[0]

        // Get the command
        const commandObject: Command | undefined = getCommands().get(calling)

        // Check if the command exists
        if (commandObject) {
            commandObject(bot, message)
            log(0, `${message.author.username}#${message.author.discriminator} ran the command ${calling}`)
        }
    }
}

export type Command = (bot: Eris.Client, message: Eris.Message) => void