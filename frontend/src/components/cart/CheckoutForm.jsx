import Button from "../common/Button";
import Input from "../common/Input";

function CheckoutForm({ formData, onChange, onSubmit }) {
  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Enter your full name"
      />
      <Input
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        placeholder="Enter your contact number"
      />
      <label className="form-group">
        <span>Delivery Address</span>
        <textarea
          name="address"
          value={formData.address}
          onChange={onChange}
          rows="4"
          placeholder="Enter delivery address"
        />
      </label>
      <label className="form-group">
        <span>Payment Method</span>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={onChange}>
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Card">Card</option>
        </select>
      </label>
      <Button type="submit">Place Order</Button>
    </form>
  );
}

export default CheckoutForm;
