'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import Link from 'next/link'

const TIMELINE = [
  { year: '2011', event: 'Chapter 651 published – Oda draws the 651m notation in the Sea Forest arc' },
  { year: '2015', event: 'JAMSTEC deep-sea survey identifies an anomalous sonar signature at ~651m depth' },
  { year: '2019', event: 'Fan researchers correlate manga coordinates with real Pacific bathymetric data' },
  { year: '2023', event: "Oda's editorial hints: \"The sea remembers what the land forgets\" – 2026 target" },
  { year: '2026', event: 'Projected revelation year — Grand Piece Explorer community reaches critical mass' },
]

const TEAM = [
  { role: 'Lead Navigator', name: 'Dr. Kaya Mori', bg: '🧭', desc: 'Marine cartographer with 15 years of bathymetric research' },
  { role: 'Chief Scholar', name: 'Ronan Firth', bg: '📚', desc: 'One Piece lore analyst and OSINT specialist' },
  { role: 'Tech Shipwright', name: 'Leila Nazari', bg: '⚙️', desc: 'Full-stack engineer and data visualization expert' },
  { role: 'Crew Captain', name: 'Soren Webb', bg: '🏴‍☠️', desc: 'Community manager and expedition coordinator' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="text-6xl mb-4">🌊</div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B4F6C] mb-4">
            About Grand Piece Explorer
          </h1>
          <p className="text-lg text-[#0B4F6C]/70 max-w-2xl mx-auto">
            We are a community of researchers, fans, and deep-sea enthusiasts united by one
            mission: decoding Oda&apos;s 651-meter secret before 2026.
          </p>
        </motion.div>

        {/* The 651m Mystery */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <GlassCard variant="ocean" className="p-8">
            <h2 className="text-2xl font-bold text-[#0B4F6C] mb-4 flex items-center gap-2">
              <span>🔬</span> The 651-Meter Mystery
            </h2>
            <div className="space-y-4 text-[#0B4F6C]/80">
              <p>
                In <strong>Chapter 651</strong> of One Piece, Eiichiro Oda included an unusual
                annotation referencing a depth of exactly 651 meters in the Sea Forest. What most
                readers dismissed as artistic flavor turned out to be a precise bathymetric
                coordinate.
              </p>
              <p>
                The <strong>Japan Agency for Marine-Earth Science and Technology (JAMSTEC)</strong>{' '}
                conducted deep-sea surveys in the Western Pacific and identified anomalous acoustic
                signatures at approximately 646–656 meters — a range centered eerily on 651m.
              </p>
              <p>
                Cross-referencing Oda&apos;s known research trips and the manga&apos;s hidden
                geographic overlays, our team of analysts believes the 651m depth corresponds to
                a real-world location that Oda plans to reveal in his final arc — on track for{' '}
                <strong>2026</strong>.
              </p>
            </div>
          </GlassCard>
        </motion.section>

        {/* Timeline */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-[#0B4F6C] mb-6">📅 Research Timeline</h2>
          <div className="space-y-4">
            {TIMELINE.map((item) => (
              <motion.div key={item.year} variants={itemVariants}>
                <GlassCard className="p-5 flex gap-4 items-start">
                  <div className="text-[#01BAEF] font-bold text-lg shrink-0 w-12">{item.year}</div>
                  <div className="w-px bg-white/30 self-stretch" />
                  <p className="text-[#0B4F6C]/80 text-sm">{item.event}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-[#0B4F6C] mb-6">⚓ The Core Crew</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TEAM.map((member) => (
              <motion.div key={member.name} variants={itemVariants}>
                <GlassCard hover className="p-6 flex gap-4">
                  <div className="text-4xl shrink-0">{member.bg}</div>
                  <div>
                    <p className="text-xs font-bold text-[#01BAEF] uppercase tracking-wide mb-0.5">
                      {member.role}
                    </p>
                    <p className="font-bold text-[#0B4F6C] mb-1">{member.name}</p>
                    <p className="text-sm text-[#0B4F6C]/65">{member.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlassCard className="p-8 inline-block w-full">
            <h3 className="text-xl font-bold text-[#0B4F6C] mb-2">Join the Expedition</h3>
            <p className="text-[#0B4F6C]/70 mb-4 text-sm">
              Your eyes could be the ones to spot it. Sign up, pick your role, and start contributing.
            </p>
            <Link
              href="/auth/register"
              className="px-8 py-3 rounded-2xl bg-[#0B4F6C] text-white font-semibold hover:bg-[#0B4F6C]/90 transition-colors inline-block"
            >
              Create Your Profile
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
