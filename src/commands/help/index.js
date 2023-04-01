import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("help")
  .setDescription("取得所有指令用法");

export const action = async (ctx) => {
  console.log(ctx);
  await ctx.reply(
    "```help: 指令說明 \nping: 機器人延遲 \ntalk: 說hi \n1a2b: 小遊戲```"
  );
};
