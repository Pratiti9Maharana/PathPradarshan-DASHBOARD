import { useState } from 'react';

export default function TopologicalHealing() {
  const [healed, setHealed] = useState(false);
  const [applying, setApplying] = useState(false);

  const applyHealing = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setHealed(true);
    }, 1200);
  };

  return (
    <div className="h-full flex overflow-hidden bg-gradient-to-br from-[#202522] via-[#26352D] to-[#315A45]">

      {/* Main content */}
      <div className="flex-1 min-w-0 p-6 overflow-y-auto bg-[#202522]">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-white text-2xl">
            Topological Healing
          </h1>
          <p className="text-[#9AA89D] text-sm mt-1">
            Restore connectivity after network disruption using alternative connections.
          </p>
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Before */}
          <div
            className={`border p-5 transition-all ${
              healed
                ? 'border-[#426B52] bg-[#26352D]'
                : 'border-red-500/30 bg-[#26352D]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-sm font-semibold font-display ${
                  healed ? 'text-[#9AA89D]' : 'text-red-400'
                }`}
              >
                BEFORE — Network Disruption
              </span>

              {!healed && (
                <span className="w-2 h-2 bg-red-500 animate-pulse" />
              )}
            </div>

            <HealingGraph disrupted={true} healed={false} />

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="border-t border-[#426B52] pt-2">
                <div className="text-[#D2A85A] font-mono font-bold text-lg">
                  3
                </div>
                <div className="text-[#9AA89D]">Disconnected</div>
              </div>

              <div className="border-t border-[#426B52] pt-2">
                <div className="text-[#D2A85A] font-mono font-bold text-lg">
                  61%
                </div>
                <div className="text-[#9AA89D]">Connectivity</div>
              </div>

              <div className="border-t border-[#426B52] pt-2">
                <div className="text-[#D2A85A] font-mono font-bold text-lg">
                  2
                </div>
                <div className="text-[#9AA89D]">Gaps</div>
              </div>
            </div>
          </div>

          {/* After */}
          <div
            className={`border p-5 transition-all ${
              healed
                ? 'border-green-500/30 bg-[#26352D]'
                : 'border-[#426B52] bg-[#26352D] opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-sm font-semibold font-display ${
                  healed ? 'text-green-400' : 'text-[#9AA89D]'
                }`}
              >
                AFTER — Connectivity Restored
              </span>

              {healed && (
                <span className="w-2 h-2 bg-green-500" />
              )}
            </div>

            <HealingGraph disrupted={true} healed={healed} />

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="border-t border-[#426B52] pt-2">
                <div
                  className={`font-mono font-bold text-lg ${
                    healed ? 'text-green-400' : 'text-[#334155]'
                  }`}
                >
                  {healed ? '1' : '—'}
                </div>
                <div className="text-[#9AA89D]">Disconnected</div>
              </div>

              <div className="border-t border-[#426B52] pt-2">
                <div
                  className={`font-mono font-bold text-lg ${
                    healed ? 'text-green-400' : 'text-[#334155]'
                  }`}
                >
                  {healed ? '91%' : '—'}
                </div>
                <div className="text-[#9AA89D]">Connectivity</div>
              </div>

              <div className="border-t border-[#426B52] pt-2">
                <div
                  className={`font-mono font-bold text-lg ${
                    healed ? 'text-green-400' : 'text-[#334155]'
                  }`}
                >
                  {healed ? '2' : '—'}
                </div>
                <div className="text-[#9AA89D]">Restored</div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="border-y border-[#426B52] py-4 mb-6">
          <div className="flex gap-3">

            <div className="w-8 h-8 border border-orange-500/30 bg-orange-[#D2A85A]/10 flex items-center justify-center flex-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="#D2A85A"
                strokeWidth="1.5"
              >
                <circle cx="8" cy="8" r="6" />
                <path d="M8 5.5v3M8 10h.01" />
              </svg>
            </div>

            <div>
              <div className="text-orange-400 text-sm font-semibold mb-1">
                What is Topological Healing?
              </div>

              <p className="text-[#9AA89D] text-xs leading-relaxed">
                Topological healing identifies alternative connections that
                can reconnect affected parts of the road network. When critical
                junctions or road segments fail, the algorithm finds the minimum
                set of alternative routes that restores connectivity between
                isolated communities — enabling emergency response without
                requiring physical repairs.
              </p>
            </div>

          </div>
        </div>

        {/* Healing steps */}
        {healed && (
          <div className="border-y border-green-500/20 py-4">
            <h3 className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Applied Healing Steps
            </h3>

            <div className="space-y-3">
              {[
                {
                  step: 1,
                  desc: 'Identified isolated cluster: Areas east of Junction #12',
                  action: 'Rerouted via SH-5 connector',
                },
                {
                  step: 2,
                  desc: 'Identified isolated cluster: NH-27 flood zone segment',
                  action: 'Activated MDR-8 bypass',
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-3 text-xs">
                  <div className="w-5 h-5 border border-green-500/40 bg-green-500/10 flex items-center justify-center text-green-400 font-mono flex-none">
                    {s.step}
                  </div>

                  <div>
                    <div className="text-[#9AA89D]">
                      {s.desc}
                    </div>

                    <div className="text-green-400 mt-0.5">
                      → {s.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* RIGHT PANEL */}
      <aside className="w-72 flex-none border-l border-[#426B52] bg-[#202522] p-4 overflow-y-auto">

        {/* Header */}
        <div className="mb-4">
          <h2 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
            Healing Status
          </h2>
        </div>

        {/* Metrics */}
        <div className="border-y border-[#426B52] py-3 mb-4">
          <div className="space-y-3">

            {[
              {
                label: 'Disconnected Areas',
                value: healed ? '1' : '3',
                color: healed ? 'text-yellow-400' : 'text-red-400',
              },
              {
                label: 'Recovered Connections',
                value: healed ? '2' : '0',
                color: healed ? 'text-green-400' : 'text-[#7F8F84]',
              },
              {
                label: 'Connectivity Restored',
                value: healed ? '91%' : '61%',
                color: healed ? 'text-green-400' : 'text-red-400',
              },
              {
                label: 'Healing Paths Found',
                value: healed ? '2' : '0',
                color: healed ? 'text-green-400' : 'text-[#7F8F84]',
              },
            ].map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between border-b border-[#426B52] pb-2 last:border-b-0"
              >
                <span className="text-[#9AA89D] text-[10px] uppercase tracking-wider">
                  {m.label}
                </span>

                <span
                  className={`font-display font-bold text-lg ${m.color}`}
                >
                  {m.value}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Isolated areas */}
        <div className="mb-4">
          <h3 className="text-[#9AA89D] text-xs uppercase tracking-wider mb-2">
            Isolated Areas
          </h3>

          <div>
            {[
              {
                name: 'East Kamrup Cluster',
                roads: 4,
                status: healed ? 'Restored' : 'Isolated',
              },
              {
                name: 'NH-27 Flood Zone',
                roads: 6,
                status: healed ? 'Restored' : 'Isolated',
              },
              {
                name: 'Jorhat NE Sector',
                roads: 2,
                status: 'Isolated',
              },
            ].map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between border-b border-[#426B52] py-2.5 text-xs"
              >
                <div>
                  <div className="text-white">
                    {a.name}
                  </div>
                  <div className="text-[#9AA89D]">
                    {a.roads} road segments
                  </div>
                </div>

                <span
                  className={
                    a.status === 'Restored'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        <button
          onClick={healed ? () => setHealed(false) : applyHealing}
          disabled={applying}
          className={`w-full py-2.5 border text-sm font-semibold font-display uppercase tracking-wider transition-all ${
            applying
              ? 'border-orange-500/40 bg-[#D2A85A]/10 text-[#D2A85A] cursor-wait'
              : healed
              ? 'border-[#6B8065] bg-[#26352D] text-[#B7C1BA] hover:border-red-500/40 hover:text-red-400'
              : 'border-[#D2A85A] bg-[#D2A85A]/10 text-[#D2A85A] hover:bg-orange-500/20'
          }`}
        >
          {applying
            ? 'Applying…'
            : healed
            ? 'Reset Scenario'
            : 'Apply Healing Scenario'}
        </button>

      </aside>
    </div>
  );
}

function HealingGraph({
  disrupted,
  healed,
}: {
  disrupted: boolean;
  healed: boolean;
}) {
  const nodes = [
    { id: 'A', x: 60, y: 40, group: 1 },
    { id: 'B', x: 130, y: 30, group: 1 },
    { id: 'C', x: 200, y: 50, group: 2 },
    { id: 'D', x: 80, y: 90, group: 1 },
    { id: 'E', x: 150, y: 80, group: 2 },
    { id: 'F', x: 220, y: 100, group: 2 },
    { id: 'G', x: 110, y: 130, group: 3 },
    { id: 'H', x: 180, y: 140, group: 3 },
  ];

  const normalEdges: [string, string][] = [
    ['A', 'B'],
    ['A', 'D'],
    ['B', 'D'],
    ['C', 'E'],
    ['C', 'F'],
    ['E', 'F'],
    ['G', 'H'],
  ];

  const brokenEdges: [string, string][] = [
    ['B', 'C'],
    ['D', 'E'],
    ['F', 'H'],
  ];

  const healedEdges: [string, string][] = [
    ['D', 'G'],
    ['E', 'H'],
  ];

  const nm = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // NO BLUE — orange / green / neutral only
  const groupColor = (g: number) =>
    g === 1
      ? '#f97316'
      : g === 2
      ? '#d2a85a'
      : '#6B8065';

  return (
    <svg
      viewBox="0 0 290 170"
      className="w-full h-36"
    >
      {/* Normal connections */}
      {normalEdges.map(([a, b]) => {
        const na = nm[a];
        const nb = nm[b];

        return (
          <line
            key={`n${a}${b}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="#426B52"
            strokeWidth="2"
          />
        );
      })
}

      {/* Broken connections */}
      {disrupted &&
        brokenEdges.map(([a, b]) => {
          const na = nm[a];
          const nb = nm[b];

          return (
            <line
              key={`b${a}${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="5,3"
              opacity="0.7"
            />
          );
        })}

      {/* Healed connections */}
      {healed &&
        healedEdges.map(([a, b]) => {
          const na = nm[a];
          const nb = nm[b];

          return (
            <line
              key={`h${a}${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="#22c55e"
              strokeWidth="2"
              strokeDasharray="6,2"
            />
          );
        })}

      {/* Nodes */}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={8}
            fill="#26352D"
            stroke={groupColor(n.group)}
            strokeWidth="1.5"
          />

          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fill={groupColor(n.group)}
            fontSize="7"
            fontFamily="JetBrains Mono"
          >
            {n.id}
          </text>
        </g>
      ))}

      {/* Failure indicators */}
      {!healed && disrupted && (
        <>
          <text
            x="165"
            y="60"
            fill="#ef4444"
            fontSize="8"
            fontFamily="Inter"
          >
            ✕
          </text>

          <text
            x="115"
            y="92"
            fill="#ef4444"
            fontSize="8"
            fontFamily="Inter"
          >
            ✕
          </text>

          <text
            x="200"
            y="123"
            fill="#ef4444"
            fontSize="8"
            fontFamily="Inter"
          >
            ✕
          </text>
        </>
      )}

      {/* Healing message */}
      {healed && (
        <text
          x="120"
          y="165"
          textAnchor="middle"
          fill="#22c55e"
          fontSize="8"
          fontFamily="Inter"
        >
          Connectivity restored via alternative routes
        </text>
      )}
    </svg>
  );
}