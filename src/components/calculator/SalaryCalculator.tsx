import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

interface SalaryCalculatorProps {
  onSalaryUpdate: (salary: number) => void;
}

const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({ onSalaryUpdate }) => {
  const [salary, setSalary] = useState<number | "">("");

  const calculateSalary = () => {
    if (salary === "") return;
    onSalaryUpdate(Number(salary));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Salary Calculator</Typography>
      <TextField
        label="Enter Salary ($)"
        type="number"
        fullWidth
        value={salary}
        onChange={(e) => setSalary(e.target.value === "" ? "" : Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={calculateSalary}>
        Calculate Salary
      </Button>
    </Box>
  );
};

export default SalaryCalculator;
