import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { storage } from "../../utils/storage";

const EXPENSES_KEY = "expenses";
const CATEGORIES_KEY = "expenseCategories";

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<{ category: string; amount: number; note?: string }[]>(storage.get(EXPENSES_KEY) || []);
  const [categories, setCategories] = useState<string[]>(storage.get(CATEGORIES_KEY) || []);
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    storage.set(EXPENSES_KEY, expenses);
  }, [expenses]);

  useEffect(() => {
    setCategories(storage.get(CATEGORIES_KEY) || []);
  }, []);

  const addExpense = () => {
    if (!category || amount <= 0) return;
    setExpenses([...expenses, { category, amount, note: note.trim() || undefined }]);
    setCategory("");
    setAmount(0);
    setNote("");
  };

  const removeExpense = (idx: number) => {
    setExpenses(expenses.filter((_, i) => i !== idx));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Expenses</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map((cat, idx) => (
            <MenuItem key={idx} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Amount ($)"
        type="number"
        fullWidth
        value={amount}
        onChange={e => setAmount(parseFloat(e.target.value) || 0)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Note (optional)"
        type="text"
        fullWidth
        value={note}
        onChange={e => setNote(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={addExpense} sx={{ mb: 2 }}>
        Add Expense
      </Button>
      <List>
        {expenses.map((exp, idx) => (
          <ListItem key={idx} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => removeExpense(idx)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={`${exp.category}: $${exp.amount.toFixed(2)}`} secondary={exp.note} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Expenses;