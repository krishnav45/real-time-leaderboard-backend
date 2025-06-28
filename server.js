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

// ✅ CORS Options
const corsOptions = {
  origin: CLIENT_ORIGIN,
  methods: ["GET", "POST"],
  credentials: true,
};

// ✅ Apply CORS to HTTP routes
app.use(cors(corsOptions));
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Socket.io with proper CORS
const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Leaderboard socket logic
leaderboardSocket(io);

// ✅ Health check route (optional but useful)
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
