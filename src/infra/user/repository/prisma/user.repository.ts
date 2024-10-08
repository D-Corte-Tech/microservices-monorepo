import { v4 as uuidv4 } from "uuid";
import { User } from "../../../../domain/user/entity/user";
import { Address } from "../../../../domain/user/value-object/address";
import { prisma } from "../../../db/prisma/primsa";
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

	async create(entity: User): Promise<void> {
		let userVerifier!: User;
		try {
			userVerifier = await this.findByEmail(entity.email);

			console.log(userVerifier.email.length);
		} catch (err) {}

		if (userVerifier && userVerifier.email.length >= 1)
			throw new Error("User email already registered");

		const address = await prisma.address.create({
			data: {
				city: entity.address.city,
				postalCode: entity.address.postal_code,
				country: entity.address.country,
				state: entity.address.state,
				street: entity.address.street,
				id: uuidv4(),
			},
		});

		await prisma.user.create({
			data: {
				id: entity.id,
				email: entity.email,
				name: entity.name,
				password: entity.password,
				addressId: address.id,
				created_at: new Date(),
			},
		});
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
