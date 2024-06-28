import { Hash } from "./hash";

export class ComparePassword {
	async execute(
		request: {
			password: string;
			encrypted_password: string;
		},
		JWT_SECRET?: string,
	) {
		const hash = new Hash();
		const hashedPassword = await hash.execute(request.password, "secret");

		console.log(hashedPassword, request.encrypted_password);

		return hashedPassword === request.encrypted_password;
	}
}
