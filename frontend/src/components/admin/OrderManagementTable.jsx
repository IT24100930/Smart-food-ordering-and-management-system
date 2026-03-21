import Button from "../common/Button";
import SearchBar from "../common/SearchBar";
import OrderStatusBadge from "../order/OrderStatusBadge";
import formatCurrency from "../../utils/formatCurrency";

const STATUSES = ["All", "Pending", "Preparing", "Hold", "Completed", "Canceled"];
const ACTION_STATUSES = ["Pending", "Preparing", "Hold", "Completed", "Canceled"];

function OrderManagementTable({
  orders,
  filters,
  summary,
  pendingStatusUpdates,
  loading,
  actionOrderId,
  onFilterChange,
  onClearFilters,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  return (
    <section className="order-management-panel">
      <div className="order-summary-grid">
        <div className="mini-summary-card active-card">
          <span>Active Orders</span>
          <strong>{summary.active}</strong>
        </div>
        <div className="mini-summary-card complete-card">
          <span>Completed</span>
          <strong>{summary.completed}</strong>
        </div>
        <div className="mini-summary-card hold-card">
          <span>On Hold</span>
          <strong>{summary.hold}</strong>
        </div>
        <div className="mini-summary-card cancel-card">
          <span>Canceled</span>
          <strong>{summary.canceled}</strong>
        </div>
      </div>

      <div className="order-toolbar">
        <div className="order-toolbar-main">
          <SearchBar
            value={filters.search}
            onChange={(value) => onFilterChange("search", value)}
            placeholder="Search order ID, customer name, or email"
          />

          <label className="toolbar-field">
            <span>Status</span>
            <select value={filters.status} onChange={(event) => onFilterChange("status", event.target.value)}>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="toolbar-field">
            <span>Date</span>
            <input
              type="date"
              value={filters.date}
              onChange={(event) => onFilterChange("date", event.target.value)}
            />
          </label>
        </div>

        <div className="scope-switch">
          <button type="button" className={filters.scope === "active" ? "active" : ""} onClick={() => onFilterChange("scope", "active")}>
            Active
          </button>
          <button type="button" className={filters.scope === "completed" ? "active" : ""} onClick={() => onFilterChange("scope", "completed")}>
            Completed
          </button>
          <button type="button" className={filters.scope === "all" ? "active" : ""} onClick={() => onFilterChange("scope", "all")}>
            All
          </button>
          <button type="button" className="scope-clear" onClick={onClearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="desktop-order-table">
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="7" className="empty-table">
                    <div className="table-loader-row">
                      <span className="spinner" />
                      <span>Loading orders...</span>
                    </div>
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="cell-stack">
                      <strong>{order.id}</strong>
                      <span>{order.userEmail}</span>
                    </div>
                  </td>
                  <td>
                    <div className="cell-stack">
                      <strong>{order.customerName}</strong>
                      <span>{order.phone}</span>
                    </div>
                  </td>
                  <td>
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>{order.date}</td>
                  <td className="items-cell">
                    {order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}
                  </td>
                  <td>
                    <div className="action-column">
                      <select
                        className="status-select"
                        value={pendingStatusUpdates[order.id] || order.status}
                        onChange={(event) => onStatusChange(order.id, event.target.value, false)}
                      >
                        {ACTION_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <div className="order-action-group">
                        <Button
                          variant="secondary"
                          loading={actionOrderId === order.id}
                          onClick={() => onStatusChange(order.id, pendingStatusUpdates[order.id] || order.status, true)}
                        >
                          Apply
                        </Button>
                        <Button
                          variant="secondary"
                          disabled={actionOrderId === order.id}
                          onClick={() => onEdit(order)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          disabled={actionOrderId === order.id}
                          onClick={() => onDelete(order.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && !orders.length && (
                <tr>
                  <td colSpan="7" className="empty-table">
                    No orders match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mobile-order-list">
        {loading && (
          <div className="empty-card">
            <div className="table-loader-row">
              <span className="spinner" />
              <span>Loading orders...</span>
            </div>
          </div>
        )}
        {orders.map((order) => (
          <article key={order.id} className="order-mobile-card">
            <div className="mobile-card-top">
              <div>
                <h3>{order.id}</h3>
                <p>{order.customerName}</p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <p><strong>Email:</strong> {order.userEmail}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> {formatCurrency(order.total)}</p>
            <p><strong>Items:</strong> {order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</p>
            <div className="mobile-actions">
              <select
                className="status-select"
                value={pendingStatusUpdates[order.id] || order.status}
                onChange={(event) => onStatusChange(order.id, event.target.value, false)}
              >
                {ACTION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="order-action-group">
                <Button
                  variant="secondary"
                  loading={actionOrderId === order.id}
                  onClick={() => onStatusChange(order.id, pendingStatusUpdates[order.id] || order.status, true)}
                >
                  Apply
                </Button>
                <Button
                  variant="secondary"
                  disabled={actionOrderId === order.id}
                  onClick={() => onEdit(order)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  disabled={actionOrderId === order.id}
                  onClick={() => onDelete(order.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </article>
        ))}
        {!loading && !orders.length && <div className="empty-card">No orders match the current filters.</div>}
      </div>
    </section>
  );
}

export default OrderManagementTable;
