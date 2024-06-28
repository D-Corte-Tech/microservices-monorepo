import { sign } from "hono/jwt";
import { v4 as uuid } from "uuid";
import { User } from "../../../domain/user/entity/user";
import { Address } from "../../../domain/user/value-object/address";
import type { UserRepositoryInterface } from "../../../infra/user/repository/prisma/user-repository.interface";
import { Hash } from "../../../utils/hash";
import type { RegisterUserDTO } from "./create-user.dto";

export class RegisterUserUseCase {
	private userRepository: UserRepositoryInterface;

	constructor(userRepository: UserRepositoryInterface) {
		this.userRepository = userRepository;
	}

	async execute(input: RegisterUserDTO) {
		const hash = new Hash();

		const address = new Address(
			uuid(),
			input.address.street,
			input.address.city,
			input.address.state,
			input.address.postal_code,
			input.address.country,
		);
		const hashedPassword = await hash.execute(input.password, "secret");
		const user = new User(
			uuid(),
			input.email,
			hashedPassword,
			input.name,
			input.activated_at ?? null,
			address,
		);

		await this.userRepository.create(user);

		const token = sign(
			{ id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
			"your_jwt_secret",
			"HS256",
		);
		return { user, token };
	}
}
