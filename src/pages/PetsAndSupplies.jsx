import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

function PetsAndSupplies() {
  useTitle("Pets & Supplies");
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]"
  );

  const API_BASE_URL = isLocalhost
    ? "http://localhost:5000"
    : "https://pawmart-backend-beta.vercel.app";

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, category, sort, allListings]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/listings`);
      const data = await response.json();
      if (data.success) {
        setAllListings(data.data);
        setFilteredListings(data.data);
      } else {
        setError("Failed to fetch listings");
      }
    } catch (err) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...allListings];
    if (search) {
      result = result.filter((listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      result = result.filter((listing) => listing.category === category);
    }
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredListings(result);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-bold">{error}</div>
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-gray-950 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Pets & <span className="text-orange-500">Supplies</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Find everything your furry friend needs, from premium nutrition to
            their forever home.
          </p>
        </div>
      </div>

      <div className="container mx-auto -mt-10">
        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name..."
                  className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none"
              >
                <option value="">All Categories</option>
                <option value="Pets">Pets</option>
                <option value="Food">Food</option>
                <option value="Accessories">Accessories</option>
                <option value="Care Products">Care Products</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                Sort By
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none"
              >
                <option value="">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="h-11 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-orange-500 transition-all active:scale-95"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between px-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Results:{" "}
            <span className="text-orange-500">{filteredListings.length}</span> /{" "}
            {allListings.length}
          </p>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
            <span className="text-5xl mb-4 block">🔎</span>
            <p className="text-gray-500 font-medium">
              No results matched your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing._id}
                className="group bg-white rounded-[2rem] overflow-hidden border border-transparent hover:border-orange-100 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-44 md:h-52 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase">
                      {listing.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-1 truncate group-hover:text-orange-500 transition-colors">
                    {listing.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-4">
                    <span>📍</span>
                    <span className="truncate">{listing.location}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="font-black text-gray-900 text-sm">
                      {listing.price === 0 ? (
                        <span className="text-green-500">FREE</span>
                      ) : (
                        `৳${listing.price}`
                      )}
                    </p>
                    <Link to={`/listing/${listing._id}`}>
                      <button className="px-4 py-2 bg-gray-50 group-hover:bg-orange-500 group-hover:text-white text-gray-900 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PetsAndSupplies;
