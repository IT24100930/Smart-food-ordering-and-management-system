function Input({ label, ...props }) {
  return (
    <label className="form-group">
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}

export default Input;
