import { SlashCommandBuilder } from "discord.js";
import { playNanb, response } from "./nanb.js";


export const command = new SlashCommandBuilder()
    .setName("1a2b")
    .setDescription("小遊戲 1a2b")

    .addIntegerOption(option =>
        option.setName('number')
            .setDescription("請輸入答案(限定四位數數字不重複)")
            .setMaxValue(9999)
    )
    .addStringOption(option =>
        option
            .setName('start')
            .setDescription('選擇是否開始遊戲')
            .addChoices(
                { name: 'start', value: "start" },
                { name: 'restart', value: "restart" },
            )
    )
    .addIntegerOption(option =>
        option.setName('guess')
            .setDescription("請輸入你的答案")
            .setMaxValue(9999)
    )

export const action = async (ctx) => {
    await ctx.reply("指令運行中......")
    const user = ctx.user.username
    const number = ctx.options.getInteger('number')
    const guessnum = ctx.options.getInteger('guess')
    const startbool = ctx.options.getString('start')
    const playResult = await playNanb(startbool, number, guessnum, user)
    const text = response(playResult, startbool, number)
    await ctx.editReply(text)


}
