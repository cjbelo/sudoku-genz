const ActionButton = ({ Icon = null, label, onClick, className = "" }) => {
  return (
    <button
      className={[
        "flex-1 rounded-lg py-3 shadow flex items-center justify-center gap-2 transition cursor-pointer",
        className ?? "",
      ].join(" ")}
      onClick={onClick}
    >
      {Icon && <Icon size={22} />}
      {label}
    </button>
  );
};

export default ActionButton;
