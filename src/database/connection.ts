import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const client = new Client({
  hostname: "localhost",
  port: 5432, // Your PostgreSQL database port
  user: "postgres",
  password: "mhaideralim",
  database: "parctise-project-deno-database",
});

// Function to connect and verify the connection
export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("PostgreSQL Database Connected");
    // You can perform database operations here
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    // Make sure to close the connection when done
    await client.end();
  }
}
