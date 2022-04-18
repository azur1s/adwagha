import { Command } from "../Message"

import { Test } from "./Test"

export const getCommands = (): Map<string, Command> => {
    return new Map([
        [ "test", Test ],
        [ "cum", Cum ]
    ])
}