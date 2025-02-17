"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetRepository = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const customError_1 = require("../errors/customError");
const DATA_FILE = path_1.default.join(__dirname, "../../data/budgets.json");
class BudgetRepository {
    constructor() {
        this.ensureDataFile();
    }
    ensureDataFile() {
        if (!fs_1.default.existsSync(DATA_FILE)) {
            fs_1.default.writeFileSync(DATA_FILE, "[]", "utf-8");
        }
    }
    getBudgets() {
        try {
            const data = fs_1.default.readFileSync(DATA_FILE, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            throw new customError_1.CustomError("Error reading budgets");
        }
    }
    saveBudgets(budgets) {
        try {
            fs_1.default.writeFileSync(DATA_FILE, JSON.stringify(budgets, null, 2), "utf-8");
        }
        catch (error) {
            throw new customError_1.CustomError("❌ Error saving budgets");
        }
    }
    getBudgetForMonth(month) {
        return this.getBudgets().find((b) => Number(b.month) === month);
    }
    setBudgetForMonth(month, amount) {
        const budgets = this.getBudgets();
        const index = budgets.findIndex((b) => Number(b.month) === month);
        if (index !== -1) {
            budgets[index].amount = amount;
        }
        else {
            budgets.push({ month: month.toString(), amount });
        }
        this.saveBudgets(budgets);
    }
}
exports.BudgetRepository = BudgetRepository;
