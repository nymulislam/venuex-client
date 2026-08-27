// components/home/FeaturedFacilities.jsx
"use client";

import Link from "next/link";
import { FaMapMarkerAlt, FaUsers, FaClock } from "react-icons/fa";

// Sample initial data matching MongoDB Facilities Collection Schema
const sampleFacilities = [
  {
    _id: "1",
    name: "Green Arena Football Turf",
    facility_type: "Football",
    location: "Dhanmondi, Dhaka",
    price_per_hour: 2500,
    capacity: 14,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
  },
  {
    _id: "2",
    name: "Smash Badminton Academy",
    facility_type: "Badminton",
    location: "Gulshan, Dhaka",
    price_per_hour: 1200,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=600",
  },
  {
    _id: "3",
    name: "Aqua Blue Swimming Pool",
    facility_type: "Swimming",
    location: "Uttara, Dhaka",
    price_per_hour: 800,
    capacity: 10,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=600",
  },
  {
    _id: "4",
    name: "Crown Tennis Court",
    facility_type: "Tennis",
    location: "Banani, Dhaka",
    price_per_hour: 1800,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=600",
  },
  {
    _id: "5",
    name: "PowerPlay Indoor Cricket Turf",
    facility_type: "Cricket",
    location: "Mirpur, Dhaka",
    price_per_hour: 2000,
    capacity: 12,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=600",
  },
  {
    _id: "6",
    name: "Velocity Basketball Court",
    facility_type: "Basketball",
    location: "Bashundhara, Dhaka",
    price_per_hour: 1500,
    capacity: 10,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600",
  },
];

const FeaturedFacilities = ({ facilities = sampleFacilities }) => {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest">
            Top Rated Arenas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">
            Featured <span className="text-[#065F46]">Facilities</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Explore and book the best sports venues in town with instant confirmation.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.slice(0, 6).map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Type Badge */}
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
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#065F46] transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  <div className="flex items-center text-gray-500 text-xs sm:text-sm mt-2 gap-1.5">
                    <FaMapMarkerAlt className="text-[#D97706] shrink-0" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>

                  {/* Info Tags */}
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

                {/* Footer / Price & Action */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 font-medium block">Price</span>
                    <p className="text-lg font-black text-[#065F46]">
                      ৳{item.price_per_hour}
                      <span className="text-xs font-normal text-gray-500"> / hr</span>
                    </p>
                  </div>

                  <Link
                    href={`/facility/${item._id}`}
                    className="btn bg-[#065F46] hover:bg-[#044e39] text-white border-none btn-sm rounded-lg font-semibold px-4 shadow-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/facilities"
            className="btn btn-outline border-[#065F46] text-[#065F46] hover:bg-[#065F46] hover:text-white hover:border-[#065F46] rounded-xl px-8 font-semibold"
          >
            Explore All Facilities
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedFacilities;