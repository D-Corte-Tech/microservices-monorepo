export type RegisterUserDTO = {
	email: string;
	password: string;
	name: string;
	activated_at?: Date | null;
	address: {
		street: string;
		city: string;
		state: string;
		postal_code: string;
		country: string;
	};
};
