const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(
  "MTI3Mjg2MTM4ODcyMDU3NDU2NQ.GcsaT0.cPDj_mgGHmCW2xZn0blZVOTnUbDOxg1jMEqjOc"
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1272861388720574565"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
