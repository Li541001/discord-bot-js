import { SlashCommandBuilder } from "discord.js";
import { botGlobalData } from "../../../store/data.js";

export const command = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("停止播放");

export const action = async (ctx) => {
  const queue = botGlobalData.player.nodes.get(ctx.guildId);
  if (!queue || !queue.node.isPlaying)
    return await ctx.reply("❌ | 目前無歌曲正在播放");
  queue.delete();
  await ctx.reply(" ✅ | 結束播放~~ 下次見!");
};
