export interface Kpis {
  _id: string;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: MonthlyDatum[];
  dailyData: DailyDatum[];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface DailyDatum {
  date: Date;
  revenue: number;
  expenses: number;
  _id: string;
  id: string;
}

export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface MonthlyDatum {
  month: string;
  revenue: number;
  expenses: number;
  operationalExpenses: number;
  nonOperationalExpenses: number;
  _id: string;
  id: string;
}
