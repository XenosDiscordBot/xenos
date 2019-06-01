const commando = require('discord.js-commando');
const Discord = require('discord.js');

class LeaveChannelCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'Leaves the voice channel of the commander.',
            userPermissions: ['CONNECT'],
        });
    }

    async run(message, args){
        var server = servers[message.guild.id];
        if(message.guild.voiceConnection){
            if(message.member.voiceChannel != message.guild.voiceChannel){
                server.queue.shift();
                message.guild.voiceConnection.disconnect();
                message.channel.send("Successfully left the voice channel!");
            }
            else{
                message.channel.send("You must be in a voice channel to make me leave.")
            }
        }
        else{
            message.channel.send("Im not in a voice channel.");
        }
    }
}

module.exports = LeaveChannelCommand;
