import type { Crypto } from "../Crypto";

type Props = {
  crypto: Crypto;
};

export default function CryptoCard({ crypto }: Props) {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center gap-4">
      <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
      <div>
        <h2 className="font-semibold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
        <p>${crypto.current_price.toLocaleString()}</p>
        <p className={crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
