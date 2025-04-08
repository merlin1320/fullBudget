import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Budget from "./pages/Budget";
import Home from "./pages/Home";
import IncomeExpenses from "./pages/IncomeExpenses";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="budget" element={<Budget />} />
          <Route path="income-expenses" element={<IncomeExpenses />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App; 