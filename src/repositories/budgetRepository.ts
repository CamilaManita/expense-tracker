import fs from "fs";
import path from "path";
import { Budget } from "../models/budget";
import { CustomError } from "../errors/customError";

const DATA_FILE = path.join(__dirname, "../../data/budgets.json");

export class BudgetRepository {

  constructor() {
    this.ensureDataFile();
  }

  private ensureDataFile() {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]", "utf-8");
    }
  }

  public getBudgets(): Budget[] {
    try {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data) as Budget[];
    } catch (error) {
      throw new CustomError("Error reading budgets");
    }
  }

  public saveBudgets(budgets: Budget[]): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(budgets, null, 2), "utf-8");
    } catch (error) {
      throw new CustomError("❌ Error saving budgets");
    }
  }

  public getBudgetForMonth(month: number): Budget | undefined {
    return this.getBudgets().find((b) => Number(b.month) === month);
  }

  public setBudgetForMonth(month: number, amount: number): void {
    const budgets = this.getBudgets();
    const index = budgets.findIndex((b) => Number(b.month) === month);

    if (index !== -1){
      budgets[index].amount = amount;
    } else {
      budgets.push({ month: month.toString(), amount });
    }

    this.saveBudgets(budgets);
  }
}
