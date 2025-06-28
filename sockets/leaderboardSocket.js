const Player = require("../models/Player");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    socket.on("updateScore", async ({ name, score, region, mode }) => {
      try {
        await Player.findOneAndUpdate(
          { name, region, mode },
          { $max: { score }, updatedAt: new Date() },
          { upsert: true, new: true }
        );

        const topPlayers = await Player.find({ region, mode })
          .sort({ score: -1 })
          .limit(10);

        io.emit("leaderboardUpdate", topPlayers);
      } catch (err) {
        console.error("❌ Error updating score:", err);
      }
    });

    socket.on("getLeaderboard", async ({ region, mode, topN = 10 }) => {
      try {
        const topPlayers = await Player.find({ region, mode })
          .sort({ score: -1 })
          .limit(topN);

        socket.emit("leaderboardUpdate", topPlayers);
      } catch (err) {
        console.error("❌ Error getting leaderboard:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("🚫 Disconnected:", socket.id);
    });
  });
};
