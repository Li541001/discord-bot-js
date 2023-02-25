import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("print ping to you")

export const action = async(ctx)=>{
    await ctx.reply("pong")
}
