'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/GlassCard'
import DevilFruitModal from '@/components/DevilFruitModal'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import type { DevilFruitType, UserRole } from '@/types'

const ROLES: { value: UserRole; label: string; emoji: string; desc: string }[] = [
  { value: 'Navigator', label: 'Navigator', emoji: '🧭', desc: 'Chart courses & analyze data' },
  { value: 'Shipwright', label: 'Shipwright', emoji: '⚙️', desc: 'Build tools & systems' },
  { value: 'Combatant', label: 'Combatant', emoji: '⚔️', desc: 'Lead expeditions & scouting' },
  { value: 'Scholar', label: 'Scholar', emoji: '📚', desc: 'Research lore & theories' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showFruitModal, setShowFruitModal] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) { setError('Please select a role'); return }
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data, error: sbError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username, role } },
      })
      if (sbError) throw sbError
      setUserId(data.user?.id ?? null)
      setShowFruitModal(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleFruitAssign = async (fruit: DevilFruitType) => {
    if (!userId) return
    const supabase = createClient()
    await supabase
      .from('users')
      .update({ devil_fruit: fruit })
      .eq('id', userId)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏴‍☠️</div>
          <h1 className="text-3xl font-bold text-[#0B4F6C]">Join the Expedition</h1>
          <p className="text-[#0B4F6C]/60 mt-1">Create your crew profile</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0B4F6C] mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={20}
                placeholder="StormRider651"
                className="w-full rounded-xl px-4 py-2.5 bg-white/20 backdrop-blur border border-white/30 text-[#0B4F6C] placeholder-[#0B4F6C]/40 outline-none focus:ring-2 focus:ring-[#01BAEF]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B4F6C] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl px-4 py-2.5 bg-white/20 backdrop-blur border border-white/30 text-[#0B4F6C] placeholder-[#0B4F6C]/40 outline-none focus:ring-2 focus:ring-[#01BAEF]/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B4F6C] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-2.5 bg-white/20 backdrop-blur border border-white/30 text-[#0B4F6C] placeholder-[#0B4F6C]/40 outline-none focus:ring-2 focus:ring-[#01BAEF]/40"
              />
            </div>

            {/* Role selection */}
            <div>
              <label className="block text-sm font-medium text-[#0B4F6C] mb-2">Select Role</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <motion.button
                    key={r.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRole(r.value)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      role === r.value
                        ? 'bg-[#0B4F6C] text-white border-[#0B4F6C]'
                        : 'bg-white/10 border-white/30 text-[#0B4F6C]'
                    }`}
                  >
                    <div className="text-xl mb-1">{r.emoji}</div>
                    <div className="text-xs font-bold">{r.label}</div>
                    <div className={`text-[10px] mt-0.5 ${role === r.value ? 'text-white/70' : 'text-[#0B4F6C]/60'}`}>
                      {r.desc}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-sm bg-red-50/50 rounded-lg px-3 py-2"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0B4F6C] text-white font-semibold hover:bg-[#0B4F6C]/90 transition-colors disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Set Sail!'}
            </motion.button>
          </form>

          <p className="text-center text-sm text-[#0B4F6C]/60 mt-6">
            Already a crew member?{' '}
            <Link href="/auth/login" className="font-semibold text-[#01BAEF] hover:underline">
              Sign in
            </Link>
          </p>
        </GlassCard>
      </motion.div>

      <DevilFruitModal
        open={showFruitModal}
        onClose={() => { setShowFruitModal(false); router.push('/dashboard') }}
        onAssign={handleFruitAssign}
      />
    </div>
  )
}
