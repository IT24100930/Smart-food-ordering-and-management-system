import { createContext, useContext, useEffect, useState } from "react";
import { createOrder, getOrders } from "../services/orderService";
import { AuthContext } from "./AuthContext";

export const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) {
      setOrders([]);
      return;
    }

    const loadOrders = async () => {
      const response = await getOrders(user.email);
      setOrders(response);
    };

    loadOrders();
  }, [user?.email]);

  const placeOrder = async (orderData) => {
    const newOrder = await createOrder(orderData);
    setOrders((currentOrders) => [newOrder, ...currentOrders]);
    return newOrder;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
