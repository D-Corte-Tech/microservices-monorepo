import { Hono } from "hono";
import { AuthController } from "../../interfaces/controllers/user/auth.controller";
import { RegisterUserController } from "../../interfaces/controllers/user/register-user.controller";

export const server = new Hono();

const authController = new AuthController();
const registerUserController = new RegisterUserController();

server.post("/login", authController.login);
server.post("/register", registerUserController.register);

server.get("/", (c) => {
	return c.text("user");
});
