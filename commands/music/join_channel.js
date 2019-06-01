const commando = require('discord.js-commando');
const Discord = require('discord.js');

class JoinChannelCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Joins the voice channel of the commander.',
            userPermissions: ['CONNECT'],
        });
    }

    async run(message, args){
        if(message.guild.voiceConnection){
            return message.channel.send("I'm already in a voice channel.");
        }
        if(message.member.voiceChannel){
            if(!message.guild.voiceConnection){
                message.member.voiceChannel.join().then(connection =>{
                        return;
                    })
            }
        }
        else{
            return message.channel.send("You must be in a voice channel to play music!");
        }
    }
}

module.exports = JoinChannelCommand;
