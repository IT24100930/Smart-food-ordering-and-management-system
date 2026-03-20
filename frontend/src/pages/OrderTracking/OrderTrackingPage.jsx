import PageHeader from "../../components/layout/PageHeader";
import OrderList from "../../components/order/OrderList";
import useOrders from "../../hooks/useOrders";
import "./OrderTrackingPage.css";

function OrderTrackingPage() {
  const { orders } = useOrders();

  return (
    <section>
      <PageHeader
        title="Order Tracking"
        description="Follow the progress of current orders from pending to delivered."
      />
      <OrderList orders={orders} />
    </section>
  );
}

export default OrderTrackingPage;
