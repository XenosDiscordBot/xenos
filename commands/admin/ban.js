const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'admin',
            memberName: 'ban',
            description: 'Bans a member from a channel/server',
            userPermissions: ['BAN_MEMBERS'],
        });
    }

    hasPermission(msg) {
        if (!msg.member.hasPermission('BAN_MEMBERS')){
            return 'Only users with the permission to ban members may use this command.';
        }
        return true;
    }

    async run(msg, args) {
        if(args === "undefined" || args === "\n" || args === ""){
            msg.reply('Must mention a user to ban.');
        }

        var id = args.toString();
        id = id.replace('@', '');
        id = id.replace('<', '');
        id = id.replace('>', '');
        var bUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        let bReason = id.substring(19);
        if (bReason === "\n" || bReason === " \n" || bReason === ""){
            bReason = "No given reason."
        }
        if(!bUser){
            msg.channel.send("Cannot find user to ban.");
            return;
        }
        else if(bUser.hasPermission('ADMINISTRATOR')){
            msg.channel.send("Cannot ban a administrator.");
            return;
        }

        let banEmbed = new Discord.RichEmbed()
        .setDescription("~~Ban~~")
        .setColor("#e56b00")
        .addField("Baned User:", `${bUser}`)
        .addField("Baned By:", `<@${msg.author.id}>`)
        .addField("Baned In:", msg.channel)
        .addField("Time:", msg.createdAt)
        .addField("Reason:", bReason);

        msg.guild.member(bUser).ban(bReason);
        msg.channel.send(banEmbed);
    }
};
