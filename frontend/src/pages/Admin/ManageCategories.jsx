import { useEffect, useState } from "react";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import PageHeader from "../../components/layout/PageHeader";
import FoodCategory from "../../components/food/FoodCategory";
import { getAdminFoods } from "../../services/adminService";
import { createCategory, getCategories } from "../../services/categoryService";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    getAdminFoods()
      .then(setFoods)
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setFeedback("");

    try {
      const createdCategory = await createCategory({ name: categoryName });
      setCategories((current) => [...current, createdCategory]);
      setCategoryName("");
      setIsOpen(false);
      setFeedback(`Category ${createdCategory.name} added successfully.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <PageHeader
        title="Manage Categories"
        description="Create categories once and reuse them when adding or updating foods."
        action={<Button onClick={() => setIsOpen(true)}>Add Category</Button>}
      />
      {feedback ? <Alert type="info">{feedback}</Alert> : null}
      {error ? <Alert type="warning">{error}</Alert> : null}
      <div className="category-grid">
        {categories.map((category) => (
          <FoodCategory
            key={category.id}
            name={category.name}
            count={foods.filter((food) => food.category === category.name).length}
          />
        ))}
      </div>
      <Modal isOpen={isOpen} title="Add New Category" onClose={() => setIsOpen(false)}>
        <form className="food-form" onSubmit={handleSubmit}>
          <Input
            label="Category Name"
            name="categoryName"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
          />
          <Button type="submit" loading={loading}>Save Category</Button>
        </form>
      </Modal>
    </section>
  );
}

export default ManageCategories;
