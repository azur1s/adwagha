// External modules
import Env from "dotenv"

// Interal modules
import { log } from "./util"
import { Client } from "./client"

// Load environment variables
Env.config()
const token = process.env.TOKEN || ""

log(0, "Starting up...")

const client = new Client(token)

// Run on crash
process.on("SIGINT", () => {
    log(0, "Shutting down...")
    client.cleanup()
    process.exit()
})
// Run on quit
process.on("uncaughtException", (err) => {
    log(2, "Uncaught exception: " + err)
    client.cleanup()
    process.exit()
})