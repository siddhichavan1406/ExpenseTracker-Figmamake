import { useState } from "react";
import { Plus, Target } from "lucide-react";
import { goals } from "../data/mockData";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export default function Goals() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading text-2xl font-bold">Goals</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Track your savings milestones
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition"
          style={{ background: "var(--primary)", color: "#fff" }}
        >
          <Plus size={15} /> New Goal
        </button>
      </div>

      {/* Hero banner with coins */}
      <div className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(120deg, #064e3b 0%, #065f46 60%, #047857 100%)", minHeight: 130 }}>
        <img
          src="https://images.unsplash.com/photo-1586974710160-55f48f417990?w=700&h=260&fit=crop&auto=format&crop=right"
          alt="coins on wooden surface"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,.8) 0%, rgba(0,0,0,.1) 70%)", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,.8) 0%, rgba(0,0,0,.1) 70%)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1755369355222-8146801ccf90?w=240&h=300&fit=crop&auto=format"
          alt="stacked gold coins"
          className="absolute right-8 -bottom-3 w-28 object-cover opacity-55"
          style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,.5))" }}
        />
        <div className="relative z-10 px-7 py-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,.65)" }}>Your savings milestones</p>
            <h2 className="heading text-2xl font-bold text-white">Savings Goals</h2>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,.6)" }}>
              {fmt(goals.reduce((s, g) => s + g.saved, 0))} saved of {fmt(goals.reduce((s, g) => s + g.target, 0))} target
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1596518433611-6f099bf4be3c?w=120&h=120&fit=crop&auto=format"
            alt="coins"
            className="absolute -right-4 -bottom-4 w-20 h-20 object-cover rounded-full opacity-15"
          />
          <div className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>Total Goals</div>
          <div className="heading text-3xl font-bold">{goals.length}</div>
          <div className="text-xs mt-1 text-emerald-500">Active</div>
        </div>
        <div className="card p-5">
          <div className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>Total Saved</div>
          <div className="heading text-3xl font-bold">{fmt(goals.reduce((s, g) => s + g.saved, 0))}</div>
          <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>across all goals</div>
        </div>
        <div className="card p-5">
          <div className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>Total Target</div>
          <div className="heading text-3xl font-bold">{fmt(goals.reduce((s, g) => s + g.target, 0))}</div>
          <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>combined target</div>
        </div>
      </div>

      {/* Goal cards */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
        {goals.map((g) => {
          const pct = (g.saved / g.target) * 100;
          const remaining = g.target - g.saved;
          return (
            <div key={g.id} className="card card-hover p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                    style={{ background: g.color + "18" }}
                  >
                    {g.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{g.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                      Deadline: {g.deadline}
                    </div>
                  </div>
                </div>
                <span
                  className="mono text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: g.color + "18", color: g.color }}
                >
                  {pct.toFixed(0)}%
                </span>
              </div>

              {/* Circular-style progress (CSS arc) */}
              <div className="mb-5">
                <div className="flex justify-between text-xs mb-2">
                  <span style={{ color: "var(--muted-foreground)" }}>Progress</span>
                  <span className="font-medium">{fmt(g.saved)} of {fmt(g.target)}</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#f3f4f6" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: g.color }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Still needed</div>
                  <div className="mono text-base font-bold mt-0.5">{fmt(remaining)}</div>
                </div>
                <button
                  className="text-xs font-semibold px-4 py-2 rounded-xl transition hover:opacity-90"
                  style={{ background: g.color + "18", color: g.color }}
                >
                  Add Funds
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty add card */}
        <div
          className="card card-hover p-6 flex flex-col items-center justify-center gap-3 cursor-pointer border-dashed border-2 bg-transparent"
          style={{ borderColor: "var(--border)", minHeight: 220 }}
          onClick={() => setShowModal(true)}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--secondary)" }}>
            <Target size={20} style={{ color: "var(--primary)" }} />
          </div>
          <div className="text-center">
            <div className="font-semibold text-sm">Create a new goal</div>
            <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Start saving towards a milestone</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,.35)" }} onClick={() => setShowModal(false)}>
          <div className="card w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="heading text-lg font-bold mb-1">New Savings Goal</h2>
            <p className="text-sm mb-5" style={{ color: "var(--muted-foreground)" }}>Define your savings milestone</p>
            <div className="space-y-3">
              {[
                { label: "Goal Name", placeholder: "e.g. New Laptop", type: "text" },
                { label: "Target Amount (₹)", placeholder: "e.g. 80000", type: "number" },
                { label: "Deadline", placeholder: "", type: "month" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-medium block mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--muted)" }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "var(--border)" }}>Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "var(--primary)", color: "#fff" }}>Create Goal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
