import { Route, Routes } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ChatWidget from "../components/chatbot/ChatWidget";
import Dashboard from "../pages/Admin/Dashboard";
import ManageCategories from "../pages/Admin/ManageCategories";
import ManageFoods from "../pages/Admin/ManageFoods";
import ManageInventory from "../pages/Admin/ManageInventory";
import ManageOrders from "../pages/Admin/ManageOrders";
import ManageUsers from "../pages/Admin/ManageUsers";
import Reports from "../pages/Admin/Reports";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import NotFound from "../pages/NotFound/NotFound";
import OrderTrackingPage from "../pages/OrderTracking/OrderTrackingPage";
import Orders from "../pages/Orders/Orders";
import Profile from "../pages/Profile/Profile";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

function AppLayout({ children, admin = false }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className={`app-main ${admin ? "admin-main" : ""}`}>
        {admin && <Sidebar />}
        <div className="page-content">{children}</div>
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><Home /></AppLayout>} />
      <Route path="/menu" element={<AppLayout><Menu /></AppLayout>} />
      <Route path="/menu/:id" element={<AppLayout><FoodDetails /></AppLayout>} />
      <Route path="/cart" element={<AppLayout><Cart /></AppLayout>} />
      <Route path="/login" element={<AppLayout><Login /></AppLayout>} />
      <Route path="/register" element={<AppLayout><Register /></AppLayout>} />

      <Route element={<ProtectedRoute />}>
        <Route path="/checkout" element={<AppLayout><Checkout /></AppLayout>} />
        <Route path="/orders" element={<AppLayout><Orders /></AppLayout>} />
        <Route path="/tracking" element={<AppLayout><OrderTrackingPage /></AppLayout>} />
        <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AppLayout admin><Dashboard /></AppLayout>} />
        <Route path="/admin/foods" element={<AppLayout admin><ManageFoods /></AppLayout>} />
        <Route path="/admin/categories" element={<AppLayout admin><ManageCategories /></AppLayout>} />
        <Route path="/admin/orders" element={<AppLayout admin><ManageOrders /></AppLayout>} />
        <Route path="/admin/users" element={<AppLayout admin><ManageUsers /></AppLayout>} />
        <Route path="/admin/inventory" element={<AppLayout admin><ManageInventory /></AppLayout>} />
        <Route path="/admin/reports" element={<AppLayout admin><Reports /></AppLayout>} />
      </Route>

      <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
    </Routes>
  );
}

export default AppRoutes;
