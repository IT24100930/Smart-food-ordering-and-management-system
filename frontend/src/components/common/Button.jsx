function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} ${loading ? "btn-loading" : ""}`}
      type={type}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="btn-inline-loader" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default Button;
