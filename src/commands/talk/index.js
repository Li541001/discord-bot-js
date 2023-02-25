import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
    .setName("talk")
    .setDescription("conversation")


export const action = async(ctx)=>{
    await ctx.reply("hi")}
