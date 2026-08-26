import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="relative">
        <h1 className="text-9xl font-black text-[#065F46]/10 select-none">
          404
        </h1>
        <p className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-black text-[#065F46]">
          40<span className="text-[#D97706]">4</span>
        </p>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
        Page Not Found
      </h2>
      
      <p className="text-gray-600 mt-2 max-w-md text-sm sm:text-base">
        Oops! The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 btn bg-[#065F46] hover:bg-[#044e39] text-white border-none px-6 font-semibold rounded-lg shadow-md transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}