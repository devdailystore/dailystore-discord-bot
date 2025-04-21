import type { CommandBuilder } from "@/lib/CommandBuilder";
import type { CommandInteraction } from "discord.js";

declare global {
  type Interaction = CommandInteraction<"cached">;
  type CommandConfig = CommandBuilder;
  type CommandExecute = (interaction: Interaction) => Promise<unknown>;
}
