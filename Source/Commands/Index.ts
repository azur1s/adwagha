import Eris from "eris"

import { Test } from "./Test"
import { Help } from "./Help"
import { Client } from "Source/Client"

export interface Command {
    name:        string,
    description: string,
    usage:       string,
    call:        (client: Client, message: Eris.Message) => void
}

export const getCommands = (): Map<string, Command> => {
    return new Map([
        [ "test", Test ],
        [ "help", Help ]
    ])
}