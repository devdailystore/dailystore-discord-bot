import { Client } from "discord.js";
import { initCommandHandler } from "@/handlers/commandHandler";

export const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

const setup = async () => {
  await initCommandHandler();
  console.log("(/) Setup complete");
};

client.on("ready", async () => {
  await setup();
  console.log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.BOT_TOKEN!);
