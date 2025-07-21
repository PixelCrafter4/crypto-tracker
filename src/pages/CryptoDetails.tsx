import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Crypto } from "../Crypto";

export default function CryptoDetails() {
  const { id } = useParams<{ id: string }>();
  const [crypto, setCrypto] = useState<Crypto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch crypto details");
        return res.json();
      })
      .then(data => setCrypto(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-8">
      <Link to="/" className="text-blue-500 mb-4 inline-block">&larr; Back to Home</Link>
      {crypto && (
        <div className="bg-white shadow rounded p-4">
          <div className="flex items-center gap-4 mb-4">
            <img src={crypto.image.large} alt={crypto.name} className="w-16 h-16" />
            <div>
              <h1 className="text-2xl font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h1>
              <p className="text-gray-500">Rank #{crypto.market_cap_rank}</p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: crypto.description.en }} />
        </div>
      )}
    </div>
  );
} 