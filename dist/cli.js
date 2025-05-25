#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const expenseService_1 = __importDefault(require("./services/expenseService"));
const expenseRepository_1 = require("./repositories/expenseRepository");
const budgetRepository_1 = require("./repositories/budgetRepository");
const cli_table3_1 = __importDefault(require("cli-table3"));
const fs = __importStar(require("fs"));
const expenseService = new expenseService_1.default(new expenseRepository_1.ExpenseRepository(), new budgetRepository_1.BudgetRepository());
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
    .argument("<category>", "Expense category")
    .action((description, amount, category) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        console.error("❌ Error: Amount must be a valid positive number.");
        process.exit(1);
    }
    const expense = expenseService.addExpense(description, parsedAmount, category);
    console.log(`✅ Expense added successfully (ID: ${expense.id})`);
});
program
    .command("list-category")
    .description("List expenses by category")
    .argument("<category>", "Expense category")
    .action((category) => {
    const expenses = expenseService.getExpensesByCategory(category);
    const table = new cli_table3_1.default({
        head: ['ID', 'Descripción', 'Monto', 'Categoría', 'Fecha'],
        style: {
            head: ['cyan'],
            border: ['gray']
        }
    });
    expenses.forEach(expense => {
        table.push([
            expense.id,
            expense.description,
            `$${expense.amount.toFixed(2)}`,
            expense.category,
            new Date(expense.date).toLocaleDateString()
        ]);
    });
    console.log(table.toString());
});
program
    .command("list")
    .description("List all expenses")
    .action(() => {
    const expenses = expenseService.listExpenses();
    const table = new cli_table3_1.default({
        head: ['ID', 'Descripción', 'Monto', 'Categoría', 'Fecha'],
        style: {
            head: ['cyan'],
            border: ['gray']
        }
    });
    expenses.forEach(expense => {
        table.push([
            expense.id,
            expense.description,
            `$${expense.amount.toFixed(2)}`,
            expense.category,
            new Date(expense.date).toLocaleDateString()
        ]);
    });
    console.log(table.toString());
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
    const success = expenseService.deleteExpense(parseInt(options.id));
    if (success !== undefined)
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
        const total = expenseService.getMonthlySummary(month);
        console.log(`Total expenses for month ${month}: $${total}`);
    }
    else {
        const total = expenseService.getSummary();
        console.log(`Total expenses: $${total}`);
    }
});
program
    .command("set-budget")
    .description("Set a monthly budget")
    .argument("<month>", "Month (1-12)")
    .argument("<amount>", "Budget amount")
    .action((month, amount) => {
    const parsedMonth = parseInt(month);
    const parsedAmount = parseFloat(amount);
    expenseService.setBudget(parsedMonth, parsedAmount);
});
program
    .command("get-budget")
    .description("Get the budget for a month")
    .argument("<month>", "Month (1-12)")
    .action((month) => {
    const parsedMonth = parseInt(month);
    const budget = expenseService.getBudgetForMonth(parsedMonth);
    if (budget) {
        console.log(`✅ Budget for month ${parsedMonth}: $${budget.amount}`);
    }
    else {
        console.log(`⚠️ No budget set for month ${parsedMonth}.`);
    }
});
program
    .command("export-csv")
    .description("Export expenses to a CSV file")
    .option("-f, --file <filename>", "Output CSV filename (default: expenses.csv)")
    .option("-m, --month <month>", "Export expenses for a specific month (1-12)")
    .option("-c, --category <category>", "Export expenses for a specific category")
    .action((options) => {
    let expenses;
    if (options.month) {
        const month = parseInt(options.month);
        if (isNaN(month) || month < 1 || month > 12) {
            console.error("❌ Error: Month must be a number between 1 and 12.");
            process.exit(1);
        }
        expenses = expenseService.getExpensesByMonth(month);
    }
    else if (options.category) {
        expenses = expenseService.getExpensesByCategory(options.category);
    }
    else {
        expenses = expenseService.listExpenses();
    }
    if (expenses.length === 0) {
        console.log("⚠️ No expenses found to export.");
        return;
    }
    const filename = options.file || 'expenses.csv';
    const csvContent = [
        ['ID', 'Descripción', 'Monto', 'Categoría', 'Fecha'],
        ...expenses.map(expense => [
            expense.id,
            `"${expense.description.replace(/"/g, '""')}"`,
            expense.amount.toFixed(2),
            `"${expense.category}"`,
            new Date(expense.date).toLocaleDateString()
        ])
    ].map(row => row.join(',')).join('\n');
    try {
        fs.writeFileSync(filename, csvContent);
        console.log(`✅ Expenses exported successfully to ${filename}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`❌ Error exporting expenses: ${error.message}`);
        }
        else {
            console.error('❌ Error exporting expenses: Unknown error occurred');
        }
        process.exit(1);
    }
});
program.parse(process.argv);
