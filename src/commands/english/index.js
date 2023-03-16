import { SlashCommandBuilder } from "discord.js";
import { handleEnglish } from "./english.js";


export const command = new SlashCommandBuilder()
  .setName("english")
  .setDescription("英文紀錄")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("display")
      .setDescription("顯示單字表")
      .addUserOption(option => option.setName('user').setDescription('選擇你要查看的單字表'))
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("manage")
      .setDescription("管理你的單字表")
      .addStringOption((option) =>
        option
          .setName("add")
          .setDescription("添加你的單字")
      )
      .addStringOption((option=>
        option
          .setName("remove")
          .setDescription("移除你的單字")
      ))
  )

export const action = async (ctx) => {
  await ctx.reply(`@${ctx.user.tag.toString()}你好`);
  let displayText = ""
  const userId = ctx.user.id
  let chooseUserId,addWord,removeWord
  if(ctx.options.getSubcommand()==='display'){
    chooseUserId = ctx.options.getUser("user").id
    displayText = await handleEnglish(null,null,chooseUserId,true)
  }else if(ctx.options.getSubcommand()==='manage'){
    addWord = ctx.options.getString("add")
    removeWord = ctx.options.getString("remove")
    displayText = await handleEnglish(addWord,removeWord,userId,false)
  }
  console.log(displayText)
  await ctx.editReply(displayText)
};
