import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Button from "../common/Button";
import { APP_NAME } from "../../utils/constants";

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        {APP_NAME}
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/cart">Cart ({cartItems.length})</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="user-chip">{user.name}</span>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Link className="text-link" to="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
