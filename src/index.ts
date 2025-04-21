import { Client } from "discord.js";
import { Console } from "@/lib/Console";

export const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

client.on("ready", () => {
  Console.Log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.BOT_TOKEN);
