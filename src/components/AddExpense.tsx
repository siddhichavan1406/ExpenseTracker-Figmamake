import { useState, useRef } from "react";
import { Upload, CheckCircle, ChevronDown } from "lucide-react";

const categories = [
  { label: "Food & Dining", icon: "🍽️" },
  { label: "Transport", icon: "🚇" },
  { label: "Shopping", icon: "🛍️" },
  { label: "Entertainment", icon: "🎬" },
  { label: "Education", icon: "📚" },
  { label: "Health", icon: "💊" },
  { label: "Housing", icon: "🏠" },
];

const paymentMethods = ["UPI", "Credit Card", "Debit Card", "Net Banking", "Cash", "Metro Card", "Bank Transfer"];

export default function AddExpense({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [payment, setPayment] = useState("UPI");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAmount("");
      setCategory("");
      setDescription("");
      setFile(null);
      onNavigate("dashboard");
    }, 1800);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="heading text-2xl font-bold">Add Expense</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Record a new transaction quickly</p>
      </div>

      {/* Decorative money banner */}
      <div className="relative rounded-2xl overflow-hidden h-36" style={{ background: "#1e1b4b" }}>
        <img
          src="https://images.unsplash.com/photo-1516570161787-2fd917215a3d?w=900&h=280&fit=crop&auto=format&crop=center"
          alt="dollar coins and banknotes"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <img
          src="https://images.unsplash.com/photo-1603777953662-5310c93eeb1c?w=260&h=260&fit=crop&auto=format"
          alt="100 dollar bill"
          className="absolute right-6 -bottom-4 w-40 h-40 object-cover rounded-2xl opacity-50"
          style={{ transform: "rotate(-8deg)", boxShadow: "0 8px 32px rgba(0,0,0,.4)" }}
        />
        <img
          src="https://images.unsplash.com/photo-1755369346546-a33a261cac38?w=160&h=160&fit=crop&auto=format"
          alt="gold coin stack"
          className="absolute right-44 bottom-2 w-16 h-16 object-cover rounded-full opacity-60"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,.3)" }}
        />
        <div className="relative z-10 px-7 py-6">
          <p className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,.6)" }}>Record a transaction</p>
          <h2 className="heading text-xl font-bold text-white">Add New Expense</h2>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,.55)" }}>Keep your spending on track</p>
        </div>
      </div>

      {submitted ? (
        <div className="card p-12 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#ecfdf5" }}>
            <CheckCircle size={32} style={{ color: "#10b981" }} />
          </div>
          <div className="text-center">
            <div className="heading text-lg font-bold">Expense Added!</div>
            <div className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Redirecting to dashboard…</div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-6 space-y-5">
          {/* Amount */}
          <div>
            <label className="text-xs font-semibold block mb-2 uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
              Amount
            </label>
            <div className="relative">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 heading text-xl font-bold"
                style={{ color: "var(--muted-foreground)" }}
              >
                ₹
              </span>
              <input
                required
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-4 rounded-xl border text-2xl font-bold outline-none transition-all"
                style={{
                  borderColor: amount ? "var(--primary)" : "var(--border)",
                  background: "var(--muted)",
                  color: "var(--foreground)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-semibold block mb-2 uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
              Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setCategory(c.label)}
                  className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all"
                  style={
                    category === c.label
                      ? { borderColor: "var(--primary)", background: "var(--secondary)", color: "var(--primary)" }
                      : { borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }
                  }
                >
                  <span className="text-lg">{c.icon}</span>
                  <span className="text-center leading-tight" style={{ fontSize: 10 }}>{c.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date + Payment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold block mb-2 uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-2 uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Payment Method</label>
              <div className="relative">
                <select
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
                >
                  {paymentMethods.map((m) => <option key={m}>{m}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--muted-foreground)" }} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold block mb-2 uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
              Description / Notes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Lunch with team at Swiggy..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none resize-none"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            />
          </div>

          {/* Receipt upload */}
          <div>
            <label className="text-xs font-semibold block mb-2 uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
              Upload Receipt <span className="normal-case font-normal">(optional)</span>
            </label>
            <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-dashed text-sm transition-all hover:border-indigo-300 hover:bg-indigo-50/40"
              style={{ borderColor: file ? "var(--primary)" : "var(--border)", color: file ? "var(--primary)" : "var(--muted-foreground)" }}
            >
              <Upload size={16} />
              <span>{file ?? "Click to upload receipt or drag & drop"}</span>
            </button>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => onNavigate("dashboard")}
              className="flex-1 py-3 rounded-xl text-sm font-medium border transition hover:bg-gray-50"
              style={{ borderColor: "var(--border)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition hover:opacity-90 active:scale-95"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              Add Expense
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
