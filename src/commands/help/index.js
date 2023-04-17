import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { botGlobalData } from "../../store/data.js";
import fg from "fast-glob";
import displayName from "eslint-plugin-react/lib/rules/display-name.js";

export const command = new SlashCommandBuilder()
  .setName("help")
  .setDescription("取得所有指令用法");

export const action = async (ctx) => {
  // console.log(ctx);
  // await ctx.reply(
  //   "```help: 指令說明 \nping: 機器人延遲 \ntalk: 說hi \n1a2b: 小遊戲```"
  // );
  const commands = botGlobalData.actions;
  const files = await fg("./src/commands/**/index.js");
  console.log(files);
  let commandDescription = [];
  let commandName = [];

  for (const file of files) {
    const fileName = file.substring(2, 50);
    const cmd = await import(`../../../${fileName}`);
    console.log(cmd);
    commandDescription.push(cmd.command.description);
    commandName.push(cmd.command.name);
  }
  let displayText = "";
  commandName.map((item, index) => {
    const text = "`";
    displayText += `${text}${item}${text}: ${commandDescription[index]}\n`;
  });

  const embed = new EmbedBuilder()
    .setColor("#60ECB4")
    .setAuthor({
      name: botGlobalData.bot.user.username,
      iconURL: botGlobalData.bot.user.displayAvatarURL({
        size: 1024,
        dynamic: true,
      }),
    })
    .setDescription(
      "Github: https://github.com/Li541001/discord-bot-js\n\n" + displayText
    )
    .addFields([
      {
        name: `指令 - ${commands.size}`,
        value: commandName.map((item) => `\`${item}\``).join(" | "),
      },
    ])
    .setTimestamp()
    .setFooter({
      text: "Made by Li",
      iconURL: ctx.member.avatarURL({ dynamic: true }),
    });

  ctx.reply({ embeds: [embed] });
};
