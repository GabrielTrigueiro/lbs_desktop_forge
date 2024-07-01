import { create } from "zustand";

interface IUrlProps {
  tempUrl: string;
  setTempUrl: (url: string) => void;
}

const useUrlGeneratedHook = create<IUrlProps>((set) => ({
  tempUrl: "",
  setTempUrl: (url: string) => set({ tempUrl: url }),
}));

export default useUrlGeneratedHook;
