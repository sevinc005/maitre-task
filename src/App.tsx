import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
