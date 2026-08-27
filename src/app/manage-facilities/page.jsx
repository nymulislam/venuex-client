"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaEdit, FaTrashAlt, FaPlus, FaTimes, FaLayerGroup } from "react-icons/fa";

export default function ManageFacilitiesPage() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingFacility, setEditingFacility] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchFacilities = async () => {
            try {
                const res = await fetch("http://localhost:5000/facilities");
                if (!res.ok) throw new Error("Failed to fetch facilities");
                const data = await res.json();
                if (isMounted) {
                    setFacilities(data);
                }
            } catch (error) {
                console.error("Error loading facilities:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchFacilities();

        return () => {
            isMounted = false;
        };
    }, []);

    // Handle Delete Facility
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this facility?");
        if (!confirmed) return;

        setDeletingId(id);

        try {
            const res = await fetch(`http://localhost:5000/facilities/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                alert("Facility deleted successfully!");
                setFacilities((prev) => prev.filter((item) => item._id !== id));
            } else {
                alert(data.message || "Failed to delete facility.");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Something went wrong!");
        } finally {
            setDeletingId(null);
        }
    };

    // Open Edit Modal
    const handleEditClick = (facility) => {
        setEditingFacility({ ...facility });
        setIsEditModalOpen(true);
    };

    // Handle Edit Input Change
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingFacility((prev) => ({ ...prev, [name]: value }));
    };

    // Submit Edit Form
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`http://localhost:5000/facilities/${editingFacility._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingFacility),
            });

            const data = await res.json();

            if (data.success) {
                alert("Facility updated successfully!");
                setFacilities((prev) =>
                    prev.map((item) => (item._id === editingFacility._id ? editingFacility : item))
                );
                setIsEditModalOpen(false);
            } else {
                alert(data.message || "Failed to update facility.");
            }
        } catch (error) {
            console.error("Update Error:", error);
            alert("Something went wrong!");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-[#065F46] font-bold text-lg animate-pulse">
                    Loading Facilities Management...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Navigation Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] mb-6 hover:underline"
                >
                    <FaArrowLeft /> Back to Home
                </Link>

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Manage Facilities</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Add, edit, or remove your listed arenas and courts.
                        </p>
                    </div>

                    <Link
                        href="/add-facility"
                        className="inline-flex items-center gap-2 bg-[#065F46] hover:bg-[#044e39] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-md w-fit"
                    >
                        <FaPlus /> Add New Facility
                    </Link>
                </div>

                {/* Facilities Table Container */}
                {facilities.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm min-h-[40vh] flex flex-col items-center justify-center">
                        <FaLayerGroup size={32} className="text-gray-300 mb-3" />
                        <h2 className="text-lg font-bold text-gray-800">No Facilities Available</h2>
                        <p className="text-xs text-gray-500 mt-1">Start by adding a new venue to your platform.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs sm:text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
                                        <th className="p-4">Facility</th>
                                        <th className="p-4">Type</th>
                                        <th className="p-4">Location</th>
                                        <th className="p-4">Price / hr</th>
                                        <th className="p-4">Capacity</th>
                                        <th className="p-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                    {facilities.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50/80 transition">
                                            <td className="p-4 flex items-center gap-3 font-semibold text-gray-900">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-100"
                                                />
                                                <span className="truncate max-w-[180px]">{item.name}</span>
                                            </td>
                                            <td className="p-4 font-medium">{item.facility_type}</td>
                                            <td className="p-4">{item.location}</td>
                                            <td className="p-4 font-bold text-[#065F46]">৳{item.price_per_hour}</td>
                                            <td className="p-4">{item.capacity} Players</td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEditClick(item)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        disabled={deletingId === item._id}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        <FaTrashAlt size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingFacility && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg relative shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes size={18} />
                        </button>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Facility</h3>

                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Facility Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={editingFacility.name}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Facility Type</label>
                                    <select
                                        name="facility_type"
                                        value={editingFacility.facility_type}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46] bg-white"
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
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        required
                                        value={editingFacility.location}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Price / hr (৳)</label>
                                    <input
                                        type="number"
                                        name="price_per_hour"
                                        required
                                        value={editingFacility.price_per_hour}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Capacity</label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        required
                                        value={editingFacility.capacity}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    required
                                    value={editingFacility.image}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows="3"
                                    value={editingFacility.description}
                                    onChange={handleEditChange}
                                    className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#065F46]"
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3 bg-[#065F46] hover:bg-[#044e39] text-white font-semibold rounded-xl transition border-none disabled:opacity-50"
                                >
                                    {submitting ? "Saving Changes..." : "Update Facility"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}