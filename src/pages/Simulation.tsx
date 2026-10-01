import { useState } from 'react';
import GisMap from '../components/GisMap';
import RiskBadge from '../components/RiskBadge';
import ResilienceRing from '../components/ResilienceRing';

const FAILURE_TYPES = ['Road', 'Junction', 'Bridge', 'Multiple failures'];

const SCENARIOS = [
  'Flood',
  'Landslide',
  'Bridge failure',
  'Road closure',
  'Custom',
];

const ROUTES = [
  {
    id: 1,
    name: 'Route via SH-5 & MDR-12',
    distance: '18.4 km',
    risk: 'LOW' as const,
    connectivity: 'High',
    time: '~28 min',
  },
  {
    id: 2,
    name: 'Route via NH-27 Bypass',
    distance: '21.1 km',
    risk: 'MODERATE' as const,
    connectivity: 'Medium',
    time: '~35 min',
  },
  {
    id: 3,
    name: 'Alternative via NH-15',
    distance: '24.8 km',
    risk: 'LOW' as const,
    connectivity: 'High',
    time: '~41 min',
  },
];

export default function Simulation() {
  const [failureType, setFailureType] = useState('Junction');
  const [scenario, setScenario] = useState('Flood');
  const [ran, setRan] = useState(false);
  const [running, setRunning] = useState(false);

  const runSimulation = () => {
    setRunning(true);

    setTimeout(() => {
      setRunning(false);
      setRan(true);
    }, 1500);
  };

  return (
    <div className="flex h-full w-full min-h-0 min-w-0 overflow-hidden">

      {/* MAP AREA */}
      <div className="relative min-w-0 min-h-0 flex-1 p-3 overflow-hidden">
        <GisMap
          variant="simulation"
          showLegend={true}
          className="h-full w-full
          failureSimulation={ran}"
        />

        {/* Simulation Controls */}
        <div className="absolute top-6 left-6 z-[1000] w-64 rounded-xl border border-[#1e2d47] bg-[#0a0f1e]/95 p-4 backdrop-blur-sm">

          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />

            <h3 className="font-display text-sm font-semibold text-white">
              Simulation Mode
            </h3>
          </div>

          <div className="space-y-3">

            {/* Failure Type */}
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-[#64748b]">
                Failure Type
              </label>

              <div className="grid grid-cols-2 gap-1">
                {FAILURE_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFailureType(type)}
                    className={`rounded px-2 py-1 text-xs transition-all ${
                      failureType === type
                        ? 'border border-orange-500/40 bg-orange-500/20 text-orange-400'
                        : 'border border-[#1e2d47] bg-[#0f172a] text-[#64748b] hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-[#64748b]">
                Location
              </label>

              <select className="w-full rounded border border-[#1e2d47] bg-[#0f172a] px-2 py-1.5 text-xs text-white">
                <option>Junction #12 — Kamrup</option>
                <option>NH-27 Bridge — Nagaon</option>
                <option>SH-5 Crossing — Jorhat</option>
              </select>
            </div>

            {/* Scenario */}
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-[#64748b]">
                Scenario
              </label>

              <div className="space-y-1">
                {SCENARIOS.map((item) => (
                  <button
                    key={item}
                    onClick={() => setScenario(item)}
                    className={`w-full rounded px-2 py-1 text-left text-xs transition-all ${
                      scenario === item
                        ? 'border border-red-500/30 bg-red-500/15 text-red-400'
                        : 'text-[#64748b] hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Run */}
            <button
              onClick={runSimulation}
              disabled={running}
              className={`w-full rounded-lg py-2 font-display text-sm font-semibold transition-all ${
                running
                  ? 'cursor-wait bg-orange-500/20 text-orange-400'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {running ? 'Running…' : 'Run Simulation'}
            </button>

          </div>
        </div>
      </div>

      {/* RIGHT RESULTS PANEL */}
      <aside className="flex h-full w-80 flex-none flex-col overflow-y-auto border-l border-[#1e2d47] bg-[#060d1f] p-4">

        <div className="mb-4">
          <h1 className="font-display text-xl font-bold text-white">
            Failure Simulation
          </h1>

          <p className="mt-1 text-xs text-[#64748b]">
            Test how the network responds when critical infrastructure fails.
          </p>
        </div>

        {ran ? (
          <div className="space-y-4">

            {/* Results */}
            <div className="rounded-lg border border-red-500/20 bg-[#0f172a] p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />

                <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Simulation Results
                </span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    label: 'Connectivity Remaining',
                    value: '77%',
                    color: 'text-yellow-400',
                  },
                  {
                    label: 'Connectivity Lost',
                    value: '23%',
                    color: 'text-red-400',
                  },
                  {
                    label: 'Affected Areas',
                    value: '3',
                    color: 'text-orange-400',
                  },
                  {
                    label: 'Isolated Areas',
                    value: '2',
                    color: 'text-red-400',
                  },
                  {
                    label: 'Alternative Routes',
                    value: '4',
                    color: 'text-green-400',
                  },
                ].map((result) => (
                  <div
                    key={result.label}
                    className="flex justify-between text-xs"
                  >
                    <span className="text-[#64748b]">
                      {result.label}
                    </span>

                    <span
                      className={`font-mono font-bold ${result.color}`}
                    >
                      {result.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Before / After */}
            <div>
              <h3 className="mb-2 text-xs uppercase tracking-wider text-[#64748b]">
                Before / After Comparison
              </h3>

              <div className="grid grid-cols-2 gap-2">

                <div className="rounded-lg border border-green-500/20 bg-[#0f172a] p-3 text-center">
                  <div className="mb-2 text-[10px] font-semibold uppercase text-green-400">
                    Before Failure
                  </div>

                  <ResilienceRing
                    value={93}
                    size={70}
                    strokeWidth={6}
                  />

                  <div className="mt-1 text-[10px] text-[#64748b]">
                    Fully connected
                  </div>
                </div>

                <div className="rounded-lg border border-red-500/20 bg-[#0f172a] p-3 text-center">
                  <div className="mb-2 text-[10px] font-semibold uppercase text-red-400">
                    After Failure
                  </div>

                  <ResilienceRing
                    value={77}
                    size={70}
                    strokeWidth={6}
                  />

                  <div className="mt-1 text-[10px] text-[#64748b]">
                    2 segments isolated
                  </div>
                </div>

              </div>
            </div>

            {/* Disruption Graph */}
            <div className="rounded-lg border border-[#1e2d47] bg-[#0f172a] p-3">
              <div className="mb-2 text-xs uppercase tracking-wider text-[#64748b]">
                Disruption Graph
              </div>

              <NetworkDisruptionGraph />
            </div>

            {/* Routes */}
            <div>
              <h3 className="mb-2 text-xs uppercase tracking-wider text-[#64748b]">
                Recommended Resilient Routes
              </h3>

              <div className="space-y-2">
                {ROUTES.map((route) => (
                  <div
                    key={route.id}
                    className="rounded-lg border border-[#1e2d47] bg-[#0f172a] p-3 transition-colors hover:border-[#2d3f5e]"
                  >
                    <div className="mb-1 flex items-start justify-between">
                      <span className="text-xs font-medium text-white">
                        Route {route.id}
                      </span>

                      <RiskBadge level={route.risk} />
                    </div>

                    <div className="mb-2 text-[10px] text-[#64748b]">
                      {route.name}
                    </div>

                    <div className="grid grid-cols-3 gap-1 text-[10px]">

                      <div className="text-center">
                        <div className="font-mono text-white">
                          {route.distance}
                        </div>
                        <div className="text-[#475569]">
                          Distance
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="font-mono text-white">
                          {route.time}
                        </div>
                        <div className="text-[#475569]">
                          Est. Time
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="font-mono text-green-400">
                          {route.connectivity}
                        </div>
                        <div className="text-[#475569]">
                          Connect.
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-2 w-full rounded border border-blue-500/30 py-1.5 text-xs font-medium text-blue-400 transition-colors hover:bg-blue-500/10">
                View Route Details
              </button>
            </div>

          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#1e2d47] bg-[#0f172a]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
              >
                <path d="M14 6v8l5 3" />
                <circle cx="14" cy="14" r="12" />
              </svg>
            </div>

            <p className="text-sm text-[#64748b]">
              Configure failure parameters and run simulation to see results.
            </p>

          </div>
        )}

      </aside>

    </div>
  );
}

function NetworkDisruptionGraph() {
  const nodes = [
    { id: 'A', x: 30, y: 30, ok: true },
    { id: 'B', x: 90, y: 20, ok: true },
    { id: 'C', x: 150, y: 35, ok: false },
    { id: 'D', x: 60, y: 70, ok: true },
    { id: 'E', x: 120, y: 75, ok: false },
    { id: 'F', x: 180, y: 65, ok: true },
  ];

  const edges: [string, string, boolean][] = [
    ['A', 'B', true],
    ['A', 'D', true],
    ['B', 'D', true],
    ['B', 'C', false],
    ['C', 'E', false],
    ['D', 'E', false],
    ['E', 'F', false],
    ['B', 'F', true],
  ];

  const nmap = Object.fromEntries(
    nodes.map((node) => [node.id, node])
  );

  return (
    <svg
      viewBox="0 0 210 100"
      className="h-20 w-full"
    >
      {edges.map(([a, b, ok]) => {
        const start = nmap[a];
        const end = nmap[b];

        return (
          <line
            key={`${a}${b}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={ok ? '#22c55e' : '#ef4444'}
            strokeWidth="1.5"
            strokeDasharray={ok ? 'none' : '4,2'}
            opacity="0.7"
          />
        );
      })}

      {nodes.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r={6}
            fill={node.ok ? '#0f172a' : '#1f1020'}
            stroke={node.ok ? '#22c55e' : '#ef4444'}
            strokeWidth="1.5"
          />

          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fill={node.ok ? '#22c55e' : '#ef4444'}
            fontSize="6"
            fontFamily="JetBrains Mono"
          >
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );
}