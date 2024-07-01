import { IDialogProps } from "../../../core/models/utils";
import { create } from "zustand";

const useCouponRegisterHook = create<IDialogProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCouponRegisterHook;