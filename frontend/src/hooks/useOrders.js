import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const useOrders = () => useContext(OrderContext);

export default useOrders;
