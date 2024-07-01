import { IDialogProps } from "../../../core/models/utils";
import { create } from "zustand";

const useCampaignRegisterHook = create<IDialogProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCampaignRegisterHook;
