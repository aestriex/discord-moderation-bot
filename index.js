const { Client } = require("discord.js");
const client = new Client({intents: 32767});
const { Token, DatabaseURL } = require("./config.json");

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);

client.once("ready", () => {
    console.log(`Client is online!`);
});

client.login(Token);