export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string | { large: string };
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
  description: { en: string };
}