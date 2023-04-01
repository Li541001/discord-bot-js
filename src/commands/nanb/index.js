import { SlashCommandBuilder } from "discord.js";
import { playNanb, response } from "./nanb.js";

export const command = new SlashCommandBuilder()
  .setName("1a2b")
  .setDescription("小遊戲 1a2b")

  .addStringOption((option) =>
    option
      .setName("number")
      .setDescription("請輸入答案(限定四位數數字不重複)")
      .setMaxLength(4)
      .setMinLength(4)
  )
  .addStringOption((option) =>
    option
      .setName("status")
      .setDescription("設定或查看遊戲狀態")
      .addChoices(
        { name: "start", value: "start" },
        { name: "restart", value: "restart" },
        { name: "status", value: "status" }
      )
  )
  .addStringOption((option) =>
    option
      .setName("guess")
      .setDescription("請輸入你的答案")
      .setMaxLength(4)
      .setMinLength(4)
  );

export const action = async (ctx) => {
  await ctx.reply("指令運行中......");
  const user = ctx.user.username;
  const number = ctx.options.getString("number");
  const guessnum = ctx.options.getString("guess");
  const startbool = ctx.options.getString("status");
  const playResult = await playNanb(startbool, number, guessnum, user);
  const text = response(playResult, startbool, number);
  await ctx.editReply(text);
};
