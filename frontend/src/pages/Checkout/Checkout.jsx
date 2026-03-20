import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/common/Alert";
import CheckoutForm from "../../components/cart/CheckoutForm";
import PageHeader from "../../components/layout/PageHeader";
import PaymentSummary from "../../components/order/PaymentSummary";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useOrders from "../../hooks/useOrders";
import { processPayment } from "../../services/paymentService";
import { calculateCartTotal } from "../../utils/helpers";
import { isPhoneValid } from "../../utils/validators";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const subtotal = useMemo(() => calculateCartTotal(cartItems), [cartItems]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.address || !isPhoneValid(formData.phone)) {
      setMessage("Please fill all fields correctly before placing the order.");
      return;
    }

    await processPayment({ paymentMethod: formData.paymentMethod });
    await placeOrder({
      userEmail: user.email,
      customerName: formData.name,
      phone: formData.phone,
      items: cartItems.map((item) => ({ name: item.name, quantity: item.quantity })),
      total: subtotal + 2.5,
      paymentMethod: formData.paymentMethod,
      address: formData.address,
    });

    clearCart();
    navigate("/orders");
  };

  return (
    <section>
      <PageHeader
        title="Checkout"
        description="Enter your delivery details and confirm the order."
      />
      {message && <Alert type="warning">{message}</Alert>}
      <div className="checkout-layout">
        <CheckoutForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        <PaymentSummary subtotal={subtotal} />
      </div>
    </section>
  );
}

export default Checkout;
