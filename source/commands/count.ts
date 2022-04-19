import Eris from "eris"
import { Client } from "source/client"
import { send } from "../message"

export const count = {
    name: "count",
    description: "Count command",
    usage: "count",
    call: async (client: Client, message: Eris.Message): Promise<void> => {
        if (!client.database.doesUserExist(message.author)) {
            const newUserData = client.database.newUserWith(message.author, {
                uuid: message.author.id,
                count: 0,
            })
            send(client, `Your count is ${newUserData.count}`, message.channel.id)
        } else {
            const userData = client.database.getUser(message.author)
            // Should never happen
            if (!userData) send(client, "Undefined user", message.channel.id)
            else {
                const newUserData = {
                    ...userData,
                    count: userData.count + 1,
                }
                client.database.updateUser(message.author, newUserData)
                send(client, `Your count is ${userData.count}`, message.channel.id)
            }
        }
    }
}