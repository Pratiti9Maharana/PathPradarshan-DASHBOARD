import { Outlet, NavLink, useLocation } from 'react-router';
import { useState } from 'react';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: GridIcon },
  { to: '/network', label: 'Network Analysis', icon: NetworkIcon },
  { to: '/simulation', label: 'Simulation', icon: SimIcon },
  { to: '/healing', label: 'Healing', icon: HealIcon },
  { to: '/planning', label: 'Planning', icon: PlanIcon },
  { to: '/reports', label: 'Reports', icon: ReportIcon },
];

export default function Root() {
  const [notifs] = useState(3);
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F5F1E8]">
      {/* Header */}
      <header className="flex-none h-14 bg-[#202522] border-b border-[#315A45] flex items-center px-4 gap-6 z-20">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-none">
          <LogoMark />
          <div>
            <div className="font-display font-bold text-white text-[15px] leading-tight tracking-wide">PATHPRADARSHAN</div>
            <div className="text-[#475569] text-[9px] tracking-wider uppercase">Road Network Resilience &amp; Decision Support</div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-[#426B52] flex-none" />

        {/* Nav */}
        <nav className="flex items-center gap-1 flex-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-all ${
                  isActive
                  ? 'bg-[#315A45]/30 text-[#D2A85A] border border-[#426B52]'
                    : 'text-[#A7B0A3] hover:text-[#F5F1E8] hover:bg-[#315A45]/40'
                }`
              }
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-none">
          <div className="flex items-center gap-2 bg-[#26352D] border border-[#426B52] rounded px-2.5 py-1.5">
            <SearchIcon size={13} className="text-[#475569]" />
            <span className="text-[#475569] text-xs">Search…</span>
            <kbd className="text-[8px] text-[#334155] bg-[#1e2d47] px-1 rounded">⌘K</kbd>
          </div>
          <button className="relative w-8 h-8 flex items-center justify-center rounded bg-[#0f172a] border border-[#1e2d47] text-[#64748b] hover:text-white hover:border-[#2d3f5e] transition-colors">
            <BellIcon size={14} />
            {notifs > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">{notifs}</span>
            )}
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#315A45] to-[#B86F4C] flex items-center justify-center text-xs font-bold text-white">AR</div>
        </div>

        {/* Status strip */}
        <div className="flex items-center gap-1.5 flex-none bg-[#0f172a] border border-[#1e2d47] rounded px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[#64748b] text-[10px] font-mono">LIVE</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 min-w-0 min-h-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke="#1e3a6e" strokeWidth="1"/>
      <circle cx="8" cy="8" r="3" fill="#3b82f6" opacity="0.9"/>
      <circle cx="24" cy="8" r="3" fill="#3b82f6" opacity="0.6"/>
      <circle cx="8" cy="24" r="3" fill="#3b82f6" opacity="0.6"/>
      <circle cx="24" cy="24" r="3" fill="#22c55e" opacity="0.9"/>
      <circle cx="16" cy="16" r="3" fill="#f97316"/>
      <line x1="8" y1="8" x2="16" y2="16" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7"/>
      <line x1="24" y1="8" x2="16" y2="16" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"/>
      <line x1="8" y1="24" x2="16" y2="16" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"/>
      <line x1="24" y1="24" x2="16" y2="16" stroke="#22c55e" strokeWidth="1.5" opacity="0.7"/>
    </svg>
  );
}

function GridIcon({ size = 16 }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>;
}
function NetworkIcon({ size = 16 }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="3" cy="8" r="2"/><circle cx="13" cy="3" r="2"/><circle cx="13" cy="13" r="2"/><circle cx="8" cy="8" r="2"/><line x1="5" y1="8" x2="6" y2="8"/><line x1="10" y1="8" x2="11" y2="4"/><line x1="10" y1="8" x2="11" y2="12"/></svg>;
}
function SimIcon({ size = 16 }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8 h10 M8 3 v10"/><circle cx="8" cy="8" r="3"/><circle cx="8" cy="8" r="6"/></svg>;
}
function HealIcon({ size = 16 }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3v10M3 8h10M5 5l6 6M11 5l-6 6" opacity="0.4"/><path d="M8 5v6M5 8h6"/></svg>;
}
function PlanIcon({ size = 16 }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M5 8h6M8 5v6"/></svg>;
}
function ReportIcon({ size = 16 }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2h6l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M10 2v3h3M5 8h6M5 11h4"/></svg>;
}
function SearchIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><circle cx="7" cy="7" r="4"/><line x1="10.5" y1="10.5" x2="14" y2="14"/></svg>;
}
function BellIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2a4 4 0 00-4 4v4H3l1 1h8l1-1h-1V6a4 4 0 00-4-4z"/><path d="M6.5 13.5a1.5 1.5 0 003 0"/></svg>;
}
