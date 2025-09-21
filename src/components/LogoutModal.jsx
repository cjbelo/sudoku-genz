import { useAppStore } from "@/stores/appStore";
import ActionButton from "./ActionButton";

const LogoutModal = () => {
  const { clearIsLogout, isLogout, logout } = useAppStore();

  if (!isLogout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="modal-content bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md mx-4">
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
          <h2 class="text-2xl font-bold">Logout</h2>
          <p class="opacity-90">Are you sure you want to logout?</p>
        </div>
        <div class="p-6">
          <div class="flex flex-col space-y-4">
            <ActionButton
              label="Yes, Logout"
              icon="log-out"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={logout}
            />
            <ActionButton label="Cancel" icon="x" className="bg-gray-200 hover:bg-gray-300" onClick={clearIsLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
