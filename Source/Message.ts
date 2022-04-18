import Eris from "eris"
import { Client } from "./Client"

import { Command } from "./Commands/Index"
import { log } from "./Util"

/**
 * Send a message to a channel
 * @param client Eris client
 * @param message The message string
 * @param channel The channel to send the message to
 */
export const send = (client: Client, message: string, channel: string): void => {
    client.internal.createMessage(channel, message)
}

/**
 * Handle a message event
 * @param client Eris client
 * @param message The Eris message object
 */
export const handle = (client: Client, message: Eris.Message): void => {
    if (message.author.bot) return

    // Get the command prefix
    const prefix = process.env.PREFIX || "!"

    // Check if the message starts with the prefix
    if (message.content.startsWith(prefix)) {
        // Get the command name
        const calling = message.content.slice(prefix.length).split(" ")[0]

        // Get the command
        const command: Command | undefined = client.commands.get(calling)

        // Check if the command exists
        if (command) {
            command.call(client, message)
            log(0, `${message.author.username}#${message.author.discriminator} ran the command ${calling}`)
        }
    }
}