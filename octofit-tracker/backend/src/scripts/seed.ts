import { connectDatabase, disconnectDatabase, mongoUri } from "../config/database";
import { Activity } from "../models/Activity";
import { LeaderboardEntry } from "../models/LeaderboardEntry";
import { Team } from "../models/Team";
import { User } from "../models/User";
import { Workout } from "../models/Workout";

const seedDatabase = async () => {
  console.log("Seed the octofit_db database with test data");
  console.log(`Connecting to ${mongoUri}`);

  await connectDatabase();

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.insertMany([
    {
      name: "OctoCore Climbers",
      description: "Early risers focused on endurance, mobility, and steady weekly gains.",
    },
    {
      name: "Git Fit Crew",
      description: "A social team that keeps workouts consistent with friendly challenges.",
    },
    {
      name: "Merge Conflict Crushers",
      description: "Strength-focused athletes who turn tough sessions into personal records.",
    },
  ]);

  const users = await User.insertMany([
    {
      username: "maya_sprints",
      email: "maya.sprints@example.com",
      displayName: "Maya Thompson",
      teamId: teams[0]._id,
    },
    {
      username: "leo_lifts",
      email: "leo.lifts@example.com",
      displayName: "Leo Martinez",
      teamId: teams[2]._id,
    },
    {
      username: "aria_cycles",
      email: "aria.cycles@example.com",
      displayName: "Aria Chen",
      teamId: teams[1]._id,
    },
    {
      username: "noah_rows",
      email: "noah.rows@example.com",
      displayName: "Noah Patel",
      teamId: teams[0]._id,
    },
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id,
      type: "Trail run",
      durationMinutes: 42,
      caloriesBurned: 430,
      loggedAt: new Date("2026-06-18T13:30:00.000Z"),
    },
    {
      userId: users[1]._id,
      type: "Strength training",
      durationMinutes: 55,
      caloriesBurned: 510,
      loggedAt: new Date("2026-06-19T22:15:00.000Z"),
    },
    {
      userId: users[2]._id,
      type: "Indoor cycling",
      durationMinutes: 48,
      caloriesBurned: 465,
      loggedAt: new Date("2026-06-20T11:00:00.000Z"),
    },
    {
      userId: users[3]._id,
      type: "Rowing intervals",
      durationMinutes: 36,
      caloriesBurned: 390,
      loggedAt: new Date("2026-06-21T15:45:00.000Z"),
    },
  ]);

  await LeaderboardEntry.insertMany([
    { userId: users[1]._id, score: 1880, rank: 1 },
    { userId: users[0]._id, score: 1745, rank: 2 },
    { userId: users[2]._id, score: 1690, rank: 3 },
    { userId: users[3]._id, score: 1585, rank: 4 },
  ]);

  await Workout.insertMany([
    {
      title: "Morning Mobility Reset",
      description: "A light flexibility session for recovery days and desk-break movement.",
      difficulty: "beginner",
      durationMinutes: 20,
    },
    {
      title: "Hill Sprint Builder",
      description: "Short sprint repeats with walk-back recovery to build speed and power.",
      difficulty: "intermediate",
      durationMinutes: 35,
    },
    {
      title: "Full-Body Strength Circuit",
      description: "Compound lifts and core finishers for balanced strength development.",
      difficulty: "advanced",
      durationMinutes: 50,
    },
  ]);

  console.log("Seed complete: created teams, users, activities, leaderboard entries, and workouts.");
};

seedDatabase()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
