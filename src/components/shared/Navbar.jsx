"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "./LogoIcon";

const Navbar = ({ isLoggedIn = false, user = null, handleLogout }) => {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    const navLinks = (
        <>
            <li>
                <Link
                    href="/"
                    className={
                        isActive("/")
                            ? "text-[#065F46] font-bold underline underline-offset-4"
                            : "text-gray-700 hover:text-[#065F46]"
                    }
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    href="/facilities"
                    className={
                        isActive("/facilities")
                            ? "text-[#065F46] font-bold underline underline-offset-4"
                            : "text-gray-700 hover:text-[#065F46]"
                    }
                >
                    All Facilities
                </Link>
            </li>
            <li>
                <Link
                    href="/add-facility"
                    className={
                        isActive("/add-facility")
                            ? "text-[#065F46] font-bold underline underline-offset-4"
                            : "text-gray-700 hover:text-[#065F46]"
                    }
                >
                    Add Facility
                </Link>
            </li>
            <li>
                <Link
                    href="/my-bookings"
                    className={
                        isActive("/my-bookings")
                            ? "text-[#065F46] font-bold underline underline-offset-4"
                            : "text-gray-700 hover:text-[#065F46]"
                    }
                >
                    My Bookings
                </Link>
            </li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200">
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navbar Start: Mobile Menu & Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden pl-0 text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2 shadow-lg border border-gray-100 gap-1"
                        >
                            {navLinks}
                        </ul>
                    </div>

                    <Link
                        href="/"
                        className="btn btn-ghost text-2xl font-black tracking-wider text-[#065F46] hover:bg-transparent"
                    >
                        <LogoIcon className="w-9 h-9" />
                        Venue<span className="text-[#D97706]">X</span>
                    </Link>
                </div>

                {/* Navbar Center: Desktop Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2 font-medium">
                        {navLinks}
                    </ul>
                </div>

                {/* Navbar End: Dynamic Auth UI */}
                <div className="navbar-end">
                    {isLoggedIn ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar ring ring-[#065F46] ring-offset-white ring-offset-2"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User Avatar"
                                        src={
                                            user?.image ||
                                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        }
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box z-10 mt-3 w-56 p-2 shadow-xl gap-1 border border-gray-200"
                            >
                                <li className="menu-title px-4 py-1 text-xs text-gray-500 border-b border-gray-200 mb-1">
                                    {user?.name || "User Dashboard"}
                                </li>
                                <li>
                                    <Link
                                        href="/my-bookings"
                                        className={
                                            isActive("/my-bookings")
                                                ? "bg-gray-100 text-[#065F46] font-semibold"
                                                : "hover:text-[#065F46]"
                                        }
                                    >
                                        My Bookings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/add-facility"
                                        className={
                                            isActive("/add-facility")
                                                ? "bg-gray-100 text-[#065F46] font-semibold"
                                                : "hover:text-[#065F46]"
                                        }
                                    >
                                        Add Facility
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/manage-facilities"
                                        className={
                                            isActive("/manage-facilities")
                                                ? "bg-gray-100 text-[#065F46] font-semibold"
                                                : "hover:text-[#065F46]"
                                        }
                                    >
                                        Manage My Facilities
                                    </Link>
                                </li>
                                <div className="border-t border-gray-200 my-1"></div>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600 font-medium hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="btn bg-[#065F46] hover:bg-[#044e39] text-white border-none btn-sm sm:btn-md font-semibold rounded-lg px-6 shadow-sm"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;