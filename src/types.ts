import Eris from "eris";

export interface IUserData {
    id:        number;
    discordID: string;
    xp:        number;
}

export interface Command {
    name:        string;
    description: string;
    usage:       string;
    fn:          (message: Eris.Message) => Promise<string | void> | string | void;
}