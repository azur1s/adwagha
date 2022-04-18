import Eris from "eris"
import fs from "fs"

import { UserData } from "@types"
import { Client } from "source/Client"

export class Database {
    public users: UserData[]

    constructor() {
        // Setup users
        this.users = []
        if (fs.existsSync("./data/users.json")) {
            this.users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"))
        }
    }

    public doesUserExist(client: Client, user: Eris.User): boolean {
        const users: UserData[] = JSON.parse(fs.readFileSync("./data/users.json", "utf8"))
        return users.some(u => u.uuid === user.id)
    }

    public newUser = (client: Client, user: Eris.User): UserData => {
        const newData: UserData = {
            uuid: user.id,
            count: 0,
        }
        fs.writeFileSync("./data/users.json", JSON.stringify(client.database.users.concat(newData)), "utf8")
        return newData
    }

    public updateUser = (client: Client, user: Eris.User, updated: UserData): void => {

    }
}