import { Knex, knex } from "knex";
import { IDBConfig } from "./config";

interface User {
    id: number;
    discordID: string;
    xp: number;
}

export class Database {
    private static instance: Knex<any, unknown[]>;

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
     * @param discordId Discord ID of user.
     */
    async newUser(discordId: string): Promise<void> {
        await Database.instance.table("users").insert({
            discordID: discordId,
            xp: 0
        }).then(() => {
            return;
        });
    }

    /**
     * Get user from users table.
     * @param discordId Discord ID of user.
     */
    async getUser(discordId: string): Promise<User> {
        return await Database.instance
        .table("users")
        .where("discordID", discordId)
        .first();
    }

    /**
     * Add XP to user.
     * @param discordId Discord ID of user.
     * @param xp Amount of XP to add.
     */
    async addXP(discordId: string, xp: number): Promise<void> {
        await Database.instance
        .table("users")
        .where("discordID", discordId)
        .increment("xp", xp)
        .then(() => {
            return;
        })
    }
}