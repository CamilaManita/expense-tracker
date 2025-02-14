"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_DIR = path_1.default.join(__dirname, "../../data");
const DATA_FILE = path_1.default.join(DATA_DIR, "expenses.json");
class ExpenseService {
    constructor() {
        this.expenses = [];
        this.ensureDataFile();
        this.loadExpenses();
    }
    ensureDataFile() {
        // Crear la carpeta "data" si no existe
        if (!fs_1.default.existsSync(DATA_DIR)) {
            fs_1.default.mkdirSync(DATA_DIR, { recursive: true });
        }
        // Crear el archivo "expenses.json" si no existe
        if (!fs_1.default.existsSync(DATA_FILE)) {
            fs_1.default.writeFileSync(DATA_FILE, "[]", "utf-8");
        }
    }
    loadExpenses() {
        try {
            const data = fs_1.default.readFileSync(DATA_FILE, "utf-8");
            this.expenses = JSON.parse(data);
        }
        catch (error) {
            console.error("Error loading expenses:", error);
            this.expenses = [];
        }
    }
    saveExpenses() {
        try {
            fs_1.default.writeFileSync(DATA_FILE, JSON.stringify(this.expenses, null, 2), "utf-8");
        }
        catch (error) {
            console.error("Error saving expenses:", error);
        }
    }
    addExpense(description, amount) {
        const newExpense = {
            id: this.expenses.length + 1,
            description,
            amount,
            date: new Date().toISOString().split("T")[0],
        };
        this.expenses.push(newExpense);
        this.saveExpenses();
        return newExpense;
    }
    listExpenses() {
        return this.expenses;
    }
    deleteExpense(id) {
        const index = this.expenses.findIndex(expense => expense.id === id);
        if (index === -1) {
            return false;
        }
        this.expenses.splice(index, 1);
        this.saveExpenses();
        return true;
    }
    getSummary() {
        const total = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        return total;
    }
    getMonthlySummary(month) {
        const filteredExpenses = this.expenses.filter(exp => {
            const expenseMonth = new Date(exp.date).getMonth() + 1;
            return expenseMonth === month;
        });
        return filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    }
}
exports.default = new ExpenseService();
