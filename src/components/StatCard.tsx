interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'default';
  icon?: React.ReactNode;
}

const colors = {
  green: 'text-green-400',
  yellow: 'text-yellow-400',
  orange: 'text-orange-400',
  red: 'text-red-400',
  blue: 'text-blue-400',
  default: 'text-white',
};

export default function StatCard({
  label,
  value,
  sub,
  color = 'default',
  icon,
}: StatCardProps) {
  return (
    <div className="border-b border-[#1e2d47] pb-3">
      <div className="flex items-center justify-between">
        <span className="text-[#64748b] text-[11px]">
          {label}
        </span>

        {icon && (
          <span className="text-[#475569]">
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mt-1">
        <span className={`font-mono font-semibold text-xl ${colors[color]}`}>
          {value}
        </span>

        {sub && (
          <span className="text-[#475569] text-[10px]">
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}