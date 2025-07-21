import type { Crypto } from './Crypto';

export async function fetchCryptos(): Promise<Crypto[]> {
    const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1'

    );
    if(!res.ok) throw new Error('Failed to fetch cryptos');
    return res.json();
}