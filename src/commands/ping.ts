import { Client, Message } from 'discord.js'

const pingCommand = {
  name: 'ping',
  description: 'Retorna o tempo de resposta',
  hasOptionalParameter: false,
  execute(message: Message, client: Client){
    message.channel.send('Pong!').then(sent => {
      const ping = sent.createdTimestamp - message.createdTimestamp;
      sent.edit(`Pong! A latencia é de ${ping}ms`)
    })
  }
}

export default pingCommand;