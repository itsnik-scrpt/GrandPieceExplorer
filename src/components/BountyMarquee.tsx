'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface BountyEntry {
  name: string
  bounty: number
  type: 'crew' | 'pirate'
}

const DEMO_ENTRIES: BountyEntry[] = [
  { name: 'The Red Line Pirates', bounty: 4_200_000_000, type: 'crew' },
  { name: 'Captain Stormborn', bounty: 1_500_000_000, type: 'pirate' },
  { name: 'Iron Fist Crew', bounty: 980_000_000, type: 'crew' },
  { name: 'Navigator Elara', bounty: 650_000_000, type: 'pirate' },
  { name: 'The 651m Seekers', bounty: 2_000_000_000, type: 'crew' },
  { name: 'Depth Scholar Kai', bounty: 430_000_000, type: 'pirate' },
  { name: 'Bathyal Brigands', bounty: 3_100_000_000, type: 'crew' },
  { name: 'Shipwright Marco', bounty: 310_000_000, type: 'pirate' },
]

function formatBounty(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`
  return n.toLocaleString()
}

interface BountyMarqueeProps {
  entries?: BountyEntry[]
}

export default function BountyMarquee({ entries = DEMO_ENTRIES }: BountyMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  // Duplicate entries for seamless loop
  const doubled = [...entries, ...entries]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animId: number
    let pos = 0
    const speed = 0.5

    function tick() {
      pos -= speed
      if (Math.abs(pos) >= track!.scrollWidth / 2) {
        pos = 0
      }
      track!.style.transform = `translateX(${pos}px)`
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="w-full backdrop-blur-xl bg-[#0B4F6C]/10 border-y border-white/20 overflow-hidden py-2">
      <div className="flex items-center gap-3 mb-1 px-4">
        <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-widest shrink-0">
          🏴‍☠️ Live Bounties
        </span>
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
      </div>
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-8 whitespace-nowrap will-change-transform">
          {doubled.map((entry, i) => (
            <motion.div
              key={i}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full backdrop-blur bg-white/10 border border-white/20"
            >
              <span className="text-sm">{entry.type === 'crew' ? '🚢' : '🏴‍☠️'}</span>
              <span className="text-sm font-semibold text-[#0B4F6C]">{entry.name}</span>
              <span className="text-sm font-bold text-[#20BF55]">
                ฿{formatBounty(entry.bounty)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
