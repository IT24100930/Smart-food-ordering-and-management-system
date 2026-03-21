import Table from "../common/Table";
import OrderStatusBadge from "../order/OrderStatusBadge";

function OrderManagementTable({ orders }) {
  const columns = [
    { key: "id", label: "Order ID" },
    { key: "customerName", label: "Customer" },
    { key: "status", label: "Status", render: (row) => <OrderStatusBadge status={row.status} /> },
    { key: "date", label: "Date" },
  ];

  return <Table columns={columns} data={orders} />;
}

export default OrderManagementTable;