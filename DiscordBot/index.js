const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { images } = require('./sequelize.js');
const config = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Import command files
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// When ready say we're logged in
client.once(Events.ClientReady, c => {
    // Confirm we're logged in
    console.log(`Logged in as ${c.user.tag}`);
    // Connect to database table
    images.sync({ force: true });
    // Begin our image post timer
    setInterval(() => {sendPeriodicImage()}, 1000);
});

// When an interaction is used, fire it
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
});

async function sendPeriodicImage() {
    try {
        // Add images for testing
        const image = await images.create({
            image_name: "santyhat.png",
            uploaded: 0,
            upvotes: 10,
        });

        // Add images for testing
        const image1 = await images.create({
            image_name: "vx6fg0qgbzp81.jpg",
            uploaded: 0,
            upvotes: 5,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.log("Error adding image to database, constraint failed");
        }
    }

    const imageToUpload = await images.findOne({ where: { uploaded: 0 }, order: [['upvotes', 'DESC']] });

    // If the database has no images to upload
    if (!imageToUpload) {
        console.warn("No new images to upload");
        return;
    };

    const imagePath = path.join(__dirname, 'storage', 'images');
    const imageFiles = fs.readdirSync(imagePath).filter(file => file === imageToUpload.dataValues.image_name);

    // If the image is not in the directory, return
    if (!imageFiles) {
        console.error("Image file not found in directory " + imagePath);
        return;
    }

    const channel = client.channels.cache.get('924902022535348269');

    // If the channel exists
    if (!channel) throw new Error("Channel does not exist");

    channel.send({
        content: "",
        files: [path.join(imagePath, imageToUpload.dataValues.image_name)]
    });

    // Update image to say it's been sent or "uploaded"
    await images.update({ uploaded: 1 }, {
        where: {
            id: imageToUpload.dataValues.id,
        }
    });
}

client.login(config.token);