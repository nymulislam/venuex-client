"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaTicketAlt,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // useEffect-এর ভেতরে ফেচিং লজিক রাখা
  useEffect(() => {
    let isMounted = true;

    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        if (isMounted) {
          setBookings(data);
        }
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Cancel / Delete Booking
  const handleCancelBooking = async (id) => {
    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const res = await fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Booking cancelled successfully!");
        setBookings((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(data.message || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Cancel Booking Error:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-[#065F46] font-bold text-lg animate-pulse">
          Loading Your Bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] mb-6 hover:underline"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">My Bookings</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage and view all your reserved sports venues & slots.
            </p>
          </div>
          <span className="bg-[#065F46]/10 text-[#065F46] font-bold text-xs sm:text-sm px-4 py-2 rounded-full">
            Total Bookings: {bookings.length}
          </span>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm min-h-[50vh] flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
              <FaTicketAlt size={28} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">No Bookings Found!</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-sm">
              You haven&apos;t booked any facilities yet. Browse our available venues and reserve your slot today.
            </p>
            <Link
              href="/"
              className="mt-6 btn bg-[#065F46] hover:bg-[#044e39] text-white px-6 rounded-xl border-none shadow-md"
            >
              Browse Facilities
            </Link>
          </div>
        ) : (
          /* Bookings List */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="text-lg font-bold text-gray-900 leading-snug">
                      {item.facilityName}
                    </h2>
                    <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0">
                      {item.status || "Confirmed"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <FaMapMarkerAlt className="text-[#D97706]" />
                    <span>{item.location || "Location Unavailable"}</span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 flex items-center gap-2">
                        <FaCalendarAlt className="text-[#065F46]" /> Date:
                      </span>
                      <span className="font-semibold text-gray-800">{item.date}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 flex items-center gap-2">
                        <FaClock className="text-[#D97706]" /> Slot:
                      </span>
                      <span className="font-semibold text-gray-800">{item.slot}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200/60">
                      <span className="text-gray-500 flex items-center gap-2">
                        <FaUser className="text-gray-400" /> Booked By:
                      </span>
                      <span className="font-medium text-gray-700">{item.userName}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" /> Email:
                      </span>
                      <span className="font-medium text-gray-700 truncate max-w-[180px]">
                        {item.userEmail}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400 block">Total Rate</span>
                    <span className="text-lg font-black text-[#065F46]">
                      ৳{item.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCancelBooking(item._id)}
                    disabled={deletingId === item._id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-xl transition border border-red-100 disabled:opacity-50"
                  >
                    <FaTrashAlt size={12} />
                    {deletingId === item._id ? "Cancelling..." : "Cancel Booking"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}