import { Command } from "@/types";

export const test: Command = {
    name: "test",
    description: "test command",
    usage: "test",
    fn: async (client, message) => {
        return "test";
    }
}