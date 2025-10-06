export const createUiSlice = (set, get) => ({
  setScreen: (screen) => set({ screen }),
  toggleResetGameModal: () => set({ isResetGameModalOpen: !get().isResetGameModalOpen }),
  toggleLogoutModal: () => set({ isLogoutModalOpen: !get().isLogoutModalOpen }),
  toggleIsFillNotes: () => set({ isFillNotes: !get().isFillNotes }),
});
