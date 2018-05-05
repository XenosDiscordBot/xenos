const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'admin',
            memberName: 'kick',
            description: 'Kicks a member from a channel/server',
            userPermissions: ['KICK_MEMBERS'],
        });
    }

    hasPermission(msg) {
        if (!msg.member.hasPermission('KICK_MEMBERS')){
            return 'Only users with the permission to kick members may use this command.';
        }
        return true;
    }

    async run(msg, args) {
        if(args === "undefined" || args === "\n" || args === ""){
            msg.reply('Must mention a user to kick.');
        }

        var id = args.toString();
        id = id.replace('@', '');
        id = id.replace('<', '');
        id = id.replace('>', '');
        var kUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        let kReason = id.substring(19);
        if (kReason === "\n" || kReason === " \n" || kReason === ""){
            kReason = "No given reason."
        }
        if(!kUser){
            msg.channel.send("Cannot find user to kick.");
            return;
        }
        else if(kUser.hasPermission('ADMINISTRATOR')){
            msg.channel.send("Cannot kick a administrator.");
            return;
        }

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~~Kick~~")
        .setColor("#e56b00")
        .addField("Kicked User:", `${kUser}`)
        .addField("Kicked By:", `<@${msg.author.id}>`)
        .addField("Kicked In:", msg.channel)
        .addField("Time:", msg.createdAt)
        .addField("Reason:", kReason);

        msg.guild.member(kUser).kick(kReason);
        msg.channel.send(kickEmbed);
    }
};
