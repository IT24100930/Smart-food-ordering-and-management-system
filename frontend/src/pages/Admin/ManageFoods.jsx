import { useEffect, useState } from "react";
import Alert from "../../components/common/Alert";
import Modal from "../../components/common/Modal";
import PageHeader from "../../components/layout/PageHeader";
import InventoryTable from "../../components/admin/InventoryTable";
import FoodForm from "../../components/admin/FoodForm";
import Button from "../../components/common/Button";
import { createFood, deleteFood, updateFood } from "../../services/foodService";
import { getAdminFoods } from "../../services/adminService";
import { getCategories } from "../../services/categoryService";

const INITIAL_FORM_DATA = {
  name: "",
  category: "",
  price: "",
  stock: "",
};

function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [editingFoodId, setEditingFoodId] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [actionFoodId, setActionFoodId] = useState(null);

  useEffect(() => {
    getAdminFoods()
      .then(setFoods)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => setError(err.message));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const buildPayload = () => ({
    name: formData.name,
    category: formData.category,
    price: Number(formData.price),
    stock: Number(formData.stock),
    prepTime: "15 min",
    description: `${formData.name} added from admin panel.`,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  });

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setEditingFoodId(null);
  };

  const handleAddOpen = () => {
    resetForm();
    setError("");
    setFeedback("");
    setIsOpen(true);
  };

  const handleEditOpen = (food) => {
    setFormData({
      name: food.name,
      category: food.category,
      price: String(food.price),
      stock: String(food.stock),
    });
    setEditingFoodId(food.id);
    setError("");
    setFeedback("");
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setModalLoading(true);
    setError("");
    setFeedback("");

    try {
      if (editingFoodId) {
        const savedFood = await updateFood(editingFoodId, buildPayload());
        setFoods((current) =>
          current.map((food) => (food.id === editingFoodId ? savedFood : food))
        );
        setFeedback(`${savedFood.name} updated successfully.`);
      } else {
        const savedFood = await createFood(buildPayload());
        setFoods((current) => [...current, savedFood]);
        setFeedback(`${savedFood.name} added successfully.`);
      }

      handleCloseModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (foodId) => {
    setActionFoodId(foodId);
    setError("");
    setFeedback("");

    try {
      await deleteFood(foodId);
      setFoods((current) => current.filter((food) => food.id !== foodId));
      setFeedback("Food deleted successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionFoodId(null);
    }
  };

  return (
    <section>
      <PageHeader
        title="Manage Foods"
        description="Check food items and add or update menu items using saved categories."
        action={<Button onClick={handleAddOpen}>Add Food</Button>}
      />
      {feedback ? <Alert type="info">{feedback}</Alert> : null}
      {error ? <Alert type="warning">{error}</Alert> : null}
      {!categories.length ? (
        <Alert type="warning">Add at least one category first before creating food items.</Alert>
      ) : null}
      <InventoryTable
        foods={foods}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
        actionFoodId={actionFoodId}
      />
      <Modal
        isOpen={isOpen}
        title={editingFoodId ? "Update Food" : "Add New Food"}
        onClose={handleCloseModal}
      >
        <FoodForm
          formData={formData}
          categories={categories}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={editingFoodId ? "Update Food" : "Save Food"}
          loading={modalLoading}
        />
      </Modal>
    </section>
  );
}

export default ManageFoods;
