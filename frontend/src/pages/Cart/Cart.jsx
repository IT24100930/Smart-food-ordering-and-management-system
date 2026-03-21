import { Link } from "react-router-dom";
import Alert from "../../components/common/Alert";
import CartList from "../../components/cart/CartList";
import CartSummary from "../../components/cart/CartSummary";
import PageHeader from "../../components/layout/PageHeader";
import useCart from "../../hooks/useCart";
import { calculateCartTotal } from "../../utils/helpers";
import "./Cart.css";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const subtotal = calculateCartTotal(cartItems);

  return (
    <section>
      <PageHeader
        title="Shopping Cart"
        description="Review your selected foods before checkout."
      />

      {cartItems.length === 0 ? (
        <Alert type="warning">
          Your cart is empty. <Link to="/menu">Go to menu</Link> to add foods.
        </Alert>
      ) : (
        <div className="cart-layout">
          <CartList
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
          <CartSummary subtotal={subtotal} itemCount={cartItems.length} />
        </div>
      )}
    </section>
  );
}

export default Cart;
