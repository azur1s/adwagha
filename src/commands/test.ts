import { Command } from "src/types";

export const test: Command = {
    name: "test",
    description: "test command",
    usage: "test",
    fn: async (message) => {
        return "test";
    }
}