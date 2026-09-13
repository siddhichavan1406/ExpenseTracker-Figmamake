export interface Transaction {
  id: string;
  merchant: string;
  category: Category;
  date: string;
  amount: number;
  type: "expense" | "income";
  paymentMethod: string;
  icon: string;
}

export type Category =
  | "Food & Dining"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Education"
  | "Health"
  | "Housing"
  | "Income"
  | "Savings";

export interface BudgetItem {
  category: Category;
  budget: number;
  spent: number;
  color: string;
  icon: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  deadline: string;
  icon: string;
  color: string;
}

export const categoryConfig: Record<Category, { color: string; bg: string; icon: string }> = {
  "Food & Dining":  { color: "#f59e0b", bg: "#fffbeb", icon: "🍽️" },
  "Transport":      { color: "#3b82f6", bg: "#eff6ff", icon: "🚇" },
  "Shopping":       { color: "#ec4899", bg: "#fdf2f8", icon: "🛍️" },
  "Entertainment":  { color: "#8b5cf6", bg: "#f5f3ff", icon: "🎬" },
  "Education":      { color: "#06b6d4", bg: "#ecfeff", icon: "📚" },
  "Health":         { color: "#10b981", bg: "#ecfdf5", icon: "💊" },
  "Housing":        { color: "#6366f1", bg: "#eef2ff", icon: "🏠" },
  "Income":         { color: "#10b981", bg: "#ecfdf5", icon: "💰" },
  "Savings":        { color: "#6366f1", bg: "#eef2ff", icon: "🏦" },
};

export const transactions: Transaction[] = [
  { id: "t1",  merchant: "Swiggy",           category: "Food & Dining",  date: "Sep 5, 2026",  amount: 340,   type: "expense", paymentMethod: "UPI",         icon: "🍱" },
  { id: "t2",  merchant: "Salary — Infosys", category: "Income",         date: "Sep 3, 2026",  amount: 42000, type: "income",  paymentMethod: "Bank Transfer", icon: "💰" },
  { id: "t3",  merchant: "Mumbai Metro",     category: "Transport",      date: "Sep 3, 2026",  amount: 120,   type: "expense", paymentMethod: "Metro Card",    icon: "🚇" },
  { id: "t4",  merchant: "Amazon",           category: "Shopping",       date: "Sep 2, 2026",  amount: 2499,  type: "expense", paymentMethod: "Credit Card",   icon: "📦" },
  { id: "t5",  merchant: "Netflix",          category: "Entertainment",  date: "Sep 1, 2026",  amount: 649,   type: "expense", paymentMethod: "Credit Card",   icon: "🎬" },
  { id: "t6",  merchant: "Coursera",         category: "Education",      date: "Aug 30, 2026", amount: 1299,  type: "expense", paymentMethod: "Debit Card",    icon: "📖" },
  { id: "t7",  merchant: "Zomato",           category: "Food & Dining",  date: "Aug 29, 2026", amount: 520,   type: "expense", paymentMethod: "UPI",           icon: "🍕" },
  { id: "t8",  merchant: "Ola",              category: "Transport",      date: "Aug 28, 2026", amount: 180,   type: "expense", paymentMethod: "UPI",           icon: "🚗" },
  { id: "t9",  merchant: "Decathlon",        category: "Shopping",       date: "Aug 27, 2026", amount: 3200,  type: "expense", paymentMethod: "UPI",           icon: "🏋️" },
  { id: "t10", merchant: "Starbucks",        category: "Food & Dining",  date: "Aug 26, 2026", amount: 480,   type: "expense", paymentMethod: "Credit Card",   icon: "☕" },
  { id: "t11", merchant: "Spotify",          category: "Entertainment",  date: "Aug 25, 2026", amount: 119,   type: "expense", paymentMethod: "Credit Card",   icon: "🎵" },
  { id: "t12", merchant: "Freelance — Figma",category: "Income",         date: "Aug 24, 2026", amount: 8500,  type: "income",  paymentMethod: "Bank Transfer", icon: "💻" },
  { id: "t13", merchant: "PharmEasy",        category: "Health",         date: "Aug 23, 2026", amount: 640,   type: "expense", paymentMethod: "UPI",           icon: "💊" },
  { id: "t14", merchant: "Rent — Andheri",   category: "Housing",        date: "Aug 22, 2026", amount: 12000, type: "expense", paymentMethod: "Bank Transfer", icon: "🏠" },
  { id: "t15", merchant: "D-Mart",           category: "Shopping",       date: "Aug 21, 2026", amount: 1840,  type: "expense", paymentMethod: "UPI",           icon: "🛒" },
];

export const budgets: BudgetItem[] = [
  { category: "Food & Dining", budget: 5000,  spent: 3680, color: "#f59e0b", icon: "🍽️" },
  { category: "Transport",     budget: 2000,  spent: 980,  color: "#3b82f6", icon: "🚇" },
  { category: "Shopping",      budget: 4000,  spent: 3820, color: "#ec4899", icon: "🛍️" },
  { category: "Entertainment", budget: 1500,  spent: 768,  color: "#8b5cf6", icon: "🎬" },
  { category: "Education",     budget: 2000,  spent: 1299, color: "#06b6d4", icon: "📚" },
  { category: "Health",        budget: 1000,  spent: 640,  color: "#10b981", icon: "💊" },
  { category: "Housing",       budget: 14000, spent: 12000, color: "#6366f1", icon: "🏠" },
];

export const goals: Goal[] = [
  { id: "g1", name: "Emergency Fund",    target: 100000, saved: 62000, deadline: "Dec 2026",  icon: "🛡️",  color: "#6366f1" },
  { id: "g2", name: "MacBook Pro",       target: 200000, saved: 45000, deadline: "Mar 2027",  icon: "💻",  color: "#ec4899" },
  { id: "g3", name: "Goa Trip",          target: 25000,  saved: 18500, deadline: "Nov 2026",  icon: "✈️",  color: "#f59e0b" },
  { id: "g4", name: "MBA Preparation",   target: 50000,  saved: 8000,  deadline: "Jun 2027",  icon: "📚",  color: "#06b6d4" },
];

export const monthlyData = [
  { month: "Apr", income: 46000, expenses: 28400, savings: 17600 },
  { month: "May", income: 50500, expenses: 31200, savings: 19300 },
  { month: "Jun", income: 46000, expenses: 26800, savings: 19200 },
  { month: "Jul", income: 54500, expenses: 35100, savings: 19400 },
  { month: "Aug", income: 50500, expenses: 29600, savings: 20900 },
  { month: "Sep", income: 50500, expenses: 23186, savings: 27314 },
];

export const weeklyData = [
  { week: "W1 Aug", amount: 7200 },
  { week: "W2 Aug", amount: 9400 },
  { week: "W3 Aug", amount: 6800 },
  { week: "W4 Aug", amount: 6200 },
  { week: "W1 Sep", amount: 5600 },
];

export const dailyExpenses = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  amount: Math.floor(Math.random() * 2800 + 200),
}));

export const stats = {
  totalBalance: 184320,
  monthlyIncome: 50500,
  monthlyExpenses: 23186,
  monthlySavings: 27314,
  savingsRate: 54,
  prevMonthExpenses: 29600,
};
