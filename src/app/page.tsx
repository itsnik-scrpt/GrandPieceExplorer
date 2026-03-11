'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import BountyMarquee from '@/components/BountyMarquee'
import GlassCard from '@/components/GlassCard'

const DEPTH_CLUES = [
  { icon: '📖', label: 'Chapter 651', desc: 'First reference to the 651m depth in the manga' },
  { icon: '🌊', label: '651 Meters', desc: 'Exact bathymetric depth where the anomaly is located' },
  { icon: '🔬', label: 'JAMSTEC Data', desc: 'Japan Agency for Marine-Earth Science corroborates anomalies' },
  { icon: '🗓️', label: "Oda's 2026 Promise", desc: 'Mangaka Eiichiro Oda hinted at 2026 as the revelation year' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-16 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#01BAEF]/20"
              style={{
                width: `${300 + i * 150}px`,
                height: `${300 + i * 150}px`,
                top: '50%',
                left: '50%',
                marginTop: `-${(300 + i * 150) / 2}px`,
                marginLeft: `-${(300 + i * 150) / 2}px`,
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-7xl mb-4">🌊</motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-[#0B4F6C] mb-4 leading-tight"
          >
            Grand Piece
            <br />
            <span className="text-[#01BAEF]">Explorer</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-[#0B4F6C]/70 mb-8 max-w-2xl mx-auto"
          >
            The collaborative deep-sea research platform tracking Oda&apos;s 651-meter mystery.
            Dive beyond the Grand Line.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-8">
            <GlassCard className="inline-block px-8 py-5 text-left">
              <p className="text-xs font-bold text-[#0B4F6C]/60 uppercase tracking-widest mb-2">
                🔍 Search Status
              </p>
              <div className="flex items-center gap-6 flex-wrap justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#0B4F6C]">651m</p>
                  <p className="text-xs text-[#0B4F6C]/60">Target Depth</p>
                </div>
                <div className="w-px h-10 bg-white/30 hidden sm:block" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#20BF55]">Active</p>
                  <p className="text-xs text-[#0B4F6C]/60">Search Status</p>
                </div>
                <div className="w-px h-10 bg-white/30 hidden sm:block" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#01BAEF]">2026</p>
                  <p className="text-xs text-[#0B4F6C]/60">Oda&apos;s Year</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/register"
              className="px-8 py-3 rounded-2xl bg-[#0B4F6C] text-white font-semibold hover:bg-[#0B4F6C]/90 transition-colors shadow-lg"
            >
              Join the Expedition
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 text-[#0B4F6C] font-semibold hover:bg-white/30 transition-colors"
            >
              View Map
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#0B4F6C]/50"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll to Dive</span>
          <span className="text-lg">↓</span>
        </motion.div>
      </section>

      <BountyMarquee />

      {/* Mission Control */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B4F6C] mb-3">
              Mission Control
            </h2>
            <p className="text-[#0B4F6C]/60 max-w-xl mx-auto">
              Oda&apos;s breadcrumbs point to a 651-meter oceanic anomaly. We&apos;re assembling
              the world&apos;s most dedicated crew to find it.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {DEPTH_CLUES.map((clue) => (
              <motion.div key={clue.label} variants={itemVariants}>
                <GlassCard hover className="p-6 h-full">
                  <div className="text-3xl mb-3">{clue.icon}</div>
                  <h3 className="font-bold text-[#0B4F6C] mb-1">{clue.label}</h3>
                  <p className="text-sm text-[#0B4F6C]/65">{clue.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <GlassCard variant="ocean" className="p-10">
              <div className="text-5xl mb-4">🏴‍☠️</div>
              <h2 className="text-3xl font-bold text-[#0B4F6C] mb-3">Ready to Set Sail?</h2>
              <p className="text-[#0B4F6C]/70 mb-6 max-w-md mx-auto">
                Form a crew, track discoveries, and help unravel the greatest maritime mystery.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/auth/register"
                  className="px-8 py-3 rounded-2xl bg-[#0B4F6C] text-white font-semibold hover:bg-[#0B4F6C]/90 transition-colors"
                >
                  Create Account
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 rounded-2xl backdrop-blur bg-white/20 border border-white/30 text-[#0B4F6C] font-semibold hover:bg-white/30 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
