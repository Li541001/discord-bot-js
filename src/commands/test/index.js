import { SlashCommandBuilder } from "discord.js";
import { test } from "./test.js";


export const command = new SlashCommandBuilder()
  .setName("test")
  .setDescription("測試用")




export const action = async(ctx)=>{
  await ctx.reply("閉嘴")
}