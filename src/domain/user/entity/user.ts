import Entity from "../../@shared/entity/entity.abstract";
import { UserZodValidator } from "../validators/user.zod.validator";
import type { Address } from "../value-object/address";

export class User extends Entity {
	private _email: string;
	private _password: string;
	private _name: string;
	private _activated_at?: Date | null;

	private _address: Address;

	constructor(
		id: string,
		email: string,
		password: string,
		name: string,
		activated_at: Date | null,
		address: Address,
	) {
		super();

		this._id = id;
		this._email = email;
		this._password = password;
		this._name = name;
		this._activated_at = activated_at;

		this._address = address;

		this.validate();
	}

	validate() {
		const userValidator = new UserZodValidator();
		userValidator.validate(this);
	}

	activate() {
		const date = new Date();
		this._activated_at = date;
	}

	get password() {
		return this._password;
	}
}
