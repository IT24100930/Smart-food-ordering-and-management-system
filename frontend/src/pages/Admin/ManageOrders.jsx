import { useEffect, useMemo, useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import OrderManagementTable from "../../components/admin/OrderManagementTable";
import PageHeader from "../../components/layout/PageHeader";
import {
  createAdminOrder,
  deleteAdminOrder,
  getAdminFoods,
  getAdminOrders,
  getAdminUsers,
  updateAdminOrder,
  updateAdminOrderStatus,
} from "../../services/adminService";

const FINAL_STATUSES = ["Completed", "Canceled"];

function ManageOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionOrderId, setActionOrderId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFoodPickerOpen, setIsFoodPickerOpen] = useState(false);
  const [foodPickerMode, setFoodPickerMode] = useState("create");
  const [pendingStatusUpdates, setPendingStatusUpdates] = useState({});
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    date: "",
    scope: "active",
  });
  const [formData, setFormData] = useState({
    userEmail: "",
    customerName: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
    items: [],
  });
  const [foodSelection, setFoodSelection] = useState({
    foodId: "",
    quantity: 1,
  });
  const [editFormData, setEditFormData] = useState({
    id: "",
    customerName: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
    items: [],
    status: "Pending",
  });

  const normalizeDateValue = (value) => {
    if (!value) {
      return "";
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "";
    }

    return parsed.toISOString().slice(0, 10);
  };

  useEffect(() => {
    setLoading(true);
    getAdminOrders({ scope: "all" })
      .then(setAllOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getAdminUsers()
      .then((response) => {
        setUsers(response);
        const firstCustomer = response.find((user) => user.role === "customer");
        if (firstCustomer) {
          setFormData((current) => ({
            ...current,
            userEmail: firstCustomer.email,
            customerName: firstCustomer.name,
          }));
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    getAdminFoods()
      .then((response) => {
        setFoods(response);
        if (response.length) {
          setFoodSelection((current) => ({
            ...current,
            foodId: current.foodId || String(response[0].id),
          }));
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  const orders = useMemo(
    () =>
      allOrders.filter((order) => {
        const search = filters.search.trim().toLowerCase();
        const status = filters.status;
        const scope = filters.scope;
        const normalizedFilterDate = normalizeDateValue(filters.date);
        const normalizedOrderDate = normalizeDateValue(order.date);

        const matchesSearch =
          !search ||
          order.id.toLowerCase().includes(search) ||
          order.customerName.toLowerCase().includes(search) ||
          (order.userEmail || "").toLowerCase().includes(search);

        const matchesStatus = !status || status === "All" || order.status === status;
        const matchesDate = !normalizedFilterDate || normalizedOrderDate === normalizedFilterDate;

        let matchesScope = true;
        if (scope === "active") {
          matchesScope = !FINAL_STATUSES.includes(order.status);
        }
        if (scope === "completed") {
          matchesScope = FINAL_STATUSES.includes(order.status);
        }

        return matchesSearch && matchesStatus && matchesDate && matchesScope;
      }),
    [allOrders, filters]
  );

  const summary = useMemo(
    () => ({
      active: allOrders.filter((order) => !FINAL_STATUSES.includes(order.status)).length,
      completed: allOrders.filter((order) => order.status === "Completed").length,
      hold: allOrders.filter((order) => order.status === "Hold").length,
      canceled: allOrders.filter((order) => order.status === "Canceled").length,
    }),
    [allOrders]
  );

  const createOrderTotal = useMemo(
    () =>
      formData.items.reduce((sum, item) => {
        const matchedFood = foods.find((food) => String(food.id) === String(item.foodId));
        return sum + (matchedFood?.price || 0) * item.quantity;
      }, 0),
    [foods, formData.items]
  );

  const editOrderTotal = useMemo(
    () =>
      editFormData.items.reduce((sum, item) => {
        const matchedFood = foods.find((food) => food.name === item.name);
        return sum + (matchedFood?.price || 0) * item.quantity;
      }, 0),
    [foods, editFormData.items]
  );

  const patchOrderInState = (updatedOrder) => {
    setAllOrders((current) => {
      const orderExists = current.some((order) => order.id === updatedOrder.id);
      if (!orderExists) {
        return [updatedOrder, ...current];
      }

      return current.map((order) => (order.id === updatedOrder.id ? updatedOrder : order));
    });
  };

  const ensureOrderVisible = (order) => {
    const normalizedOrderDate = normalizeDateValue(order.date);

    setFilters((current) => {
      const nextFilters = { ...current };
      let changed = false;

      if (current.search && !order.id.toLowerCase().includes(current.search.toLowerCase()) &&
          !order.customerName.toLowerCase().includes(current.search.toLowerCase()) &&
          !(order.userEmail || "").toLowerCase().includes(current.search.toLowerCase())) {
        nextFilters.search = "";
        changed = true;
      }

      if (current.status !== "All" && current.status !== order.status) {
        nextFilters.status = "All";
        changed = true;
      }

      if (normalizeDateValue(current.date) && normalizeDateValue(current.date) !== normalizedOrderDate) {
        nextFilters.date = "";
        changed = true;
      }

      if (current.scope === "active" && FINAL_STATUSES.includes(order.status)) {
        nextFilters.scope = "completed";
        changed = true;
      }

      if (current.scope === "completed" && !FINAL_STATUSES.includes(order.status)) {
        nextFilters.scope = "active";
        changed = true;
      }

      return changed ? nextFilters : current;
    });
  };

  const handleFilterChange = (field, value) => {
    setError("");
    setFilters((current) => ({
      ...current,
      [field]: field === "date" ? normalizeDateValue(value) : value,
    }));
  };

  const refreshOrders = async () => {
    try {
      const response = await getAdminOrders({ scope: "all" });
      setAllOrders(response);
    } catch (err) {
      setError(err.message);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "All",
      date: "",
      scope: "active",
    });
  };

  const handleStatusChange = async (orderCode, status, applyNow = true) => {
    setPendingStatusUpdates((current) => ({ ...current, [orderCode]: status }));

    if (!applyNow) {
      return;
    }

    setActionOrderId(orderCode);
    setError("");
    setFeedback("");
    try {
      const updatedOrder = await updateAdminOrderStatus(orderCode, status);
      patchOrderInState(updatedOrder);
      ensureOrderVisible(updatedOrder);
      setFeedback(`Order ${orderCode} updated to ${status}.`);
      void refreshOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionOrderId("");
    }
  };

  const handleDelete = async (orderCode) => {
    setActionOrderId(orderCode);
    setError("");
    setFeedback("");
    try {
      await deleteAdminOrder(orderCode);
      setAllOrders((current) => current.filter((order) => order.id !== orderCode));
      setFeedback(`Order ${orderCode} deleted.`);
      void refreshOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionOrderId("");
    }
  };

  const handleEditOpen = (order) => {
    setEditFormData({
      id: order.id,
      customerName: order.customerName,
      phone: order.phone,
      address: order.address,
      paymentMethod: order.paymentMethod,
      items: order.items.map((item) => ({ name: item.name, quantity: item.quantity })),
      status: order.status,
    });
    setIsEditModalOpen(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    if (name === "userEmail") {
      const selectedUser = users.find((user) => user.email === value);
      setFormData((current) => ({
        ...current,
        userEmail: value,
        customerName: selectedUser?.name || current.customerName,
      }));
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFoodSelectionChange = (event) => {
    const { name, value } = event.target;
    setFoodSelection((current) => ({
      ...current,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleAddSelectedFood = () => {
    if (!foodSelection.foodId) {
      setError("Please select a food item.");
      return;
    }

    setError("");
    const selectedFood = foods.find((food) => String(food.id) === String(foodSelection.foodId));
    if (!selectedFood) {
      setError("Selected food was not found.");
      return;
    }

    const updateItems = (items, itemKey, nextItem) => {
      const existingItem = items.find((item) => item[itemKey] === nextItem[itemKey]);

      if (existingItem) {
        return items.map((item) =>
          item[itemKey] === nextItem[itemKey]
            ? { ...item, quantity: item.quantity + Number(foodSelection.quantity || 1) }
            : item
        );
      }

      return [...items, nextItem];
    };

    if (foodPickerMode === "edit") {
      setEditFormData((current) => ({
        ...current,
        items: updateItems(current.items, "name", {
          name: selectedFood.name,
          quantity: Number(foodSelection.quantity || 1),
        }),
      }));
    } else {
      setFormData((current) => ({
        ...current,
        items: updateItems(current.items, "foodId", {
          foodId: foodSelection.foodId,
          quantity: Number(foodSelection.quantity || 1),
        }),
      }));
    }

    setFoodSelection((current) => ({ ...current, quantity: 1 }));
    setIsFoodPickerOpen(false);
  };

  const handleSelectedItemChange = (foodId, quantity) => {
    setFormData((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.foodId === foodId ? { ...item, quantity: Number(quantity) || 1 } : item
      ),
    }));
  };

  const handleRemoveSelectedFood = (foodId) => {
    setFormData((current) => ({
      ...current,
      items: current.items.filter((item) => item.foodId !== foodId),
    }));
  };

  const handleEditSelectedItemChange = (foodName, quantity) => {
    setEditFormData((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.name === foodName ? { ...item, quantity: Number(quantity) || 1 } : item
      ),
    }));
  };

  const handleRemoveEditFood = (foodName) => {
    setEditFormData((current) => ({
      ...current,
      items: current.items.filter((item) => item.name !== foodName),
    }));
  };

  const handleCreateOrder = async (event) => {
    event.preventDefault();

    if (!formData.items.length) {
      setError("Please select at least one food item.");
      return;
    }

    setModalLoading(true);
    setError("");
    setFeedback("");
    try {
      const createdOrder = await createAdminOrder({
        userEmail: formData.userEmail,
        customerName: formData.customerName,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        total: Number(createOrderTotal.toFixed(2)),
        items: formData.items.map((item) => {
          const matchedFood = foods.find((food) => String(food.id) === String(item.foodId));
          return {
            name: matchedFood?.name || "",
            quantity: Number(item.quantity),
          };
        }),
      });

      setIsModalOpen(false);
      patchOrderInState(createdOrder);
      ensureOrderVisible(createdOrder);
      setFormData((current) => ({
        ...current,
        phone: "",
        address: "",
        items: [],
      }));
      setFoodPickerMode("create");
      setFeedback("New order created successfully.");
      void refreshOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdateOrder = async (event) => {
    event.preventDefault();

    if (!editFormData.items.length) {
      setError("Please select at least one food item.");
      return;
    }

    setModalLoading(true);
    setError("");
    setFeedback("");
    try {
      const updatedOrder = await updateAdminOrder(editFormData.id, {
        customerName: editFormData.customerName,
        phone: editFormData.phone,
        address: editFormData.address,
        paymentMethod: editFormData.paymentMethod,
        total: Number(editOrderTotal.toFixed(2)),
        status: editFormData.status,
        items: editFormData.items.map((item) => ({
          name: item.name,
          quantity: Number(item.quantity),
        })),
      });

      setIsEditModalOpen(false);
      patchOrderInState(updatedOrder);
      ensureOrderVisible(updatedOrder);
      setFeedback(`Order ${editFormData.id} updated successfully.`);
      void refreshOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <section>
      <PageHeader
        title="Manage Orders"
        description="Search, filter, monitor, and manage active and completed orders."
        action={<Button onClick={() => setIsModalOpen(true)}>Insert Order</Button>}
      />
      {loading && !orders.length ? <Loader text="Loading order management..." /> : null}
      {feedback && <div className="alert alert-info">{feedback}</div>}
      {error && <div className="alert alert-warning">{error}</div>}
      <OrderManagementTable
        orders={orders}
        filters={filters}
        summary={summary}
        pendingStatusUpdates={pendingStatusUpdates}
        loading={loading}
        actionOrderId={actionOrderId}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        onEdit={handleEditOpen}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      <Modal isOpen={isModalOpen} title="Insert New Order" onClose={() => setIsModalOpen(false)}>
        <form className="food-form" onSubmit={handleCreateOrder}>
          <label className="form-group">
            <span>Customer Email</span>
            <select name="userEmail" value={formData.userEmail} onChange={handleFormChange}>
              {users
                .filter((user) => user.role === "customer")
                .map((user) => (
                  <option key={user.email} value={user.email}>
                    {user.email}
                  </option>
                ))}
            </select>
          </label>
          <Input label="Customer Name" name="customerName" value={formData.customerName} onChange={handleFormChange} />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleFormChange} />
          <Input label="Address" name="address" value={formData.address} onChange={handleFormChange} />
          <div className="selected-foods-panel">
            <div className="selected-foods-header">
              <div>
                <strong>Order Items</strong>
                <p>Select one or more foods for this order.</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setFoodPickerMode("create");
                  setIsFoodPickerOpen(true);
                }}
              >
                Select Foods
              </Button>
            </div>

            {formData.items.length ? (
              <div className="selected-food-list">
                {formData.items.map((item) => {
                  const matchedFood = foods.find((food) => String(food.id) === String(item.foodId));
                  return (
                    <div key={item.foodId} className="selected-food-row">
                      <div className="selected-food-copy">
                        <strong>{matchedFood?.name || "Unknown Food"}</strong>
                        <span>${(((matchedFood?.price || 0) * item.quantity) || 0).toFixed(2)}</span>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => handleSelectedItemChange(item.foodId, event.target.value)}
                      />
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => handleRemoveSelectedFood(item.foodId)}
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="selected-food-empty">No foods selected yet.</div>
            )}
          </div>
          <Input
            label="Total"
            name="total"
            type="text"
            value={`$${createOrderTotal.toFixed(2)}`}
            readOnly
          />
          <label className="form-group">
            <span>Payment Method</span>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleFormChange}>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Card">Card</option>
            </select>
          </label>
          <Button type="submit" loading={modalLoading}>Save Order</Button>
        </form>
      </Modal>

      <Modal
        isOpen={isFoodPickerOpen}
        title="Select Foods"
        onClose={() => setIsFoodPickerOpen(false)}
        layer="top"
      >
        <div className="food-picker-panel">
          <label className="form-group">
            <span>Food Item</span>
            <select name="foodId" value={foodSelection.foodId} onChange={handleFoodSelectionChange}>
              {foods.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name} - ${Number(food.price).toFixed(2)}
                </option>
              ))}
            </select>
          </label>
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            min="1"
            value={foodSelection.quantity}
            onChange={handleFoodSelectionChange}
          />
          <div className="food-picker-grid">
            {foods.map((food) => (
              <button
                key={food.id}
                type="button"
                className={`food-picker-card ${String(food.id) === String(foodSelection.foodId) ? "active" : ""}`}
                onClick={() =>
                  setFoodSelection((current) => ({
                    ...current,
                    foodId: String(food.id),
                  }))
                }
              >
                <strong>{food.name}</strong>
                <span>{food.category}</span>
                <small>${Number(food.price).toFixed(2)}</small>
              </button>
            ))}
          </div>
          <Button type="button" onClick={handleAddSelectedFood}>
            Add To Order
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} title="Update Order" onClose={() => setIsEditModalOpen(false)}>
        <form className="food-form" onSubmit={handleUpdateOrder}>
          <Input label="Customer Name" name="customerName" value={editFormData.customerName} onChange={handleEditFormChange} />
          <Input label="Phone" name="phone" value={editFormData.phone} onChange={handleEditFormChange} />
          <Input label="Address" name="address" value={editFormData.address} onChange={handleEditFormChange} />
          <div className="selected-foods-panel">
            <div className="selected-foods-header">
              <div>
                <strong>Order Items</strong>
                <p>Update the food list for this order.</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setFoodPickerMode("edit");
                  setIsFoodPickerOpen(true);
                }}
              >
                Select Foods
              </Button>
            </div>

            {editFormData.items.length ? (
              <div className="selected-food-list">
                {editFormData.items.map((item) => {
                  const matchedFood = foods.find((food) => food.name === item.name);
                  return (
                    <div key={item.name} className="selected-food-row">
                      <div className="selected-food-copy">
                        <strong>{item.name}</strong>
                        <span>${(((matchedFood?.price || 0) * item.quantity) || 0).toFixed(2)}</span>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => handleEditSelectedItemChange(item.name, event.target.value)}
                      />
                      <Button type="button" variant="danger" onClick={() => handleRemoveEditFood(item.name)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="selected-food-empty">No foods selected yet.</div>
            )}
          </div>
          <Input label="Total" name="total" type="text" value={`$${editOrderTotal.toFixed(2)}`} readOnly />
          <label className="form-group">
            <span>Payment Method</span>
            <select name="paymentMethod" value={editFormData.paymentMethod} onChange={handleEditFormChange}>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Card">Card</option>
            </select>
          </label>
          <label className="form-group">
            <span>Status</span>
            <select name="status" value={editFormData.status} onChange={handleEditFormChange}>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Hold">Hold</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </label>
          <Button type="submit" loading={modalLoading}>Update Order</Button>
        </form>
      </Modal>
    </section>
  );
}

export default ManageOrders;
