import React, { useState } from "react";
import { TextField, Button, Typography, Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ExpenseCategoriesProps {
  onAddCategory: (category: string) => void;
}

const ExpenseCategories: React.FC<ExpenseCategoriesProps> = ({ onAddCategory }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState("");

  const addCategory = () => {
    if (categoryName.trim() === "") return;
    setCategories([...categories, categoryName]);
    onAddCategory(categoryName);
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