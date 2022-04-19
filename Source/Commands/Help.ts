import Eris from "eris"
import { Client } from "source/client"
import { getArgs, send } from "../message"

export const help = {
    name: "help",
    description: "Display help information",
    usage: "help [command]",
    call: (client: Client, message: Eris.Message): void => {
        if (getArgs(client, message).length != 0) {
            const command = client.commands.get(getArgs(client, message)[0])
            if (!command) send(client, "Command not found", message.channel.id)
            else send(client, `\`\`\`toml\n[${command.name}]\n${command.description}\nUsage: ${command.usage}\`\`\``, message.channel.id)
            return
        }

        let help = "```\n"
        for (const [ key, value ] of client.commands) {
            help += `${key} - ${value.description}\n`
        }
        help += "```"

        send(client, help, message.channel.id)
    }
}