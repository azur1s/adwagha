import Eris from "eris";
import { Client } from "./Client";

export interface Command {
    name:        string,
    description: string,
    usage:       string,
    call:        (client: Client, message: Eris.Message) => void,
}