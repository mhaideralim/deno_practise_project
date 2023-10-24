import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { connectToDatabase } from "./database/connection.ts";

const port = 3000;
const host = "localhost";

const app = new Application();
const router = new Router();

// Middleware (body parsing and CORS)
app.use(router.routes());
app.use(router.allowedMethods());

// Define your routes
router.get("/", (ctx) => {
  ctx.response.body = { Welcome: "Welcome to Deno App" };
});

// Start the server
connectToDatabase();
console.log(`Server listening at http://${host}:${port}`);
await app.listen({ port: port });
