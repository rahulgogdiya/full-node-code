const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  //   console.log(message.content);
  if (message.author.bot) return;
  message.reply({
    content: "he from",
  });
});

// client.on("interactionCreate",(interaction)=>{
//     console.log(interaction)
//     interaction.reply("pong")
// })

client.login(
  "MTI3Mjg2MTM4ODcyMDU3NDU2NQ.GcsaT0.cPDj_mgGHmCW2xZn0blZVOTnUbDOxg1jMEqjOc"
);
