import {
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
  AttachmentBuilder,
} from "discord.js";
import { botGlobalData } from "../../../store/data.js";

export const command = new SlashCommandBuilder()
  .setName("queue")
  .setDescription("顯示歌曲列表");

export const action = async (ctx) => {
  const queue = botGlobalData.player.nodes.get(ctx.guildId);
  if (!queue) return await ctx.reply(`❌ | 無歌曲列表`);
  if (queue.tracks.data == []) return await ctx.reply(`❌ | 這是最後一首`);

  const songs = queue.tracks.size;
  const nextSongs =
    songs > 5
      ? `和其他 **${songs - 5}** 首歌...`
      : `目前有 **${songs}** 首歌...`;
  const tracks = queue.tracks.data.map(
    (track, i) =>
      `**${i + 1}**    >>    ${track.title} | ${track.author} (requested by : ${
        track.requestedBy.username
      })`
  );
  const photo = new AttachmentBuilder(
    "src/commands/ytPlayer/displayQueue/photo.jpg"
  );
  const embed = new EmbedBuilder()
    .setColor("#60ECB4")
    .setThumbnail("attachment://photo.jpg")
    .setAuthor({
      name: `歌曲列表 - ${ctx.guild.name}`,
      iconURL: botGlobalData.bot.user.displayAvatarURL({
        size: 1024,
        dynamic: true,
      }),
    })
    .setDescription(
      `當前播放: ${queue.currentTrack.title}\n\n${tracks
        .slice(0, 5)
        .join("\n")}\n\n${nextSongs}`
    )
    .setTimestamp()
    .setFooter({
      text: "Made by Li",
      iconURL: ctx.member.avatarURL({ dynamic: true }),
    });
  ctx.reply({ embeds: [embed], files: [photo] });
};
