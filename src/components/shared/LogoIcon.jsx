const LogoIcon = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Deep Emerald Green Gradient */}
        <linearGradient id="vx-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#065F46" />
        </linearGradient>

        {/* Desert Gold Gradient */}
        <linearGradient id="vx-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Stadium/Arena Track Outer Frame */}
      <rect
        x="12"
        y="18"
        width="76"
        height="64"
        rx="32"
        stroke="url(#vx-emerald)"
        strokeWidth="7"
        fill="none"
      />

      {/* Stylized 'V' Shape (Emerald Green) */}
      <path
        d="M 28 36 L 50 70 L 58 57"
        stroke="url(#vx-emerald)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Stylized Dynamic 'X' Stroke (Desert Gold) */}
      <path
        d="M 72 36 L 42 70"
        stroke="url(#vx-gold)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Center Field Spot / Turf Ball Icon */}
      <circle cx="50" cy="50" r="4" fill="url(#vx-gold)" />
    </svg>
  );
};

export default LogoIcon;