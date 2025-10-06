import app from ".";

Bun.serve({
  fetch: app.fetch,
  port: 3000,
  idleTimeout: 255,
});

console.log("Server running on http://localhost:3000");
