//const Discord = require('discord.js');


const commando = require('discord.js-commando');
const bot = new commando.Client();

bot.registry.registerGroup('admin', 'Admin');
bot.registry.registerGroup('dice', 'Dice');
bot.registry.registerGroup('coin', 'Coin');
bot.registry.registerDefaults();

bot.registry.registerCommandsIn(__dirname + '/commands/extra');
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login('NDQxMzU3ODcwMDg5NjMzNzkz.DcvGHQ.QHg319nkF1d2Lr6KNFkHMRc3FME');
