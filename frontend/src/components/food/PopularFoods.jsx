import FoodList from "./FoodList";

function PopularFoods({ foods, onAddToCart }) {
  const popularFoods = [...foods].sort((a, b) => b.rating - a.rating).slice(0, 3);
  return <FoodList foods={popularFoods} onAddToCart={onAddToCart} />;
}

export default PopularFoods;
