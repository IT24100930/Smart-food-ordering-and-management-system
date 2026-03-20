import { useEffect, useState } from "react";
import DashboardCard from "../../components/admin/DashboardCard";
import PageHeader from "../../components/layout/PageHeader";
import { getAdminOrders, getAdminUsers } from "../../services/adminService";
import { getOrderCounts } from "../../utils/helpers";

function Reports() {
  const [reportData, setReportData] = useState({
    pending: 0,
    preparing: 0,
    delivered: 0,
    users: 0,
  });

  useEffect(() => {
    const loadReports = async () => {
      const [orders, users] = await Promise.all([getAdminOrders(), getAdminUsers()]);
      const counts = getOrderCounts(orders);
      setReportData({
        pending: counts.Pending || 0,
        preparing: counts.Preparing || 0,
        delivered: counts.Delivered || 0,
        users: users.length,
      });
    };

    loadReports();
  }, []);

  return (
    <section>
      <PageHeader
        title="Reports"
        description="Quick report cards for the main business values."
      />
      <div className="dashboard-grid">
        <DashboardCard title="Pending Orders" value={reportData.pending} helpText="Need action soon" />
        <DashboardCard title="Preparing Orders" value={reportData.preparing} helpText="Kitchen in progress" />
        <DashboardCard title="Delivered Orders" value={reportData.delivered} helpText="Completed orders" />
        <DashboardCard title="Total Users" value={reportData.users} helpText="System users" />
      </div>
    </section>
  );
}

export default Reports;
