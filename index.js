const { Client } = require("discord.js");
const client = new Client({intents: 32767});
const { Token, DatabaseURL } = require("./config.json");

client.once("ready", () => {
    console.log(`Client is online!`);
});

client.login(Token);