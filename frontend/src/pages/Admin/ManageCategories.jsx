import { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import FoodCategory from "../../components/food/FoodCategory";
import { getCategories } from "../../services/categoryService";
import { DEMO_FOODS } from "../../utils/constants";

function ManageCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <section>
      <PageHeader
        title="Manage Categories"
        description="View the food categories currently used in the system."
      />
      <div className="category-grid">
        {categories.map((category) => (
          <FoodCategory
            key={category}
            name={category}
            count={DEMO_FOODS.filter((food) => food.category === category).length}
          />
        ))}
      </div>
    </section>
  );
}

export default ManageCategories;
