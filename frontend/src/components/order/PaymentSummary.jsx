import formatCurrency from "../../utils/formatCurrency";

function PaymentSummary({ subtotal, delivery = 2.5 }) {
  const total = subtotal + delivery;

  return (
    <div className="summary-card">
      <h3>Payment Summary</h3>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>Delivery</span>
        <span>{formatCurrency(delivery)}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

export default PaymentSummary;
