import FoodCard from "./FoodCard";

function FoodList({ foods, onAddToCart, onRemoveFromCart, cartItems }) {
  const cartIds = new Set(cartItems.map((item) => item.id));

  return (
    <div className="food-grid">
      {foods.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          inCart={cartIds.has(food.id)}
        />
      ))}
    </div>
  );
}

export default FoodList;
