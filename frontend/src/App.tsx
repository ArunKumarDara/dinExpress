import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/theme-provider";
import Home from "./pages/Home";
import Restaurants from "./pages/restaurants/Restaurants";
import RestaurantMenu from "./pages/restaurants/menu";
// import GroceryProduct from "./pages/grocery/Grocery";
import Grocery from "./pages/grocery/Grocery";
import Bakery from "./pages/bakery/Bakery";
import CustomBakeryOrder from "./pages/bakery/customOrder";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="restaurants">
              <Route index element={<Restaurants />} />
              <Route path=":id" element={<RestaurantMenu />} />
            </Route>
            <Route path="/grocery" element={<Grocery />} />
            <Route path="bakery">
              <Route index element={<Bakery />} />
              <Route path="pre-order" element={<CustomBakeryOrder />} />
            </Route>
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  )
}

