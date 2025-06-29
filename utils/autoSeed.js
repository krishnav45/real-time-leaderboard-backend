const Player = require("../models/Player");

const regions = ["India", "USA", "Russia", "UK"];
const modes = ["solo", "duo", "squad"];
const names = [
  "Alpha", "Bravo", "Charlie", "Delta", "Echo",
  "Foxtrot", "Golf", "Hotel", "India", "Juliet",
  "Kilo", "Lima", "Mike", "November", "Oscar"
];

async function seedPlayers() {
  try {
    const count = await Player.countDocuments();
    if (count > 0) {
      console.log("⏩ Players already exist, skipping seeding.");
      return;
    }

    const allPlayers = [];

    regions.forEach((region) => {
      modes.forEach((mode) => {
        names.forEach((name) => {
          allPlayers.push({
            name: `${name}_${region}_${mode}`,
            score: Math.floor(Math.random() * 100),
            region,
            mode,
            updatedAt: new Date()
          });
        });
      });
    });

    await Player.insertMany(allPlayers);
    console.log(`✅ Seeded ${allPlayers.length} players`);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
}

module.exports = seedPlayers;
