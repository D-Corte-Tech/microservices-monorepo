import { Hono } from "hono";
import { Address } from "../../domain/user/value-object/address";

export const server = new Hono()
server.get('/', (c) => {
	const address = new Address(

	)
	return c.text('user')
})
