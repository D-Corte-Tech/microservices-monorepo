import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";
import { UserRepository } from "../../../infra/user/repository/prisma/user.repository";
import type { AuthenticateUserDTO } from "../../../use-case/user/auth/auth-user.dto";
import { AuthenticateUser } from "../../../use-case/user/auth/authenticate-user.usercase";

export class AuthController {
	async login(c: Context<BlankEnv, "/", BlankInput>) {
		try {
			const { email, password } = await c.req.json<AuthenticateUserDTO>();

			const authenticateUser = new AuthenticateUser(new UserRepository());
			const result = await authenticateUser.execute({ email, password });

			return new Response(JSON.stringify(result));
		} catch (err: any) {
			return new Response(JSON.stringify({ message: err.message }), {
				status: 400,
			});
		}
	}
}
