'use client'

import { motion } from 'framer-motion'
import type { User } from '@/types'

interface WantedPosterProps {
  user: Partial<User>
}

function formatBounty(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`
  return n.toLocaleString()
}

export default function WantedPoster({ user }: WantedPosterProps) {
  return (
    <motion.div
      whileHover={{ rotate: 1, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="relative w-48 bg-amber-50 border-4 border-amber-800 rounded-sm shadow-2xl overflow-hidden"
      style={{ fontFamily: 'serif' }}
    >
      {/* Header */}
      <div className="bg-amber-800 text-amber-50 text-center py-1.5 px-2">
        <p className="text-xs font-bold tracking-[0.3em] uppercase">Wanted</p>
        <p className="text-[10px] tracking-widest uppercase">Dead or Alive</p>
      </div>

      {/* Photo */}
      <div className="relative w-full aspect-square bg-amber-100 flex items-center justify-center border-y-2 border-amber-800/40">
        {user.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatar_url}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="text-5xl">🏴‍☠️</span>
            <span className="text-amber-800/50 text-xs">No Photo</span>
          </div>
        )}

        {/* Devil fruit badge */}
        {user.devil_fruit && (
          <div className="absolute bottom-1 left-1 right-1 text-center bg-amber-800/80 text-amber-50 text-[9px] py-0.5 rounded">
            {user.devil_fruit} User
          </div>
        )}
      </div>

      {/* Name */}
      <div className="text-center py-2 px-2 bg-amber-100 border-b border-amber-800/20">
        <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
          {user.username || 'Unknown Pirate'}
        </p>
        {user.role && (
          <p className="text-[10px] text-amber-700 italic mt-0.5">{user.role}</p>
        )}
      </div>

      {/* Bounty */}
      <div className="text-center py-2 px-2 bg-amber-50">
        <p className="text-[10px] text-amber-700 uppercase tracking-widest">Bounty</p>
        <p className="text-lg font-bold text-amber-900">
          ฿{formatBounty(user.bounty ?? 0)}
        </p>
      </div>

      {/* Haki level */}
      <div className="bg-amber-800 text-amber-50 text-center py-1 px-2">
        <p className="text-[10px] tracking-wide">
          Haki Level:{' '}
          <span className="font-bold">{user.haki_level ?? 0}</span>
        </p>
      </div>

      {/* Aged paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIG9wYWNpdHk9Ii4xIi8+PC9zdmc+')]" />
    </motion.div>
  )
}
