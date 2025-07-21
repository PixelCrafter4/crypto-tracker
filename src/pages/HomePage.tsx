import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCryptos } from "../cryptoApi";
import type { Crypto } from "../Crypto";
import CryptoCard from "../components/CryptoCard";

function HomePage() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleFetchCryptos = () => {
    setLoading(true);
    fetchCryptos()
      .then((data: Crypto[]) => setCryptos(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleFetchCryptos();
  }, []);

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold">Crypto Tracker </h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by coin name..."
          className="p-2 border rounded w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          onClick={handleFetchCryptos}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCryptos.map(crypto => (
          <Link to={`/crypto/${crypto.id}`} key={crypto.id}>
            <CryptoCard crypto={crypto} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
