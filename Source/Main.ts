// External modules
import Eris from "eris"
import Env from "dotenv"
import fs from "fs"

// Interal modules
import { log } from "./Util"
import { Client } from "./Client"

// Load environment variables
Env.config()
const token = process.env.TOKEN || ""

log(0, "Starting up...")

const client = new Client(token);