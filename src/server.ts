import app from ".";

const port = process.env.PORT;

Bun.serve({
  fetch: app.fetch,
  port: port,
  idleTimeout: 255,
});

console.log(`Server running on http://localhost:${port}`);
