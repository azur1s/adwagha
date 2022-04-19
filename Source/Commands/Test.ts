import Eris from "eris"
import { Client } from "source/client"
import { Database } from "source/database"
import { send } from "../message"

export const test = {
    name: "test",
    description: "Test command",
    usage: "test",
    call: async (client: Client, message: Eris.Message): Promise<void> => {
        if (!client.database.doesUserExist(client, message.author)) {
            const newUserData = client.database.newUser(client, message.author)
            send(client, `Createw new ${newUserData.uuid}`, message.channel.id)
        } else {
            send(client, "Already exist", message.channel.id)
        }
    }
}