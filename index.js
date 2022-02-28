const fs = require("fs");
const Discord = require("discord.js");
const db = require("quick.db");

const { token, prefix } = require("./config.json")

client = new Discord.Client();
client.commands = new Collection()

// Initial Command Handler
client.on("message", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;

    const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);

    const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.requireArgs) {
		const usageEmbed = await miscellaneous.sendUsage(command);
		if (!args.length) return message.reply({ embeds: [usageEmbed] });
	}

    try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		await message.channel.send(`An error occurred while executing the command! \n**Error:**\n\`\`\`js\n${error.message}${error.stack.substr(0, 800)}\`\`\``);
	}
})

// Other stuff
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.login(token)
	.then(() => console.log(`Token is valid! Signed in as ${client.tag}`));