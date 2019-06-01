const commando = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

function Play(connection, message){
    const arg = message.content.split(' ');
    var server = servers[message.guild.id];
    var songTitle;
    server.dispatcher = connection.playStream(ytdl(server.queue[0], { filter:
    "audioonly" }));

    ytdl.getInfo(server.queue[0], function(err, info) {
        console.log("Now playing: ",info.title)
        var current = "\n**Now Playing:**\n" + info.title + "\n" + server.queue[0];
        return message.channel.send(current);
    });

    server.dispatcher
    .on('end', function(){
        if(server.queue[0]){
            server.queue.shift();
            Play(connection, message);
        }
        else{
            console.log('song ended');
            connection.disconnect();
        }
    })
    .on('pause', function(){
        if(server.queue[0]){
            server.queue.playing = false;
        }
    })
    .on('resume', function(){
        if(server.queue[0]){
            server.queue.playing = true;
        }
    });
    server.dispatcher.setVolumeLogarithmic(5/5);
}

class PlayCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Play a song using a youtube link or search using key words provided.',
            userPermissions: ['CONNECT'],
        });
    }

    async run(message, args){
        const arg = message.content.split(' ');
        if(!message.member.voiceChannel){
            return message.channel.send('Connect to a voice channel to play music.')
        }
        else if(!args[0]) {
            return message.channel.send("Please input a url or words to search for a song.")
        }
        else{
            const permissions = message.member.voiceChannel.permissionsFor(message.client.user);
            if(!permissions.has('CONNECT')){
                return  message.channel.send("I cannot connect to the voice channel! Make sure I have the proper permissions.")
            }
            if(!permissions.has('SPEAK')){
                return  message.channel.send("I cannot speak in the voice channel! Make sure I have the proper permissions.")
            }

            if(message.member.voiceChannel){
                if(!servers[message.guild.id]){
                    servers[message.guild.id] = {queue: []}
                    console.log('made new queue');
                }
                const songInfo = await ytdl.getInfo(arg[1]);
                const song = {
                    title: songInfo.title,
                    url: songInfo.url,
                }
                if(!message.guild.voiceConnection){
                    message.member.voiceChannel.join().then(connection => {
                        var server = servers[message.guild.id];
                        server.queue.push(arg[1])
                        Play(connection, message);
                        return;
                    })
                }
                else{
                    var server = servers[message.guild.id];
                    server.queue.push(arg[1])
                    var addedInfo = "Added " + song.title + " to the queue.\n" + arg[1];
                    var posInfo = "Position number "+ (server.queue.length-1) +" in the queue.";
                    console.log(song.title, "added to queue ", arg[1]);
                    console.log("Position ", (server.queue.length-1));
                    var info = new Discord.RichEmbed()
                        .setTitle(addedInfo, true)
                        .setFooter(posInfo)

                    message.channel.send(info);
                }
            }
            else{
                return message.channel.send("You must be in a voice channel to play music!");
            }
        }
    }

}

module.exports = PlayCommand;
