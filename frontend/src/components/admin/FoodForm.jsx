import Button from "../common/Button";
import Input from "../common/Input";

function FoodForm({
  formData,
  categories = [],
  onChange,
  onSubmit,
  submitLabel = "Save Food",
  loading = false,
}) {
  return (
    <form className="food-form" onSubmit={onSubmit}>
      <Input label="Food Name" name="name" value={formData.name} onChange={onChange} />
      <label className="form-group">
        <span>Category</span>
        <select name="category" value={formData.category} onChange={onChange}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
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
      <Button type="submit" loading={loading}>{submitLabel}</Button>
    </form>
  );
}

export default FoodForm;
