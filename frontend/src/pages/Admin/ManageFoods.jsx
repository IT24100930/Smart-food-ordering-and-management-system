import { useEffect, useState } from "react";
import Alert from "../../components/common/Alert";
import Modal from "../../components/common/Modal";
import PageHeader from "../../components/layout/PageHeader";
import InventoryTable from "../../components/admin/InventoryTable";
import FoodForm from "../../components/admin/FoodForm";
import Button from "../../components/common/Button";
import { createFood } from "../../services/foodService";
import { getAdminFoods } from "../../services/adminService";

function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    getAdminFoods().then(setFoods);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const savedFood = await createFood({
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      prepTime: "15 min",
      description: `${formData.name} added from admin panel.`,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    });
    setFoods((current) => [...current, savedFood]);
    setIsOpen(false);
    setFormData({ name: "", category: "", price: "", stock: "" });
  };

  return (
    <section>
      <PageHeader
        title="Manage Foods"
        description="Check food items and add new demo menu items."
        action={<Button onClick={() => setIsOpen(true)}>Add Food</Button>}
      />
      <Alert type="info">This page uses local demo state so it stays easy to understand.</Alert>
      <InventoryTable foods={foods} />
      <Modal isOpen={isOpen} title="Add New Food" onClose={() => setIsOpen(false)}>
        <FoodForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
      </Modal>
    </section>
  );
}

export default ManageFoods;
