import { SlashCommandBuilder } from "discord.js";
import { botGlobalData } from "../../../store/data.js";
import { QueryType } from "discord-player";

export const command = new SlashCommandBuilder()
  .setName("play")
  .setDescription("播放歌曲")
  .addStringOption((option) =>
    option.setName("query").setDescription("請輸入你要播放的歌")
  );

export const action = async (ctx) => {
  await ctx.deferReply();

  const query = ctx.options.getString("query");
  const searchResult = await botGlobalData.player.search(query, {
    requestedBy: ctx.member,
    searchEngine: QueryType.AUTO,
  });
  // 尋找歌曲
  if (!searchResult || !searchResult.tracks.length)
    return await ctx.followUp({ content: "❌ | 沒有找到您的歌曲" });

  const queue = await botGlobalData.player.nodes.create(ctx.guild, {
    metadata: {
      channel: ctx.channel,
    },
  });
  // 加入歌曲

  try {
    if (!queue.connection) await queue.connect(ctx.member.voice.channel);
    // 加入頻道
  } catch {
    await botGlobalData.player.nodes.delete(ctx.guildId);
    return await ctx.followUp({
      content: "❌ | 無法加入語音頻道!",
    });
  }

  // await ctx.followUp({ content: `⏱ | Loading your ${searchResult.playlist ? "playlist" : "track"}    >>>    ${query}` });
  await ctx.followUp({ content: `✅ | 成功添加音樂    >>>    ${query}` });

  // searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
  queue.addTrack(searchResult.tracks[0]);
  // 加入當前隊列

  if (!queue.node.isPlaying()) await queue.node.play();
  // 開始播放
};
