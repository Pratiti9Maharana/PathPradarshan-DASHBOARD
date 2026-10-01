import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  GeoJSON,
  useMap,
} from 'react-leaflet';
import type { FeatureCollection } from 'geojson';
import roadNetworkSource from '@/data/roadNetwork.geojson?raw';

import 'leaflet/dist/leaflet.css';

const junctionStyles = `
    .critical-junction {
    stroke: #ffffff !important;
    fill: #f97316 !important;
    }
    
    .critical-junction-ring {
    stroke: #f97316 !important;
    fill: #f97316 !important;
    }
    
    .network-junction {
    stroke: #d1d5db !important;
    fill: #111827 !important;
    }`;

  const roadNetwork = JSON.parse(roadNetworkSource) as FeatureCollection;

type MapVariant =
  | 'dashboard'
  | 'analysis'
  | 'simulation'
  | 'healing'
  | 'planning';

interface GisMapProps {
  variant?: MapVariant;
  showLegend?: boolean;
  className?: string;
  onCriticalJunctionClick?: (id: number) => void;
  failureSimulation?: boolean;
}

// Approximate project area: Assam
const CENTER: [number, number] = [26.1445, 91.7362];

const NODES = [
  { id: 1, lat: 26.145, lng: 91.735, critical: true },
  { id: 2, lat: 26.15, lng: 91.745, critical: false },
  { id: 3, lat: 26.135, lng: 91.74, critical: true },
  { id: 4, lat: 26.13, lng: 91.75, critical: false },
  { id: 5, lat: 26.155, lng: 91.725, critical: false },
  { id: 6, lat: 26.16, lng: 91.735, critical: false },
  { id: 7, lat: 26.14, lng: 91.72, critical: false },
  { id: 8, lat: 26.13, lng: 91.73, critical: true },
  { id: 9, lat: 26.12, lng: 91.72, critical: false },
  { id: 10, lat: 26.115, lng: 91.74, critical: false },
  { id: 11, lat: 26.125, lng: 91.76, critical: false },
  { id: 12, lat: 26.135, lng: 91.765, critical: true },
  { id: 13, lat: 26.145, lng: 91.755, critical: false },
  { id: 14, lat: 26.155, lng: 91.765, critical: false },
  { id: 15, lat: 26.165, lng: 91.755, critical: false },
  { id: 16, lat: 26.17, lng: 91.74, critical: false },
  { id: 17, lat: 26.155, lng: 91.75, critical: true },
  { id: 18, lat: 26.145, lng: 91.72, critical: false },
  { id: 19, lat: 26.125, lng: 91.75, critical: true },
  { id: 20, lat: 26.115, lng: 91.76, critical: true },
];


function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
}



export default function GisMap({
  variant = 'dashboard',
  showLegend = true,
  className = '',
  onCriticalJunctionClick,
  failureSimulation = false,
  
}: GisMapProps) {
  const [mapType, setMapType] = useState<'satellite' | 'light'>('satellite');
  return (
    <div className={`relative h-full w-full ${className}`}>
      <style>{junctionStyles}</style>
      <div className="absolute top-4 right-4 z-1000 flex border border-white/20 bg-[#111315]/95 text-xs">
        <button
          onClick={() => setMapType('satellite')}
          className={`px-3 py-2 transition ${
            mapType === 'satellite'
              ? 'bg-white text-black'
              : 'text-white hover:bg-white/10'
          }`}
        >
          Satellite
        </button>

        <button
          onClick={() => setMapType('light')}
          className={`border-l border-white/20 px-3 py-2 transition ${
            mapType === 'light'
              ? 'bg-white text-black'
              : 'text-white hover:bg-white/10'
          }`}
        >
          Light
        </button>
      </div>
      <MapContainer
        center={CENTER}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={true}
      >
        {/* SATELLITE BASEMAP */}
        {mapType === 'satellite' ? (
          <TileLayer
              attribution="&copy; Esri, Maxar, Earthstar Geographics"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        ) : (
          <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        <MapResizeHandler />

        {/* GEOJSON ROAD NETWORK */}
        <GeoJSON
        data={roadNetwork}
        style={(feature) => {
          const status = feature?.properties?.status;
          const roadId = feature?.properties?.id;

    // Simulated failed roads
        if (
          failureSimulation &&
          (roadId === 'road-8' || roadId === 'road-13')
        ) {
        return {
          color: '#ef4444',
          weight: 5,
          opacity: 1,
          dashArray: '8 7',
        };
    }

    // Critical roads
    if (status === 'critical') {
      return {
        color: '#f97316',
        weight: 4,
        opacity: 0.95,
      };
    }

    // Resilient routes
    if (status === 'resilient') {
      return {
        color: '#22c55e',
        weight: 4,
        opacity: 1,
      };
    }

    // Normal roads
    return {
      color: '#ffffff',
      weight: 2.5,
      opacity: 0.75,
    };
  }}
/>

        

        {/* JUNCTIONS */}
        
        {NODES.map((node) => (
          <div key={node.id}>
            {/* Critical junction outer ring */}
          {node.critical && (
            <CircleMarker
            center={[node.lat, node.lng]}
            radius={11}
            pathOptions={{
                color: '#f97316',
                fillColor: '#f97316',
                fillOpacity: 0.12,
                weight: 2,
                className: 'critical-junction-ring',
        }}
      />
    )}

    {/* Main junction marker */}
    <CircleMarker
      center={[node.lat, node.lng]}
      radius={node.critical ? 6 : 3}
      pathOptions={{
        color: node.critical ? '#ffffff' : '#d1d5db',
        fillColor: node.critical ? '#f97316' : '#111827',
        fillOpacity: 1,
        weight: node.critical ? 2 : 1,
        className: node.critical
          ? 'critical-junction'
          : 'network-junction',
      }}
      eventHandlers={{
        click: () => {
          if (node.critical) {
            onCriticalJunctionClick?.(node.id);
          }
        },
      }}
    >
      <Popup>
        <strong>Junction {node.id}</strong>
        <br />
        {node.critical ? 'Critical Junction' : 'Network Junction'}
      </Popup>
    </CircleMarker>
  </div>
))}
        {/* FAILURE ZONE */}
        {failureSimulation && (
          <CircleMarker
            center={[26.135, 91.73]}
            radius={180}
            pathOptions={{
              color: '#ef4444',
              fillColor: '#ef4444',
              fillOpacity: 0.12,
              weight: 2,
              dashArray: '8 6',
            }}
          >
            <Popup>
              <strong>Failure Zone</strong>
              <br />
              Simulated network disruption
            </Popup>
          </CircleMarker>
        )}
      </MapContainer>

      {/* LEGEND */}
      {showLegend && (
        <div className="absolute bottom-4 left-4 z-1000 bg-[#111315]/95 border border-white/20 px-3 py-2 text-xs text-white">
          <div className="font-semibold mb-2">NETWORK LAYERS</div>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-0.75 bg-white" />
            Road Network
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-0.75 bg-orange-500" />
            Critical Junction
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-0.75 bg-green-500" />
            Resilient Route
          </div>

          {failureSimulation && (
            <div className="flex items-center gap-2 mt-1">
              <span className="w-4 h-0.75 bg-red-500" />
              Failure
            </div>
          )}
        </div>
      )}

      {/* VARIANT LABEL */}
      <div className="absolute top-4 left-4 z-1000 bg-[#111315]/90 border border-white/20 px-3 py-2 text-xs text-white">
        {variant === 'dashboard' && 'NETWORK OVERVIEW'}
        {variant === 'analysis' && 'NETWORK ANALYSIS'}
        {variant === 'simulation' && 'FAILURE SIMULATION'}
        {variant === 'healing' && 'TOPOLOGICAL HEALING'}
        {variant === 'planning' && 'INFRASTRUCTURE PLANNING'}
      </div>
    </div>
  );
}