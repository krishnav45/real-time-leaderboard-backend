// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const { Server } = require("socket.io");
// const leaderboardSocket = require("./sockets/leaderboardSocket");

// const app = express();
// const server = http.createServer(app);

// const PORT = process.env.PORT || 3000;
// const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

// const corsOptions = {
//   origin: CLIENT_ORIGIN,
//   methods: ['GET', 'POST'],
//   credentials: true
// };

// const io = new Server(server, {
//   cors: corsOptions
// });

// app.use(cors({ origin: CLIENT_ORIGIN }));
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error", err));

// leaderboardSocket(io);

// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const leaderboardSocket = require("./sockets/leaderboardSocket");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

// ✅ Unified CORS options
const corsOptions = {
  origin: CLIENT_ORIGIN,
  methods: ["GET", "POST"],
  credentials: true,
};

// ✅ Apply CORS to HTTP requests
app.use(cors(corsOptions));

// ✅ Middleware for parsing JSON
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Setup socket.io with CORS
const io = new Server(server, {
  cors: corsOptions,
});

// ✅ Handle leaderboard socket logic
leaderboardSocket(io);

// ✅ Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
