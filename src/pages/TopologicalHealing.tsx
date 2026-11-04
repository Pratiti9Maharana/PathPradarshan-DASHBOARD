import { useState } from "react"

export default function TopologicalHealing() {
  const [healed, setHealed] = useState(false)
  const [applying, setApplying] = useState(false)

  const applyHealing = () => {
    if (applying || healed) return
    setApplying(true)
    setTimeout(() => {
      setHealed(true)
      setApplying(false)
    }, 1500)
  }

  return (
    <div className="h-full flex overflow-hidden bg-[#0F1612]">
      {/* Main content */}
      <div className="flex-1 min-w-0 p-6 overflow-y-auto bg-[#0F1612]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-white text-2xl">
            Topological Healing
          </h1>
          <p className="text-[#A7BCAF] text-sm mt-1">
            Restore connectivity after network disruption using alternative
            connections.
          </p>
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Before */}
          <div
            className={`border p-5 transition-all ${
              healed
                ? "border-[#315A45] bg-[#17221B]"
                : "border-red-500/30 bg-[#17221B]"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-sm font-semibold font-display ${
                  healed ? "text-[#A7BCAF]" : "text-red-400"
                }`}
              >
                BEFORE — Network Disruption
              </span>

              {!healed && <span className="w-2 h-2 bg-red-500 animate-pulse" />}
            </div>

            <HealingGraph disrupted={true} healed={false} />

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="border-t border-[#315A45] pt-2">
                <div className="text-[#C0AED6] font-mono font-bold text-sm">
                  3
                </div>
                <div className="text-[#A7BCAF]">Disconnected</div>
              </div>

              <div className="border-t border-[#315A45] pt-2">
                <div className="text-[#C0AED6] font-mono font-bold text-sm">
                  61%
                </div>
                <div className="text-[#A7BCAF]">Connectivity</div>
              </div>

              <div className="border-t border-[#315A45] pt-2">
                <div className="text-[#C0AED6] font-mono font-bold text-lg">
                  2
                </div>
                <div className="text-[#A7BCAF]">Gaps</div>
              </div>
            </div>
          </div>

          {/* After */}
          <div
            className={`border p-5 transition-all ${
              healed
                ? "border-green-500/30 bg-[#17221B]"
                : "border-[#315A45] bg-[#17221B] opacity-60"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-sm font-semibold font-display ${
                  healed ? "text-green-400" : "text-[#A7BCAF]"
                }`}
              >
                AFTER — Connectivity Restored
              </span>

              {healed && <span className="w-2 h-2 bg-green-500" />}
            </div>

            <HealingGraph disrupted={true} healed={healed} />

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="border-t border-[#315A45] pt-2">
                <div
                  className={`font-mono font-bold text-lg ${
                    healed ? "text-green-400" : "text-[#53665A]"
                  }`}
                >
                  {healed ? "1" : "—"}
                </div>
                <div className="text-[#A7BCAF]">Disconnected</div>
              </div>

              <div className="border-t border-[#315A45] pt-2">
                <div
                  className={`font-mono font-bold text-lg ${
                    healed ? "text-green-400" : "text-[#53665A]"
                  }`}
                >
                  {healed ? "100%" : "—"}
                </div>
                <div className="text-[#A7BCAF]">Connectivity</div>
              </div>

              <div className="border-t border-[#315A45] pt-2">
                <div
                  className={`font-mono font-bold text-lg ${
                    healed ? "text-green-400" : "text-[#53665A]"
                  }`}
                >
                  {healed ? "2" : "—"}
                </div>
                <div className="text-[#A7BCAF]">Restored</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 border-b border-[#315A45] pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#A7BCAF] text-xs uppercase tracking-wider">
              Scenario Status
            </span>

            <span
              className={`text-xs font-semibold ${
                applying
                  ? "text-[#C0AED6]"
                  : healed
                    ? "text-green-400"
                    : "text-red-400"
              }`}
            >
              {applying ? "ANALYZING" : healed ? "HEALED" : "DISRUPTED"}
            </span>
          </div>
        </div>

        {/* Explanation */}
        <div className="border-y border-[#315A45] py-4 mb-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 border border-orange-500/30 bg-[#C0AED6]/10 flex items-center justify-center flex-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="#C0AED6"
                strokeWidth="1.5"
              >
                <circle cx="8" cy="8" r="6" />
                <path d="M8 5.5v3M8 10h.01" />
              </svg>
            </div>

            <div>
              <div className="text-orange-400 text-xs font-semibold mb-1">
                What is Topological Healing?
              </div>

              <p className="text-[#A7BCAF] text-xs leading-relaxed">
                Topological healing identifies alternative connections that can
                reconnect affected parts of the road network. When critical
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
                  desc: "Identified isolated cluster: Areas east of Junction #12",
                  action: "Rerouted via SH-5 connector",
                },
                {
                  step: 2,
                  desc: "Identified isolated cluster: NH-27 flood zone segment",
                  action: "Activated MDR-8 bypass",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-3 text-xs">
                  <div className="w-5 h-5 border border-green-500/40 bg-green-500/10 flex items-center justify-center text-green-400 font-mono flex-none">
                    {s.step}
                  </div>

                  <div>
                    <div className="text-[#A7BCAF]">{s.desc}</div>

                    <div className="text-green-400 mt-0.5">→ {s.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <aside className="w-72 flex-none border-l border-[#315A45]/50 bg-[#17221B] p-4 overflow-y-auto">
        {/* Header */}
        <div className="mb-4">
          <h2 className="font-sans font-semibold text-[#E1F4E9] text-sm">
            Healing Status
          </h2>
        </div>

        {/* Metrics */}
        <div className="border-y border-[#315A45] py-3 mb-4">
          <div className="space-y-3">
            {[
              {
                label: "Disconnected Components",
                value: healed ? "1" : "3",
                color: healed ? "text-green-400" : "text-red-400",
              },
              {
                label: "Recovered Connections",
                value: healed ? "2" : "0",
                color: healed ? "text-green-400" : "text-[#7F8F84]",
              },
              {
                label: "Connectivity Restored",
                value: healed ? "100%" : "61%",
                color: healed ? "text-green-400" : "text-red-400",
              },
              {
                label: "Healing Paths Found",
                value: healed ? "2" : "0",
                color: healed ? "text-green-400" : "text-[#7F8F84]",
              },
            ].map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between border-b border-[#315A45]/50 pb-2 last:border-b-0"
              >
                <span className="text-[#A7BCAF] text-xs font-normal">
                  {m.label}
                </span>

                <span
                  className={`font-sans font-semibold text-base ${m.color}`}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button — below metrics */}
        <div className="mb-5">
          <button
            onClick={healed ? () => setHealed(false) : applyHealing}
            disabled={applying}
            className={`w-full py-2.5 border text-sm font-semibold font-sans transition-all ${
              applying
                ? "border-[#C0AED6]/40 bg-[#C0AED6]/10 text-[#C0AED6] cursor-wait"
                : healed
                  ? "border-[#315A45] bg-[#17221B] text-[#B7C1BA] hover:border-red-500/40 hover:text-red-400"
                  : "border-[#C0AED6] bg-[#C0AED6]/10 text-[#C0AED6] hover:bg-[#C0AED6]/20"
            }`}
          >
            {applying
              ? "Analyzing network…"
              : healed
                ? "Reset Scenario"
                : "Run Healing Analysis"}
          </button>
        </div>

        {/* Isolated Areas */}
        <div className="mb-4">
          <h3 className="text-[#A7BCAF] text-xs font-semibold mb-2">
            Isolated Areas
          </h3>

          <div>
            {[
              {
                name: "East Kamrup Cluster",
                roads: 4,
                status: healed ? "Restored" : "Isolated",
              },
              {
                name: "NH-27 Flood Zone",
                roads: 6,
                status: healed ? "Restored" : "Isolated",
              },
              {
                name: "Jorhat NE Sector",
                roads: 2,
                status: healed ? "Restored" : "Isolated",
              },
            ].map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between border-b border-[#315A45]/50 py-2.5 text-xs"
              >
                <div>
                  <div className="text-white text-xs">{a.name}</div>

                  <div className="text-[#A7BCAF] text-[11px] mt-0.5">
                    {a.roads} road segments
                  </div>
                </div>

                <span
                  className={`text-xs ${
                    a.status === "Restored" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Description */}
        <p className="text-[#A7BCAF] text-xs leading-relaxed mt-3">
          {applying
            ? "Evaluating network connectivity and identifying recovery links..."
            : healed
              ? "Simulation complete. All three network clusters are connected."
              : "Ready to evaluate recovery connections for the disrupted network"}
        </p>
      </aside>
    </div>
  )
}

function HealingGraph({
  disrupted,
  healed,
}: {
  disrupted: boolean
  healed: boolean
}) {
  const nodes = [
    { id: "A", x: 60, y: 40, group: 1 },
    { id: "B", x: 130, y: 30, group: 1 },
    { id: "C", x: 200, y: 50, group: 2 },
    { id: "D", x: 80, y: 90, group: 1 },
    { id: "E", x: 150, y: 80, group: 2 },
    { id: "F", x: 220, y: 100, group: 2 },
    { id: "G", x: 110, y: 130, group: 3 },
    { id: "H", x: 180, y: 140, group: 3 },
  ]

  const normalEdges: [string, string][] = [
    ["A", "B"],
    ["A", "D"],
    ["B", "D"],
    ["C", "E"],
    ["C", "F"],
    ["E", "F"],
    ["G", "H"],
  ]

  const brokenEdges: [string, string][] = [
    ["B", "C"],
    ["D", "E"],
    ["F", "H"],
  ]

  const healedEdges: [string, string][] = [
    ["D", "G"],
    ["E", "H"],
  ]

  const nm = Object.fromEntries(nodes.map((n) => [n.id, n]))

  // NO BLUE — orange / green / neutral only
  const groupColor = (g: number) =>
    g === 1 ? "#f97316" : g === 2 ? "#d2a85a" : "#315A45"

  return (
    <svg viewBox="0 0 290 180" className="w-full h-52">
      {/* Normal connections */}
      {normalEdges.map(([a, b]) => {
        const na = nm[a]
        const nb = nm[b]

        return (
          <line
            key={`n${a}${b}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="#315A45"
            strokeWidth="2"
          />
        )
      })
}
      {/* Broken connections */}
      {disrupted &&
        brokenEdges.map(([a, b]) => {
          const na = nm[a]
          const nb = nm[b]

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
          )
        })}

      {/* Healed connections */}
      {healed &&
        healedEdges.map(([a, b]) => {
          const na = nm[a]
          const nb = nm[b]

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
          )
        })}

      {/* Nodes */}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={8}
            fill="#17221B"
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
          <text x="165" y="60" fill="#ef4444" fontSize="8" fontFamily="Inter">
            ✕
          </text>

          <text x="115" y="92" fill="#ef4444" fontSize="8" fontFamily="Inter">
            ✕
          </text>

          <text x="200" y="123" fill="#ef4444" fontSize="8" fontFamily="Inter">
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
  )
}
