
export type CurrencyListResponse = {
    date: Date,
} & {
    [currency: string]: {[currency: string]: number}
};

export interface CurrencyConversion {
    code: string;
    conversion: number;
}

export interface CurrencyInfo {
    code: string;
    name: string;
}

export const getCurrencyConversionList = (baseCurrencyCode: string): Promise<CurrencyConversion[]> =>
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrencyCode}.json`)
        .then((response) => response.json())
        .then((json) => 
            Object.keys(json[baseCurrencyCode]).map(key => ({ code: key, conversion: json[baseCurrencyCode][key] }))
        );

export const getCurrencyList = (): Promise<CurrencyInfo[]> => 
fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`)
    .then(response => response.json())
    .then(json => Object.keys(json).map(currency => ({ code: currency, name: json[currency] })));