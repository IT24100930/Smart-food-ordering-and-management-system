import { useEffect, useState } from "react";
import OrderManagementTable from "../../components/admin/OrderManagementTable";
import PageHeader from "../../components/layout/PageHeader";
import { getAdminOrders } from "../../services/adminService";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAdminOrders().then(setOrders);
  }, []);

  return (
    <section>
      <PageHeader
        title="Manage Orders"
        description="Review all customer orders in a simple table."
      />
      <OrderManagementTable orders={orders} />
    </section>
  );
}

export default ManageOrders;
