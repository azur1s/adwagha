import { Knex, knex } from "knex";
import { IDBConfig } from "./config";
import { IUserData } from "./types";

export class Database {
    private static instance: Knex<any, unknown[]>;

    /**
     * Initializes the database instance.
     * @param config The database configuration.
     */
    constructor(config: IDBConfig) {
        Database.instance = knex({
            client: "sqlite3",
            connection: {
                filename: config.path
            }
        });
    }

    /**
     * Initializes the database by checking tables existance and
     * creating them if they don't.
     */
    async init(): Promise<void> {
        await Database.instance.schema.hasTable("users").then(exists => {
            if (!exists) {
                return Database.instance.schema.createTable("users", table => {
                    table.increments("id").primary()
                    table.string("discordID")
                    table.integer("xp")
                });
            }
        });
    }

    /**
     * Create new user in users table.
     * @param discordID Discord ID of user.
     */
    async newUser(discordID: string): Promise<void> {
        await Database.instance.table("users").insert({
            discordID: discordID,
            xp: 0
        });
    }

    /**
     * Get user from users table.
     * @param discordID Discord ID of user.
     * @returns User data or undefined if user doesn't exist.
     */
    async getUser(discordID: string): Promise<IUserData> {
        return await Database.instance
        .table("users")
        .where("discordID", discordID)
        .first();
    }

    /**
     * Get all users from users table sorted by XP.
     * @param length Amount of users to get.
     * @returns Array of users.
     */
    async getUsers(length: number): Promise<IUserData[]> {
        return await Database.instance
        .table("users")
        .orderBy("xp", "desc")
        .limit(length)
    }

    /**
     * Check if user exists in users table.
     * @param discordID Discord ID of user.
     * @returns Whether user exists or not.
     */
    async doesUserExist(discordID: string): Promise<boolean> {
        return await Database.instance
        .table("users")
        .where("discordID", discordID)
        .first()
        .then(user => {
            return user ? true : false;
        });
    }

    /**
     * Add XP to user.
     * @param discordID Discord ID of user.
     * @param xp Amount of XP to add.
     */
    async addXP(discordID: string, xp: number): Promise<void> {
        await Database.instance
        .table("users")
        .where("discordID", discordID)
        .increment("xp", xp)
        .then(() => { return; })
    }
}