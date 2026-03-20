import { useEffect, useState } from "react";
import DashboardCard from "../../components/admin/DashboardCard";
import InventoryTable from "../../components/admin/InventoryTable";
import SalesChart from "../../components/admin/SalesChart";
import PageHeader from "../../components/layout/PageHeader";
import { getAdminFoods, getAdminOrders, getDashboardSummary } from "../../services/adminService";
import formatCurrency from "../../utils/formatCurrency";
import "./Admin.css";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [summaryResponse, foodsResponse, ordersResponse] = await Promise.all([
        getDashboardSummary(),
        getAdminFoods(),
        getAdminOrders(),
      ]);
      setSummary(summaryResponse);
      setFoods(foodsResponse);
      setOrders(ordersResponse);
    };

    loadData();
  }, []);

  if (!summary) return null;

  return (
    <section>
      <PageHeader
        title="Admin Dashboard"
        description="Monitor key values of the smart food ordering system."
      />
      <div className="dashboard-grid">
        <DashboardCard title="Foods" value={summary.totalFoods} helpText="Menu items in the system" />
        <DashboardCard title="Users" value={summary.totalUsers} helpText="Registered demo users" />
        <DashboardCard title="Orders" value={summary.totalOrders} helpText="Orders in the system" />
        <DashboardCard title="Revenue" value={formatCurrency(summary.revenue)} helpText="Estimated income" />
      </div>
      <div className="admin-grid">
        <SalesChart orders={orders} />
        <div className="table-card">
          <h3>Inventory Overview</h3>
          <InventoryTable foods={foods} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
