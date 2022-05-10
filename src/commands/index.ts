import { Command } from "src/types";

import { test } from "./test";
import { addxp } from "./addxp";
import { my } from "./my";
import { leaderboard } from "./leaderboard";

export const commandList: Command[] = [
    test,
    addxp,
    my,
    leaderboard
]