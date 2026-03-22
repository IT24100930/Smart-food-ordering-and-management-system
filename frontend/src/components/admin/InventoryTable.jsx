import Button from "../common/Button";
import Table from "../common/Table";

function InventoryTable({ foods, onEdit, onDelete, actionFoodId }) {
  const hasEdit = typeof onEdit === "function";
  const hasDelete = typeof onDelete === "function";

  const columns = [
    { key: "name", label: "Food Name" },
    { key: "category", label: "Category" },
    { key: "stock", label: "Stock" },
    { key: "prepTime", label: "Prep Time" },
  ];

  if (hasEdit || hasDelete) {
    columns.push({
      key: "actions",
      label: "Actions",
      render: (food) => (
        <div className="order-action-group">
          {hasEdit ? (
            <Button
              variant="secondary"
              disabled={actionFoodId === food.id}
              onClick={() => onEdit(food)}
            >
              Edit
            </Button>
          ) : null}
          {hasDelete ? (
            <Button
              variant="danger"
              loading={actionFoodId === food.id}
              onClick={() => onDelete(food.id)}
            >
              Delete
            </Button>
          ) : null}
        </div>
      ),
    });
  }

  return <Table columns={columns} data={foods} />;
}

export default InventoryTable;
