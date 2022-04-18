import Eris from "eris"
import { Client } from "Source/Client"
import { send } from "../Message"

export const Help = {
    name: "help",
    description: "Display help",
    usage: "help",
    call: (client: Client, message: Eris.Message): void => {
        let help = "```"
        for (const [ key, value ] of client.commands) {
            help += `${key} - ${value.description}\n`
        }
        help += "```"

        send(client, help, message.channel.id)
    }
}