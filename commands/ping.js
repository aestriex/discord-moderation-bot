const { prefix } = require('../../config.json');

module.exports = {
    name: 'ping',
    description: 'Check the bot latency',
    category: "miscellaneous",
    aliases: ['latency'],
    permission: `SEND_MESSAGES`,
    usage: prefix + this.name,
    async execute(message) {
        message.channel.send('Pong!')
            .then(resultMessage => {
                const ping = resultMessage.createdTimestamp - message.createdTimestamp;
                resultMessage.edit(`Pong! \`${ping}ms\``);
            });
    },
};