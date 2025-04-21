import { Client } from "discord.js";
import { Console } from "@/lib/Console";
import { registerCommandHandler } from "./handlers/commandHandler";

export const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

const setup = async () => {
  await registerCommandHandler();
  Console.Log(`(/) Setup complete.`);
};

client.on("ready", async () => {
  await setup();
  Console.Log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.BOT_TOKEN);
