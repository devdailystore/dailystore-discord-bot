import { SlashCommandBuilder } from "discord.js";

export const config: Command["config"] = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export const execute: Command["execute"] = async (interaction) => {
  return await interaction.reply("Pong!");
};
