import { z } from "zod";
import type ValidatorInterface from "../../@shared/validator/validator.interface";
import type { Address } from "../value-object/address";

export class AddressZodValidator implements ValidatorInterface<Address> {
	validate(entity: Address) {
		const addressSchema = z.object({
			user_id: z.string(),
			street: z.string(),
			city: z.string(),
			state: z.string(),
			postal_code: z.string(),
			country: z.string(),
		});

		addressSchema.parse(entity);
	}
}
