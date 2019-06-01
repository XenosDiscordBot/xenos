const commando = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

class NowPlayingCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'np',
            group: 'music',
            memberName: 'np',
            description: 'View the currently playing song.',
        });
    }

    async run(message, args){
        var server = servers[message.guild.id];

        if(message.guild.voiceChannel){
            return message.channel.send('I am not playing any music.');
        }
        else{
            const songInfo = await ytdl.getInfo(server.queue[0]);
            var current = "\n**Now Playing:**\n" + songInfo.title + "\n" + server.queue[0];
            return message.channel.send(current);
        }
    }
}

module.exports = NowPlayingCommand;
