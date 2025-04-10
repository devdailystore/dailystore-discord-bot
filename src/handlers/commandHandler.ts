import fs from "fs";
import path from "path";
import { client } from "@client";

type CommandsMap = Map<string, Command>;

const setupCommands = async () => {
  const commands: CommandsMap = new Map();

  const dir = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(dir)
    .filter((file) => file.match(/\.(js|ts)$/));

  for (const file of commandFiles) {
    const command: Command = await import(path.join(dir, file));
    commands.set(command.config.name, command as Command);
  }

  return commands;
};

const registerSlashCommands = async (commands: CommandsMap) => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID!);
  if (!guild) throw new Error("Guild not found");

  console.log(`(/) Registering ${commands.size} commands...`);

  for (const [_, command] of commands) {
    await guild.commands.create(command.config);
  }

  console.log(`(/) Registered ${guild.commands.cache.size} commands`);
};

export const initCommandHandler = async () => {
  const commands = await setupCommands();

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand() || !interaction.inCachedGuild()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    await command.execute(interaction).catch((error) => {
      console.error(error);
    });
  });

  await registerSlashCommands(commands);
};
