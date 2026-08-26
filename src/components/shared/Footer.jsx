import Link from "next/link";
import { FaXTwitter, FaYoutube, FaFacebookF } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Col 1: Brand & Contact Info */}
          <div>
            <Link
              href="/"
              className="text-2xl font-black tracking-wider text-[#065F46] inline-block mb-3"
            >
              Venue<span className="text-[#D97706]">X</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4 max-w-sm">
              Your ultimate sports facility booking platform. Book turfs,
              badminton courts, and pools with ease.
            </p>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                support@venuex.com
              </p>
              <p>
                <span className="font-semibold text-gray-900">Phone:</span> +880
                1700-000000
              </p>
              <p>
                <span className="font-semibold text-gray-900">Location:</span>{" "}
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-[#065F46] font-bold uppercase tracking-wider mb-1">
              Quick Navigation
            </span>
            <Link href="/" className="text-sm text-gray-600 hover:text-[#065F46] hover:underline transition-colors">
              Home
            </Link>
            <Link href="/facilities" className="text-sm text-gray-600 hover:text-[#065F46] hover:underline transition-colors">
              All Facilities
            </Link>
            <Link href="/login" className="text-sm text-gray-600 hover:text-[#065F46] hover:underline transition-colors">
              User Login
            </Link>
            <Link href="/register" className="text-sm text-gray-600 hover:text-[#065F46] hover:underline transition-colors">
              Register Account
            </Link>
          </div>

          {/* Col 3: Social Links */}
          <div>
            <span className="text-sm text-[#065F46] font-bold uppercase tracking-wider mb-3 block">
              Follow Us
            </span>
            <div className="flex gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-[#065F46] hover:text-white border border-gray-200 shadow-sm transition-all"
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={16} />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-[#065F46] hover:text-white border border-gray-200 shadow-sm transition-all"
                aria-label="YouTube"
              >
                <FaYoutube size={16} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-[#065F46] hover:text-white border border-gray-200 shadow-sm transition-all"
                aria-label="Facebook"
              >
                <FaFacebookF size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by VenueX
            Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;