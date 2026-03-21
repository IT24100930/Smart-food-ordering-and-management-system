import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import PageHeader from "../../components/layout/PageHeader";
import { DEMO_FOODS } from "../../utils/constants";
import { getGreeting } from "../../utils/helpers";
import "./Home.css";

function Home() {
  return (
    <section className="home-page">
      <div className="hero-section">
        <div>
          <p className="eyebrow">{getGreeting()}</p>
          <PageHeader
            title="Smart Food Ordering and Management System"
            description="Order food quickly, track your orders, and manage restaurant operations from one simple dashboard."
          />
          <div className="hero-actions">
            <Link to="/menu">
              <Button>Order Now</Button>
            </Link>
            <Link to="/admin">
              <Button variant="secondary">Open Admin Panel</Button>
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <h3>Today&apos;s Highlights</h3>
          <p>{DEMO_FOODS.length} food items available</p>
          <p>Fast ordering flow for customers</p>
          <p>Simple reports for admins</p>
        </div>
      </div>

      <div className="feature-grid">
        <div className="info-card">
          <h3>Easy Menu Browsing</h3>
          <p>Customers can search foods, filter by category, and add meals to cart.</p>
        </div>
        <div className="info-card">
          <h3>Order Tracking</h3>
          <p>Each order shows a progress bar so users can easily check status.</p>
        </div>
        <div className="info-card">
          <h3>Admin Management</h3>
          <p>Admins can view foods, users, orders, and simple sales reports.</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
