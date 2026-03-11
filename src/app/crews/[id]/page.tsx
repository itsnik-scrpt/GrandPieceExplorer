'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import { getSocket } from '@/lib/socket'
import type { CrewRole } from '@/types'

const DEMO_MEMBERS = [
  { id: 'u1', username: 'StormRider651', role: 'Captain' as CrewRole, bounty: 1_500_000_000, haki_level: 5 },
  { id: 'u2', username: 'NavigatorElara', role: 'First Mate' as CrewRole, bounty: 650_000_000, haki_level: 4 },
  { id: 'u3', username: 'ScholarKai', role: 'Swabbie' as CrewRole, bounty: 230_000_000, haki_level: 2 },
  { id: 'u4', username: 'IronArmTanaka', role: 'Swabbie' as CrewRole, bounty: 180_000_000, haki_level: 1 },
]

function formatBounty(n: number): string {
  if (n >= 1_000_000_000) return `฿${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `฿${(n / 1_000_000).toFixed(0)}M`
  return `฿${n.toLocaleString()}`
}

const ROLE_BADGE: Record<CrewRole, string> = {
  Captain: 'bg-amber-500',
  'First Mate': 'bg-[#01BAEF]',
  Swabbie: 'bg-gray-400',
}

interface CrewPageProps {
  params: Promise<{ id: string }>
}

export default function CrewPage({ params }: CrewPageProps) {
  const { id: crewId } = use(params)
  const [messages, setMessages] = useState<{ id: string; username: string; content: string; time: string }[]>([])
  const [input, setInput] = useState('')

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    const socket = getSocket()
    const msg = { id: Date.now().toString(), username: 'You', content: trimmed, time: 'now' }
    socket.emit('chat:send', { channel: `crew:${crewId}`, content: trimmed })
    setMessages((prev) => [...prev, msg])
    setInput('')
  }

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Crew header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard variant="ocean" className="p-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-[#0B4F6C]/20 flex items-center justify-center text-5xl">
                🏴‍☠️
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0B4F6C]">The 651m Seekers</h1>
                <p className="text-[#0B4F6C]/60 text-sm mt-0.5">📍 Western Pacific</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-xs text-[#0B4F6C]/70">👥 12 members</span>
                  <span className="text-xs font-bold text-[#20BF55]">฿2.0B total bounty</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Members */}
          <div>
            <h2 className="font-bold text-[#0B4F6C] mb-3">⚓ Crew Roster</h2>
            <div className="space-y-3">
              {DEMO_MEMBERS.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <GlassCard className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#01BAEF]/20 flex items-center justify-center text-lg font-bold text-[#0B4F6C]">
                      {member.username[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#0B4F6C] text-sm">{member.username}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] text-white font-bold ${ROLE_BADGE[member.role]}`}>
                          {member.role}
                        </span>
                      </div>
                      <div className="flex gap-3 mt-0.5">
                        <span className="text-xs text-[#20BF55] font-bold">{formatBounty(member.bounty)}</span>
                        <span className="text-xs text-[#0B4F6C]/60">Haki {member.haki_level}</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Crew chat */}
          <div>
            <h2 className="font-bold text-[#0B4F6C] mb-3">💬 Crew Chat</h2>
            <GlassCard className="flex flex-col h-80">
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.length === 0 && (
                  <p className="text-center text-[#0B4F6C]/40 text-sm py-8">
                    Crew chat is empty. Say something!
                  </p>
                )}
                {messages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <span className="font-semibold text-[#0B4F6C]">{msg.username}: </span>
                    <span className="text-[#0B4F6C]/80">{msg.content}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="p-3 border-t border-white/20 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message your crew…"
                  className="flex-1 rounded-xl px-3 py-2 text-sm bg-white/20 border border-white/30 text-[#0B4F6C] placeholder-[#0B4F6C]/40 outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-[#0B4F6C] text-white text-sm"
                >
                  ➤
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
