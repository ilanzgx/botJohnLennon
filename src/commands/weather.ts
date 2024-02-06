import axios from 'axios';
import { Client, Message } from 'discord.js'

const weatherCommand = {
  name: 'weather',
  description: 'Temperatura de um local',
  hasOptionalParameter: true,
  async execute(message: Message, client: Client, args: string[]) {
    try {
      console.log(args)
      if(!args?.length || args == undefined) {
        return message.channel.send('Por favor, forneça um local.')
      }

      const location = args.join(' ')
      const response = await axios.get(`https://goweather.herokuapp.com/weather/${location}`)

      const text = `**${location}**\n🌡️ ${response.data.temperature}\n📄 ${response.data.description}\n💨 ${response.data.wind}`
      message.channel.send(text)

      console.log(response.data)
    } catch(error) {
      console.error('Erro ao obter temperatura: ', error);
    }
    
  }
}

export default weatherCommand;