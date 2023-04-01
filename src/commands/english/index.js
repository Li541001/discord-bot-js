import { SlashCommandBuilder } from "discord.js";
import { handleEnglish } from "./english.js";

export const command = new SlashCommandBuilder()
  .setName("english")
  .setDescription("英文紀錄")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("display")
      .setDescription("顯示單字表")
      .addUserOption((option) =>
        option.setName("user").setDescription("選擇你要查看的單字表")
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("manage")
      .setDescription("管理你的單字表")
      .addStringOption((option) =>
        option.setName("add").setDescription("添加你的單字")
      )
      .addStringOption((option) =>
        option.setName("remove").setDescription("移除你的單字")
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("quiz")
      .setDescription("英文測驗")
      .addIntegerOption((option) =>
        option
          .setName("start")
          .setDescription("開始考試 請輸入英文單字測驗數量")
          .setRequired(true)
          .setMinValue(1)
      )
      .addStringOption((option) =>
        option.setName("answer").setDescription("請輸入答案")
      )
      .addStringOption((option) =>
        option.setName("end").setDescription("強制結束")
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("clean")
      .setDescription("整理你的單字表")
      .addStringOption((option) =>
        option
          .setName("type")
          .setDescription(
            "選擇你的整理方式 1.a到z排序 2.字首轉換為大寫 3.字首轉換為小寫"
          )
          .addChoices(
            { name: "a to z", value: "1" },
            { name: "first word lower", value: "2" },
            { name: "first word upper", value: "3" }
          )
      )
  );

export const action = async (ctx) => {
  await ctx.reply(`${ctx.user.tag.toString()}你好`);
  let displayText = "";
  const userId = ctx.user.id;
  let chooseUserId, addWord, removeWord;
  if (ctx.options.getSubcommand() === "display") {
    chooseUserId = ctx.options.getUser("user").id;
    displayText = await handleEnglish(null, null, chooseUserId, true, null);
  } else if (ctx.options.getSubcommand() === "manage") {
    addWord = ctx.options.getString("add");
    removeWord = ctx.options.getString("remove");
    displayText = await handleEnglish(addWord, removeWord, userId, false, null);
  } else if (ctx.options.getSubcommand() === "clean") {
    const tydeUpType = ctx.options.getString("type");
    displayText = await handleEnglish(null, null, userId, false, tydeUpType);
  }
  console.log(displayText);
  await ctx.editReply(displayText);
};
