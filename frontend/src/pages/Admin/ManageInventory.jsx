import { useEffect, useState } from "react";
import InventoryTable from "../../components/admin/InventoryTable";
import PageHeader from "../../components/layout/PageHeader";
import { getAdminFoods } from "../../services/adminService";

function ManageInventory() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getAdminFoods().then(setFoods);
  }, []);

  return (
    <section>
      <PageHeader
        title="Manage Inventory"
        description="Track available stock levels for food items."
      />
      <InventoryTable foods={foods} />
    </section>
  );
}

export default ManageInventory;
