import Button from "../common/Button";
import formatCurrency from "../../utils/formatCurrency";

function FoodCard({ food, onAddToCart, onRemoveFromCart, inCart }) {
  return (
    <article className="food-card">
      <img src={food.image} alt={food.name} />
      <div className="food-card-body">
        <div className="card-top-row">
          <h3>{food.name}</h3>
          <span className="badge">{food.category}</span>
        </div>
        <p>{food.description}</p>
        <div className="food-meta">
          <span>{formatCurrency(food.price)}</span>
          <span>{food.prepTime}</span>
          <span>{food.rating} / 5</span>
        </div>
        {inCart ? (
          <Button variant="secondary" onClick={() => onRemoveFromCart(food)}>
            Remove from Cart
          </Button>
        ) : (
          <Button onClick={() => onAddToCart(food)}>Add to Cart</Button>
        )}
      </div>
    </article>
  );
}

export default FoodCard;
