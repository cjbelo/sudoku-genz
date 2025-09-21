import FeatherIcon from "feather-icons-react";

const ActionButton = ({ icon = null, label, onClick, className = "" }) => {
  return (
    <button
      className={[
        "flex-1 rounded-lg py-3 shadow flex items-center justify-center gap-2 transition cursor-pointer",
        className ?? "",
      ].join(" ")}
      onClick={onClick}
    >
      {icon && <FeatherIcon icon={icon} size={20} />}
      {label}
    </button>
  );
};

export default ActionButton;
