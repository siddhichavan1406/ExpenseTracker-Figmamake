import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  LineChart, Line,
} from "recharts";
import { TrendingUp, TrendingDown, Award, Target } from "lucide-react";
import { monthlyData, weeklyData, budgets, stats } from "../data/mockData";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card p-3 text-xs space-y-1" style={{ minWidth: 150 }}>
      <p className="font-semibold mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between gap-4 items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span style={{ color: "var(--muted-foreground)" }}>{p.name}</span>
          </div>
          <span className="font-semibold mono">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const highestCat = budgets.reduce((a, b) => (b.spent > a.spent ? b : a));
const expChange = ((stats.monthlyExpenses - stats.prevMonthExpenses) / stats.prevMonthExpenses) * 100;
const radarData = budgets.map((b) => ({ subject: b.category.split(" ")[0], value: (b.spent / b.budget) * 100 }));

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading text-2xl font-bold">Analytics</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Deep insights into your financial patterns</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#ecfdf5" }}>
              <TrendingUp size={14} style={{ color: "#10b981" }} />
            </div>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Savings Rate</span>
          </div>
          <div className="heading text-2xl font-bold">{stats.savingsRate}%</div>
          <div className="text-xs mt-1 text-emerald-500">Excellent — above avg</div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#fef2f2" }}>
              <TrendingDown size={14} style={{ color: "#ef4444" }} />
            </div>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Expense Change</span>
          </div>
          <div className="heading text-2xl font-bold">{expChange.toFixed(1)}%</div>
          <div className="text-xs mt-1 text-emerald-500">↓ Less than last month</div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#fffbeb" }}>
              <Award size={14} style={{ color: "#f59e0b" }} />
            </div>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Top Category</span>
          </div>
          <div className="heading text-lg font-bold truncate">{highestCat.category}</div>
          <div className="mono text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{fmt(highestCat.spent)} spent</div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--secondary)" }}>
              <Target size={14} style={{ color: "var(--primary)" }} />
            </div>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Monthly Savings</span>
          </div>
          <div className="heading text-2xl font-bold">{fmt(stats.monthlySavings)}</div>
          <div className="text-xs mt-1 text-emerald-500">+{fmt(stats.monthlySavings - 20900)} vs Aug</div>
        </div>
      </div>

      {/* Income vs Expenses bar chart */}
      <div className="card p-6">
        <h2 className="heading text-sm font-bold mb-1">Income vs Expenses</h2>
        <p className="text-xs mb-5" style={{ color: "var(--muted-foreground)" }}>6-month comparison</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyData} barGap={4} barSize={24} margin={{ left: -10, right: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="savings" name="Savings" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 320px" }}>
        {/* Weekly trend */}
        <div className="card p-6">
          <h2 className="heading text-sm font-bold mb-1">Weekly Spending Trend</h2>
          <p className="text-xs mb-5" style={{ color: "var(--muted-foreground)" }}>Last 5 weeks</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyData} margin={{ left: -10, right: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="card p-3 text-xs">
                      <p style={{ color: "var(--muted-foreground)" }}>{label}</p>
                      <p className="font-bold mono" style={{ color: "#6366f1" }}>{fmt(payload[0].value as number)}</p>
                    </div>
                  );
                }}
                cursor={{ stroke: "#6366f1", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Budget utilization radar */}
        <div className="card p-6">
          <h2 className="heading text-sm font-bold mb-1">Budget Utilization</h2>
          <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>% of budget used per category</p>
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#f3f4f6" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#6b7280" }} />
              <Radar name="Usage" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category breakdown table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="heading text-sm font-bold">Category-wise Spending</h2>
        </div>
        <div>
          {budgets.map((b, i) => {
            const pct = (b.spent / b.budget) * 100;
            const vsLastMonth = Math.random() > 0.5;
            return (
              <div
                key={b.category}
                className="grid items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                style={{
                  gridTemplateColumns: "2rem 1fr 120px 100px 80px",
                  borderBottom: i < budgets.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span className="text-lg">{b.icon}</span>
                <div>
                  <div className="text-sm font-medium">{b.category}</div>
                  <div className="h-1 rounded-full mt-1.5 w-full" style={{ background: "#f3f4f6" }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: b.color }} />
                  </div>
                </div>
                <div className="mono text-sm font-semibold">{fmt(b.spent)}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{pct.toFixed(0)}% of budget</div>
                <div className={`text-xs font-medium ${vsLastMonth ? "text-red-400" : "text-emerald-500"}`}>
                  {vsLastMonth ? "↑" : "↓"} {(Math.random() * 20 + 1).toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
