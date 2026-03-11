'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/GlassCard'
import type { Crew } from '@/types'

const DEMO_CREWS: Crew[] = [
  {
    id: '1',
    name: 'The 651m Seekers',
    base_of_operations: 'Western Pacific',
    captain_id: 'u1',
    member_count: 12,
    bounty_total: 2_000_000_000,
    created_at: '2024-01-01',
  },
  {
    id: '2',
    name: 'Bathyal Brigands',
    base_of_operations: 'Mariana Trench Region',
    captain_id: 'u2',
    member_count: 8,
    bounty_total: 3_100_000_000,
    created_at: '2024-02-15',
  },
  {
    id: '3',
    name: 'Iron Fist Crew',
    base_of_operations: 'North Pacific',
    captain_id: 'u3',
    member_count: 15,
    bounty_total: 980_000_000,
    created_at: '2024-03-01',
  },
  {
    id: '4',
    name: 'Red Line Pirates',
    base_of_operations: 'South China Sea',
    captain_id: 'u4',
    member_count: 22,
    bounty_total: 4_200_000_000,
    created_at: '2023-12-01',
  },
]

function formatBounty(n: number): string {
  if (n >= 1_000_000_000) return `฿${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `฿${(n / 1_000_000).toFixed(0)}M`
  return `฿${n.toLocaleString()}`
}

export default function CrewsPage() {
  const [search, setSearch] = useState('')

  const filtered = DEMO_CREWS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.base_of_operations.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#0B4F6C]">🚢 Crews</h1>
            <p className="text-[#0B4F6C]/60 mt-1">Find a crew or form your own expedition team</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-xl bg-[#0B4F6C] text-white font-semibold text-sm"
          >
            + Form Crew
          </motion.button>
        </motion.div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crews by name or location…"
            className="w-full rounded-xl px-4 py-3 backdrop-blur bg-white/20 border border-white/30 text-[#0B4F6C] placeholder-[#0B4F6C]/40 outline-none focus:ring-2 focus:ring-[#01BAEF]/40"
          />
        </div>

        {/* Crew grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((crew, i) => (
            <motion.div
              key={crew.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={`/crews/${crew.id}`}>
                <GlassCard hover className="p-6 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#0B4F6C]/10 flex items-center justify-center text-3xl shrink-0">
                      🏴‍☠️
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-[#0B4F6C] text-lg truncate">{crew.name}</h2>
                      <p className="text-xs text-[#0B4F6C]/60 mb-2">📍 {crew.base_of_operations}</p>
                      <div className="flex gap-4 flex-wrap">
                        <span className="text-xs text-[#0B4F6C]/70">
                          👥 {crew.member_count} members
                        </span>
                        <span className="text-xs font-bold text-[#20BF55]">
                          {formatBounty(crew.bounty_total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#0B4F6C]/50">
            <div className="text-4xl mb-2">🌊</div>
            <p>No crews found. Be the first to sail these waters!</p>
          </div>
        )}
      </div>
    </div>
  )
}
