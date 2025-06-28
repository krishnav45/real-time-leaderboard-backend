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

// ✅ Use your exact deployed frontend URL
const CLIENT_ORIGIN = "https://real-time-leaderboard-frontend.vercel.app";
const PORT = process.env.PORT || 3000;

// ✅ CORS config
const corsOptions = {
  origin: CLIENT_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true,
};

// ✅ Allow frontend to access REST APIs
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Allow frontend to connect via socket.io
const io = new Server(server, {
  cors: corsOptions,
});

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed", err));

// ✅ Setup socket events
leaderboardSocket(io);

// ✅ Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
