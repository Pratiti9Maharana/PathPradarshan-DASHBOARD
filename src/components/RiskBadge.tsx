type RiskLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' | 'HEALTHY';

const config: Record<RiskLevel, { bg: string; text: string; dot: string }> = {
  CRITICAL: { bg: 'bg-red-500/15 border border-red-500/30', text: 'text-red-400', dot: 'bg-red-500' },
  HIGH: { bg: 'bg-orange-500/15 border border-orange-500/30', text: 'text-orange-400', dot: 'bg-orange-500' },
  MODERATE: { bg: 'bg-yellow-500/15 border border-yellow-500/30', text: 'text-yellow-400', dot: 'bg-yellow-500' },
  LOW: { bg: 'bg-blue-500/15 border border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500' },
  HEALTHY: { bg: 'bg-green-500/15 border border-green-500/30', text: 'text-green-400', dot: 'bg-green-500' },
};

export default function RiskBadge({ level }: { level: RiskLevel }) {
  const c = config[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold font-mono ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {level}
    </span>
  );
}
