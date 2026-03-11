'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import WantedPoster from '@/components/WantedPoster'
import type { User, Badge } from '@/types'

const DEMO_USER: User = {
  id: 'u1',
  username: 'StormRider651',
  email: 'storm@example.com',
  devil_fruit: 'Gura Gura',
  role: 'Navigator',
  crew_role: 'Captain',
  bounty: 1_500_000_000,
  haki_level: 5,
  status: 'Charting the 651m coordinates',
  created_at: '2024-01-01',
}

const DEMO_BADGES: Badge[] = [
  { id: 'b1', name: 'First Discovery', description: 'Logged your first map pin', icon: '📍' },
  { id: 'b2', name: 'Deep Diver', description: 'Researched below 600m depths', icon: '🌊' },
  { id: 'b3', name: 'Theorist', description: 'Posted a theory with 100+ upvotes', icon: '🧠' },
  { id: 'b4', name: 'Crew Captain', description: 'Founded a crew', icon: '🏴‍☠️' },
  { id: 'b5', name: 'Haki Master', description: 'Reached Haki Level 5', icon: '⚡' },
  { id: 'b6', name: 'JAMSTEC Scholar', description: 'Verified against real bathymetric data', icon: '🔬' },
]

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

export default function ProfilePage({ params }: ProfilePageProps) {
  void params
  const user = DEMO_USER

  return (
    <div className="pt-16 pb-20">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.95 }}
        animate={{ opacity: 1, scaleX: 1 }}
        className="relative h-48 md:h-64 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B4F6C 0%, #01BAEF 50%, #20BF55 100%)',
        }}
      >
        {/* Animated waves */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(ellipse at ${30 + i * 20}% 60%, white, transparent 60%)`,
            }}
            animate={{ x: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 1 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>

      <div className="px-4 max-w-5xl mx-auto">
        {/* Avatar + basic info */}
        <div className="relative flex flex-col md:flex-row gap-6 -mt-12 md:-mt-16 mb-8 items-start">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-5xl shrink-0 relative z-10"
          >
            🏴‍☠️
          </motion.div>
          <div className="pt-12 md:pt-16 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-[#0B4F6C]">{user.username}</h1>
              {user.role && (
                <span className="px-2 py-0.5 rounded-full bg-[#01BAEF]/20 text-[#01BAEF] text-xs font-bold">
                  {user.role}
                </span>
              )}
              {user.crew_role && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 text-xs font-bold">
                  {user.crew_role}
                </span>
              )}
            </div>
            {user.status && (
              <p className="text-[#0B4F6C]/60 text-sm mt-1 italic">&quot;{user.status}&quot;</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Wanted poster */}
            <div className="flex justify-center">
              <WantedPoster user={user} />
            </div>

            {/* Quick stats */}
            <GlassCard className="p-5 space-y-3">
              <h3 className="font-bold text-[#0B4F6C] text-sm uppercase tracking-wide">Stats</h3>
              {[
                { label: 'Bounty', value: `฿${(user.bounty / 1e9).toFixed(2)}B`, icon: '💰' },
                { label: 'Haki Level', value: user.haki_level, icon: '⚡' },
                { label: 'Devil Fruit', value: user.devil_fruit ?? 'None', icon: '🍈' },
                { label: 'Member Since', value: new Date(user.created_at).toLocaleDateString(), icon: '📅' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-xs text-[#0B4F6C]/60 flex items-center gap-1">
                    {stat.icon} {stat.label}
                  </span>
                  <span className="text-sm font-semibold text-[#0B4F6C]">{stat.value}</span>
                </div>
              ))}
            </GlassCard>
          </div>

          {/* Right column – badges */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-[#0B4F6C] mb-4">🏅 Badge Inventory</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DEMO_BADGES.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <GlassCard hover className="p-4 text-center">
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <p className="text-xs font-bold text-[#0B4F6C]">{badge.name}</p>
                    <p className="text-[10px] text-[#0B4F6C]/55 mt-0.5">{badge.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
