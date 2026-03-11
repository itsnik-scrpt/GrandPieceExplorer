'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import dynamic from 'next/dynamic'

const MapboxMap = dynamic(() => import('@/components/MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0B4F6C]/5 rounded-2xl">
      <div className="text-center">
        <div className="text-4xl mb-2 animate-pulse">🌊</div>
        <p className="text-[#0B4F6C]/60 text-sm">Loading map…</p>
      </div>
    </div>
  ),
})

const STATS = [
  { label: 'Active Researchers', value: '1,247', icon: '👥', color: 'text-[#0B4F6C]' },
  { label: 'Discoveries Logged', value: '3,891', icon: '📍', color: 'text-[#20BF55]' },
  { label: 'Depth Readings', value: '651m', icon: '🌊', color: 'text-[#01BAEF]' },
  { label: 'Active Crews', value: '89', icon: '🚢', color: 'text-[#0B4F6C]' },
]

const RECENT_ACTIVITY = [
  { user: 'StormRider651', action: 'dropped a discovery pin', location: '23.4°N, 142.1°E', time: '2m ago', icon: '📍' },
  { user: 'NavigatorElara', action: 'reported anomaly at', location: '651m depth confirmed', time: '8m ago', icon: '🔬' },
  { user: 'Bathyal Brigands', action: 'crew formed at', location: 'Western Pacific', time: '15m ago', icon: '🚢' },
  { user: 'ScholarKai', action: 'posted theory in', location: 'Theories forum', time: '22m ago', icon: '📚' },
  { user: 'IronFistCrew', action: 'flagged false sighting', location: '30.2°N, 150.8°E', time: '1h ago', icon: '🚩' },
]

export default function DashboardPage() {
  const [pins, setPins] = useState<{ lat: number; lng: number; depth: number }[]>([])

  const handleMarkerDrop = (lat: number, lng: number, depth: number) => {
    setPins((prev) => [...prev, { lat, lng, depth }])
  }

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      {/* Map */}
      <div className="flex-1" style={{ minHeight: '60vh' }}>
        <div className="h-full px-4 pt-4" style={{ height: '60vh' }}>
          <MapboxMap
            markers={pins.map((p, i) => ({
              id: String(i),
              user_id: 'local',
              latitude: p.lat,
              longitude: p.lng,
              depth: p.depth,
              title: `Pin ${i + 1}`,
              marker_type: 'discovery',
              created_at: new Date().toISOString(),
            }))}
            onMarkerDrop={handleMarkerDrop}
          />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick actions */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-xl bg-[#20BF55] text-white font-medium text-sm shadow"
          >
            📍 Drop Discovery Pin
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm shadow"
          >
            🚩 Report False Sighting
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-xl bg-[#01BAEF] text-white font-medium text-sm shadow"
          >
            🚢 Form Crew
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <GlassCard key={stat.label} hover className="p-4">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-[#0B4F6C]/60 mt-0.5">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="font-bold text-[#0B4F6C] mb-3">Recent Activity</h2>
          <div className="space-y-2">
            {RECENT_ACTIVITY.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard className="p-3 flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0B4F6C]">
                      <span className="font-semibold">{item.user}</span>{' '}
                      <span className="text-[#0B4F6C]/70">{item.action}</span>{' '}
                      <span className="font-medium text-[#01BAEF]">{item.location}</span>
                    </p>
                  </div>
                  <span className="text-xs text-[#0B4F6C]/50 shrink-0">{item.time}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
