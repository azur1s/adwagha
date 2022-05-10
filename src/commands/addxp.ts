import { Command } from "@/types";

export const addxp: Command = {
    name: "addxp",
    description: "Add exp",
    usage: "addxp",
    fn: async (client, message) => {
        if (await client.database.doesUserExist(message.author.id)) {
            client.database.addXP(message.author.id, 10);
            const user = await client.database.getUser(message.author.id);
            return `Added 10 xp, you now have ${user.xp} xp`;
        } else {
            client.internal.createMessage(message.channel.id, "Creating new user...");
            client.database.newUser(message.author.id);
            client.database.addXP(message.author.id, 10);
            const user = await client.database.getUser(message.author.id);
            return `Added 10 xp, you now have ${user.xp} xp`;
        }
    }
}