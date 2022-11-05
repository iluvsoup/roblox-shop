import { redirect, error } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

import { TOKEN_DURATION } from "$lib/constants";

import type { LayoutServerLoad } from "./$types";

// Stupid thing was complaining so I had to do this
interface Token {
	uid: string;
}

export const load: LayoutServerLoad = async ({ cookies }) => {
	const session = cookies.get("session");

	if (!session) {
		throw redirect(303, "/");
	}

	const decoded = jwt.verify(session, process.env.JWT_SECRET!, {
		maxAge: TOKEN_DURATION
	}) as Token;

	const uid = decoded.uid;

	if (uid == "-1") {
		cookies.delete("session");
		throw error(500, { message: "Roblox user ID invalid, check their servers" });
	}

	// See: https://thumbnails.roblox.com/docs#!/Avatar/get_v1_users_avatar_headshot
	const avatar = await fetch(
		`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${463072889}&size=48x48&format=Png&isCircular=false`
	);

	const avatar_json = await avatar.json();

	const userinfo = await fetch(`https://users.roblox.com/v1/users/${uid}`);
	const userinfo_json = await userinfo.json();

	if (userinfo_json.errors) {
		cookies.delete("session");
		throw error(500, { message: "Something went wrong" });
	}

	// I don't know how you'd even be able to authenticate yourself as a terminated user
	// but this helps me sleep at night
	if (userinfo_json.isBanned) {
		cookies.delete("session");
		throw error(410, { message: `Requested user (@${userinfo_json.name}) is banned from Roblox!` });
	}

	return {
		uid: uid,
		username: userinfo_json.name,
		displayname: userinfo_json.displayName,
		avatarurl: avatar_json.data[0].imageUrl
	};
};
