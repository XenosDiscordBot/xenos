const commando = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

class StopCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'Stops the current song in the queue.',
            userPermissions: ['CONNECT'],
        });
    }

    async run(message, args){
        var server = servers[message.guild.id];

        if(!message.member.voiceChannel){
            return message.channel.send('Connect to a voice channel to stop playing music.');
        }
        else if(message.guild.voiceChannel){
            return message.channel.send('I am not playing any music.');
        }
        else{
            server.queue.shift();

            message.guild.voiceConnection.disconnect();
        }
    }
}

module.exports = StopCommand;
