import { Command } from "@/types";

export const my: Command = {
    name: "my",
    description: "Show current exp",
    usage: "my",
    fn: async (client, message) => {
        if (await client.database.doesUserExist(message.author.id)) {
            const user = await client.database.getUser(message.author.id);
            return `You have ${user.xp} xp`;
        } else {
            client.internal.createMessage(message.channel.id, "Creating new user...");
            client.database.newUser(message.author.id);
            const user = await client.database.getUser(message.author.id);
            return `You have ${user.xp} xp`;
        }
    }
}