import { useAppStore } from "@/stores/appStore";

const levels = [
  { level: "easy", desc: "Perfect for beginners", emoji: "😊", color: "text-green-600" },
  { level: "medium", desc: "Balanced challenge", emoji: "😎", color: "text-blue-600" },
  { level: "hard", desc: "For puzzle lovers", emoji: "🧐", color: "text-yellow-600" },
  { level: "expert", desc: "Only for masters", emoji: "🤯", color: "text-red-600" },
];

const LevelButtons = () => {
  const { setGameStart } = useAppStore();
  return (
    <div className="grid grid-cols-2 gap-4">
      {levels.map((l) => (
        <button
          key={`level-${l.level}`}
          onClick={() => setGameStart(l.level)}
          className="bg-white rounded-xl shadow-md p-6 text-center transition-transform cursor-pointer
                     pointer-fine:hover:-translate-y-1 pointer-fine:hover:shadow-lg active:scale-98"
        >
          <div className="text-4xl mb-4">{l.emoji}</div>
          <h3 className={["font-bold text-lg capitalize", l.color].join(" ")}>{l.level}</h3>
          <p className="text-gray-500 text-sm">{l.desc}</p>
        </button>
      ))}
    </div>
  );
};

export default LevelButtons;
