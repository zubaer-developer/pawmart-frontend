import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

function PetsAndSupplies() {
  useTitle("Pets & Supplies");
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/listings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllListings(data.data);
          setFilteredListings(data.data);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...allListings];
    if (search)
      result = result.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase())
      );
    if (category) result = result.filter((l) => l.category === category);
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    setFilteredListings(result);
  }, [search, category, sort, allListings]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Pets & Supplies
        </h1>
        <p className="text-gray-500">
          Find your perfect companion or shop for supplies
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-sm p-6 mb-12 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-white transition-all outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full lg:w-48 px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-white transition-all outline-none"
        >
          <option value="">All Categories</option>
          <option value="Pets">Pets</option>
          <option value="Food">Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Care Products">Care</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full lg:w-48 px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-white transition-all outline-none"
        >
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">🔍</span>
          <p className="text-gray-500">
            No listings found matching your criteria
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("");
              setSort("");
            }}
            className="text-orange-500 font-bold mt-2"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                  {listing.category}
                </div>
                {listing.price === 0 && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Free Adoption
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                  {listing.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-orange-500 font-bold text-xl">
                    {listing.price === 0 ? "Free" : `৳${listing.price}`}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    📍 {listing.location}
                  </span>
                </div>
                <Link
                  to={`/listing/${listing._id}`}
                  className="block w-full py-3 bg-gray-900 text-white text-center rounded-xl font-bold hover:bg-orange-500 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PetsAndSupplies;
