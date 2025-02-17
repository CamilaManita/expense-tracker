import { Command } from "commander";
import ExpenseService from "./services/expenseService";
import { ExpenseRepository } from "./repositories/expenseRepository";

import { BudgetRepository } from "./repositories/budgetRepository";

const expenseService = new ExpenseService(new ExpenseRepository(), new BudgetRepository());

const program = new Command();

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

    const expense = expenseService.addExpense(
      description,
      parsedAmount,
      category
    );
    console.log(`✅ Expense added successfully (ID: ${expense.id})`);
  });

program
  .command("list-category")
  .description("List expenses by category")
  .argument("<category>", "Expense category")
  .action((category) => {
    const expenses = expenseService.getExpensesByCategory(category);
    console.table(expenses);
  });

program
  .command("list")
  .description("List all expenses")
  .action(() => {
    const expenses = expenseService.listExpenses();
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
    const success = expenseService.deleteExpense(parseInt(options.id));
    if (success !== undefined) console.log("Expense deleted successfully");
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
    } else {
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
    } else {
      console.log(`⚠️ No budget set for month ${parsedMonth}.`);
    }
  });

program.parse(process.argv);
