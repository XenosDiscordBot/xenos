const commando = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const join = require('./join_channel.js');

class ResumeCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            description: 'Resume a song that is currently paused.',
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
            if(server.dispatcher){
                server.dispatcher.resume();
            }
        }
    }
}

module.exports = ResumeCommand;
