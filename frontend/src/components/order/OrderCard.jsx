import formatCurrency from "../../utils/formatCurrency";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderTracking from "./OrderTracking";

function OrderCard({ order }) {
  return (
    <article className="order-card">
      <div className="card-top-row">
        <div className="order-card-heading">
          <span className="order-card-label">Order ID</span>
          <h3>{order.id}</h3>
          <p>{order.date}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="order-card-grid">
        <div className="order-card-main">
          <div className="order-detail-block">
            <span className="order-detail-label">Customer </span>
            <strong>{order.customerName}</strong>
          </div>

          <div className="order-detail-block">
            <span className="order-detail-label">Items</span>
            <div className="order-items">
              {order.items.map((item) => (
                <span key={`${order.id}-${item.name}`} className="order-item-chip">
                  {item.name} x{item.quantity}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="order-card-side">
          <div className="order-total-panel">
            <span className="order-detail-label">Total</span>
            <strong>{formatCurrency(order.total)}</strong>
          </div>
        </div>
      </div>

      <div className="order-progress-panel">
        <div className="order-progress-copy">
          <span className="order-detail-label">Progress</span>
          <strong>{order.progress}% complete</strong>
        </div>
        <OrderTracking progress={order.progress} />
      </div>
    </article>
  );
}

export default OrderCard;
