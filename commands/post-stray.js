const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('post-stray')
        .setDescription('Post a Stray Kids image!'),
    async execute(interaction) {
        await interaction.reply('Testing');
    },
};