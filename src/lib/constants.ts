// duration in seconds
export const TOKEN_DURATION = 60 * 60 * 24 * 30;
export const PIX_ENABLED = false;

// Made a function for it because variable was funky
export const getUrl = () => {
	return process.env.NODE_ENV == "development" ? "http://localhost:5173" : "https://exercitobrasileiro.vercel.app";
};
