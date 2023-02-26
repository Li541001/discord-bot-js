import { SlashCommandBuilder } from "discord.js";
import {botGlobalData} from '../../store/data.js'

export const command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("傳送機器人當前網路延遲")

export const action = async(ctx)=>{
    await ctx.reply(`ping: ${botGlobalData.bot.ws.ping}ms`)
}
