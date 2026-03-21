import Table from "../common/Table";

function InventoryTable({ foods }) {
  const columns = [
    { key: "name", label: "Food Name" },
    { key: "category", label: "Category" },
    { key: "stock", label: "Stock" },
    { key: "prepTime", label: "Prep Time" },
  ];

  return <Table columns={columns} data={foods} />;
}

export default InventoryTable;
