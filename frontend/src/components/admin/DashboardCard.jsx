function DashboardCard({ title, value, helpText, tone = "default", className = "" }) {
  return (
    <div className={`dashboard-card dashboard-card-${tone} ${className}`.trim()}>
      <div className="dashboard-card-top">
        <p>{title}</p>
        <span className="dashboard-pill">{title}</span>
      </div>
      <h3>{value}</h3>
      <span>{helpText}</span>
    </div>
  );
}

export default DashboardCard;
