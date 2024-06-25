import { z } from "zod";
import type ValidatorInterface from "../../@shared/validator/validator.interface";
import type { User } from "../entity/user";

export class UserZodValidator implements ValidatorInterface<User> {
	validate(entity: User) {
		const userSchema = z.object({
			email: z.string().email().min(4),
			password: z.string().min(8),
			name: z.string().min(4),
			activated_at: z.date(),
		});

		userSchema.parse(entity);
	}
}
