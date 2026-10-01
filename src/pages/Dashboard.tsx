import { useState } from 'react';
import GisMap from '../components/GisMap';

export default function Dashboard() {
  const [junctionModal, setJunctionModal] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [routeAnalyzed, setRouteAnalyzed] = useState(false);

  const criticalJunctions = [
    { rank: 1, name: 'NH-27 Segment A', score: 0.92, risk: 'HIGH' },
    { rank: 2, name: 'Junction B-14', score: 0.87, risk: 'HIGH' },
    { rank: 3, name: 'NH-15 Segment C', score: 0.81, risk: 'MEDIUM' },
    { rank: 4, name: 'Junction D-07', score: 0.76, risk: 'MEDIUM' },
    { rank: 5, name: 'Corridor E-21', score: 0.71, risk: 'MEDIUM' },
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#111315]">

      {/* ===================================================
          HEADER
      =================================================== */}
      <div className="px-5 py-4 border-b border-[#426B52] bg-[#161918]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-semibold">
              Network Resilience Dashboard
            </h1>
            <p className="text-[#6B8065] text-xs mt-1">
              Road network analysis and infrastructure decision support
            </p>
          </div>

          <div className="text-right">
            <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
              Analysis Region
            </div>
            <div className="text-white text-sm mt-1">
              Assam Road Network
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#111315]">

        {/* ===================================================
            NETWORK STATUS
        =================================================== */}
        <div className="border-y border-[#426B52] py-3 mb-5">
          <div className="flex items-center justify-between">

            <div>
              <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                Network Status
              </div>

              <div className="text-white text-sm font-medium mt-1">
                Assam Road Network
              </div>
            </div>

            <div className="flex items-center">

              <div className="px-6 border-l border-[#426B52]">
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Resilience
                </div>
                <div className="text-white text-lg font-semibold font-mono mt-1">
                  0.76
                </div>
              </div>

              <div className="px-6 border-l border-[#426B52]">
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Critical Junctions
                </div>
                <div className="text-white text-lg font-semibold font-mono mt-1">
                  28
                </div>
              </div>

              <div className="px-6 border-l border-[#426B52]">
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Road Network
                </div>
                <div className="text-white text-lg font-semibold font-mono mt-1">
                  125.4 km
                </div>
              </div>

              <div className="px-6 border-l border-[#426B52]">
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Isolated Areas
                </div>
                <div className="text-white text-lg font-semibold font-mono mt-1">
                  3
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ===================================================
            DATA STATUS
        =================================================== */}
        <div className="border-b border-[#426B52] pb-4 mb-5">

          <div className="flex items-center justify-between">

            <div>
              <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                Data Status
              </div>

              <div className="text-white text-sm font-medium mt-1">
                Current analysis inputs
              </div>
            </div>

            <div className="flex items-center">

              <div className="px-6 border-l border-[#426B52]">
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Satellite Imagery
                </div>

                <div className="text-[#e2e8f0] text-xs mt-1">
                  city_satellite.png
                </div>
              </div>

              <div className="px-6 border-l border-[#426B52]">
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Road Extraction
                </div>

                <div className="text-green-400 text-xs mt-1">
                  ● Complete
                </div>
              </div>

              <div className="px-6 border-l border-[#426B52]">
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Network Analysis
                </div>

                <div className="text-green-400 text-xs mt-1">
                  ● Complete
                </div>
              </div>

              <div className="px-6 border-l border-[#426B52]">
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Image Size
                </div>

                <div className="text-[#e2e8f0] text-xs mt-1">
                  1024 × 1024 px
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ===================================================
            MAP + PRIORITY INFRASTRUCTURE
        =================================================== */}
        <div className="grid grid-cols-[1fr_260px] gap-4 mb-4">

          {/* MAP */}
          <div className="border border-[#426B52] overflow-hidden">

            <div className="px-4 py-3 bg-[#26352D] border-b border-[#426B52]">
              <h2 className="text-white text-sm font-medium">
                Road Network & Critical Junctions
              </h2>
            </div>

            <div className="h-[420px]">

              <GisMap
                variant="dashboard"
                showLegend={true}
                className="h-full"
                failureSimulation={showImpact}
                onCriticalJunctionClick={() => setJunctionModal(true)}
              />

            </div>
          </div>

          {/* PRIORITY INFRASTRUCTURE */}
          <div className="border border-[#426B52] p-4">

            <div className="flex items-center justify-between mb-2">

              <div>
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Priority Infrastructure
                </div>

                <div className="text-white text-sm font-medium mt-1">
                  Top 5
                </div>
              </div>

            </div>

            <div>

              {criticalJunctions.map((j) => (

                <div
                  key={j.rank}
                  onClick={() => setJunctionModal(true)}
                  className="grid grid-cols-[35px_1fr_65px] gap-2 items-center py-3 border-b border-[#426B52] last:border-b-0 cursor-pointer hover:bg-[#202522] transition-colors"
                >

                  <div className="text-[#6B8065] text-xs font-mono">
                    0{j.rank}
                  </div>

                  <div>
                    <div className="text-[#e2e8f0] text-xs">
                      {j.name}
                    </div>

                    <div className="text-[#6B8065] text-[10px] mt-1">
                      BC: {j.score}
                    </div>
                  </div>

                  <div
                    className={`text-[9px] text-right ${
                      j.risk === 'HIGH'
                        ? 'text-red-400'
                        : 'text-orange-400'
                    }`}
                  >
                    {j.risk}
                  </div>

                </div>

              ))}

            </div>

            <button
              onClick={() => setJunctionModal(true)}
              className="w-full mt-3 py-2 text-xs text-[#B86F4C] border border-[#426B52] hover:bg-[#B86F4C]/10 transition-colors"
            >
              View All
            </button>

          </div>
        </div>

        {/* ===================================================
            ROUTE RESPONSE
        =================================================== */}
        <div className="border-t border-[#426B52] pt-5 mt-5 mb-5">

          <div className="flex items-center justify-between mb-4">

            <div>
              <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                Route Response
              </div>

              <div className="text-white text-sm font-medium mt-1">
                Network route analysis
              </div>
            </div>

            <div className="text-[#6B8065] text-[10px]">
              Select a route to analyse network impact
            </div>

          </div>

          {/* ROUTE INPUTS */}
          <div className="grid grid-cols-[1fr_1fr_160px] gap-4 mb-5">

            <div>

              <label className="block text-[#6B8065] text-[10px] uppercase tracking-wider mb-2">
                Origin
              </label>

              <select className="w-full bg-[#202522] border border-[#426B52] text-[#e2e8f0] text-xs px-3 py-2 outline-none">
                <option>Guwahati</option>
                <option>Kamrup</option>
                <option>Dispur</option>
              </select>

            </div>

            <div>

              <label className="block text-[#6B8065] text-[10px] uppercase tracking-wider mb-2">
                Destination
              </label>

              <select className="w-full bg-[#202522] border border-[#426B52] text-[#e2e8f0] text-xs px-3 py-2 outline-none">
                <option>Dispur</option>
                <option>Guwahati</option>
                <option>Kamrup</option>
              </select>

            </div>

            <div className="flex items-end">

              <button
                onClick={() => setRouteAnalyzed(true)}
                className="w-full py-2 text-xs font-medium text-white bg-[#426B52] hover:bg-[#527b60] transition-colors"
              >
                Analyse Route
              </button>

            </div>

          </div>

          {/* ROUTE RESULT */}
          <div className="border-t border-[#426B52] pt-4">

            <div className="grid grid-cols-3 gap-6">

              <div>
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Baseline Route
                </div>

                <div className="text-white text-lg font-semibold font-mono mt-1">
                  18.4 km
                </div>

                <div className="text-[#6B8065] text-[10px] mt-1">
                  {routeAnalyzed
                    ? 'Route analysed — network impact assessed'
                    : 'Estimated travel time: 24 min'}
                </div>
              </div>

              <div>

                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Critical Segment
                </div>

                <div className="text-orange-400 text-sm font-medium mt-1">
                  {routeAnalyzed
                    ? 'NH-27 Segment A'
                    : 'Pending analysis'}
                </div>

                <div className="text-[#6B8065] text-[10px] mt-1">
                  High network dependency
                </div>

              </div>

              <div className="flex items-end justify-end">

                <button
                  className="px-4 py-2 text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors"
                  onClick={() => setShowImpact(true)}
                >
                  Simulate Failure
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* ===================================================
            NETWORK IMPACT
        =================================================== */}
        {showImpact && (

          <div className="border-t border-[#426B52] pt-5 mt-5 mb-5">

            <div className="flex items-center justify-between mb-4">

              <div>
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Network Impact
                </div>

                <div className="text-white text-sm font-medium mt-1">
                  Failure simulation results
                </div>
              </div>

              <div className="text-red-400 text-[10px] uppercase tracking-wider">
                Scenario: NH-27 Segment A failure
              </div>

            </div>

            <div className="grid grid-cols-4 gap-6">

              <div>
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Connectivity
                </div>

                <div className="text-white text-lg font-semibold font-mono mt-1">
                  72%
                </div>

                <div className="text-red-400 text-[10px] mt-1">
                  ↓ 14% from baseline
                </div>
              </div>

              <div>
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Isolated Areas
                </div>

                <div className="text-white text-lg font-semibold font-mono mt-1">
                  3
                </div>

                <div className="text-red-400 text-[10px] mt-1">
                  2 additional areas
                </div>
              </div>

              <div>
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Resilience Index
                </div>

                <div className="text-white text-lg font-semibold font-mono mt-1">
                  0.62
                </div>

                <div className="text-red-400 text-[10px] mt-1">
                  ↓ 0.14 from baseline
                </div>
              </div>

              <div>
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Alternative Route
                </div>

                <div className="text-green-400 text-sm font-medium mt-2">
                  Available
                </div>

                <div className="text-[#6B8065] text-[10px] mt-1">
                  +6.3 km additional distance
                </div>
              </div>

            </div>

            <div className="border-t border-[#426B52] mt-5 pt-4 flex items-center justify-between">

              <div>
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Impact Summary
                </div>

                <p className="text-[#e2e8f0] text-xs mt-1">
                  Failure reduces network connectivity and increases route
                  distance. An alternative corridor remains available.
                </p>
              </div>

              <button
                className="px-4 py-2 text-xs text-[#B86F4C] border border-[#426B52] hover:bg-[#B86F4C]/10 transition-colors"
              >
                View Detailed Report
              </button>

            </div>

          </div>

        )}

      </div>

      {/* ===================================================
          JUNCTION DETAIL MODAL
      =================================================== */}
      {junctionModal && (

        <div
          className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4"
          onClick={() => setJunctionModal(false)}
        >

          <div
            className="bg-[#161918] border border-[#426B52] w-[420px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#426B52]">

              <div>
                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Junction Detail
                </div>

                <div className="text-white text-base font-medium mt-1">
                  Critical Infrastructure
                </div>
              </div>

              <button
                onClick={() => setJunctionModal(false)}
                className="text-[#6B8065] hover:text-white text-xl"
              >
                ×
              </button>

            </div>

            {/* MODAL CONTENT */}
            <div className="p-5">

              <div className="grid grid-cols-2 gap-5">

                <div>
                  <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                    Infrastructure
                  </div>

                  <div className="text-white text-sm mt-1">
                    NH-27 Segment A
                  </div>
                </div>

                <div>
                  <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                    Risk Level
                  </div>

                  <div className="text-red-400 text-sm mt-1">
                    HIGH
                  </div>
                </div>

                <div>
                  <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                    Betweenness Centrality
                  </div>

                  <div className="text-white text-lg font-mono mt-1">
                    0.92
                  </div>
                </div>

                <div>
                  <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                    Network Dependency
                  </div>

                  <div className="text-orange-400 text-sm mt-1">
                    Very High
                  </div>
                </div>

              </div>

              <div className="border-t border-[#426B52] mt-5 pt-4">

                <div className="text-[#6B8065] text-[10px] uppercase tracking-wider">
                  Infrastructure Status
                </div>

                <div className="text-[#e2e8f0] text-xs mt-2">
                  This connection acts as a major bridge within the analysed
                  road network. Failure can affect multiple downstream routes.
                </div>

              </div>

            </div>

            {/* MODAL ACTIONS */}
            <div className="px-5 py-4 border-t border-[#426B52] flex justify-end gap-3">

              <button
                onClick={() => setJunctionModal(false)}
                className="px-4 py-2 text-xs text-[#e2e8f0] border border-[#426B52] hover:bg-[#202522] transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setShowImpact(true);
                  setJunctionModal(false);
                }}
                className="px-4 py-2 text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors"
              >
                Simulate Failure
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}