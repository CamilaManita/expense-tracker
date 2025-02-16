"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetExpensesByCategoryAction = void 0;
const customError_1 = require("../errors/customError");
class GetExpensesByCategoryAction {
    constructor(repository) {
        this.repository = repository;
    }
    execute(category) {
        if (!category || typeof category !== 'string') {
            throw new customError_1.CustomError("❌ Category must be a non-empty string.");
        }
        try {
            return this.repository.getExpenses().filter((expense) => expense.category.toLowerCase() ===
                category.toLowerCase());
        }
        catch (error) {
            throw new customError_1.CustomError("❌ Error retrieving expenses by category: " + error.message);
        }
    }
}
exports.GetExpensesByCategoryAction = GetExpensesByCategoryAction;
