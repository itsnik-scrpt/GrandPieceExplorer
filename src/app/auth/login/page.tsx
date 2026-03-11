'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/GlassCard'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: sbError } = await supabase.auth.signInWithPassword({ email, password })
      if (sbError) throw sbError
      router.push('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌊</div>
          <h1 className="text-3xl font-bold text-[#0B4F6C]">Welcome Back</h1>
          <p className="text-[#0B4F6C]/60 mt-1">Sign in to your crew</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0B4F6C] mb-1.5">
                Email
              </label>
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
              <label className="block text-sm font-medium text-[#0B4F6C] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-2.5 bg-white/20 backdrop-blur border border-white/30 text-[#0B4F6C] placeholder-[#0B4F6C]/40 outline-none focus:ring-2 focus:ring-[#01BAEF]/40"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm bg-red-50/50 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0B4F6C] text-white font-semibold hover:bg-[#0B4F6C]/90 transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-xs text-[#0B4F6C]/50">or continue with</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          <div className="space-y-3">
            <button
              disabled
              className="w-full py-2.5 rounded-xl backdrop-blur bg-white/20 border border-white/30 text-[#0B4F6C] font-medium text-sm flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
            >
              <span>🔵</span> Continue with Google
            </button>
            <button
              disabled
              className="w-full py-2.5 rounded-xl backdrop-blur bg-[#5865F2]/20 border border-[#5865F2]/30 text-[#0B4F6C] font-medium text-sm flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
            >
              <span>💬</span> Continue with Discord
            </button>
          </div>

          <p className="text-center text-sm text-[#0B4F6C]/60 mt-6">
            No account?{' '}
            <Link href="/auth/register" className="font-semibold text-[#01BAEF] hover:underline">
              Join the crew
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
