import { redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const ssr = true;

export const actions: Actions = {
	logout: ({ cookies }) => {
		console.log("logging out yeahhhhh");
		cookies.delete("session");
		redirect(301, "/");
	}
};
