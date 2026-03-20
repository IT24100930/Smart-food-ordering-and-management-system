import Button from "../common/Button";
import formatCurrency from "../../utils/formatCurrency";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <div>
        <h3>{item.name}</h3>
        <p>{formatCurrency(item.price)} each</p>
      </div>
      <div className="cart-actions">
        <div className="quantity-box">
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
        <strong>{formatCurrency(item.price * item.quantity)}</strong>
        <Button variant="secondary" onClick={() => onRemove(item.id)}>
          Remove
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
