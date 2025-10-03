import { useLocation, useNavigate } from "react-router-dom";

export default function HowToPlayLink({ className, children = "How to Play" }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <a
      href="/#how-to-play"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (location.pathname !== "/") {
          navigate("/#how-to-play");
        } else {
          const el = document.getElementById("how-to-play");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      {children}
    </a>
  );
}
