import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Summary from "./pages/Summary";
import Expenses from "./components/calculator/Expenses";
import ExpenseCategories from "./components/calculator/ExpenseCategories";
import ProfilePage from "./pages/ProfilePage";
import IncomePage from "./pages/IncomePage";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Summary />} />
          <Route path="home" element={<Summary />} />
          <Route path="income" element={<IncomePage />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="settings" element={<ExpenseCategories />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;