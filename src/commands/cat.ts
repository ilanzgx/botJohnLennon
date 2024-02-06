import { Client, Message } from 'discord.js'
import axios from 'axios';

const catCommand = {
  name: 'cat',
  description: 'Imagens aleatórias de gatos',
  hasOptionalParameter: false,
  async execute(message: Message, client: Client) {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      
      const imageUrl = response.data[0].url

      await message.channel.send({
        files: [imageUrl]
      })
    } catch(error) {
      console.error('Erro ao enviar imagem: ', error);
    }
  }
}

export default catCommand;