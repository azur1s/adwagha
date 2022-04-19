import { Command } from "@types"

import { test } from "./test"
import { help } from "./help"

export const getCommands = (): Map<string, Command> => {
    return new Map([
        [ "help", help ],
        [ "test", test ],
    ])
}