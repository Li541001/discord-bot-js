import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("test")
  .setDescription("測試用");

export const action = async (ctx) => {
  await ctx.deferReply();
  await ctx.followUp("oh no!");
};
