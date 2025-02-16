"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRepository = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../utils/logger");
const customError_1 = require("../errors/customError");
const DATA_DIR = path_1.default.join(__dirname, "../../data");
const DATA_FILE = path_1.default.join(DATA_DIR, "expenses.json");
class ExpenseRepository {
    static addExpense(description, parsedAmount) {
        throw new Error('Method not implemented.');
    }
    constructor() {
        this.ensureDataFile();
    }
    ensureDataFile() {
        if (!fs_1.default.existsSync(DATA_DIR)) {
            fs_1.default.mkdirSync(DATA_DIR, { recursive: true });
            throw new customError_1.CustomError("Expense data dir not found.");
        }
        if (!fs_1.default.existsSync(DATA_FILE)) {
            fs_1.default.writeFileSync(DATA_FILE, "[]", "utf-8");
            throw new customError_1.CustomError("Expense data file not found.");
        }
    }
    getExpenses() {
        try {
            const data = fs_1.default.readFileSync(DATA_FILE, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            if (error instanceof Error) {
                logger_1.logger.error("Error reading expenses file: " + error.message);
            }
            else {
                logger_1.logger.error("Unknown error reading expenses file");
            }
            return [];
        }
    }
    saveExpenses(expenses) {
        try {
            fs_1.default.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2), "utf-8");
        }
        catch (error) {
            if (error instanceof customError_1.CustomError) {
                logger_1.logger.error("❌ Application error:", error.message);
            }
            else {
                logger_1.logger.error('Error saving expenses:', error);
            }
        }
    }
}
exports.ExpenseRepository = ExpenseRepository;
