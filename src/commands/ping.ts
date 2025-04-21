import { CommandBuilder } from "@/lib/CommandBuilder";

export const config: CommandConfig = new CommandBuilder()
  .setName("ping")
  .setDescription("Ping the bot");

export const execute: CommandExecute = async (interaction) => {
  return await interaction.reply({
    content: "Pong!",
  });
};
