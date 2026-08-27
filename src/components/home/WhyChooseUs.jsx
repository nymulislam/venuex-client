import { FaShieldAlt, FaBolt, FaTags, FaHeadset } from "react-icons/fa";

const features = [
  {
    title: "100% Verified Venues",
    description: "Every turf and court on our platform is personally verified for top lighting and turf quality.",
    icon: FaShieldAlt,
  },
  {
    title: "Instant Confirmation",
    description: "No waiting for owner approval. Lock in your slot with real-time availability sync.",
    icon: FaBolt,
  },
  {
    title: "Transparent Pricing",
    description: "No hidden charges or surge fees. Pay standard hourly rates directly.",
    icon: FaTags,
  },
  {
    title: "24/7 Dedicated Support",
    description: "Our customer service team is ready to assist with reschedules or inquiries anytime.",
    icon: FaHeadset,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side Content */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest">
              Why VenueX
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              Built for Players, <br />
              <span className="text-[#065F46]">Designed for Ease</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We connect sports enthusiasts with prime facilities across the city, eliminating phone calls and scheduling conflicts.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 bg-[#065F46]/10 px-4 py-3 rounded-xl border border-[#065F46]/20">
                <span className="text-2xl font-black text-[#065F46]">10,000+</span>
                <span className="text-xs text-gray-700 font-medium text-left">
                  Successful bookings <br /> completed this month
                </span>
              </div>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D97706]/10 text-[#D97706] flex items-center justify-center text-lg mb-3">
                    <Icon />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;