import type { CommandBuilder } from "@/lib/CommandBuilder";
import type { CommandInteraction } from "discord.js";

declare global {
  // Commands
  type Interaction = CommandInteraction<"cached">;
  type CommandConfig = CommandBuilder;
  type CommandExecute = (interaction: Interaction) => Promise<unknown>;

  // Features
}
