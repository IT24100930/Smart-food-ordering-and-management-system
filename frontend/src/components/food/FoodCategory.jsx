function FoodCategory({ name, count }) {
  return (
    <div className="category-card">
      <h4>{name}</h4>
      <p>{count} items</p>
    </div>
  );
}

export default FoodCategory;
