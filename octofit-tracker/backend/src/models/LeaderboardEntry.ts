import { Schema, model } from "mongoose";

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export const LeaderboardEntry = model("LeaderboardEntry", leaderboardEntrySchema);
