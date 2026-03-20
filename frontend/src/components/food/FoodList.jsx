import FoodCard from "./FoodCard";

function FoodList({ foods, onAddToCart }) {
  return (
    <div className="food-grid">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default FoodList;
