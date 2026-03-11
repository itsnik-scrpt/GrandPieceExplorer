'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { DevilFruitType } from '@/types'

const DEVIL_FRUITS: DevilFruitType[] = [
  'Gomu Gomu',
  'Mera Mera',
  'Hie Hie',
  'Yami Yami',
  'Gura Gura',
  'Ope Ope',
  'Magu Magu',
  'Pika Pika',
  'Tori Tori',
  'Suna Suna',
]

const FRUIT_EMOJIS: Record<DevilFruitType, string> = {
  'Gomu Gomu': '🌀',
  'Mera Mera': '🔥',
  'Hie Hie': '❄️',
  'Yami Yami': '🌑',
  'Gura Gura': '💥',
  'Ope Ope': '⚕️',
  'Magu Magu': '🌋',
  'Pika Pika': '⚡',
  'Tori Tori': '🦅',
  'Suna Suna': '🏜️',
}

const FRUIT_DESCRIPTIONS: Record<DevilFruitType, string> = {
  'Gomu Gomu': 'Paramecia – Your body becomes rubber, granting elasticity and impact resistance.',
  'Mera Mera': 'Logia – You become and control fire at will.',
  'Hie Hie': 'Logia – You become and control ice, freezing anything you touch.',
  'Yami Yami': 'Logia – You control darkness and gravity, nullifying Devil Fruits.',
  'Gura Gura': 'Paramecia – You create powerful shockwaves capable of splitting the sea.',
  'Ope Ope': 'Paramecia – You create a surgical room where you have total control.',
  'Magu Magu': 'Logia – You become and control magma, the hottest substance in the world.',
  'Pika Pika': 'Logia – You become and move at the speed of light.',
  'Tori Tori': 'Zoan – Transform into a mythical phoenix with regeneration.',
  'Suna Suna': 'Logia – You become and control sand, desiccating anything you touch.',
}

interface DevilFruitModalProps {
  open: boolean
  onClose: () => void
  onAssign: (fruit: DevilFruitType) => void
}

export default function DevilFruitModal({ open, onClose, onAssign }: DevilFruitModalProps) {
  const [spinning, setSpinning] = useState(false)
  const [assigned, setAssigned] = useState<DevilFruitType | null>(null)

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setAssigned(null)

    let iterations = 0
    const total = 20
    const interval = setInterval(() => {
      iterations++
      const random = DEVIL_FRUITS[Math.floor(Math.random() * DEVIL_FRUITS.length)]
      setAssigned(random)
      if (iterations >= total) {
        clearInterval(interval)
        setSpinning(false)
      }
    }, 80)
  }

  const confirm = () => {
    if (assigned) {
      onAssign(assigned)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-md rounded-3xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-[#0B4F6C] mb-1">🍈 Devil Fruit Awaits!</h2>
            <p className="text-[#0B4F6C]/70 text-sm mb-6">
              Spin to discover which Devil Fruit chose you. Choose wisely — you can only eat one!
            </p>

            {/* Fruit display */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <motion.div
                animate={spinning ? { rotate: [0, 360] } : {}}
                transition={spinning ? { duration: 0.4, repeat: Infinity, ease: 'linear' } : {}}
                className="w-24 h-24 rounded-full backdrop-blur-xl bg-[#01BAEF]/20 border-2 border-[#01BAEF]/40 flex items-center justify-center text-5xl shadow-lg"
              >
                {assigned ? FRUIT_EMOJIS[assigned] : '❓'}
              </motion.div>

              {assigned && !spinning && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  <p className="text-xl font-bold text-[#0B4F6C]">
                    {assigned} no Mi
                  </p>
                  <p className="text-sm text-[#0B4F6C]/70 max-w-xs">
                    {FRUIT_DESCRIPTIONS[assigned]}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={spin}
                disabled={spinning}
                className="px-6 py-2.5 rounded-xl bg-[#01BAEF] text-white font-semibold text-sm hover:bg-[#01BAEF]/90 transition-colors disabled:opacity-60"
              >
                {spinning ? 'Spinning…' : assigned ? 'Re-spin' : 'Spin!'}
              </motion.button>

              {assigned && !spinning && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={confirm}
                  className="px-6 py-2.5 rounded-xl bg-[#20BF55] text-white font-semibold text-sm hover:bg-[#20BF55]/90 transition-colors"
                >
                  Accept Fate!
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl backdrop-blur bg-white/20 border border-white/30 text-[#0B4F6C] font-medium text-sm"
              >
                Skip
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
