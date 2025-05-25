# Expense Tracker CLI 📊
https://roadmap.sh/projects/expense-tracker

A command-line interface (CLI) application to efficiently manage and track your personal expenses.

## Features ✨

- 📝 Add expenses with description, amount, and category
- 📋 List all expenses in table format
- 🔍 Filter expenses by category
- 📅 View monthly summaries
- 💰 Set and check monthly budgets
- 📊 Export expenses to CSV
- 🎨 Console interface with colors and formatted tables

## Installation 🚀

```bash
# Clone the repository
git clone https://github.com/tu-usuario/expense-tracker.git

# Enter the directory
cd expense-tracker

# Install dependencies
npm install

# Install globally (optional)
npm install -g .
```

## Usage 📖

### Add an expense
```bash
expense-tracker add "Compras supermercado" 50.00 "Alimentación"
```

### List all expenses
```bash
expense-tracker list
```

### List expenses by category
```bash
expense-tracker list-category "Alimentación"
```

### View expense summary
```bash
# Total summary
expense-tracker summary

# Monthly summary
expense-tracker summary --month 5
```

### Manage budgets
```bash
# Set monthly budget
expense-tracker set-budget 5 1000

# Check budget
expense-tracker get-budget 5
```

### Export expenses to CSV
```bash
# Export all expenses
expense-tracker export-csv

# Export to specific file
expense-tracker export-csv --file exports/mis_gastos.csv

# Export expenses from a specific month
expense-tracker export-csv --month 5

# Export expenses from a specific category
expense-tracker export-csv --category "Alimentación"
```

## Available Commands 📝

| Command | Description |
|---------|-------------|
| `add` | Add a new expense |
| `list` | List all expenses |
| `list-category` | List expenses by category |
| `delete` | Delete an expense |
| `summary` | View expense summary |
| `set-budget` | Set monthly budget |
| `get-budget` | Check monthly budget |
| `export-csv` | Export expenses to CSV |

## CSV Export Options 📊

| Option | Description |
|--------|-------------|
| `-f, --file` | Output filename (default: expenses.csv) |
| `-m, --month` | Export expenses from specific month (1-12) |
| `-c, --category` | Export expenses from specific category |

## Project Structure 📁

```
expense-tracker/
├── src/
│   ├── actions/         # Application actions
│   ├── models/          # Data models
│   ├── repositories/    # Data repositories
│   ├── services/        # Business services
│   └── cli.ts           # CLI entry point
├── data/               # Persistent data
├── dist/              # Compiled code
└── tests/             # Unit tests
```

## Technologies Used 🛠

- TypeScript
- Node.js
- Commander.js (CLI)
- cli-table3 (Console tables)
- Jest (Testing)

## Contributing 🤝

Contributions are welcome. Please open an issue first to discuss what you would like to change.

## License 📄

This project is licensed under the MIT license.

## Author 👤

Camila Manita - [@CamilaManita](https://github.com/CamilaManita)

---

⭐️ If you like the project, please give it a star!

