const Discord = require('discord.js');
const commando = require('discord.js-commando');
const bot = new commando.Client();

const queue = new Map();

bot.registry.registerGroup('admin', 'Admin');
bot.registry.registerGroup('extra', 'Extra');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('internal', 'Internal');
bot.registry.registerDefaults();

bot.on('ready', function(){
    console.log('Ready');
})

global.servers = {};

bot.registry.registerCommandsIn(__dirname + '/commands/music');
bot.registry.registerCommandsIn(__dirname + '/commands/extra');
bot.registry.registerCommandsIn(__dirname + '/commands/admin');
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login('NDQxMzU3ODcwMDg5NjMzNzkz.XPHZEQ.tVh0lIixryOhShTCiRronNxr-vo');
