import type { CommandInteraction, SlashCommandBuilder } from "discord.js";

declare global {
  type Command<T = SlashCommandBuilder> = {
    config: T;
    execute: (interaction: CommandInteraction<"cached">) => Promise<unknown>;
  };
}
