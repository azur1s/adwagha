// External modules
import Env from "dotenv"

// Interal modules
import { log } from "./util"
import { Client } from "./client"

// Load environment variables
Env.config()
const token = process.env.TOKEN || ""

log(0, "Starting up...")

const client = new Client(token);