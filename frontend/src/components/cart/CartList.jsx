import CartItem from "./CartItem";

function CartList({ cartItems, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-list">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default CartList;
