const { prefix } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a member from the server',
    category: "moderation",
    aliases: ['blacklist'],
    permission: `BAN_MEMBERS`,
    usage: `${prefix}ban <@user> [reason]`,
    async execute(message, args) {
        const toBan = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
		const reason = args.slice(1).join(' ') || 'No reason specified';

        if (!toBan) return;
        if (toBan.roles.highest.position > message.guild.me.roles.highest.position || toBan.roles.highest.position === message.guild.me.roles.highest.position && message.guild.ownerID !== message.member.id) return message.channel.send('The user you want to ban has a role that is higher or equal to yours. You cannot ban that member.');
        if (toBan.hasPermission('ADMINISTRATOR') && message.guild.ownerID !== message.member.id) return message.channel.send('That user has the Administrator permission, so you cannot ban them.')
        if (toBan.id === message.guild.ownerID) return message.channel.send('You cannot ban the server owner.')

        let dmNotification = new MessageEmbed()
            .setTitle(`You have been banned from ${message.guild.name}`)
            .setDescription(`Reason: ${reason}`)
            .setTimestamp()
            .setColor('RED');
        
        try {
            toBan.send(dmNotification);
        } catch {
            console.log(`Attempted to DM ${toBan.tag}, DMs were closed`)
        } finally {
            toBan.ban(reason);
            message.channel.send(`${toBan.tag} has been banned. Reason: ${reason}`);
        }
        
    },
};