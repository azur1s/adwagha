/**
 * The Discord bot configuration.
 * 
 * @interface IBotConfig
 * @member {string} token The bot token.
 * @member {string} prefix The prefix used for commands.
 */
export interface IBotConfig {
    token: string,
    prefix: string
}

/**
 * The logger configuration.
 * 
 * @interface ILogConfig
 * @member {string} debug The debug prefix.
 * @member {string} info The info prefix.
 * @member {string} warn The warn prefix.
 * @member {string} error The error prefix.
 */
export interface ILogConfig {
    debug: string,
    info: string,
    warn: string,
    error: string
}

/**
 * The configuration for database
 * 
 * @interface ISQLConfig
 * @member {string} path The path to the database file.
 */
export interface IDBConfig {
    path: string
}

/**
 * The configuration
 * 
 * @interface IConfig
 * @member {IBotConfig} bot The bot configuration.
 * @member {ILogConfig} log The logger configuration.
 * @member {ISQLConfig} db The SQL configuration.
 */
export interface IConfig {
    bot: IBotConfig,
    log: ILogConfig,
    db: IDBConfig
}

export const defaultConfig: string = `
[bot]
token = ""
prefix = "!"

[log]
debug = "[DEBUG] "
info = "[INFO] "
warn = "[WARN] "
error = "[ERROR] "

[db]
path = "./data.sqlite3"
`