import Entity from "../../@shared/entity/entity.abstract";
import { AddressZodValidator } from "../validators/address.zod.validator";

export class Address extends Entity {
	private _user_id: string
	private _street: string
	private _city: string
	private _state: string
	private _postal_code: string
	private _country: string

	constructor (
		id: string,
		user_id: string,
		street: string,
		city: string,
		state: string,
		postal_code: string,
		country: string
	) {
		super()
		this._id = id
		this._user_id = user_id

		this._street = street
		this._city = city
		this._state = state
		this._postal_code = postal_code
		this._country = country

		this.validate()
	}

	validate() {
		const addressValidator = new AddressZodValidator()
		addressValidator.validate(this)
	}
}
