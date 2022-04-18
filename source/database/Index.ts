import Eris from "eris"
import fs from "fs"

import { UserData } from "@types"
import { Client } from "source/Client"

export const doesUserExist = (client: Client, user: Eris.User): boolean => {
    const users: UserData[] = JSON.parse(fs.readFileSync("./data/users.json", "utf8"))
    return users.some(u => u.uuid === user.id)
}

export const newUser = (client: Client, user: Eris.User): UserData => {
    const newData: UserData = {
        uuid: user.id,
        count: 0,
    }
    fs.writeFileSync("./data/users.json", JSON.stringify(client.users.concat(newData)), "utf8")
    return newData
}