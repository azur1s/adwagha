import { ILogConfig } from "./config";

export class Logger {
    private config: ILogConfig;

    constructor(config: ILogConfig) {
        this.config = config;
    }

    public time(): string {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    public debug(message: string): void {
        console.log(
            "\x1b[90m"
            + this.time()
            + "\x1b[32m"
            + ` ${this.config.debug ? this.config.debug : "[DEBUG]"}`
            + "\x1b[0m"
            + message
        );
    }

    public info(message: string): void {
        console.log(
            "\x1b[90m"
            + this.time()
            + "\x1b[32m"
            + ` ${this.config.info ? this.config.info : "[INFO]"}`
            + "\x1b[0m"
            + message
        );
    }
}