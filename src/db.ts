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
     */
    async getUser(discordID: string): Promise<IUserData> {
        return await Database.instance
        .table("users")
        .where("discordID", discordID)
        .first();
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