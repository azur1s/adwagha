import { Command } from "@/types";

export const leaderboard: Command = {
    name: "leaderboard",
    description: "Viwe leaderboard",
    usage: "leaderboard",
    aliases: ["lb"],
    fn: async (client, message) => {
        const users = await client.database.getUsers(10);
        return users
        .map(user => {
            const discordUser = client.internal.users.get(user.discordID);
            return discordUser
            ? `${discordUser.username}#${discordUser.discriminator} - ${user.xp} xp`
            : `${user.discordID} - ${user.xp} xp`;
        })
        .join("\n");
    }
}