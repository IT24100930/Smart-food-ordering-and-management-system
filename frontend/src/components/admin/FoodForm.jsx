import Button from "../common/Button";
import Input from "../common/Input";

function FoodForm({ formData, onChange, onSubmit }) {
  return (
    <form className="food-form" onSubmit={onSubmit}>
      <Input label="Food Name" name="name" value={formData.name} onChange={onChange} />
      <Input label="Category" name="category" value={formData.category} onChange={onChange} />
      <Input
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={onChange}
      />
      <Input
        label="Stock"
        name="stock"
        type="number"
        value={formData.stock}
        onChange={onChange}
      />
      <Button type="submit">Save Food</Button>
    </form>
  );
}

export default FoodForm;
