const commando = require('discord.js-commando');
const Discord = require('discord.js');

class InfoAboutBotCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'info',
            group: 'extra',
            memberName: 'info',
            description: 'A introduction for the bot.'
        });
    }

    async run(message, args){
        var myInfo = new Discord.RichEmbed()
            .setTitle("Xenos Bot")
            .addField("About me", "Hey, I am a multipurpose discord bot with a load of features.\nTo see all my features type !help.", true)
            .setColor(0x00FF00)
            .setFooter("Thanks adding me to your server!")

        message.channel.send(myInfo);
    }
}

module.exports = InfoAboutBotCommand;
