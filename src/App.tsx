import { useState } from "react"
import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  BarChart3,
  Target,
  Bell,
  Plus,
  Search,
  Menu,
  X,
} from "lucide-react"
import Dashboard from "./components/Dashboard"
import Transactions from "./components/Transactions"
import Budget from "./components/Budget"
import Analytics from "./components/Analytics"
import Goals from "./components/Goals"
import AddExpense from "./components/AddExpense"

type Page = "dashboard" | "transactions" | "budget" | "analytics" | "goals" | "add"

const navItems: { id: Page label: string icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} /> },
  {
    id: "transactions",
    label: "Transactions",
    icon: <ArrowLeftRight size={17} />,
  },
  { id: "budget", label: "Budget", icon: <PieChart size={17} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={17} /> },
  { id: "goals", label: "Goals", icon: <Target size={17} /> },
]

export default function App() {
  const [page, setPage] = useState<Page>("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const notifications = [
    {
      id: 1,
      text: "Shopping budget is 95% used",
      time: "2h ago",
      type: "warn",
    },
    { id: 2, text: "₹42,000 salary credited", time: "2d ago", type: "ok" },
    { id: 3, text: "Goa Trip goal — 74% reached!", time: "3d ago", type: "ok" },
  ]

  return (
    <div
      className="min-h-full flex flex-col"
      style={{ background: "transparent", position: "relative" }}
    >
      {/* Background video */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.85) saturate(1.1)" }}
        >
          <source
            src="https://drive.google.com/file/d/1bx071cQI7ukpFxpMs48lKd8qHHsFRLUi/view?usp=vids_web_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* White overlay to keep UI legible */}
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(245,246,250,0.91)",
            backdropFilter: "blur(1px)",
          }}
        />
      </div>
      {/* Top Nav */}
      <header
        className="sticky top-0 z-30 border-b"
        style={{
          borderColor: "var(--border)",
          boxShadow: "0 1px 4px rgba(0,0,0,.06)",
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-15 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mr-4 shrink-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
              style={{ background: "var(--primary)" }}
            >
              S
            </div>
            <span className="heading font-bold text-lg tracking-tight">
              SpendWise
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all"
                style={
                  page === item.id
                    ? {
                        background: "var(--secondary)",
                        color: "var(--primary)",
                      }
                    : { color: "var(--muted-foreground)" }
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search icon */}
            <button
              className="w-9 h-9 rounded-lg flex items-center justify-center transition hover:bg-gray-100"
              style={{ color: "var(--muted-foreground)" }}
            >
              <Search size={16} />
            </button>

            {/* Notification */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition hover:bg-gray-100 relative"
                style={{ color: "var(--muted-foreground)" }}
              >
                <Bell size={16} />
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ background: "var(--primary)" }}
                />
              </button>
              {notifOpen && (
                <div
                  className="absolute right-0 top-11 card w-72 py-2 z-50"
                  style={{ boxShadow: "0 8px 30px rgba(0,0,0,.12)" }}
                >
                  <div
                    className="px-4 py-2 border-b mb-1"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span className="text-xs font-semibold">Notifications</span>
                  </div>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-default transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-base mt-0.5">
                          {n.type === "warn" ? "⚠️" : "✅"}
                        </span>
                        <div>
                          <div className="text-xs font-medium">{n.text}</div>
                          <div
                            className="text-xs mt-0.5"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            {n.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add expense shortcut (desktop) */}
            <button
              onClick={() => setPage("add")}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition hover:opacity-90"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              <Plus size={15} /> Add
            </button>

            {/* Profile avatar */}
            <button className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-indigo-200 hover:ring-indigo-400 transition">
              <img
                src="https://api.dicebear.com/7.x/notionists/svg?seed=Siddhi&backgroundColor=b6e3f4"
                alt="Siddhi's profile"
                className="w-full h-full object-cover"
                style={{ background: "#eef2ff" }}
              />
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ color: "var(--muted-foreground)" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t px-4 py-3 space-y-0.5"
            style={{ borderColor: "var(--border)" }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id)
                  setMobileMenuOpen(false)
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition"
                style={
                  page === item.id
                    ? {
                        background: "var(--secondary)",
                        color: "var(--primary)",
                      }
                    : { color: "var(--muted-foreground)" }
                }
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-7">
        {page === "dashboard" && <Dashboard onNavigate={setPage} />}
        {page === "transactions" && <Transactions />}
        {page === "budget" && <Budget />}
        {page === "analytics" && <Analytics />}
        {page === "goals" && <Goals />}
        {page === "add" && <AddExpense onNavigate={setPage} />}
      </main>

      {/* Footer */}
      <footer
        className="border-t py-4 text-center text-xs"
        style={{
          borderColor: "var(--border)",
          color: "var(--muted-foreground)",
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(10px)",
        }}
      >
        SpendWise © 2026 — Personal Finance for Students &amp; Young
        Professionals
      </footer>

      {/* Backdrop for notifications */}
      {notifOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setNotifOpen(false)}
        />
      )}
    </div>
  )
}
