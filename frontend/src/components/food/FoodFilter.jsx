import Input from "../common/Input";

function FoodFilter({ searchText, onSearchChange }) {
  return (
    <div className="filter-bar">
      <Input
        label="Search food"
        placeholder="Search by food name..."
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default FoodFilter;
