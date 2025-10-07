import { Hono } from "hono";
import apiRoutes from "./routes/route";

const app = new Hono().basePath("/api");
app.route("/", apiRoutes);

export default app;
