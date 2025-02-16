"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMonthlySummaryAction = void 0;
const moment_1 = __importDefault(require("moment"));
const customError_1 = require("../errors/customError");
class GetMonthlySummaryAction {
    constructor(repository) {
        this.repository = repository;
    }
    execute(month) {
        if (isNaN(month) || month < 1 || month > 12) {
            throw new customError_1.CustomError("❌ Month must be a number between 1 and 12.");
        }
        try {
            const expenses = this.repository.getExpenses();
            const filteredExpenses = expenses.filter((expense) => (0, moment_1.default)(expense.date).month() + 1 === month);
            return filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new customError_1.CustomError(`❌ Error retrieving monthly summary: ${error.message}`);
            }
            else {
                throw new customError_1.CustomError("❌ Error retrieving monthly summary: Unknown error");
            }
        }
    }
}
exports.GetMonthlySummaryAction = GetMonthlySummaryAction;
