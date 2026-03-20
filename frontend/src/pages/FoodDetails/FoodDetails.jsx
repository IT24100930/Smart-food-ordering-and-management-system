import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import PageHeader from "../../components/layout/PageHeader";
import useCart from "../../hooks/useCart";
import { DEMO_FOODS } from "../../utils/constants";
import formatCurrency from "../../utils/formatCurrency";
import "./FoodDetails.css";

function FoodDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const food = useMemo(
    () => DEMO_FOODS.find((item) => String(item.id) === id) || DEMO_FOODS[0],
    [id]
  );

  return (
    <section>
      <PageHeader title="Food Details" description="View more information about the selected food." />
      <div className="details-card">
        <img src={food.image} alt={food.name} />
        <div>
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p>Category: {food.category}</p>
          <p>Preparation Time: {food.prepTime}</p>
          <p>Price: {formatCurrency(food.price)}</p>
          <Button onClick={() => addToCart(food)}>Add to Cart</Button>
        </div>
      </div>
    </section>
  );
}

export default FoodDetails;
