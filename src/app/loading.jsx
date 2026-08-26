export default function Loading() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
      <span className="loading loading-spinner loading-lg text-[#065F46]"></span>
      <p className="text-gray-600 font-medium text-sm animate-pulse tracking-wide">
        Loading Venue<span className="text-[#D97706]">X</span>...
      </p>
    </div>
  );
}