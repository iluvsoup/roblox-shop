// duration in seconds
export const TOKEN_DURATION = 60 * 60 * 24 * 30;

export const PIX_ENABLED = false;

export const getUrl = () => {
	return process.env.NODE_ENV == "development" ? "http://192.168.1.156:5173" : "https://shop.iluvsoup.com";
};
