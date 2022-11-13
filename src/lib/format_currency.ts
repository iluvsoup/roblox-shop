import { currencies } from "$lib/server/currencies";

export const format = (currency: string, billing_scheme: string, unit_amount: number) => {
	const currencydata = currencies[currency];
	let priceString: string;

	// Sorry but why does javascript/typescript use ** and not ^
	const realPrice = unit_amount! * 10 ** -currencydata.decimalDigits;
	const formattedPrice = new Intl.NumberFormat().format(realPrice);

	if (currencydata.symbolOnLeft) {
		if (currencydata.spaceBetweenAmountAndSymbol) {
			priceString = `${currencydata.symbol} ${formattedPrice}`;
		} else {
			priceString = `${currencydata.symbol}${formattedPrice}`;
		}
	} else {
		if (currencydata.spaceBetweenAmountAndSymbol) {
			priceString = `${formattedPrice} ${currencydata.symbol}`;
		} else {
			priceString = `${formattedPrice}${currencydata.symbol}`;
		}
	}

	return priceString;
};
