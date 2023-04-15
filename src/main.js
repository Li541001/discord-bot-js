import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { botGlobalData } from "./store/data.js";
import { loadCommands, loadEvents } from "./core/loader.js";
import { Player } from "discord-player";
//import '../src/core/keep_alive.js'

dotenv.config();

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

const player = new Player(bot);
botGlobalData.player = player;

botGlobalData.bot = bot;
loadEvents();
loadCommands();

bot.login(process.env.TOKEN);
