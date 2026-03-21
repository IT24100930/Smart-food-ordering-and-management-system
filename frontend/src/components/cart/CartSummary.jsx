import { Link } from "react-router-dom";
import Button from "../common/Button";
import formatCurrency from "../../utils/formatCurrency";

function CartSummary({ subtotal, itemCount }) {
  const delivery = itemCount > 0 ? 2.5 : 0;
  const total = subtotal + delivery;

  return (
    <div className="summary-card">
      <h3>Cart Summary</h3>
      <div className="summary-row">
        <span>Items</span>
        <span>{itemCount}</span>
      </div>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>Delivery</span>
        <span>{formatCurrency(delivery)}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <Link to="/checkout">
        <Button disabled={!itemCount}>Proceed to Checkout</Button>
      </Link>
    </div>
  );
}

export default CartSummary;
