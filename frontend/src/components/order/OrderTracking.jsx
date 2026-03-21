function OrderTracking({ progress }) {
  return (
    <div className="tracking-bar">
      <div className="tracking-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default OrderTracking;
