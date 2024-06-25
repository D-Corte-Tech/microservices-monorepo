import { User } from "../../../domain/user/entity/user";
import { Address } from "../../../domain/user/value-object/address";
import { prisma } from "../../db/prisma/primsa";
import type { UserRepositoryInterface } from "./user-repository.interface";

export class UserRepository implements UserRepositoryInterface {
	async findByEmail(email: string): Promise<User> {
		const user = await prisma.user.findFirst({
			where: {
				email,
			},
			include: {
				address: true,
			},
		});

		if (!user) throw new Error("User not found.");
		if (!user.address)
			throw new Error("User has not address, please update user.");

		const address = new Address(
			user.address.id,
			user.id,
			user.address.street,
			user.address.city,
			user.address.state,
			user.address.postalCode,
			user.address.country,
		);

		const userEntity = new User(
			user.id,
			user.email,
			user.password,
			user.name,
			user.activated_at,
			address,
		);

		return userEntity;
	}

	create(entity: User): Promise<void> {
		throw new Error("Method not implemented.");
	}
	update(entity: User): Promise<void> {
		throw new Error("Method not implemented.");
	}
	find(id: string): Promise<User> {
		throw new Error("Method not implemented.");
	}
	findAll(): Promise<User[]> {
		throw new Error("Method not implemented.");
	}
}
