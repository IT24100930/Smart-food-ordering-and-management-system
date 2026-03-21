function SalesChart({ orders }) {
  const chartData = orders.map((order) => ({
    label: order.id,
    value: order.total,
  }));

  const highestValue = Math.max(...chartData.map((item) => item.value), 1);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <p className="eyebrow">Performance</p>
          <h3>Sales Overview</h3>
        </div>
        <span className="chart-badge">{orders.length} orders</span>
      </div>
      {chartData.length ? (
        <div className="mini-chart">
          {chartData.map((item) => (
            <div key={item.label} className="bar-column">
              <div className="bar-track">
                <div
                  className="bar"
                  style={{ height: `${Math.max((item.value / highestValue) * 100, 16)}%` }}
                />
              </div>
              <strong>${item.value.toFixed(2)}</strong>
              <small>{item.label.slice(-4)}</small>
            </div>
          ))}
        </div>
      ) : (
        <div className="chart-empty">No sales data available yet.</div>
      )}
    </div>
  );
}

export default SalesChart;
