import Eris from "eris"
import { Client } from "source/Client"
import { doesUserExist, newUser } from "../database/Index"
import { send } from "../Message"

export const test = {
    name: "test",
    description: "Test command",
    usage: "test",
    call: async (client: Client, message: Eris.Message): Promise<void> => {
        if (!doesUserExist(client, message.author)) {
            const newUserData = newUser(client, message.author)
            send(client, `Createw new ${newUserData.uuid}`, message.channel.id)
        } else {
            send(client, "Already exist", message.channel.id)
        }
    }
}