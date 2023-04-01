import { SlashCommandBuilder } from "discord.js";
import { openAiMessage } from "./openAi.js";

export const command = new SlashCommandBuilder()
  .setName("openai")
  .setDescription("openai");

export const action = async (ctx) => {
  await ctx.reply("你沒用啦");

  // const content = ctx.options.getString()
  // const response = await openAiMessage(content)
  // await ctx.reply(response);
};
