import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
    .setName("talk")
    .setDescription("conversation")
    .addStringOption(option =>
		option.setName('text')
			.setDescription('input your content')
			.setMaxLength(2000)
            .setRequired(true)
            )
            

export const action = async(ctx)=>{
    const contents = ctx.options.getString('text')
    await ctx.reply(contents)
}
