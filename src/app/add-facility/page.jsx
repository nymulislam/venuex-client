"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaPlusCircle, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaUsers, FaImage, FaFileAlt } from "react-icons/fa";

export default function AddFacilityPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    facility_type: "Football",
    location: "",
    price_per_hour: "",
    capacity: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/facilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Facility added successfully!");
        router.push("/"); // Redirect to home page after success
      } else {
        alert(data.message || "Failed to add facility.");
      }
    } catch (error) {
      console.error("Error adding facility:", error);
      alert("Something went wrong! Make sure your server is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] mb-6 hover:underline"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-[#065F46]/10 flex items-center justify-center text-[#065F46]">
              <FaPlusCircle className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Add New Facility</h1>
              <p className="text-xs text-gray-500">Fill in the details below to list a new sports turf or court.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Facility Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Facility / Turf Name *
              </label>
              <div className="relative">
                <FaBuilding className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Crown Football Turf"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46]"
                />
              </div>
            </div>

            {/* Type & Location (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Facility Type *
                </label>
                <select
                  name="facility_type"
                  value={formData.facility_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46] bg-white"
                >
                  <option value="Football">Football</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Squash">Squash</option>
                  <option value="Basketball">Basketball</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Location *
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. Banani, Dhaka"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46]"
                  />
                </div>
              </div>
            </div>

            {/* Price & Capacity (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Price Per Hour (৳) *
                </label>
                <div className="relative">
                  <FaDollarSign className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="number"
                    name="price_per_hour"
                    required
                    min="1"
                    placeholder="e.g. 1500"
                    value={formData.price_per_hour}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Capacity (Players) *
                </label>
                <div className="relative">
                  <FaUsers className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="number"
                    name="capacity"
                    required
                    min="1"
                    placeholder="e.g. 10"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46]"
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Image URL *
              </label>
              <div className="relative">
                <FaImage className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="url"
                  name="image"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46]"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Provide a direct image URL (Unsplash/ImgBB/etc.)</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Description *
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  required
                  rows="4"
                  placeholder="Provide a detailed description of the turf, pitch conditions, and lighting amenities..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46]"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-[#065F46] hover:bg-[#044e39] text-white font-bold rounded-xl shadow-md transition border-none disabled:opacity-50"
              >
                {submitting ? "Adding Facility..." : "Add Facility"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}