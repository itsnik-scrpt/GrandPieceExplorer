'use client'

import { HTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  variant?: 'default' | 'dark' | 'ocean'
  hover?: boolean
  children: React.ReactNode
  className?: string
  onClick?: HTMLAttributes<HTMLDivElement>['onClick']
  style?: React.CSSProperties
}

const variantStyles: Record<string, string> = {
  default:
    'backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg shadow-black/5',
  dark: 'backdrop-blur-xl bg-black/20 border border-white/10 shadow-lg shadow-black/20',
  ocean:
    'backdrop-blur-xl bg-[#0B4F6C]/20 border border-[#01BAEF]/20 shadow-lg shadow-[#0B4F6C]/10',
}

export default function GlassCard({
  variant = 'default',
  hover = false,
  children,
  className = '',
  onClick,
  style,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`rounded-2xl ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </motion.div>
  )
}
