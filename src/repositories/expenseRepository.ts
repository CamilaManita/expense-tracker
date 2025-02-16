import fs from 'fs';
import path from 'path';
import { Expense } from '../models/expense';
import { logger } from '../utils/logger';
import { CustomError } from '../errors/customError';
import { IExpenseRepository } from './iExpenseRepository';

const DATA_DIR = path.join(__dirname, "../../data");
const DATA_FILE = path.join(DATA_DIR, "expenses.json");

export class ExpenseRepository implements IExpenseRepository{
  static addExpense(description: any, parsedAmount: number) {
    throw new Error('Method not implemented.');
  }

  constructor() {
    this.ensureDataFile();
  }

  public ensureDataFile(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      throw new CustomError("Expense data dir not found.");
    }

    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]", "utf-8");
      throw new CustomError("Expense data file not found.");
    }
  }

  public getExpenses(): Expense[] {
    try {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data) as Expense[];
    } catch (error) {
      if (error instanceof Error) {
        logger.error("Error reading expenses file: " + error.message);
      } else {
        logger.error("Unknown error reading expenses file");
      }
      return [];
    }
  }
  public saveExpenses(expenses: Expense[]): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2), "utf-8");
    } catch (error) {
      if (error instanceof CustomError) {
        logger.error("❌ Application error:", error.message);
      } else {
        logger.error('Error saving expenses:', error);
      }
    }
  }
}