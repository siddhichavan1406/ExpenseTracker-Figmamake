import { useState } from "react";
import { Plus, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { budgets as initialBudgets, type BudgetItem } from "../data/mockData";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

function BudgetCard({ b }: { b: BudgetItem }) {
  const pct = Math.min((b.spent / b.budget) * 100, 100);
  const remaining = b.budget - b.spent;
  const warn = pct >= 80 && pct < 100;
  const over = b.spent >= b.budget;
  const ok = pct < 80;

  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: b.color + "18" }}
          >
            {b.icon}
          </div>
          <div>
            <div className="text-sm font-semibold">{b.category}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Budget: {fmt(b.budget)}</div>
          </div>
        </div>
        {ok && <CheckCircle size={16} style={{ color: "#10b981" }} />}
        {warn && <AlertTriangle size={16} style={{ color: "#f59e0b" }} />}
        {over && <XCircle size={16} style={{ color: "#ef4444" }} />}
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1.5">
          <span style={{ color: "var(--muted-foreground)" }}>Spent</span>
          <span className="font-semibold mono">{pct.toFixed(0)}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#f3f4f6" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: over ? "#ef4444" : warn ? "#f59e0b" : b.color }}
          />
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="mono text-lg font-bold">{fmt(b.spent)}</div>
          <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>of {fmt(b.budget)}</div>
        </div>
        <div className="text-right">
          {over ? (
            <div>
              <div className="mono text-sm font-bold text-red-500">{fmt(Math.abs(remaining))} over</div>
              <div className="text-xs text-red-400">Limit exceeded</div>
            </div>
          ) : warn ? (
            <div>
              <div className="mono text-sm font-bold" style={{ color: "#f59e0b" }}>{fmt(remaining)} left</div>
              <div className="text-xs" style={{ color: "#f59e0b" }}>Approaching limit</div>
            </div>
          ) : (
            <div>
              <div className="mono text-sm font-bold text-emerald-500">{fmt(remaining)} left</div>
              <div className="text-xs text-emerald-400">On track</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Budget() {
  const [showModal, setShowModal] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [newAmt, setNewAmt] = useState("");

  const totalBudget = initialBudgets.reduce((s, b) => s + b.budget, 0);
  const totalSpent = initialBudgets.reduce((s, b) => s + b.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallPct = (totalSpent / totalBudget) * 100;

  const warn = initialBudgets.filter((b) => (b.spent / b.budget) >= 0.8 && b.spent < b.budget).length;
  const over = initialBudgets.filter((b) => b.spent >= b.budget).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading text-2xl font-bold">Budget</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Manage your monthly spending limits
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "var(--primary)", color: "#fff" }}
        >
          <Plus size={15} /> Create Budget
        </button>
      </div>

      {/* Overall summary */}
      <div className="card p-6 relative overflow-hidden" style={{ background: "var(--primary)" }}>
        {/* Decorative banknote image */}
        <img
          src="https://images.unsplash.com/photo-1580519541853-7af11585db4c?w=500&h=200&fit=crop&auto=format&crop=right"
          alt="banknotes"
          className="absolute right-0 top-0 h-full w-64 object-cover opacity-15 pointer-events-none"
          style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,.6), transparent)", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,.6), transparent)" }}
        />
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,.7)" }}>Monthly Budget</div>
            <div className="heading text-3xl font-bold text-white mt-1">{fmt(totalBudget)}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,.7)" }}>Remaining</div>
            <div className="heading text-3xl font-bold text-white mt-1">{fmt(totalRemaining)}</div>
          </div>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,.2)" }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${overallPct}%`, background: "#fff" }}
          />
        </div>
        <div className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,.65)" }}>
          <span>{fmt(totalSpent)} spent</span>
          <span>{overallPct.toFixed(0)}% of budget used</span>
        </div>

        {/* Alert summary */}
        {(warn > 0 || over > 0) && (
          <div className="mt-4 flex gap-3">
            {over > 0 && (
              <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(239,68,68,.25)", color: "#fca5a5" }}>
                <XCircle size={12} /> {over} {over === 1 ? "category" : "categories"} over budget
              </div>
            )}
            {warn > 0 && (
              <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(245,158,11,.25)", color: "#fcd34d" }}>
                <AlertTriangle size={12} /> {warn} {warn === 1 ? "category" : "categories"} near limit
              </div>
            )}
          </div>
        )}
      </div>

      {/* Budget cards grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {initialBudgets.map((b) => <BudgetCard key={b.category} b={b} />)}
      </div>

      {/* Create Budget Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,.35)" }} onClick={() => setShowModal(false)}>
          <div className="card w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="heading text-lg font-bold mb-1">Create Budget</h2>
            <p className="text-sm mb-5" style={{ color: "var(--muted-foreground)" }}>Set a monthly spending limit</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium block mb-1.5">Category</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)" }}
                >
                  <option value="">Select category</option>
                  {["Food & Dining", "Transport", "Shopping", "Entertainment", "Education", "Health", "Housing"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5">Monthly Budget (₹)</label>
                <input
                  type="number"
                  value={newAmt}
                  onChange={(e) => setNewAmt(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)" }}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "var(--border)" }}>
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "var(--primary)", color: "#fff" }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
