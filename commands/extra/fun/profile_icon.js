const commando = require('discord.js-commando');
const Discord = require('discord.js');

class FunMirrorCommand extends commando.Command {
    constructor(client) {
        super(client,{
            name: 'profileicon',
            group: 'extra',
            memberName: 'profileicon',
            description: 'Shows a link and a image of the user profile icon.'
        });
    }

    async run(message, args){
        message.channel.send(message.author.avatarURL);
    }
}

module.exports = FunMirrorCommand;
