'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getSocket } from '@/lib/socket'
import type { Message } from '@/types'

const HAKI_COLORS: Record<number, string> = {
  0: 'bg-gray-400',
  1: 'bg-green-500',
  2: 'bg-blue-500',
  3: 'bg-purple-500',
  4: 'bg-orange-500',
  5: 'bg-red-600',
}

function hakiBadgeColor(level: number): string {
  const key = Math.min(level, 5)
  return HAKI_COLORS[key] ?? 'bg-gray-400'
}

export default function ChatSidebar() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const socket = getSocket()

    socket.on('chat:message', (msg: Message) => {
      setMessages((prev) => [...prev.slice(-99), msg])
    })

    socket.on('chat:history', (history: Message[]) => {
      setMessages(history)
    })

    socket.emit('chat:join', { channel: 'global' })

    return () => {
      socket.off('chat:message')
      socket.off('chat:history')
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    const socket = getSocket()
    socket.emit('chat:send', { channel: 'global', content: trimmed })
    setInput('')
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#0B4F6C] text-white shadow-lg flex items-center justify-center text-xl"
        aria-label="Toggle chat"
      >
        {open ? '✕' : '💬'}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-16 bottom-0 w-80 z-40 flex flex-col backdrop-blur-xl bg-white/10 border-l border-white/20 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/20">
              <span className="text-lg">🌊</span>
              <h2 className="font-semibold text-[#0B4F6C]">Global Chat</h2>
              <span className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
              {messages.length === 0 && (
                <p className="text-center text-[#0B4F6C]/50 text-sm py-8">
                  No messages yet. Be the first to send one!
                </p>
              )}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-start"
                >
                  <div className="w-7 h-7 rounded-full bg-[#01BAEF]/30 flex items-center justify-center text-xs font-bold text-[#0B4F6C] shrink-0">
                    {msg.username[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-xs font-semibold text-[#0B4F6C] truncate">
                        {msg.username}
                      </span>
                      <span
                        className={`px-1 py-0.5 rounded text-[10px] text-white ${hakiBadgeColor(
                          msg.haki_level
                        )}`}
                      >
                        Haki {msg.haki_level}
                      </span>
                    </div>
                    <p className="text-sm text-[#0B4F6C]/80 break-words">
                      {msg.content}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="px-3 py-3 border-t border-white/20 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message..."
                maxLength={500}
                className="flex-1 rounded-xl px-3 py-2 text-sm bg-white/20 backdrop-blur border border-white/30 text-[#0B4F6C] placeholder-[#0B4F6C]/40 outline-none focus:ring-2 focus:ring-[#01BAEF]/40"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-[#0B4F6C] text-white text-sm font-medium hover:bg-[#0B4F6C]/90 transition-colors"
              >
                ➤
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
