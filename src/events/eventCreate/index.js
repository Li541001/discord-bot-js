import { Events } from "discord.js";
import { botGlobalData } from "../../store/data.js";

//將得到的指令名稱對應到函數上

export const event = {
  name: Events.InteractionCreate, //定義event name
};

export const action = async (interaction) => {
  //定義event action
  if (!interaction.isChatInputCommand()) return; //如果不是斜線指令就跳過
  const action = botGlobalData.actions.get(interaction.commandName); //將得到的指令從botGlobalData取出
  await action(interaction); //執行
};
