import { Client,Events,GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv'

dotenv.config()

const bot = new Client({intents:[GatewayIntentBits.Guilds]})

bot.once(Events.ClientReady,c =>{
    console.log("----------------------bot online------------------------")
})

bot.login(process.env.TOKEN);