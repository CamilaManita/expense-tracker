"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const expenseService_1 = __importDefault(require("./services/expenseService"));
const program = new commander_1.Command();
program
    .name("expense-tracker")
    .description("A simple CLI to track expenses")
    .version("1.0.0");
program
    .command("add")
    .description("Add a new expense")
    .argument("<description>", "Expense description")
    .argument("<amount>", "Expense amount")
    .action((description, amount) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        console.error("❌ Error: Amount must be a positive number.");
        process.exit(1);
    }
    const expense = expenseService_1.default.addExpense(description, parsedAmount);
    if (!expense)
        return;
    console.log(`Expense added successfully (ID: ${expense.id})`);
});
program
    .command("list")
    .description("List all expenses")
    .action(() => {
    const expenses = expenseService_1.default.listExpenses();
    console.table(expenses);
});
program
    .command("delete")
    .description("Delete an expense")
    .option("-i, --id <id>", "Expense ID")
    .action((options) => {
    if (!options.id) {
        console.error("Please provide an ID");
        process.exit(1);
    }
    const success = expenseService_1.default.deleteExpense(parseInt(options.id));
    if (success)
        console.log("Expense deleted successfully");
});
program
    .command("summary")
    .description("Show total expenses or filter by month")
    .option("-m, --month <month>", "Show summary for a specific month (1-12)")
    .action((options) => {
    if (options.month) {
        const month = parseInt(options.month);
        if (isNaN(month) || month < 1 || month > 12) {
            console.error("Error: Month must be a number between 1 and 12.");
            return;
        }
        const total = expenseService_1.default.getMonthlySummary(month);
        console.log(`Total expenses for month ${month}: $${total}`);
    }
    else {
        const total = expenseService_1.default.getSummary();
        console.log(`Total expenses: $${total}`);
    }
});
program.parse(process.argv);
