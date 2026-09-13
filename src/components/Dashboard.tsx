import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { transactions, budgets, stats, dailyExpenses, categoryConfig } from "../data/mockData";

const COLORS = budgets.map((b) => b.color);

const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const pieData = budgets.map((b) => ({ name: b.category, value: b.spent }));

const expensePct = ((stats.monthlyExpenses - stats.prevMonthExpenses) / stats.prevMonthExpenses) * 100;

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  trend?: "up" | "down" | "neutral";
  trendVal?: string;
  icon: React.ReactNode;
  accent?: boolean;
}

function StatCard({ label, value, sub, trend, trendVal, icon, accent, coinImg }: StatCardProps & { coinImg?: boolean }) {
  return (
    <div
      className="card card-hover p-6 flex flex-col gap-4 relative overflow-hidden"
      style={accent ? { background: "var(--primary)", border: "none" } : {}}
    >
      {/* Decorative coin image on balance card */}
      {coinImg && (
        <img
          src="https://images.unsplash.com/photo-1669951584309-492ed24d274f?w=200&h=200&fit=crop&auto=format"
          alt="coins"
          className="absolute -right-5 -bottom-5 w-28 h-28 object-cover rounded-full opacity-20"
          style={{ filter: "saturate(1.4) brightness(1.1)" }}
        />
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-wide uppercase" style={{ color: accent ? "rgba(255,255,255,.7)" : "var(--muted-foreground)" }}>
          {label}
        </span>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: accent ? "rgba(255,255,255,.15)" : "var(--secondary)" }}
        >
          <span style={{ color: accent ? "#fff" : "var(--primary)" }}>{icon}</span>
        </div>
      </div>
      <div>
        <div className="heading text-2xl font-bold leading-none" style={{ color: accent ? "#fff" : "var(--foreground)" }}>
          {value}
        </div>
        <div className="text-xs mt-1.5 flex items-center gap-1.5" style={{ color: accent ? "rgba(255,255,255,.65)" : "var(--muted-foreground)" }}>
          {trend === "up" && <TrendingUp size={12} style={{ color: "#10b981" }} />}
          {trend === "down" && <TrendingDown size={12} style={{ color: "#ef4444" }} />}
          {trendVal && <span style={{ color: trend === "up" ? "#10b981" : trend === "down" ? "#ef4444" : undefined }}>{trendVal}</span>}
          <span>{sub}</span>
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card p-3" style={{ minWidth: 140 }}>
      <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Day {label}</p>
      <p className="heading text-sm font-bold" style={{ color: "var(--primary)" }}>{fmt(payload[0].value)}</p>
    </div>
  );
};

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card p-3">
      <p className="text-xs font-medium">{payload[0].name}</p>
      <p className="heading text-sm font-bold" style={{ color: payload[0].payload.fill }}>{fmt(payload[0].value)}</p>
    </div>
  );
};

export default function Dashboard({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 55%, #818cf8 100%)", minHeight: 140 }}
      >
        {/* Money notes image — right side */}
        <img
          src="https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=640&h=260&fit=crop&auto=format&crop=right"
          alt="Indian rupee banknotes"
          className="absolute right-0 top-0 h-full w-72 object-cover opacity-25"
          style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,.7) 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,.7) 0%, transparent 100%)" }}
        />
        {/* Coin stack — far right accent */}
        <img
          src="https://images.unsplash.com/photo-1755369346546-a33a261cac38?w=220&h=220&fit=crop&auto=format"
          alt="gold coins stack"
          className="absolute -right-4 -bottom-4 w-36 h-36 object-cover rounded-full opacity-30"
          style={{ filter: "saturate(1.3)" }}
        />

        <div className="relative z-10 flex items-center justify-between px-7 py-6">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,.75)" }}>
              September 2026 · Personal Finance
            </p>
            <h1 className="heading text-2xl font-bold text-white">Good evening, Siddhi 👋</h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,.7)" }}>
              You've saved <strong style={{ color: "#fff" }}>₹27,314</strong> this month — that's your best month yet!
            </p>
          </div>
          <button
            onClick={() => onNavigate("add")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95 shrink-0"
            style={{ background: "rgba(255,255,255,.18)", color: "#fff", border: "1px solid rgba(255,255,255,.3)", backdropFilter: "blur(8px)" }}
          >
            + Add Expense
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Balance"
          value={fmt(stats.totalBalance)}
          sub="across all accounts"
          icon={<Wallet size={16} />}
          accent
          coinImg
        />
        <StatCard
          label="Monthly Income"
          value={fmt(stats.monthlyIncome)}
          sub="vs last month"
          trend="up"
          trendVal="+9.8%"
          icon={<ArrowUpRight size={16} />}
        />
        <StatCard
          label="Monthly Expenses"
          value={fmt(stats.monthlyExpenses)}
          sub="vs last month"
          trend="down"
          trendVal={`${expensePct.toFixed(1)}%`}
          icon={<ArrowDownRight size={16} />}
        />
        <StatCard
          label="Monthly Savings"
          value={fmt(stats.monthlySavings)}
          sub={`${stats.savingsRate}% savings rate`}
          trend="up"
          trendVal="+₹6.4k"
          icon={<PiggyBank size={16} />}
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 340px" }}>
        {/* Area chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="heading text-sm font-bold">Expense Overview</h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Daily spend — September 2026</p>
            </div>
            <span className="badge" style={{ background: "var(--secondary)", color: "var(--primary)" }}>This month</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={dailyExpenses} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} interval={4} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#6366f1", strokeWidth: 1, strokeDasharray: "4 4" }} />
              <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} fill="url(#expGrad)" dot={false} activeDot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart */}
        <div className="card p-6">
          <h2 className="heading text-sm font-bold mb-1">Spending by Category</h2>
          <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>This month's breakdown</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {budgets.slice(0, 4).map((b) => (
              <div key={b.category} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.color }} />
                  <span style={{ color: "var(--muted-foreground)" }}>{b.category}</span>
                </div>
                <span className="font-medium mono text-xs">{fmt(b.spent)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 340px" }}>
        {/* Recent transactions */}
        <div className="card">
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h2 className="heading text-sm font-bold">Recent Transactions</h2>
            <button onClick={() => onNavigate("transactions")} className="text-xs font-medium" style={{ color: "var(--primary)" }}>
              View all →
            </button>
          </div>
          <div>
            {transactions.slice(0, 6).map((tx, i) => {
              const cfg = categoryConfig[tx.category];
              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-gray-50 cursor-default"
                  style={{ borderBottom: i < 5 ? "1px solid var(--border)" : "none" }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: cfg.bg }}>
                    {tx.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{tx.merchant}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{tx.category} · {tx.date}</div>
                  </div>
                  <div className={`mono text-sm font-semibold ${tx.type === "income" ? "text-emerald-500" : "text-gray-800"}`}>
                    {tx.type === "income" ? "+" : "−"}{fmt(tx.amount)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Budget progress */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading text-sm font-bold">Budget Progress</h2>
            <button onClick={() => onNavigate("budget")} className="text-xs font-medium" style={{ color: "var(--primary)" }}>
              Manage →
            </button>
          </div>
          <div className="space-y-4">
            {budgets.slice(0, 5).map((b) => {
              const pct = Math.min((b.spent / b.budget) * 100, 100);
              const warn = pct >= 80;
              const over = pct >= 100;
              return (
                <div key={b.category}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span>{b.icon}</span>
                      <span>{b.category}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {warn && !over && <span className="text-xs" style={{ color: "#f59e0b" }}>⚠</span>}
                      {over && <span className="text-xs" style={{ color: "#ef4444" }}>✕</span>}
                      <span className="mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {fmt(b.spent)} / {fmt(b.budget)}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#f3f4f6" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: over ? "#ef4444" : warn ? "#f59e0b" : b.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
