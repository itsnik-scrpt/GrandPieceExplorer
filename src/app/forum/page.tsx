'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import type { ForumThread } from '@/types'

type Category = ForumThread['category']

const CATEGORIES: Category[] = ['Theories', 'Maritime Data', 'Gear/Tech', 'Off-Topic']

const CATEGORY_EMOJIS: Record<Category, string> = {
  Theories: '🧠',
  'Maritime Data': '🌊',
  'Gear/Tech': '⚙️',
  'Off-Topic': '💬',
}

const DEMO_THREADS: ForumThread[] = [
  {
    id: '1',
    title: 'Oda drew the 651m number THREE times in chapter 651 — coincidence?',
    content: '',
    author_id: 'u1',
    author_username: 'ScholarKai',
    category: 'Theories',
    upvotes: 342,
    downvotes: 12,
    reply_count: 87,
    created_at: '2024-03-01',
  },
  {
    id: '2',
    title: 'JAMSTEC 2023 bathymetric dataset analysis — 651m anomaly confirmed?',
    content: '',
    author_id: 'u2',
    author_username: 'NavigatorElara',
    category: 'Maritime Data',
    upvotes: 218,
    downvotes: 5,
    reply_count: 43,
    created_at: '2024-03-05',
  },
  {
    id: '3',
    title: 'Best ROV cameras for sub-651m depth exploration (2024 guide)',
    content: '',
    author_id: 'u3',
    author_username: 'ShipwrightMao',
    category: 'Gear/Tech',
    upvotes: 156,
    downvotes: 3,
    reply_count: 29,
    created_at: '2024-03-10',
  },
  {
    id: '4',
    title: 'Favorite One Piece arcs while waiting for the 2026 reveal 🏴‍☠️',
    content: '',
    author_id: 'u4',
    author_username: 'StormRider651',
    category: 'Off-Topic',
    upvotes: 98,
    downvotes: 2,
    reply_count: 64,
    created_at: '2024-03-12',
  },
]

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [votes, setVotes] = useState<Record<string, number>>({})

  const filtered = DEMO_THREADS.filter(
    (t) => activeCategory === 'All' || t.category === activeCategory
  )

  const vote = (id: string, delta: number) => {
    setVotes((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + delta }))
  }

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#0B4F6C]">🗺️ Forum</h1>
            <p className="text-[#0B4F6C]/60 mt-1">Share theories, data, and discoveries</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-xl bg-[#0B4F6C] text-white font-semibold text-sm"
          >
            + New Thread
          </motion.button>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['All', ...CATEGORIES] as Array<'All' | Category>).map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? 'bg-[#0B4F6C] text-white border-[#0B4F6C]'
                  : 'bg-white/10 backdrop-blur border-white/30 text-[#0B4F6C]'
              }`}
            >
              {cat !== 'All' ? `${CATEGORY_EMOJIS[cat as Category]} ` : ''}
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Threads */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filtered.map((thread, i) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <GlassCard hover className="p-5">
                  <div className="flex gap-4">
                    {/* Vote column */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button
                        onClick={() => vote(thread.id, 1)}
                        className="text-[#20BF55] hover:scale-110 transition-transform text-lg"
                      >
                        ▲
                      </button>
                      <span className="text-sm font-bold text-[#0B4F6C]">
                        {thread.upvotes - thread.downvotes + (votes[thread.id] ?? 0)}
                      </span>
                      <button
                        onClick={() => vote(thread.id, -1)}
                        className="text-red-400 hover:scale-110 transition-transform text-lg"
                      >
                        ▼
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#0B4F6C]/10 text-[#0B4F6C] font-medium">
                          {CATEGORY_EMOJIS[thread.category]} {thread.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#0B4F6C] hover:text-[#01BAEF] cursor-pointer transition-colors">
                        {thread.title}
                      </h3>
                      <div className="flex gap-4 mt-2 text-xs text-[#0B4F6C]/55">
                        <span>by <strong>{thread.author_username}</strong></span>
                        <span>💬 {thread.reply_count} replies</span>
                        <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
