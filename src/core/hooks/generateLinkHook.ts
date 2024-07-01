import { IDialogProps } from "../../core/models/utils";
import { create } from "zustand";

const useGenerateIndicationLinkHook = create<IDialogProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useGenerateIndicationLinkHook;
