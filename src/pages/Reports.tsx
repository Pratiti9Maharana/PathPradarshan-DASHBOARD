import { useState } from 'react';

const REPORTS = [
  {
    id: 1,
    title: 'District Resilience Report',
    type: 'resilience',
    date: '2026-09-21',
    region: 'Assam — All Districts',
    score: 72,
    junctions: 8,
    roads: 14,
    desc: 'Comprehensive overview of road network resilience across all monitored districts.',
    color: 'border-blue-500/25 bg-blue-500/5',
    badge: 'text-blue-400 bg-blue-500/15',
  },
  {
    id: 2,
    title: 'Critical Infrastructure Report',
    type: 'infrastructure',
    date: '2026-09-20',
    region: 'Kamrup & Nagaon',
    score: 58,
    junctions: 5,
    roads: 9,
    desc: 'Detailed analysis of high-criticality junctions and segments requiring priority attention.',
    color: 'border-orange-500/25 bg-orange-500/5',
    badge: 'text-orange-400 bg-orange-500/15',
  },
  {
    id: 3,
    title: 'Failure Simulation Report',
    type: 'simulation',
    date: '2026-09-19',
    region: 'Jorhat District',
    score: 77,
    junctions: 3,
    roads: 6,
    desc: 'Results from Junction #12 failure simulation including alternative route recommendations.',
    color: 'border-red-500/25 bg-red-500/5',
    badge: 'text-red-400 bg-red-500/15',
  },
  {
    id: 4,
    title: 'Infrastructure Planning Report',
    type: 'planning',
    date: '2026-09-18',
    region: 'Sonitpur District',
    score: 78,
    junctions: 6,
    roads: 4,
    desc: 'Impact analysis for proposed flyover at Junction #12 and NH-27 bridge extension.',
    color: 'border-green-500/25 bg-green-500/5',
    badge: 'text-green-400 bg-green-500/15',
  },
];

const TIMELINE = [
  { date: 'Sep 01', score: 68 },
  { date: 'Sep 05', score: 65 },
  { date: 'Sep 10', score: 61 },
  { date: 'Sep 14', score: 69 },
  { date: 'Sep 17', score: 71 },
  { date: 'Sep 21', score: 72 },
];

export default function Reports() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display font-bold text-white text-2xl">Resilience Reports</h1>
          <p className="text-[#64748b] text-sm mt-1">Generated analyses and documentation for decision-makers and planners.</p>
        </div>

        {/* Resilience trend chart */}
        <div className="bg-[#0f172a] border border-[#1e2d47] rounded-xl p-5 mb-6">
          <h2 className="font-display font-semibold text-white text-sm mb-4">Resilience Index — September 2026</h2>
          <ResilienceChart data={TIMELINE} />
        </div>

        {/* Report cards */}
        <div className="grid grid-cols-2 gap-4">
          {REPORTS.map(r => (
            <div
              key={r.id}
              className={`border rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg ${r.color} ${selected === r.id ? 'ring-1 ring-blue-500/50' : ''}`}
              onClick={() => setSelected(selected === r.id ? null : r.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-semibold text-white text-sm">{r.title}</h3>
                  <p className="text-[#64748b] text-[11px] mt-0.5">{r.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Date</span>
                  <span className="text-[#94a3b8] font-mono">{r.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Region</span>
                  <span className="text-[#94a3b8] truncate max-w-[100px]">{r.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Resilience</span>
                  <span className={`font-mono font-bold ${r.score >= 70 ? 'text-green-400' : r.score >= 55 ? 'text-yellow-400' : 'text-red-400'}`}>{r.score}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Crit. Junctions</span>
                  <span className="text-orange-400 font-mono">{r.junctions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Affected Roads</span>
                  <span className="text-red-400 font-mono">{r.roads}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-1.5 text-[11px] font-medium text-white bg-[#1e2d47] hover:bg-[#2d3f5e] rounded transition-colors">
                  View
                </button>
                <button className="flex-1 py-1.5 text-[11px] font-medium text-[#64748b] border border-[#1e2d47] hover:border-[#2d3f5e] hover:text-white rounded transition-colors">
                  Download PDF
                </button>
                <button className="px-3 py-1.5 text-[11px] font-medium text-[#64748b] border border-[#1e2d47] hover:border-[#2d3f5e] hover:text-white rounded transition-colors">
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Total Reports', value: '12', sub: 'This month' },
            { label: 'Districts Covered', value: '7', sub: 'Northeast India' },
            { label: 'Avg Resilience', value: '71%', sub: 'All districts' },
            { label: 'Recommendations', value: '23', sub: 'Action items' },
          ].map(s => (
            <div key={s.label} className="bg-[#0f172a] border border-[#1e2d47] rounded-xl p-4 text-center">
              <div className="font-display font-bold text-2xl text-white">{s.value}</div>
              <div className="text-white text-xs mt-0.5">{s.label}</div>
              <div className="text-[#475569] text-[10px]">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResilienceChart({ data }: { data: { date: string; score: number }[] }) {
  const maxScore = 100;
  const minScore = 50;
  const height = 120;
  const width = 600;
  const padding = { top: 10, right: 20, bottom: 30, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const xStep = chartW / (data.length - 1);
  const yScale = (v: number) => chartH - ((v - minScore) / (maxScore - minScore)) * chartH;

  const points = data.map((d, i) => ({ x: i * xStep, y: yScale(d.score), ...d }));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartH} L 0 ${chartH} Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 120 }}>
        <g transform={`translate(${padding.left},${padding.top})`}>
          {/* Grid lines */}
          {[60, 70, 80, 90].map(v => (
            <g key={v}>
              <line x1={0} y1={yScale(v)} x2={chartW} y2={yScale(v)} stroke="#1e2d47" strokeWidth="1"/>
              <text x={-8} y={yScale(v) + 4} textAnchor="end" fill="#334155" fontSize="9" fontFamily="JetBrains Mono">{v}</text>
            </g>
          ))}

          {/* Area */}
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#chartGrad)"/>

          {/* Line */}
          <path d={pathD} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>

          {/* Points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={4} fill="#0f172a" stroke="#22c55e" strokeWidth="1.5"/>
              <text x={p.x} y={chartH + 16} textAnchor="middle" fill="#475569" fontSize="8" fontFamily="Inter">{p.date}</text>
              <text x={p.x} y={p.y - 7} textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="JetBrains Mono">{p.score}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
