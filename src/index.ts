import { server } from "./infra/http/server";

export default {
	fetch: server.fetch,
} satisfies ExportedHandler<Env>;
