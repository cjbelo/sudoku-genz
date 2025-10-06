import { SignOutIcon, XIcon } from "@phosphor-icons/react";
import { useAppStore } from "@/stores";
import ActionButton from "./ActionButton";

const LogoutModal = () => {
  const { isLogoutModalOpen, logout, toggleLogoutModal } = useAppStore();

  if (!isLogoutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="modal-content bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md mx-4">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">Logout</h2>
          <p className="opacity-90">Are you sure you want to logout?</p>
        </div>
        <div className="p-6">
          <div className="flex flex-col space-y-4">
            <ActionButton
              label="Yes, Logout"
              Icon={SignOutIcon}
              className="bg-red-500 pointer-fine:hover:-translate-y-1 text-white active:scale-98"
              onClick={logout}
            />
            <ActionButton
              label="Cancel"
              Icon={XIcon}
              className="bg-gray-300 pointer-fine:hover:-translate-y-1 active:scale-98"
              onClick={toggleLogoutModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
