import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Required environment variables
const requiredEnvVars = [
  "PG_USER",
  "PG_HOST",
  "PG_DATABASE",
  "PG_PORT",
  "PG_PASSWORD"
];

// Check if env variables exist
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Missing required env variable: ${varName}`);
    process.exit(1);
  }
});

// Create database pool
const db = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

// Test database connection
db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

// Handle unexpected database errors
db.on("error", (err) => {
  console.error("Unexpected database error:", err);
  process.exit(1);
});

// Export query function
export const query = (text, params) => db.query(text, params);