const Colors: Map<string, string> = new Map([
    [ "reset" , "\x1b[0m"  ],
    [ "green" , "\x1b[32m" ],
    [ "yellow", "\x1b[33m" ],
    [ "red"   , "\x1b[31m" ]
])

/**
 * Log helper function with severity prefixes
 * @param level   The severity of the log
 * @param message The message to log
 */
 export const log = (level: number, message: string | string[]): void => {
    switch ( level ) {
        case 2 : console.log(`${Colors.get("red")}[Error]${Colors.get("reset")} ${message}`)
                 break

        case 1 : console.log(`${Colors.get("yellow")}[Warn]${Colors.get("reset")} ${message}`)
                 break

        case 0 : console.log(`${Colors.get("green")}[Info]${Colors.get("reset")} ${message}`)
                 break

        default: console.log(message)
                 break
    }
}