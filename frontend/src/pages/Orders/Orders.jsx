import PageHeader from "../../components/layout/PageHeader";
import OrderList from "../../components/order/OrderList";
import useOrders from "../../hooks/useOrders";
import "./Orders.css";

function Orders() {
  const { orders } = useOrders();

  return (
    <section className="orders-page">
      <PageHeader
        title="My Orders"
        description="Track your current and previous orders here."
      />
      <OrderList orders={orders} />
    </section>
  );
}

export default Orders;
