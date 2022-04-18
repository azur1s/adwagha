import { Command } from "@types"

import { Test } from "./Test"
import { Help } from "./Help"

export const getCommands = (): Map<string, Command> => {
    return new Map([
        [ "help", Help ],
        [ "test", Test ],
    ])
}