import { useState } from 'react';
import GisMap from '../components/GisMap';
import RiskBadge from '../components/RiskBadge';

const ANALYSIS_OPTIONS = [
  'Betweenness Centrality',
  'Connectivity',
  'Critical Junctions',
  'Network Density',
  'Resilience Index',
];

const CRITICAL_ROADS = [
  { name: 'NH-27 Segment A', score: 0.71, risk: 'HIGH' as const },
  { name: 'SH-5 Segment B', score: 0.63, risk: 'HIGH' as const },
  { name: 'MDR-12 Segment C', score: 0.47, risk: 'MODERATE' as const },
  { name: 'NH-15 Bypass', score: 0.34, risk: 'MODERATE' as const },
  { name: 'SH-8 Connector', score: 0.21, risk: 'LOW' as const },
];

const TOOLTIP_EXPLANATIONS: Record<string, string> = {
  'Betweenness Centrality':
    'Indicates how important a road or junction is because many routes pass through it.',
  Connectivity:
    'Measures how well-connected parts of the road network are to each other.',
  'Critical Junctions':
    'Identifies intersections whose failure would most severely impact network mobility.',
  'Network Density':
    'The ratio of existing roads to all possible roads in the region.',
  'Resilience Index':
    "Overall measure of the network's ability to maintain connectivity under disruption.",
};

export default function NetworkAnalysis() {
  const [analysis, setAnalysis] = useState('Betweenness Centrality');

  return (
    <div className="h-full flex overflow-hidden">

      {/* MAP */}
      <div className="flex-1 min-w-0">
        <div className="h-full relative">
          <GisMap
            variant="analysis"
            showLegend={true}
            className="h-full"
          />

          {/* BC SCALE */}
          <div className="absolute top-3 left-3 bg-[#171a1d]/95 border border-[#3a3a3a] px-3 py-2">
            <div className="text-[10px] text-[#c0bbb1] uppercase tracking-wider mb-1.5">
              Betweenness Centrality Scale
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs text-[#c0bbb1] font-mono">
                LOW
              </span>

              <div
                className="w-32 h-2"
                style={{
                  background:
                    'linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444)',
                }}
              />

              <span className="text-xs text-[#c0bbb1] font-mono">
                HIGH
              </span>
            </div>
          </div>
        </div>
      </div>

{/* ANALYSIS PANEL */}
<div className="w-80 flex-none border-l border-[#315A45] bg-[#111315] px-4 py-3 overflow-y-auto">

  {/* HEADER */}
  <div className="pb-3 border-b border-[#315A45]">
    <div className="text-[10px] uppercase tracking-widest text-[#6B8065] mb-1">
      NETWORK ANALYSIS
    </div>

    <h1 className="font-display font-semibold text-white text-base">
      Network Dependencies
    </h1>

    <p className="text-[#8a8f98] text-[11px] mt-1 leading-relaxed">
      Identify critical infrastructure and understand network dependencies.
    </p>
  </div>

  {/* SELECT ANALYSIS */}
  <div className="py-3 border-b border-[#315A45]">

    <div className="text-[10px] uppercase tracking-widest text-[#6B8065] mb-2">
      ANALYSIS MODE
    </div>

    <div className="space-y-0.5">
      {ANALYSIS_OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => setAnalysis(opt)}
          className={`w-full flex items-center justify-between px-2 py-1.5 text-xs text-left transition-colors ${
            analysis === opt
              ? 'bg-[#315A45]/25 text-[#D2A85A]'
              : 'text-[#aaa49a] hover:bg-white/[0.03] hover:text-white'
          }`}
        >
          <span>{opt}</span>

          {analysis === opt && (
            <span className="w-1.5 h-1.5 bg-[#D2A85A]" />
          )}
        </button>
      ))}
    </div>

  </div>

  {/* CURRENT ANALYSIS */}
  <div className="py-3 border-b border-[#315A45]">

    <div className="flex items-center gap-2 mb-2">
      <InfoIcon />

      <span className="text-[10px] uppercase tracking-widest text-[#6B8065]">
        CURRENT ANALYSIS
      </span>
    </div>

    <div className="text-sm font-semibold text-white mb-1">
      {analysis}
    </div>

    <p className="text-[#aaa49a] text-[11px] leading-relaxed">
      {TOOLTIP_EXPLANATIONS[analysis]}
    </p>

  </div>

  {/* MOST CRITICAL JUNCTION */}
  <div className="py-3 border-b border-[#315A45]">

    <div className="text-[10px] uppercase tracking-widest text-[#6B8065] mb-2">
      MOST CRITICAL JUNCTION
    </div>

    <div className="flex items-center justify-between mb-2">
      <span className="font-display font-semibold text-white text-sm">
        Junction #12
      </span>

      <RiskBadge level="CRITICAL" />
    </div>

    <div className="space-y-1.5 text-[11px]">

      <div className="flex justify-between">
        <span className="text-[#aaa49a]">
          Centrality Score
        </span>

        <span className="text-[#D2A85A] font-mono font-semibold">
          0.78
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-[#aaa49a]">
          Connected Roads
        </span>

        <span className="text-white font-mono">
          6
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-[#aaa49a]">
          Connected Regions
        </span>

        <span className="text-white font-mono">
          5
        </span>
      </div>

    </div>

    <div className="mt-2 h-1 bg-[#2f332f]">
      <div
        className="h-full bg-[#D2A85A]"
        style={{ width: '78%' }}
      />
    </div>

  </div>

  {/* TOP CRITICAL ROADS */}
  <div className="py-3 border-b border-[#315A45]">

    <div className="text-[10px] uppercase tracking-widest text-[#6B8065] mb-2">
      TOP CRITICAL ROADS
    </div>

    <div>
      {CRITICAL_ROADS.map((road, i) => (
        <div
          key={road.name}
          className="flex items-center gap-2 py-2 border-b border-[#315A45]/70 last:border-b-0"
        >

          <span className="text-[#596057] text-[10px] font-mono w-4">
            {String(i + 1).padStart(2, '0')}
          </span>

          <div className="flex-1 min-w-0">
            <div className="text-white text-xs truncate">
              {road.name}
            </div>

            <div className="text-[#77736b] text-[9px] font-mono mt-0.5">
              BC: {road.score}
            </div>
          </div>

          <RiskBadge level={road.risk} />

        </div>
      ))}
    </div>

  </div>

  {/* CONNECTIVITY METRICS */}
  <div className="py-3 border-b border-[#315A45]">

    <div className="text-[10px] uppercase tracking-widest text-[#6B8065] mb-3">
      CONNECTIVITY METRICS
    </div>

    <div className="space-y-2.5">

      {[
        {
          label: 'Average Degree',
          value: '3.4',
          desc: 'roads per junction',
        },
        {
          label: 'Graph Density',
          value: '0.043',
          desc: 'edge density',
        },
        {
          label: 'Diameter',
          value: '9',
          desc: 'max shortest path',
        },
        {
          label: 'Avg Path Length',
          value: '4.1',
          desc: 'hops',
        },
      ].map((m) => (
        <div
          key={m.label}
          className="flex justify-between items-center"
        >

          <div>
            <div className="text-[#aaa49a] text-[11px]">
              {m.label}
            </div>

            <div className="text-[#77736b] text-[9px]">
              {m.desc}
            </div>
          </div>

          <span className="text-white font-mono font-semibold text-sm">
            {m.value}
          </span>

        </div>
      ))}

    </div>

  </div>

  {/* REPORT */}
  <button
    className="w-full mt-3 border border-[#315A45] py-2 text-[11px] font-medium uppercase tracking-wider text-[#D2A85A] transition-colors hover:bg-[#315A45]/20"
  >
    View Network Report
  </button>
</div>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-orange-400"
    >
      <circle cx="6" cy="6" r="5" />
      <path d="M6 5.5v3M6 4h.01" />
    </svg>
  );
}