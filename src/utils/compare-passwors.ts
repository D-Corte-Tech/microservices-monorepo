export class ComparePassword {
	async execute(
		request: {
			password: string;
			encrypted_password: string;
		},
		JWT_SECRET?: string,
	) {
		const encoder = new TextEncoder();
		const encoded = encoder.encode(request.password + JWT_SECRET);

		const hash = await crypto.subtle.digest("SHA-256", encoded);

		const hashHex = Array.from(new Uint8Array(hash))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");

		console.log(hashHex === request.encrypted_password);

		if (!(hashHex === request.encrypted_password)) {
			throw new Error("Email ou senha incorretos");
		}

		return hashHex === request.encrypted_password;
	}
}
