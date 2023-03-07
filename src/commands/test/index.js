import { SlashCommandBuilder } from "discord.js";
import { handleDisplay } from "./english";


export const command = new SlashCommandBuilder()
  .setName("English")
  .setDescription("英文紀錄")
  .addChoices(
    { name: 'display', value: 'display' }
  );
  

export const action = async (ctx) => {
  await ctx.reply(`${ctx.user.tag}你好`);
  const data = handleDisplay()
  await ctx.editReply(data)
};
