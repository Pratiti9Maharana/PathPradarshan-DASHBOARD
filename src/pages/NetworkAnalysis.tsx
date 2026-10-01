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
  'Betweenness Centrality': 'Indicates how important a road or junction is because many routes pass through it.',
  'Connectivity': 'Measures how well-connected parts of the road network are to each other.',
  'Critical Junctions': 'Identifies intersections whose failure would most severely impact network mobility.',
  'Network Density': 'The ratio of existing roads to all possible roads in the region.',
  'Resilience Index': 'Overall measure of the network\'s ability to maintain connectivity under disruption.',
};

export default function NetworkAnalysis() {
  const [analysis, setAnalysis] = useState('Betweenness Centrality');
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Map */}
      <div className="flex-1 min-w-0">
        <div className="h-full relative">
          <GisMap variant="analysis" showLegend={true} className="h-full" />
          {/* BC heatmap overlay label */}
          <div className="absolute top-3 left-3 bg-[#0a0f1e]/90 border border-[#2e2f33] rounded px-3 py-2">
            <div className="text-[10px] text-[#64748b] uppercase tracking-wider mb-1.5">Betweenness Centrality Scale</div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-[#64748b] font-mono">LOW</span>
              <div className="w-32 h-2 rounded-full" style={{ background: 'linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444)' }} />
              <span className="text-xs text-[#64748b] font-mono">HIGH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis panel */}
      <div className="w-80 flex-none border-l border-[#2a2f33] bg-[#111315] px-4 py-3 overflow-y-auto">
        <div>
          <h1 className="font-display font-bold text-white text-xl">Network Analysis</h1>
          <p className="text-[#64748b] text-xs mt-1">Identify critical infrastructure and understand network dependencies.</p>
        </div>

        {/* Select analysis */}
        <div>
          <label className="text-[#64748b] text-xs uppercase tracking-wider block mb-2">Select Analysis</label>
          <div className="space-y-1">
            {ANALYSIS_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setAnalysis(opt)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                  analysis === opt
                    ? 'bg-blue-600/20 border border-blue-600/30 text-blue-400'
                    : 'text-[#64748b] hover:bg-[#171a1d] border border-transparent'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Tooltip explanation */}
        <div className="border-y border-[#1e2f47] py-3 my-3">
          <div
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <InfoIcon />
            <span className="text-blue-400 text-xs font-semibold">{analysis}</span>
          </div>
          <p className="text-[#94a3b8] text-xs mt-2 leading-relaxed">{TOOLTIP_EXPLANATIONS[analysis]}</p>
        </div>

        {/* Most critical junction */}
        <div>
          <h3 className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Most Critical Junction</h3>
          <div className="border-y border-[#2a2f33] py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-semibold text-white">Junction #12</span>
              <RiskBadge level="CRITICAL" />
            </div>
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Centrality Score</span>
                <span className="text-orange-400 font-mono font-bold">0.78</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Connected Roads</span>
                <span className="text-white">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Connected Regions</span>
                <span className="text-white">5</span>
              </div>
            </div>
            <div className="mt-2 h-1.5 bg-[#2a2f33] rounded-full">
              <div className="h-full rounded-full bg-orange-500" style={{ width: '78%' }} />
            </div>
          </div>
        </div>

        {/* Top critical roads */}
        <div>
          <h3 className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Top Critical Roads</h3>
          <div className="space-y-1.5">
            {CRITICAL_ROADS.map((road, i) => (
              <div key={road.name} className="flex items-center gap-2 py-2 border-b border-[#1e2d47]">
                <span className="text-[#334155] text-xs font-mono w-4">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs truncate">{road.name}</div>
                  <div className="text-[#475569] text-[10px] font-mono">BC: {road.score}</div>
                </div>
                <RiskBadge level={road.risk} />
              </div>
            ))}
          </div>
        </div>

        {/* Connectivity stats */}
        <div className="border-t border-[#2a2f33] pt-3 mt-3">
          <h3 className="text-[#64748b] text-xs uppercase tracking-wider mb-3">Connectivity Metrics</h3>
          {[
            { label: 'Average Degree', value: '3.4', desc: 'roads per junction' },
            { label: 'Graph Density', value: '0.043', desc: 'edge density' },
            { label: 'Diameter', value: '9', desc: 'max shortest path' },
            { label: 'Avg Path Length', value: '4.1', desc: 'hops' },
          ].map(m => (
            <div key={m.label} className="flex justify-between items-baseline mb-2">
              <div>
                <div className="text-[#94a3b8] text-xs">{m.label}</div>
                <div className="text-[#475569] text-[10px]">{m.desc}</div>
              </div>
              <span className="text-white font-mono font-semibold text-sm">{m.value}</span>
            </div>
          ))}
        </div>

        <button className="w-full py-2 text-sm font-medium text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/10 transition-colors">
          View Network Report
        </button>
      </div>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
      <circle cx="6" cy="6" r="5"/>
      <path d="M6 5.5v3M6 4h.01"/>
    </svg>
  );
}
