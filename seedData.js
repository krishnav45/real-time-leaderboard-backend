require('dotenv').config();
const mongoose = require('mongoose');
const Player = require('./models/Player');

// ✅ Include UK now
const regions = ["India", "USA", "Russia", "UK"];
const modes = ["solo", "duo", "squad"];

// 15 sample names
const names = [
  "Alpha", "Bravo", "Charlie", "Delta", "Echo",
  "Foxtrot", "Golf", "Hotel", "India", "Juliet",
  "Kilo", "Lima", "Mike", "November", "Oscar"
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clean up previous data
    await Player.deleteMany({});
    console.log("🧹 Cleared existing players");

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
    console.log(`✅ Inserted ${allPlayers.length} players`);

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();
