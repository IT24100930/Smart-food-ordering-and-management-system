import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Admin Panel</h3>
      <NavLink to="/admin">Dashboard</NavLink>
      <NavLink to="/admin/foods">Manage Foods</NavLink>
      <NavLink to="/admin/orders">Manage Orders</NavLink>
      <NavLink to="/admin/users">Manage Users</NavLink>
      <NavLink to="/admin/reports">Reports</NavLink>
    </aside>
  );
}

export default Sidebar;
