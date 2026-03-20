import FoodCard from "./FoodCard";

function FoodItem({ food, onAddToCart }) {
  return <FoodCard food={food} onAddToCart={onAddToCart} />;
}

export default FoodItem;
