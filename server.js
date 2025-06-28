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

app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error", err));

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

leaderboardSocket(io);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
