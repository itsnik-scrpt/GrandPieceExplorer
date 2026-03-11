'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type mapboxgl from 'mapbox-gl'
import type { MapMarker } from '@/types'

const DEPTH_MIN = 646
const DEPTH_MAX = 656

interface MapboxMapProps {
  markers?: MapMarker[]
  onMarkerDrop?: (lat: number, lng: number, depth: number) => void
}

export default function MapboxMap({ markers = [], onMarkerDrop }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [heatmapOn, setHeatmapOn] = useState(false)
  const [dropping, setDropping] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      console.warn('Mapbox token not set – map will not load.')
      return
    }

    let mapInstance: mapboxgl.Map | null = null

    import('mapbox-gl').then((mapboxglModule) => {
      const mapboxgl = mapboxglModule.default
      mapboxgl.accessToken = token

      mapInstance = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [0, 0],
        zoom: 2,
        minZoom: 1,
      })

      mapRef.current = mapInstance

      mapInstance.on('load', () => {
        setMapLoaded(true)

        // Add depth-filtered GeoJSON source (651m ± 5m)
        mapInstance!.addSource('depth-651', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: markers
              .filter((m) => m.depth >= DEPTH_MIN && m.depth <= DEPTH_MAX)
              .map((m) => ({
                type: 'Feature' as const,
                geometry: {
                  type: 'Point' as const,
                  coordinates: [m.longitude, m.latitude],
                },
                properties: {
                  id: m.id,
                  title: m.title,
                  depth: m.depth,
                  marker_type: m.marker_type,
                },
              })),
          },
        })

        // Heatmap layer (hidden by default)
        mapInstance!.addLayer({
          id: 'heatmap-layer',
          type: 'heatmap',
          source: 'depth-651',
          maxzoom: 15,
          layout: { visibility: 'none' },
          paint: {
            'heatmap-weight': 1,
            'heatmap-intensity': 1,
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(1,186,239,0)',
              0.5, 'rgba(1,186,239,0.6)',
              1, 'rgba(11,79,108,1)',
            ],
            'heatmap-radius': 30,
            'heatmap-opacity': 0.8,
          },
        })

        // Circle marker layer
        mapInstance!.addLayer({
          id: 'markers-layer',
          type: 'circle',
          source: 'depth-651',
          paint: {
            'circle-color': [
              'match',
              ['get', 'marker_type'],
              'discovery', '#20BF55',
              'false_sighting', '#EF4444',
              'crew_route', '#01BAEF',
              '#0B4F6C',
            ],
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff',
          },
        })

        // Click to drop pin
        mapInstance!.on('click', (e) => {
          if (!dropping) return
          const randomDepth = Math.floor(Math.random() * (DEPTH_MAX - DEPTH_MIN + 1)) + DEPTH_MIN
          onMarkerDrop?.(e.lngLat.lat, e.lngLat.lng, randomDepth)
          setDropping(false)
        })
      })
    })

    return () => {
      mapInstance?.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggle heatmap visibility
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return
    mapRef.current.setLayoutProperty(
      'heatmap-layer',
      'visibility',
      heatmapOn ? 'visible' : 'none'
    )
  }, [heatmapOn, mapLoaded])

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />

      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0B4F6C]/10 backdrop-blur-sm rounded-2xl">
          <div className="text-center p-6">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-[#0B4F6C] font-semibold">Map Preview</p>
            <p className="text-[#0B4F6C]/60 text-sm mt-1">
              Set NEXT_PUBLIC_MAPBOX_TOKEN to enable the interactive map
            </p>
          </div>
        </div>
      )}

      {/* Depth badge */}
      <div className="absolute top-3 left-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#0B4F6C]">
        🌊 Depth Filter: {DEPTH_MIN}–{DEPTH_MAX}m
      </div>

      {/* Controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setHeatmapOn(!heatmapOn)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            heatmapOn
              ? 'bg-[#01BAEF] text-white border-[#01BAEF]'
              : 'bg-white/20 backdrop-blur text-[#0B4F6C] border-white/30'
          }`}
        >
          🔥 Heatmap
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDropping(!dropping)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            dropping
              ? 'bg-[#20BF55] text-white border-[#20BF55]'
              : 'bg-white/20 backdrop-blur text-[#0B4F6C] border-white/30'
          }`}
        >
          📍 {dropping ? 'Click map…' : 'Drop Pin'}
        </motion.button>
      </div>
    </div>
  )
}
