import { SlashCommandBuilder } from "discord.js";
import { handleDisplay } from "./english.js";


export const command = new SlashCommandBuilder()
  .setName("english")
  .setDescription("英文紀錄")
  .addStringOption((option)=>
    option
      .setName("add")
      .setDescription("添加你的單字表")
  )
  .addUserOption((option)=>
    option
      .setName("user")
      .setDescription("顯示你的單字表")
  )
  
export const action = async (ctx) => {
  await ctx.reply(`${ctx.user.tag}你好`);
  const id = ctx.user.id
  const word = ctx.options.getString("add")
  const userID = ctx.options.getUser("user")
  
  let data = ""
  console.log(word)
  
  console.log(id)
  if(userID != null){
    const displayUserID = userID.id
    console.log(displayUserID)
    data = await handleDisplay(displayUserID,word)
  }else{
    data = await handleDisplay(id,word)
  }
  await ctx.editReply(data)
};
