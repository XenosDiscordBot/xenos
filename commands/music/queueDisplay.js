const commando = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

class QueueDisplayCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: 'View all the songs currently in the server queue.',
            userPermissions: ['CONNECT'],
        });
    }

    async run(message, args){
        var server = servers[message.guild.id];

        if(!server.queue[0]){
            return message.channel.send('There is nothing in the queue');
        }
        else{
            var length = server.queue.length;
            var queueList = ("__**Song Queue:**__\n");
            for(var i = 1; i < length; i++){
                const songInfo = await ytdl.getInfo(server.queue[i]);
                queueList = queueList + (i) + ". " + songInfo.title + "\n";
            }
            const songInfo = await ytdl.getInfo(server.queue[0]);
            queueList = queueList + "\n**Now Playing:**\n" + songInfo.title;
            return message.channel.send(queueList);
        }
    }
}

module.exports = QueueDisplayCommand;
