import { currencies } from "$lib/server/currencies";

export const format = (currency: string, unit_amount: number) => {
	const currencydata = currencies[currency];

	// Sorry but why does javascript/typescript use ** and not ^
	const realPrice = unit_amount! * 10 ** -currencydata.decimalDigits;
	const formattedPrice = new Intl.NumberFormat().format(realPrice);

	return {
		symbol: currencydata.symbol,
		number: formattedPrice,
		symbolOnLeft: currencydata.symbolOnLeft
	};
};
