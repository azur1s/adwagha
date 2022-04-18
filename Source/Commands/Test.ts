import Eris from "eris"
import { Client } from "Source/Client"
import { send } from "../Message"

export const Test = {
    name: "test",
    description: "Test command",
    usage: "test",
    call: (client: Client, message: Eris.Message): void => {
        send(client, "hi", message.channel.id)
    }
}