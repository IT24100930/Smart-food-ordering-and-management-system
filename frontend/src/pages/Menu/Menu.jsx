import { useEffect, useState } from "react";
import Alert from "../../components/common/Alert";
import Loader from "../../components/common/Loader";
import FoodFilter from "../../components/food/FoodFilter";
import FoodList from "../../components/food/FoodList";
import CategoryMenu from "../../components/food/CategoryMenu";
import PageHeader from "../../components/layout/PageHeader";
import useCart from "../../hooks/useCart";
import { getFoods } from "../../services/foodService";
import { getCategories } from "../../services/categoryService";
import "./Menu.css";

function Menu() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const loadFoods = async () => {
      const response = await getFoods();
      setFoods(response);
      setLoading(false);
    };

    loadFoods();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        const names = data.map((cat) => cat.name);
        setCategories(["All", ...names]);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const id = setTimeout(() => setToastMessage(""), 2200);
    return () => clearTimeout(id);
  }, [toastMessage]);

  const handleAddToCart = (food) => {
    addToCart(food);
    setToastMessage(`${food.name} added to cart`);
  };

  const handleRemoveFromCart = (food) => {
    removeFromCart(food.id);
    setToastMessage(`${food?.name || "Item"} removed from cart`);
  };

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
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FoodFilter searchText={searchText} onSearchChange={setSearchText} />
      {toastMessage && <div className="toast">{toastMessage}</div>}
      <Alert type="info">This frontend uses demo data, so you can test it easily.</Alert>
      {loading ? (
        <Loader />
      ) : (
        <FoodList
          foods={filteredFoods}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          cartItems={cartItems}
        />
      )}
    </section>
  );
}

export default Menu;
