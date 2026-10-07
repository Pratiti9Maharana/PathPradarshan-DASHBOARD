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
    <div className="h-full overflow-y-auto bg-gradient-to-br from-[#060d1f] via-[#0b1717] to-[#14251d]">
      <div className="max-w-5xl mx-auto px-6 py-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-white text-2xl">
            Resilience Reports
          </h1>

          <p className="text-[#a7b5aa] text-sm mt-1">
            Generated analyses and documentation for decision-makers and planners.
          </p>
        </div>

        {/* RESILIENCE TREND */}
        <section className="border-y border-[#294535] py-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-semibold text-white text-sm">
                Resilience Index — September 2026
              </h2>

              <p className="text-[#718078] text-[10px] mt-1">
                Network resilience trend across monitored districts
              </p>
            </div>

            <div className="text-right">
              <div className="text-[#a8c5ae] font-mono font-bold text-lg">
                72%
              </div>
              <div className="text-[#718078] text-[9px] uppercase tracking-wider">
                Current Index
              </div>
            </div>
          </div>

          <ResilienceChart data={TIMELINE} />
        </section>

        {/* REPORTS */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#9eafa2] text-[10px] uppercase tracking-[0.15em]">
              Generated Reports
            </h2>

            <span className="text-[#65756a] text-[10px] font-mono">
              {REPORTS.length} AVAILABLE
            </span>
          </div>

          <div className="border-t border-[#294535]">
            {REPORTS.map(r => (
              <div
                key={r.id}
                onClick={() =>
                  setSelected(selected === r.id ? null : r.id)
                }
                className={`group border-b border-[#294535] py-4 cursor-pointer transition-all ${
                  selected === r.id
                    ? 'bg-[#426B52]/8'
                    : 'hover:bg-[#426B52]/5'
                }`}
              >
                <div className="flex items-start gap-4">

                  {/* REPORT NUMBER */}
                  <div className="w-7 flex-none pt-0.5">
                    <span
                      className={`font-mono text-xs ${
                        selected === r.id
                          ? 'text-[#a8c5ae]'
                          : 'text-[#536158]'
                      }`}
                    >
                      0{r.id}
                    </span>
                  </div>

                  {/* MAIN CONTENT */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display font-semibold text-white text-sm">
                          {r.title}
                        </h3>

                        <p className="text-[#89988e] text-[11px] mt-1 leading-relaxed max-w-xl">
                          {r.desc}
                        </p>
                      </div>

                      {/* SCORE */}
                      <div className="text-right flex-none">
                        <div
                          className={`font-mono font-bold text-lg ${
                            r.score >= 70
                              ? 'text-[#a8c5ae]'
                              : r.score >= 55
                                ? 'text-[#d1c47b]'
                                : 'text-[#d49a9a]'
                          }`}
                        >
                          {r.score}%
                        </div>

                        <div className="text-[#65756a] text-[9px] uppercase tracking-wider">
                          Resilience
                        </div>
                      </div>
                    </div>

                    {/* METADATA */}
                    <div className="flex items-center gap-5 mt-3 text-[10px]">
                      <div>
                        <span className="text-[#536158] uppercase tracking-wide">
                          Date
                        </span>
                        <span className="text-[#a7b5aa] font-mono ml-2">
                          {r.date}
                        </span>
                      </div>

                      <div>
                        <span className="text-[#536158] uppercase tracking-wide">
                          Region
                        </span>
                        <span className="text-[#a7b5aa] ml-2">
                          {r.region}
                        </span>
                      </div>

                      <div>
                        <span className="text-[#536158] uppercase tracking-wide">
                          Critical Junctions
                        </span>
                        <span className="text-[#d1b58a] font-mono ml-2">
                          {r.junctions}
                        </span>
                      </div>

                      <div>
                        <span className="text-[#536158] uppercase tracking-wide">
                          Affected Roads
                        </span>
                        <span className="text-[#c99595] font-mono ml-2">
                          {r.roads}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS — only visible on hover/selection */}
                    <div
                      className={`flex gap-2 mt-4 transition-all ${
                        selected === r.id
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <button
                        onClick={e => e.stopPropagation()}
                        className="px-4 py-1.5 text-[10px] font-medium text-white bg-[#426B52] hover:bg-[#557d62] transition-colors"
                      >
                        View
                      </button>

                      <button
                        onClick={e => e.stopPropagation()}
                        className="px-4 py-1.5 text-[10px] font-medium text-[#a7b5aa] border border-[#294535] hover:border-[#426B52] hover:text-white transition-colors"
                      >
                        Download PDF
                      </button>

                      <button
                        onClick={e => e.stopPropagation()}
                        className="px-4 py-1.5 text-[10px] font-medium text-[#a7b5aa] border border-[#294535] hover:border-[#426B52] hover:text-white transition-colors"
                      >
                        Share
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mt-6 border-y border-[#294535] py-4">
          <div className="grid grid-cols-4 divide-x divide-[#294535]">

            {[
              {
                label: 'Total Reports',
                value: '12',
                sub: 'This month',
              },
              {
                label: 'Districts Covered',
                value: '7',
                sub: 'Northeast India',
              },
              {
                label: 'Avg Resilience',
                value: '71%',
                sub: 'All districts',
              },
              {
                label: 'Recommendations',
                value: '23',
                sub: 'Action items',
              },
            ].map(s => (
              <div
                key={s.label}
                className="text-center px-4"
              >
                <div className="font-display font-bold text-xl text-white">
                  {s.value}
                </div>

                <div className="text-[#b5c0b7] text-[10px] mt-0.5">
                  {s.label}
                </div>

                <div className="text-[#65756a] text-[9px] mt-0.5">
                  {s.sub}
                </div>
              </div>
            ))}

          </div>
        </section>

      </div>
    </div>
  );
}


/* =========================================================
   RESILIENCE CHART
   ========================================================= */

function ResilienceChart({
  data,
}: {
  data: { date: string; score: number }[];
}) {
  const maxScore = 100;
  const minScore = 50;

  const height = 120;
  const width = 600;

  const padding = {
    top: 10,
    right: 20,
    bottom: 30,
    left: 40,
  };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const xStep = chartW / (data.length - 1);

  const yScale = (v: number) =>
    chartH -
    ((v - minScore) / (maxScore - minScore)) *
      chartH;

  const points = data.map((d, i) => ({
    x: i * xStep,
    y: yScale(d.score),
    ...d,
  }));

  const pathD = points
    .map(
      (p, i) =>
        `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    )
    .join(' ');

  const areaD = `
    ${pathD}
    L ${points[points.length - 1].x} ${chartH}
    L 0 ${chartH}
    Z
  `;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height: 120 }}
      >
        <g
          transform={`translate(${padding.left},${padding.top})`}
        >

          {/* GRID */}
          {[60, 70, 80, 90].map(v => (
            <g key={v}>
              <line
                x1={0}
                y1={yScale(v)}
                x2={chartW}
                y2={yScale(v)}
                stroke="#294535"
                strokeWidth="1"
              />

              <text
                x={-8}
                y={yScale(v) + 4}
                textAnchor="end"
                fill="#536158"
                fontSize="9"
                fontFamily="JetBrains Mono"
              >
                {v}
              </text>
            </g>
          ))}

          {/* AREA */}
          <defs>
            <linearGradient
              id="chartGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#426B52"
                stopOpacity="0.28"
              />

              <stop
                offset="100%"
                stopColor="#426B52"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <path
            d={areaD}
            fill="url(#chartGrad)"
          />

          {/* LINE */}
          <path
            d={pathD}
            fill="none"
            stroke="#7da589"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* POINTS */}
          {points.map((p, i) => (
            <g key={i}>

              <circle
                cx={p.x}
                cy={p.y}
                r={4}
                fill="#0b1713"
                stroke="#7da589"
                strokeWidth="1.5"
              />

              <text
                x={p.x}
                y={chartH + 16}
                textAnchor="middle"
                fill="#65756a"
                fontSize="8"
                fontFamily="Inter"
              >
                {p.date}
              </text>

              <text
                x={p.x}
                y={p.y - 7}
                textAnchor="middle"
                fill="#a8c5ae"
                fontSize="8"
                fontFamily="JetBrains Mono"
              >
                {p.score}
              </text>

            </g>
          ))}

        </g>
      </svg>
    </div>
  );
}

