import { useState } from "react";
import { Search, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { transactions, categoryConfig, type Category } from "../data/mockData";

const ALL = "All";
const categories = [ALL, "Income", "Food & Dining", "Transport", "Shopping", "Entertainment", "Education", "Health", "Housing"];

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(ALL);
  const [type, setType] = useState<"all" | "income" | "expense">("all");

  const filtered = transactions.filter((t) => {
    const matchCat = cat === ALL || t.category === cat;
    const matchType = type === "all" || t.type === type;
    const matchSearch = t.merchant.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  const totalIncome = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading text-2xl font-bold">Transactions</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            All your financial activity in one place
          </p>
        </div>
        <div className="flex items-center gap-2 mono text-xs" style={{ color: "var(--muted-foreground)" }}>
          <span>{filtered.length} records</span>
        </div>
      </div>

      {/* Summary pills */}
      <div className="flex gap-3">
        <div className="card px-4 py-3 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#ecfdf5" }}>
            <ArrowUpRight size={14} style={{ color: "#10b981" }} />
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Total In</div>
            <div className="mono text-sm font-semibold text-emerald-500">{fmt(totalIncome)}</div>
          </div>
        </div>
        <div className="card px-4 py-3 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#fef2f2" }}>
            <ArrowDownRight size={14} style={{ color: "#ef4444" }} />
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Total Out</div>
            <div className="mono text-sm font-semibold text-red-400">{fmt(totalExpense)}</div>
          </div>
        </div>
        <div className="card px-4 py-3 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--secondary)" }}>
            <span style={{ color: "var(--primary)", fontSize: 13 }}>≡</span>
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Net</div>
            <div className="mono text-sm font-semibold" style={{ color: totalIncome - totalExpense >= 0 ? "#10b981" : "#ef4444" }}>
              {totalIncome - totalExpense >= 0 ? "+" : "−"}{fmt(Math.abs(totalIncome - totalExpense))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none border"
            style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
          />
        </div>

        {/* Type toggle */}
        <div className="flex gap-1 p-1 rounded-lg" style={{ background: "var(--muted)" }}>
          {(["all", "income", "expense"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className="px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all"
              style={type === t ? { background: "#fff", color: "var(--primary)", boxShadow: "0 1px 3px rgba(0,0,0,.08)" } : { color: "var(--muted-foreground)" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5">
          <Filter size={13} style={{ color: "var(--muted-foreground)" }} />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border outline-none"
            style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div
          className="grid text-xs font-semibold px-6 py-3 border-b uppercase tracking-wide"
          style={{ gridTemplateColumns: "2.5rem 1fr 140px 120px 120px 80px", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
        >
          <span />
          <span>Merchant</span>
          <span>Category</span>
          <span>Date</span>
          <span>Payment</span>
          <span className="text-right">Amount</span>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>No transactions found</div>
        )}

        {filtered.map((tx, i) => {
          const cfg = categoryConfig[tx.category];
          return (
            <div
              key={tx.id}
              className="grid items-center px-6 py-4 transition-colors hover:bg-gray-50 cursor-default"
              style={{
                gridTemplateColumns: "2.5rem 1fr 140px 120px 120px 80px",
                borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base" style={{ background: cfg.bg }}>
                {tx.icon}
              </div>
              <div className="min-w-0 pr-3">
                <div className="text-sm font-medium truncate">{tx.merchant}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{tx.paymentMethod}</div>
              </div>
              <div>
                <span className="badge text-xs" style={{ background: cfg.bg, color: cfg.color }}>{tx.category}</span>
              </div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{tx.date}</div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{tx.paymentMethod}</div>
              <div className={`mono text-sm font-semibold text-right ${tx.type === "income" ? "text-emerald-500" : "text-gray-800"}`}>
                {tx.type === "income" ? "+" : "−"}{fmt(tx.amount)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
