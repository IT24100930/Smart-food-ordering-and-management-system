function CategoryMenu({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-menu">
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
