import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { botGlobalData } from "./store/data.js";
import { loadCommands, loadEvents } from "./core/loader.js";
//import '../src/core/keep_alive.js'

dotenv.config();

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
botGlobalData.bot = bot;
loadEvents();
loadCommands();

bot.login(process.env.TOKEN);
