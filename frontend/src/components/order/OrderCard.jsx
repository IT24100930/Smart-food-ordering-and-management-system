import formatCurrency from "../../utils/formatCurrency";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderTracking from "./OrderTracking";

function OrderCard({ order }) {
  return (
    <article className="order-card">
      <div className="card-top-row">
        <div>
          <h3>{order.id}</h3>
          <p>{order.date}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <p>Customer: {order.customerName}</p>
      <p>Items: {order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</p>
      <OrderTracking progress={order.progress} />
      <strong>Total: {formatCurrency(order.total)}</strong>
    </article>
  );
}

export default OrderCard;
