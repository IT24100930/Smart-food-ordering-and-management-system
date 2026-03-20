export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export const calculateCartTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

export const getOrderCounts = (orders) =>
  orders.reduce(
    (counts, order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
      return counts;
    },
    { Pending: 0, Preparing: 0, Delivered: 0 }
  );
