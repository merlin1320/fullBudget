import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import ExpenseCategories from "../calculator/ExpenseCategories";
import SalaryCalculator from "../calculator/SalaryCalculator";
import ExpenseTracker from "./ExpenseTracker";

export const BudgetTool = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<{ id: number; category: string; amount: number; description: string }[]>(
    []
  );
  
  const handleAddExpense = (category: string, amount: number, description: string) => {
    const id = expenses.length + 1;
    setExpenses([...expenses, { id, category, amount, description }]);
    setMonthlyIncome((prevIncome) => prevIncome - amount);
  };

  const columns: GridColDef[] = [
    { field: "category", headerName: "Category", flex: 1 },
    { field: "amount", headerName: "Amount ($)", flex: 1, type: "number" },
    { field: "description", headerName: "Description", flex: 2 },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>Budget Management Tool</Typography>
      
      <SalaryCalculator />
      <Typography variant="h6" sx={{ mt: 2 }}>Monthly Budget: ${monthlyIncome.toFixed(2)}</Typography>
      
      <ExpenseCategories />
      <ExpenseTracker categories={[]} onAddExpense={handleAddExpense} />
      
      <Typography variant="h5" sx={{ mt: 3 }}>Expense Overview</Typography>
      <Box sx={{ height: 300, mt: 2 }}>
        <DataGrid rows={expenses} columns={columns} pageSizeOptions={[5]} />
      </Box>
    </Box>
  );
};

export default BudgetTool;
