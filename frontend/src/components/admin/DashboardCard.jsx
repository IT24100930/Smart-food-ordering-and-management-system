function DashboardCard({ title, value, helpText }) {
  return (
    <div className="dashboard-card">
      <p>{title}</p>
      <h3>{value}</h3>
      <span>{helpText}</span>
    </div>
  );
}

export default DashboardCard;
