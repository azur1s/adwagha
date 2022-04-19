import { Command } from "@types"

import { test } from "./test"
import { help } from "./help"
import { count } from "./count"

export const getCommands = (): Map<string, Command> => {
    return new Map([
        [ "help", help ],
        [ "test", test ],
        [ "count", count ],
    ])
}