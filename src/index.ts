import { server } from "./infra/api/router";

export default {
	fetch: server.fetch,
} satisfies ExportedHandler<Env>;
