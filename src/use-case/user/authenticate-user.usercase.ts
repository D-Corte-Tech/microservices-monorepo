import { compare } from "bcrypt";
import { sign } from "hono/jwt";
import type { UserRepositoryInterface } from "../../infra/user/repository/user-repository.interface";

export class AuthenticateUser {
	private userRepository: UserRepositoryInterface;

	constructor(userRepository: UserRepositoryInterface) {
		this.userRepository = userRepository;
	}

	async execute(email: string, password: string) {
		const user = await this.userRepository.findByEmail(email);
		if (!user || !(await compare(password, user.password))) {
			throw new Error("Invalid email or password");
		}

		const token = sign(
			{ id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
			"your_jwt_secret",
			"HS256",
		);
		return { user, token };
	}
}
