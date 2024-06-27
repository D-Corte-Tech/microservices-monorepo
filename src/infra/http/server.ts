import { Hono } from "hono";
import { AuthController } from "../../interfaces/controllers/user/auth.controller";

export const server = new Hono();

const authController = new AuthController();

server.post("/login", authController.login);

server.get("/", (c) => {
	return c.text("user");
});
