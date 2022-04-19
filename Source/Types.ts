import Eris from "eris"
import { Client } from "source/client"

export interface Command {
    name:        string,
    description: string,
    usage:       string,
    call:        (client: Client, message: Eris.Message) => void,
}

export interface UserData {
    uuid:  string,
    count: number,
}