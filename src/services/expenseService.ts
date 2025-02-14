import fs from 'fs';
import path from 'path';
import { Expense } from '../models/expense';

const DATA_DIR = path.join(__dirname, "../../data");
const DATA_FILE = path.join(DATA_DIR, "expenses.json");

class ExpenseService {
  private expenses: Expense[] = [];

  constructor() {
    this.ensureDataFile();
    this.loadExpenses();
  }

  private ensureDataFile(): void {
    // Crear la carpeta "data" si no existe
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Crear el archivo "expenses.json" si no existe
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]", "utf-8");
    }
  }

  private loadExpenses(): void {
    try {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      this.expenses = JSON.parse(data) as Expense[];
    } catch (error) {
      console.error("Error loading expenses:", error);
      this.expenses = [];
    }
  }

  private saveExpenses(): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.expenses, null, 2), "utf-8");
    } catch (error) {
      console.error("Error saving expenses:", error);
    }
  }


  addExpense(description: string, amount: number): Expense {
    const newExpense: Expense = {
      id: this.expenses.length + 1,
      description,
      amount,
      date: new Date().toISOString().split("T")[0],
    }
    this.expenses.push(newExpense);
    this.saveExpenses();
    return newExpense;
  }

  listExpenses(): Expense[] {
    return this.expenses;
  }  

  deleteExpense(id: number): boolean {
    const index = this.expenses.findIndex(expense => expense.id === id);
    if (index === -1) {
      return false;
    }
    this.expenses.splice(index, 1);
    this.saveExpenses();
    return true;
  }

  getSummary(): number {
    const total = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    return total;
  }

  getMonthlySummary(month: number): number {
    const filteredExpenses = this.expenses.filter(exp => {
      const expenseMonth = new Date(exp.date).getMonth() + 1;
      return expenseMonth === month;
    });
  
    return filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  }  
}

export default new ExpenseService();