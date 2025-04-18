import React, { useState } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Typography, Box } from "@mui/material";

const stateTaxRates: { [key: string]: number } = {
  "Alabama": 5,
  "Alaska": 0,
  "Arizona": 4.5,
  "Arkansas": 5.9,
  "California": 9.3,
  "Colorado": 4.55,
  "Connecticut": 6.99,
  "Delaware": 6.6,
  "Florida": 0,
  "Georgia": 5.75,
  "Hawaii": 8.25,
  "Idaho": 6,
  "Illinois": 4.95,
  "Indiana": 3.23,
  "Iowa": 6.5,
  "Kansas": 5.7,
  "Kentucky": 5,
  "Louisiana": 4.25,
  "Maine": 7.15,
  "Maryland": 5.75,
  "Massachusetts": 5,
  "Michigan": 4.25,
  "Minnesota": 7.25,
  "Mississippi": 5,
  "Missouri": 5.4,
  "Montana": 6.9,
  "Nebraska": 6.84,
  "Nevada": 0,
  "New Hampshire": 0,
  "New Jersey": 6.37,
  "New Mexico": 5.9,
  "New York": 6.5,
  "North Carolina": 4.75,
  "North Dakota": 2.9,
  "Ohio": 3.99,
  "Oklahoma": 5,
  "Oregon": 8.75,
  "Pennsylvania": 3.07,
  "Rhode Island": 5.99,
  "South Carolina": 7,
  "South Dakota": 0,
  "Tennessee": 0,
  "Texas": 0,
  "Utah": 4.85,
  "Vermont": 6.6,
  "Virginia": 5.75,
  "Washington": 0,
  "West Virginia": 6.5,
  "Wisconsin": 5.3,
  "Wyoming": 0
  // Add more states as needed
};

const StartingCalc: React.FC = () => {
  const [salaryType, setSalaryType] = useState<"hourly" | "yearly">("hourly");
  const [salary, setSalary] = useState<number>(0);
  const [hoursWorked, setHoursWorked] = useState<number>(40);
  const [federalTaxRate, setFederalTaxRate] = useState<number>(20);
  const [state, setState] = useState<string>("California");
  const [preTaxDeductions, setPreTaxDeductions] = useState<number>(0);
  const [postTaxDeductions, setPostTaxDeductions] = useState<number>(0);
  const [extraIncome, setExtraIncome] = useState<number>(0);
  const [takeHomePay, setTakeHomePay] = useState<number | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<{ category: string; amount: number }[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [expenseCategory, setExpenseCategory] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  const calculatePay = () => {
    let grossPay = 0;
    if (salaryType === "hourly") {
      grossPay = salary * hoursWorked;
    } else {
      const hourlyRate = salary / 2080;
      grossPay = hourlyRate * hoursWorked;
    }

    const stateTaxRate = stateTaxRates[state] || 0;
    const totalTaxRate = federalTaxRate + stateTaxRate;
    const afterTaxPay = grossPay - preTaxDeductions - (grossPay * totalTaxRate) / 100 - postTaxDeductions + extraIncome;
    setTakeHomePay(afterTaxPay);
    setMonthlyIncome(afterTaxPay / 12);
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const addExpense = () => {
    if (expenseCategory && expenseAmount > 0) {
      setExpenses([...expenses, { category: expenseCategory, amount: expenseAmount }]);
      setExpenseCategory("");
      setExpenseAmount(0);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Salary Calculator</Typography>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Salary Type</InputLabel>
        <Select value={salaryType} onChange={(e) => setSalaryType(e.target.value as "hourly" | "yearly")}>
          <MenuItem value="hourly">Hourly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label={salaryType === "hourly" ? "Hourly Rate ($)" : "Yearly Salary ($)"}
        type="number"
        fullWidth
        value={salary}
        onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Hours Worked"
        type="number"
        fullWidth
        value={hoursWorked}
        onChange={(e) => setHoursWorked(parseFloat(e.target.value) || 0)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Federal Tax Rate (%)"
        type="number"
        fullWidth
        value={federalTaxRate}
        onChange={(e) => setFederalTaxRate(parseFloat(e.target.value) || 0)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>State</InputLabel>
        <Select value={state} onChange={(e) => setState(e.target.value)}>
          {Object.keys(stateTaxRates).map((stateName) => (
            <MenuItem key={stateName} value={stateName}>{stateName}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Pre-Tax Deductions ($)"
        type="number"
        fullWidth
        value={preTaxDeductions}
        onChange={(e) => setPreTaxDeductions(parseFloat(e.target.value) || 0)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Post-Tax Deductions ($)"
        type="number"
        fullWidth
        value={postTaxDeductions}
        onChange={(e) => setPostTaxDeductions(parseFloat(e.target.value) || 0)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Extra Income ($)"
        type="number"
        fullWidth
        value={extraIncome}
        onChange={(e) => setExtraIncome(parseFloat(e.target.value) || 0)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" fullWidth onClick={calculatePay} sx={{ mt: 2 }}>
        Calculate Take-Home Pay
      </Button>

      {takeHomePay !== null && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Take-Home Pay: ${takeHomePay.toFixed(2)}
        </Typography>
      )}

      {monthlyIncome !== null && (
        <Typography variant="h6" sx={{ mt: 1 }}>
          Monthly Income: ${monthlyIncome.toFixed(2)}
        </Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>Categories</Typography>
        <TextField
          label="New Category"
          type="text"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={addCategory} sx={{ mb: 2 }}>
          Add Category
        </Button>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Expense Category</InputLabel>
          <Select value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)}>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Expense Amount ($)"
          type="number"
          fullWidth
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(parseFloat(e.target.value) || 0)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" color="primary" fullWidth onClick={addExpense} sx={{ mb: 2 }}>
          Add Expense
        </Button>

        <Typography variant="h6" gutterBottom>Expenses</Typography>
        {expenses.map((expense, index) => (
          <Typography key={index} variant="body1">
            {expense.category}: ${expense.amount.toFixed(2)}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default StartingCalc;
