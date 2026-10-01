interface ResilienceRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
}

export default function ResilienceRing({ value, size = 100, strokeWidth = 8 }: ResilienceRingProps) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  const color = value >= 75 ? '#22c55e' : value >= 50 ? '#eab308' : value >= 30 ? '#f97316' : '#ef4444';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#1e2d47" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold text-white" style={{ fontSize: size * 0.22 }}>{value}%</span>
        <span className="text-[#64748b]" style={{ fontSize: size * 0.09 }}>Resilience</span>
      </div>
    </div>
  );
}
