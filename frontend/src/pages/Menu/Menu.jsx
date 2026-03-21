import { useEffect, useState } from "react";
import Alert from "../../components/common/Alert";
import Loader from "../../components/common/Loader";
import FoodFilter from "../../components/food/FoodFilter";
import FoodList from "../../components/food/FoodList";
import CategoryMenu from "../../components/food/CategoryMenu";
import PageHeader from "../../components/layout/PageHeader";
import useCart from "../../hooks/useCart";
import { getFoods } from "../../services/foodService";
import { FOOD_CATEGORIES } from "../../utils/constants";
import "./Menu.css";

function Menu() {
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadFoods = async () => {
      const response = await getFoods();
      setFoods(response);
      setLoading(false);
    };

    loadFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section>
      <PageHeader
        title="Food Menu"
        description="Browse the available foods and add your favorites to the cart."
      />
      <CategoryMenu
        categories={FOOD_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FoodFilter searchText={searchText} onSearchChange={setSearchText} />
      <Alert type="info">This frontend uses demo data, so you can test it easily.</Alert>
      {loading ? <Loader /> : <FoodList foods={filteredFoods} onAddToCart={addToCart} />}
    </section>
  );
}

export default Menu;
