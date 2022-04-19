import Eris from "eris"
import fs from "fs"

import { UserData } from "@types"
import { Client } from "source/client"

export class Database {
    public users: UserData[]

    constructor() {
        // Setup users
        this.users = []
        if (fs.existsSync("./data/users.json")) {
            this.users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"))
        }
    }

    /**
     * Save database's users to file
     */
    save() {
        fs.writeFileSync("./data/users.json", JSON.stringify(this.users))
    }

    /**
     * Check if the user exist in the client's database
     * @param client The client to check
     * @param user The user in Eris format
     * @returns true if exist, false if not
     */
    public doesUserExist(client: Client, user: Eris.User): boolean {
        return this.users.some(u => u.uuid === user.id)
    }

    /**
     * Create a new user in the database
     * @param client The client
     * @param user The user in Eris format
     * @returns The new user created
     */
    public newUser = (client: Client, user: Eris.User): UserData => {
        const newData: UserData = {
            uuid: user.id,
            count: 0,
        }
        this.users.push(newData)
        this.save()
        return newData
    }

    /**
     * Update user data in database
     * @param client The client
     * @param user The user in Eris format
     * @param updated The new user data
     * @returns true if the user was updated, false if the user was not found
     */
    public updateUser = (client: Client, user: Eris.User, updated: UserData): boolean => {
        // Check if user exists
        const index = this.users.findIndex(u => u.uuid === user.id)
        if (index !== -1) {
            this.users[index] = updated
            this.save()
        // If there is no user with that id
        } else {
            return false
        }

        return true
    }
}