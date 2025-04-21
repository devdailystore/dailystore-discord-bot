import { Console } from "@/lib/Console";
import { deepDirSearch } from "@/utils/deepDirSearch";
import { client } from "@client";

type Command = { config: CommandConfig; execute: CommandExecute };
type CommandsMap = Map<string, Command>;

const setupCommands = async () => {
  const commands: CommandsMap = new Map<string, Command>();

  const commandsFiles = await deepDirSearch(`${__dirname}/../commands`);
  for (const file of commandsFiles) {
    try {
      const { config, execute }: Command = await import(file);

      if (!config) {
        Console.Warn(`(/) Command ${file} is missing config.`);
        continue;
      }

      if (!execute) {
        Console.Warn(`(/) Command ${file} is missing execute function.`);
        continue;
      }

      commands.set(config.name, { config, execute });
    } catch (err: any) {
      Console.Error(
        `(/) Failed to load command module ${file}, ${err.message}`
      );
    }
  }
  return commands;
};

const registerSlashCommands = async (commands: CommandsMap) => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID!);
  if (!guild) return Console.Error(`(/) Guild not found.`);

  Console.Log(`(/) Registering ${commands.size} commands...`);

  for (const [_, command] of commands) {
    if (command.config.isDisabled) {
      Console.Warn(`(/) Command ${command.config.name} is disabled.`);
      continue;
    }

    await guild.commands.create(command.config).catch((err) => {
      Console.Error(
        `(/) Failed to register command ${command.config.name}, ${err.message}`
      );
    });
  }

  Console.Log(`(/) Registered ${guild.commands.cache.size} commands`);
};

export const registerCommandHandler = async () => {
  const commands = await setupCommands();

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand() || !interaction.inCachedGuild()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    if (command.config.isDisabled)
      return Console.Warn(
        `(/) Command ${interaction.commandName} is disabled.`
      );

    return await command.execute(interaction).catch((err) => {
      Console.Error(
        `(/) Command ${interaction.commandName} failed to execute, ${err.message}`
      );
    });
  });

  await registerSlashCommands(commands);
  Console.Log(`(/) Command handler registered.`);
};
