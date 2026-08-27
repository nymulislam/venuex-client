"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaUsers, FaClock, FaArrowLeft, FaTimes } from "react-icons/fa";
import { authClient } from "@/lib/auth-client"; // আপনার প্রজেক্টের পাথ অনুযায়ী ঠিক করে নিন

export default function FacilityDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    date: "",
    slot: "10:00 AM - 11:00 AM",
  });

  useEffect(() => {
    if (!id) return;

    fetch(`https://venuex-server.vercel.app/facilities/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch facility");
        return res.json();
      })
      .then((data) => {
        setFacility(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookNowClick = () => {
    if (!session?.user) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please login first to book a facility!",
        confirmButtonColor: "#065F46",
      });
      return;
    }

    // সেশন থেকে শুধুমাত্র ইমেইল অটো-সেট করা হলো (নাম খালি রাখা হয়েছে যাতে ইউজার নিজে টাইপ করতে পারে)
    setFormData((prev) => ({
      ...prev,
      userEmail: session.user.email || "",
    }));

    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const bookingPayload = {
      facilityId: facility._id,
      facilityName: facility.name,
      location: facility.location,
      price: facility.price_per_hour,
      userName: formData.userName,
      userEmail: formData.userEmail,
      date: formData.date,
      slot: formData.slot,
    };

    try {
      const res = await fetch("https://venuex-server.vercel.app/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      const data = await res.json();

      if (data.success) {
        setIsModalOpen(false);
        setFormData((prev) => ({
          ...prev,
          userName: "",
          date: "",
          slot: "10:00 AM - 11:00 AM",
        }));
        
        Swal.fire({
          title: "Success!",
          text: "Booking Confirmed Successfully!",
          icon: "success",
          confirmButtonColor: "#065F46",
        }).then(() => {
          router.push("/my-bookings"); 
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: data.message || "Booking failed. Please try again.",
          icon: "error",
          confirmButtonColor: "#065F46",
        });
      }
    } catch (error) {
      console.error("Booking Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong! Please try again.",
        icon: "error",
        confirmButtonColor: "#065F46",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-[#065F46] font-bold text-lg animate-pulse">
          Loading Facility Details...
        </div>
      </div>
    );
  }

  if (!facility || !facility.name) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">Facility Not Found!</h2>
        <Link href="/" className="mt-6 btn bg-[#065F46] text-white px-6 rounded-xl border-none">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] mb-6 hover:underline">
          <FaArrowLeft /> Back to Arenas
        </Link>

        {/* Details Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          <div className="relative h-72 md:h-full min-h-[320px] rounded-2xl overflow-hidden bg-gray-100">
            <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 bg-[#065F46] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
              {facility.facility_type}
            </span>
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">{facility.name}</h1>
              <div className="flex items-center text-gray-500 text-sm mt-2 gap-2">
                <FaMapMarkerAlt className="text-[#D97706] shrink-0" />
                <span>{facility.location}</span>
              </div>
              <p className="text-gray-600 text-sm mt-4 leading-relaxed">{facility.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <FaUsers className="text-[#065F46] text-xl shrink-0" />
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Capacity</span>
                    <span className="text-sm font-bold text-gray-800">{facility.capacity} Players</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <FaClock className="text-[#D97706] text-xl shrink-0" />
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Rental Basis</span>
                    <span className="text-sm font-bold text-gray-800">Hourly Rate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 font-medium block">Price per Hour</span>
                <p className="text-2xl font-black text-[#065F46]">
                  ৳{facility.price_per_hour}
                  <span className="text-xs font-normal text-gray-500"> / hr</span>
                </p>
              </div>

              <button
                onClick={handleBookNowClick}
                className="btn bg-[#065F46] hover:bg-[#044e39] text-white font-semibold px-8 rounded-xl border-none shadow-md cursor-pointer"
              >
                {isPending ? "Loading..." : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FaTimes size={18} />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-1">Book {facility.name}</h3>
            <p className="text-xs text-gray-500 mb-6">Rate: ৳{facility.price_per_hour}/hr</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  name="userName"
                  required
                  placeholder="Enter your full name"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Email (Auto-filled)</label>
                <input
                  type="email"
                  name="userEmail"
                  required
                  readOnly
                  value={formData.userEmail}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Booking Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Time Slot</label>
                <select
                  name="slot"
                  value={formData.slot}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46]"
                >
                  <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
                  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                  <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                  <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#065F46] hover:bg-[#044e39] text-white font-semibold rounded-xl transition border-none disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Confirming..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}