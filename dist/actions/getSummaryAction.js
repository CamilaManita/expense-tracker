"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSummaryAction = void 0;
const customError_1 = require("../errors/customError");
class GetSummaryAction {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        try {
            const expenses = this.repository.getExpenses();
            return expenses.reduce((acc, expense) => acc + expense.amount, 0);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new customError_1.CustomError(`❌ Error retrieving total summary: ${error.message}`);
            }
            else {
                throw new customError_1.CustomError('❌ Error retrieving total summary: Unknown error');
            }
        }
    }
}
exports.GetSummaryAction = GetSummaryAction;
