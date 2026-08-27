"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FaSearch, FaMapMarkerAlt, FaUsers, FaClock, FaFilter, FaUndo } from "react-icons/fa";

const categories = ["All", "Football", "Badminton", "Swimming", "Tennis", "Cricket", "Basketball", "Table Tennis", "Squash"];

export default function AllFacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ব্যাকএন্ড API থেকে সব ডাটা লোড
  useEffect(() => {
    fetch("http://localhost:5000/facilities")
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data);
        setLoading(false);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Filter facilities dynamically based on Search & Category
  const filteredFacilities = useMemo(() => {
    return facilities.filter((item) => {
      const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.facility_type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [facilities, searchTerm, selectedCategory]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  if (loading) {
    return <div className="text-center py-20 text-[#065F46] font-bold">Loading All Facilities...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest">
            Explore Arenas
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">
            All Sports <span className="text-[#065F46]">Facilities</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Find and book turfs, courts, and pools around your preferred location.
          </p>
        </div>

        {/* Search & Filter Controls Section */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input Box */}
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by facility name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:border-[#065F46] focus:bg-white text-gray-800 transition-all"
              />
            </div>

            {/* Category Filter Pills (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#065F46] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Category Select Dropdown (Mobile/Tablet) */}
            <div className="flex lg:hidden w-full items-center gap-2">
              <FaFilter className="text-gray-400 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-800 focus:outline-none focus:border-[#065F46]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Info & Reset Button */}
          {(searchTerm || selectedCategory !== "All") && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>
                Showing results for:{" "}
                <strong className="text-[#065F46]">
                  {selectedCategory !== "All" ? selectedCategory : "All Categories"}
                </strong>
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[#D97706] font-semibold hover:underline"
              >
                <FaUndo size={10} /> Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Facilities Grid */}
        {filteredFacilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-[#065F46] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {item.facility_type}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#065F46] transition-colors line-clamp-1">
                      {item.name}
                    </h2>

                    <div className="flex items-center text-gray-500 text-xs sm:text-sm mt-2 gap-1.5">
                      <FaMapMarkerAlt className="text-[#D97706] shrink-0" />
                      <span className="line-clamp-1">{item.location}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600 font-medium">
                      <div className="flex items-center gap-1">
                        <FaUsers className="text-[#065F46]" />
                        <span>Cap: {item.capacity} Players</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="text-[#D97706]" />
                        <span>Hourly Basis</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Booking Action Button */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 font-medium block">Price</span>
                      <p className="text-lg font-black text-[#065F46]">
                        ৳{item.price_per_hour}
                        <span className="text-xs font-normal text-gray-500"> / hr</span>
                      </p>
                    </div>

                    <Link
                      href={`/facilities/${item._id}`}
                      className="btn bg-[#065F46] hover:bg-[#044e39] text-white border-none btn-sm rounded-lg font-semibold px-4 shadow-sm"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaSearch />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No Facilities Found</h3>
            <p className="text-gray-500 text-sm mt-1">
              We couldn&apos;t find any sports facility matching your query.
            </p>
            <button
              onClick={handleReset}
              className="mt-5 btn bg-[#065F46] hover:bg-[#044e39] text-white border-none btn-sm rounded-lg px-6"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}