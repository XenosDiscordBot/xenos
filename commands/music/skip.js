const commando = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const join = require('./join_channel.js');

class SkipCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Skips the current song in the queue.',
            userPermissions: ['CONNECT'],
        });
    }

    async run(message, args){
        var server = servers[message.guild.id];

        if(!message.member.voiceChannel){
            return message.channel.send('Connect to a voice channel to skip a song.');
        }
        else if(message.guild.voiceChannel){
            return message.channel.send('I am not playing any music.');
        }
        else{
            if(server.dispatcher){
                server.dispatcher.end();
            }
        }
    }
}

module.exports = SkipCommand;
