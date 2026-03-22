import Button from "../common/Button";
import Table from "../common/Table";

function InventoryTable({ foods, onEdit, onDelete, actionFoodId }) {
  const columns = [
    { key: "name", label: "Food Name" },
    { key: "category", label: "Category" },
    { key: "stock", label: "Stock" },
    { key: "prepTime", label: "Prep Time" },
    {
      key: "actions",
      label: "Actions",
      render: (food) => (
        <div className="order-action-group">
          <Button
            variant="secondary"
            disabled={actionFoodId === food.id}
            onClick={() => onEdit(food)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            loading={actionFoodId === food.id}
            onClick={() => onDelete(food.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={foods} />;
}

export default InventoryTable;
