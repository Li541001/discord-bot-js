import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
    .setName("test")
    .setDescription("開發者模式")


export const action = async (ctx) => {
    if (ctx.user.tag != "Li#9103") {
        await ctx.reply(`${ctx.user.tag}您沒有權限`)
        return
    }
    await ctx.reply(`${ctx.user.tag}你好`)
}