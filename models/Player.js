const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  score: Number,
  region: String,
  mode: String,
  updatedAt: {
    type: Date,
    default: Date.now,
    index: { expires: "24h" }, // TTL: auto-delete after 24 hrs
  },
});

// Compound index for fast queries
playerSchema.index({ region: 1, mode: 1, score: -1 });

module.exports = mongoose.model("Player", playerSchema);
