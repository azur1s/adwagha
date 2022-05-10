import Eris from "eris";
import { Client } from "./client";

export interface IUserData {
    id:        number;
    discordID: string;
    xp:        number;
}

export interface Command {
    name:        string;
    description: string;
    usage:       string;
    aliases?:    string[];
    fn:          (client: Client, message: Eris.Message) => Promise<string | void> | string | void;
}