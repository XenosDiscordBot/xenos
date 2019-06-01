const commando = require('discord.js-commando');

class DiceRoll extends commando.Command{
    constructor(client){
        super(client, {
            name: 'roll',
            group: 'extra',
            memberName: 'roll',
            description: 'Rolls a six sided die.'
        });
    }

    async run(message, args) {
        var roll = Math.floor(Math.random()*6) + 1;
        message.say("You rolled a " + roll + "!");
    }
}

module.exports = DiceRoll;
