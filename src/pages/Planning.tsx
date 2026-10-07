import { useState } from 'react';
import GisMap from '../components/GisMap';
import ResilienceRing from '../components/ResilienceRing';

const TOOLS = ['Add Flyover', 'Add Bridge', 'Add Road', 'Add Bypass', 'Remove Proposal'];

const PROPOSALS = [
  {
    id: 1,
    name: 'Proposed Flyover — Junction #12',
    type: 'Flyover',
    status: 'Simulation Ready',
    before: { resilience: 61, junctions: 9, routes: 2 },
    after: { resilience: 78, junctions: 6, routes: 4 },
  },
  {
    id: 2,
    name: 'NH-27 Bridge Extension',
    type: 'Bridge',
    status: 'Draft',
    before: { resilience: 61, junctions: 9, routes: 2 },
    after: { resilience: 71, junctions: 7, routes: 3 },
  },
];

export default function Planning() {
  const [activeTool, setActiveTool] = useState('Add Flyover');
  const [selectedProposal, setSelectedProposal] = useState(PROPOSALS[0]);
  const [ran, setRan] = useState(false);
  const [running, setRunning] = useState(false);

  const runAnalysis = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setRan(true);
    }, 1200);
  };

  return (
    <div className="h-full flex overflow-hidden bg-gradient-to-br from-[#060d1f] via-[#0b1717] to-[#14251d]">

      {/* Map */}
      <div className="flex-1 p-3 min-w-0 relative">
        <GisMap variant="planning" showLegend={false} className="h-full" />

        {/* Toolbar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-1 bg-[#07110d]/95 border border-[#294535] rounded-xl p-1.5 backdrop-blur-sm shadow-lg">
          {TOOLS.map(t => (
            <button
              key={t}
              onClick={() => setActiveTool(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTool === t
                  ? 'bg-gradient-to-r from-[#426B52] to-[#557d62] text-white shadow-md'
                  : 'text-[#a7b5aa] hover:text-white hover:bg-[#18271f]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Placement hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#07110d]/95 border border-[#426B52]/50 rounded-full px-4 py-1.5 text-xs text-[#b8c9bb] shadow-lg">
          Click on the map to place a proposed{' '}
          {activeTool.replace('Add ', '').toLowerCase()}
        </div>
      </div>

      {/* Planning panel */}
      <div className="w-80 flex-none border-l border-[#294535] bg-gradient-to-b from-[#07110d] via-[#0b1713] to-[#101f18] p-4 space-y-4 overflow-y-auto">

        <div>
          <h1 className="font-display font-bold text-white text-xl">
            Infrastructure Planning
          </h1>
          <p className="text-[#a7b5aa] text-xs mt-1">
            Evaluate how proposed infrastructure changes network resilience.
          </p>
        </div>

        {/* Proposals list */}
        <div>
          <h3 className="text-[#9eafa2] text-xs uppercase tracking-wider mb-2">
            Proposed Infrastructure
          </h3>

          <div className="space-y-1.5">
            {PROPOSALS.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProposal(p);
                  setRan(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all ${
                  selectedProposal.id === p.id
                    ? 'bg-[#426B52]/20 border-[#426B52]/60 shadow-sm'
                    : 'bg-[#101c17] border-[#294535] hover:border-[#426B52]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-xs font-medium">
                    {p.name}
                  </span>
                </div>

                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] bg-[#24372c] text-[#b2c0b5] px-1.5 py-0.5 rounded">
                    {p.type}
                  </span>

                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      p.status === 'Simulation Ready'
                        ? 'bg-[#426B52]/20 text-[#9fc0a7]'
                        : 'bg-[#756a32]/20 text-[#d1c47b]'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Before/After comparison */}
        <div>
          <h3 className="text-[#9eafa2] text-xs uppercase tracking-wider mb-2">
            Impact Analysis
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <ComparisonBlock
              label="Before"
              resilience={selectedProposal.before.resilience}
              junctions={selectedProposal.before.junctions}
              routes={selectedProposal.before.routes}
              color="before"
            />

            <ComparisonBlock
              label="After"
              resilience={ran ? selectedProposal.after.resilience : null}
              junctions={ran ? selectedProposal.after.junctions : null}
              routes={ran ? selectedProposal.after.routes : null}
              color="after"
              pending={!ran}
            />
          </div>

          {ran && (
            <div className="mt-3 bg-[#101c17] border border-[#426B52]/40 rounded-lg p-3">
              <div className="text-[#a8c5ae] text-xs font-semibold mb-2">
                Projected Improvements
              </div>

              <div className="space-y-1.5 text-xs">
                <ImprovementRow
                  label="Network Resilience"
                  from={selectedProposal.before.resilience + '%'}
                  to={selectedProposal.after.resilience + '%'}
                  positive
                />

                <ImprovementRow
                  label="Critical Junctions"
                  from={String(selectedProposal.before.junctions)}
                  to={String(selectedProposal.after.junctions)}
                  positive={false}
                />

                <ImprovementRow
                  label="Alternative Routes"
                  from={String(selectedProposal.before.routes)}
                  to={String(selectedProposal.after.routes)}
                  positive
                />
              </div>
            </div>
          )}
        </div>

        {/* Question context */}
        <div className="bg-[#101c17] border border-[#294535] rounded-lg p-3 text-xs text-[#9eafa2] leading-relaxed">
          <span className="text-[#9fc0a7] font-semibold">
            PathPradarshan answers:
          </span>

          <p className="mt-1 text-[#b5c0b7]">
            "What happens to the road network if we build this infrastructure here?"
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={runAnalysis}
            disabled={running}
            className={`flex-1 py-2 text-xs font-semibold font-display rounded-lg transition-all ${
              running
                ? 'bg-[#426B52]/25 text-[#a8c5ae] cursor-wait'
                : 'bg-gradient-to-r from-[#426B52] to-[#557d62] hover:from-[#4d775c] hover:to-[#648d70] text-white shadow-md'
            }`}
          >
            {running ? 'Analyzing…' : 'Run Impact Analysis'}
          </button>

          <button className="px-3 py-2 text-xs font-medium text-[#a7b5aa] border border-[#294535] rounded-lg hover:border-[#426B52]/60 hover:text-white transition-colors">
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}

function ComparisonBlock({
  label,
  resilience,
  junctions,
  routes,
  color,
  pending,
}: {
  label: string;
  resilience: number | null;
  junctions: number | null;
  routes: number | null;
  color: 'before' | 'after';
  pending?: boolean;
}) {
  const isAfter = color === 'after';

  return (
    <div
      className={`bg-[#101c17] border rounded-lg p-3 ${
        isAfter
          ? 'border-[#426B52]/50'
          : 'border-[#294535]'
      } ${pending ? 'opacity-60' : ''}`}
    >
      <div
        className={`text-[10px] font-semibold uppercase tracking-wider mb-3 ${
          isAfter ? 'text-[#a8c5ae]' : 'text-[#9eafa2]'
        }`}
      >
        {label}
      </div>

      {pending ? (
        <div className="text-center text-[#65756a] text-xs py-4">
          Run analysis
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <ResilienceRing
            value={resilience!}
            size={70}
            strokeWidth={6}
          />

          <div className="w-full space-y-1 text-[10px]">
            <div className="flex justify-between">
              <span className="text-[#89988e]">Crit. Junctions</span>
              <span className="text-white font-mono">{junctions}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#89988e]">Alt. Routes</span>
              <span className="text-white font-mono">{routes}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ImprovementRow({
  label,
  from,
  to,
  positive,
}: {
  label: string;
  from: string;
  to: string;
  positive: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#9eafa2]">{label}</span>

      <div className="flex items-center gap-1.5">
        <span className="text-[#718078] font-mono">{from}</span>
        <span className="text-[#536158]">→</span>

        <span
          className={`font-mono font-semibold ${
            positive ? 'text-[#a8c5ae]' : 'text-[#d49a9a]'
          }`}
        >
          {to}
        </span>
      </div>
    </div>
  );
}

