import { redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const ssr = true;

export const actions: Actions = {
	logout: ({ cookies }) => {
		cookies.delete("session");
		redirect(301, "/");
	}
};
