import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { storage } from "../../utils/storage";

const STORAGE_KEY = "extraIncomeList";

const ExtraIncome: React.FC = () => {
  const [extraIncome, setExtraIncome] = useState<string>("");
  const [incomeList, setIncomeList] = useState<{ label: string; amount: number }[]>(storage.get(STORAGE_KEY) || []);

  useEffect(() => {
    storage.set(STORAGE_KEY, incomeList);
  }, [incomeList]);

  const addIncome = () => {
    const [label, amountStr] = extraIncome.split(":");
    const amount = parseFloat(amountStr);
    if (label && !isNaN(amount)) {
      setIncomeList([...incomeList, { label: label.trim(), amount }]);
      setExtraIncome("");
    }
  };

  const removeIncome = (idx: number) => {
    setIncomeList(incomeList.filter((_, i) => i !== idx));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Extra Income</Typography>
      <TextField
        label="Description:Amount (e.g. Freelance:200)"
        type="text"
        fullWidth
        value={extraIncome}
        onChange={(e) => setExtraIncome(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={addIncome} sx={{ mb: 2 }}>
        Add Extra Income
      </Button>
      <List>
        {incomeList.map((item, idx) => (
          <ListItem key={idx} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => removeIncome(idx)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={`${item.label}: $${item.amount.toFixed(2)}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ExtraIncome;
