function SalesChart({ orders }) {
  const chartData = orders.map((order) => ({
    label: order.id,
    value: order.total,
  }));

  const highestValue = Math.max(...chartData.map((item) => item.value), 1);

  return (
    <div className="chart-card">
      <h3>Sales Overview</h3>
      <div className="mini-chart">
        {chartData.map((item) => (
          <div key={item.label} className="bar-column">
            <div
              className="bar"
              style={{ height: `${(item.value / highestValue) * 100}%` }}
            />
            <small>{item.label.slice(-2)}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalesChart;
