import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { storage } from "../../utils/storage";

const STORAGE_KEY = "expenseCategories";

const ExpenseCategories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(storage.get(STORAGE_KEY) || []);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    storage.set(STORAGE_KEY, categories);
  }, [categories]);

  const addCategory = () => {
    if (categoryName.trim() === "" || categories.includes(categoryName.trim())) return;
    setCategories([...categories, categoryName.trim()]);
    setCategoryName("");
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Expense Categories</Typography>
      <TextField
        label="Category Name"
        fullWidth
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={addCategory}>
        Add Category
      </Button>
      <List sx={{ mt: 3 }}>
        {categories.map((category, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" color="error" onClick={() => removeCategory(index)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ExpenseCategories;