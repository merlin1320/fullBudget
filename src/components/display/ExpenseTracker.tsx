import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ExpenseTrackerProps {
  categories: string[];
  onAddExpense: (category: string, amount: number, description: string) => void;
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ categories, onAddExpense }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState<{ id: number; category: string; amount: number; description: string }[]>([]);

  const handleAddExpense = () => {
    if (!category || amount === "" || description.trim() === "") return;
    const newExpense = { id: expenses.length + 1, category, amount: Number(amount), description };
    setExpenses([...expenses, newExpense]);
    onAddExpense(category, Number(amount), description);
    setCategory("");
    setAmount("");
    setDescription("");
  };

  const handleRemoveExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Expense Tracker</Typography>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <MenuItem key={index} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <TextField
        label="Amount ($)"
        type="number"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <Button variant="contained" color="primary" fullWidth onClick={handleAddExpense}>
        Add Expense
      </Button>
      
      <List sx={{ mt: 3 }}>
        {expenses.map((expense) => (
          <ListItem key={expense.id} secondaryAction={
            <IconButton edge="end" color="error" onClick={() => handleRemoveExpense(expense.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={`${expense.category}: $${expense.amount}`} secondary={expense.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ExpenseTracker;
