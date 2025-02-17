"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetBudgetAction = void 0;
const customError_1 = require("../errors/customError");
class SetBudgetAction {
    constructor(repository) {
        this.repository = repository;
    }
    execute(month, amount) {
        if (isNaN(month) || month < 1 || month > 12) {
            throw new customError_1.CustomError("❌ Month must be a number between 1 and 12.");
        }
        if (isNaN(amount) || amount <= 0) {
            throw new customError_1.CustomError("❌ Budget must be a positive number.");
        }
        this.repository.setBudgetForMonth(month, amount);
        console.log(`✅ Budget for month ${month} set to $${amount}`);
    }
}
exports.SetBudgetAction = SetBudgetAction;
