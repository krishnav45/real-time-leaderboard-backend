const { io } = require("socket.io-client");

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ Connected to server:", socket.id);

  // Emit updateScore
  socket.emit("updateScore", {
    name: "Tester",
    score: Math.floor(Math.random() * 100),
    region: "India",
    mode: "solo",
  });

  // Request leaderboard
  socket.emit("getLeaderboard", {
    region: "India",
    mode: "solo",
    topN: 5,
  });
});

socket.on("leaderboardUpdate", (players) => {
  console.log("📊 Leaderboard received:");
  console.log(players);
  socket.disconnect();
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected");
});
