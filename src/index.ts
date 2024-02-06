import { Client, GatewayIntentBits, Message, Partials } from 'discord.js'
import { config } from './config/config'
import fs from 'fs';
import path from 'path';

interface Command {
  name: string,
  hasOptionalParameter: boolean,
  execute(message: Message, client: Client, args?: string[]): void
}

interface CustomClient extends Client {
  commands?: Map<string, Command>;
}

const client: CustomClient = new Client({ intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel]
})
client.commands = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
const loadCommands = async () => {
  const commands = await Promise.all(commandFiles.map(async file => {
    const { default: command }: { default: Command } = await import(`./commands/${file}`);
    return command;
  }));

  commands.forEach(command => {
    client.commands?.set(command.name, command);
  });
};

client.on('ready', () => { 
  console.log('Bot está online!')
  loadCommands();
})

client.on('messageCreate', (message: Message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  const command = client.commands?.get(commandName);

  console.log(command?.hasOptionalParameter)
  if(command?.hasOptionalParameter) {
    command.execute(message, client, args)
    return;
  }

  if(command) command.execute(message, client);
});

client.login(config.token)