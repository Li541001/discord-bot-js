import { SlashCommandBuilder } from "discord.js";
import { botGlobalData } from "../../../store/data.js";

export const command = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("跳過當前歌曲");

export const action = async (ctx) => {
  const queue = botGlobalData.player.nodes.get(ctx.guildId);
  if (!queue || !queue.node.isPlaying())
    return await ctx.reply("❌ | 目前無歌曲正在播放");
  const success = queue.node.skip();
  await ctx.reply(
    success
      ? `✅ | 當前音樂: ${queue.currentTrack.title} 成功跳過 `
      : `❌ | 跳過失敗 ${ctx.member}`
  );
};
