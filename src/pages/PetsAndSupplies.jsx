import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import Lenis from "lenis";
import { API_URL } from "../backendConfig";

function PetsAndSupplies() {
  useTitle("Pets & Supplies");
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [paginatedListings, setPaginatedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Setup Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Fetch Data
  useEffect(() => {
    fetch(`${API_URL}/listings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllListings(data.data);
          setFilteredListings(data.data);
        }
        setLoading(false);
      });
  }, []);

  // Filter & Sort Logic
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
    setCurrentPage(1);
  }, [search, category, sort, allListings]);

  // Pagination Logic
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedListings(filteredListings.slice(startIndex, endIndex));

    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, filteredListings]);

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-base-content mb-4">
          Pets & Supplies
        </h1>
        <p className="text-base-content/60">
          Find your perfect companion or shop for supplies
        </p>
      </div>

      {/* Filters (Sticky) */}
      <div className="bg-base-100/80 backdrop-blur-md rounded-3xl shadow-sm p-6 mb-12 flex flex-col lg:flex-row gap-4 items-center border border-base-200">
        <div className="relative flex-1 w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-base-200 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-base-content placeholder:text-base-content/40"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full lg:w-48 px-4 py-3 bg-base-200 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none cursor-pointer text-base-content"
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
          className="w-full lg:w-48 px-4 py-3 bg-base-200 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none cursor-pointer text-base-content"
        >
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-base-200 rounded-3xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : paginatedListings.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4 animate-bounce">🔍</span>
          <p className="text-base-content/60">
            No listings found matching your criteria
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("");
              setSort("");
            }}
            className="btn btn-link text-primary mt-2 no-underline hover:scale-105 transition-transform"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {paginatedListings.map((listing) => (
              <div
                key={listing._id}
                className="group bg-base-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-base-200"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-base-content shadow-sm">
                    {listing.category}
                  </div>
                  {listing.price === 0 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-green-500/30">
                      Free Adoption
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      to={`/listing/${listing._id}`}
                      className="px-6 py-2 bg-white text-black rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary hover:text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-base-content mb-2 truncate group-hover:text-primary transition-colors">
                    {listing.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-black text-xl">
                      {listing.price === 0 ? "Free" : `৳${listing.price}`}
                    </span>
                    <span className="text-base-content/60 text-sm flex items-center gap-1 bg-base-200 px-2 py-1 rounded-lg">
                      📍 {listing.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-base-100 border border-base-200 hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-xl font-bold transition-all ${
                      currentPage === i + 1
                        ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                        : "bg-base-100 text-base-content hover:bg-base-200 border border-base-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-base-100 border border-base-200 hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PetsAndSupplies;
