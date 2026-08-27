import { FaSearch, FaCalendarCheck, FaCreditCard, FaFutbol } from "react-icons/fa";

const steps = [
  {
    id: "01",
    title: "Find Your Venue",
    description: "Browse turfs, courts, and pools by location, sport category, or capacity.",
    icon: FaSearch,
  },
  {
    id: "02",
    title: "Select Time Slot",
    description: "Pick your preferred date and convenient time slot in real-time.",
    icon: FaCalendarCheck,
  },
  {
    id: "03",
    title: "Instant Booking",
    description: "Confirm your reservation with transparent hourly pricing instantly.",
    icon: FaCreditCard,
  },
  {
    id: "04",
    title: "Play & Enjoy",
    description: "Show up at the facility and enjoy your favorite sports match with friends.",
    icon: FaFutbol,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">
            How <span className="text-[#065F46]">VenueX</span> Works
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Book your sports venue in just four easy steps with zero hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className="relative bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-[#065F46]/30 hover:shadow-lg transition-all duration-300"
              >
                <span className="absolute top-4 right-4 text-3xl font-black text-[#065F46]/10">
                  {step.id}
                </span>
                <div className="w-12 h-12 rounded-xl bg-[#065F46] text-white flex items-center justify-center text-xl mb-4 shadow-md">
                  <IconComponent />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;