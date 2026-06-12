import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";

// Layout & Guards
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import MensWear from "./pages/MensWear";
import WomensWear from "./pages/WomensWear";
import Stores from "./pages/Stores";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./features/cart/Cart";

// Admin Dashboard
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminCustomers from "./admin/AdminCustomers";

// Customer Dashboard
import CustomerLayout from "./customer/CustomerLayout";
import CustomerDashboard from "./customer/CustomerDashboard";
import CustomerOrders from "./customer/CustomerOrders";
import CustomerCart from "./customer/CustomerCart";
import CustomerProfile from "./customer/CustomerProfile";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Wrapper that renders Navbar+Footer for public pages
function PublicLayout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth pages — no navbar/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard — protected, admin-only */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>

        {/* Customer Dashboard — protected */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CustomerDashboard />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="cart" element={<CustomerCart />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>

        {/* Public store pages */}
        <Route
          path="/*"
          element={
            <PublicLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mens-wear" element={<MensWear />} />
                <Route path="/womens-wear" element={<WomensWear />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </PublicLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;