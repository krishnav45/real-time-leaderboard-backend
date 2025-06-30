require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const leaderboardSocket = require("./sockets/leaderboardSocket");
const Player = require("./models/Player");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

// CORS middleware
app.use(cors({
  origin: CLIENT_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Health check route for Render
app.get("/", (req, res) => {
  res.send("🎉 Leaderboard backend is alive");
});

// Optional: Auto-seed route for cron job
app.get("/wake-up", async (req, res) => {
  await autoSeed();
  res.send("✅ Server is awake and data seeded");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket events
leaderboardSocket(io);

// Server start
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Optional seeding logic
async function autoSeed() {
  try {
    const count = await Player.countDocuments();
    if (count > 0) {
      console.log("⚠️ Players already exist. Skipping seeding.");
      return;
    }

    const regions = ["India", "USA", "Russia", "UK"];
    const modes = ["solo", "duo", "squad"];
    const names = [
      "Alpha", "Bravo", "Charlie", "Delta", "Echo",
      "Foxtrot", "Golf", "Hotel", "India", "Juliet",
      "Kilo", "Lima", "Mike", "November", "Oscar"
    ];

    const allPlayers = [];

    regions.forEach(region => {
      modes.forEach(mode => {
        names.forEach(name => {
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
    console.log(`✅ Seeded ${allPlayers.length} players.`);
  } catch (err) {
    console.error("❌ Auto-seed error:", err);
  }
}
