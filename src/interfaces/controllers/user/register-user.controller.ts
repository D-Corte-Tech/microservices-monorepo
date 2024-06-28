import type { Context } from "hono";
import type { BlankEnv, BlankInput } from "hono/types";
import { UserRepository } from "../../../infra/user/repository/prisma/user.repository";
import type { RegisterUserDTO } from "../../../use-case/user/create/create-user.dto";
import { RegisterUserUseCase } from "../../../use-case/user/create/create-user.usecase";

export class RegisterUserController {
	async register(c: Context<BlankEnv, "/", BlankInput>) {
		try {
			const input = await c.req.json<RegisterUserDTO>();

			const RegisterUserDto: RegisterUserDTO = {
				email: input.email,
				name: input.name,
				password: input.password,
				address: {
					city: input.address.city,
					postal_code: input.address.postal_code,
					country: input.address.country,
					state: input.address.state,
					street: input.address.street,
				},
			};

			const usercase = new RegisterUserUseCase(new UserRepository());
			const result = await usercase.execute(RegisterUserDto);

			return new Response(JSON.stringify(result));
		} catch (err: any) {
			return new Response(err, {
				status: 400,
			});
		}
	}
}
