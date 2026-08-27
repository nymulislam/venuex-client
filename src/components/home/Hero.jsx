
import Link from "next/link";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/30 py-12 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Content & Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#065F46]/10 text-[#065F46] font-semibold text-xs sm:text-sm tracking-wide border border-[#065F46]/20">
              ⚽ Instant Sports Venue Booking
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              Find & Book Your <br />
              <span className="text-[#065F46]">Favorite Arena</span> with{" "}
              <span className="text-[#D97706]">VenueX</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              From football turfs and badminton courts to swimming pools — reserve top-rated venues in your city instantly with zero hassle.
            </p>

            {/* Quick Search Box */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search turf, court or pool..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:border-[#065F46] text-gray-800"
                  />
                </div>
                <div className="relative flex-1">
                  <FaMapMarkerAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location (e.g. Dhaka)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:border-[#065F46] text-gray-800"
                  />
                </div>
                <Link
                  href="/facilities"
                  className="btn bg-[#065F46] hover:bg-[#044e39] text-white border-none rounded-xl px-6 text-sm font-semibold shadow-md"
                >
                  Search
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="pt-4 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 border-t border-gray-200/60">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#065F46]">50+</p>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Turfs & Courts</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#D97706]">10k+</p>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Active Players</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#065F46]">4.9★</p>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">User Rating</p>
              </div>
            </div>
          </div>

          {/* Right Side: Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glow Effects */}
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-[#065F46]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#D97706]/20 rounded-full blur-3xl"></div>

              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000"
                  alt="Sports Facility Turf"
                  className="w-full h-[380px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/40 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Top Rated Turf</p>
                    <p className="text-sm font-bold text-gray-800">Green Arena Turf</p>
                  </div>
                  <span className="px-3 py-1 bg-[#D97706] text-white text-xs font-bold rounded-full">
                    Available Today
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;