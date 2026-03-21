function DashboardCard({ title, value, helpText, tone = "default" }) {
  return (
    <div className={`dashboard-card dashboard-card-${tone}`}>
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
