import { toast } from "@zerodevx/svelte-toast";

export const errorToast = (msg: string) => {
	toast.push(msg, {
		dismissable: true,
		duration: 5000,
		theme: {
			"--toastWidth": `${msg.length}cw`,
			"--toastBarHeight": "3px",
			"--toastBorder": "1px solid rgb(225, 29, 72)",
			"--toastBarBackground": "rgb(225, 29, 72)",
			"--toastBackground": "rgba(133, 53, 53, 0.2)",
			"--toastBorderRadius": "0.5rem"
		}
	});
};
