import ChatSidebar from '@/components/ChatSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
      <ChatSidebar />
    </div>
  )
}
