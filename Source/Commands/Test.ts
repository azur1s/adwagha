import type { Command } from "../Message"
import { Send } from "../Message"

export const Test: Command = (bot, message) => {
    Send(bot, "Hi", message.channel.id)
}