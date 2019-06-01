const commando = require('discord.js-commando');

class CoinFlip extends commando.Command{
    constructor(client){
        super(client, {
            name: 'flip',
            group: 'extra',
            memberName: 'flip',
            description: 'Flips a coin.'
        });
    }

    async run(message, args) {
        var roll = Math.floor(Math.random()*2) + 1;
        if(roll == 1){
            message.say("Heads");
        }
        else{
            message.say("Tails");
        }
    }
}

module.exports = CoinFlip;
