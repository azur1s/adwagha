import { Command } from "source/Types"

import { test } from "./Test"
import { help } from "./Help"

export const getCommands = (): Map<string, Command> => {
    return new Map([
        [ "help", help ],
        [ "test", test ],
    ])
}