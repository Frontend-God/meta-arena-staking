import { createContext, useContext } from "react";

export type ConnectContextType = {
  connected: boolean;
  setConnected: (connected: boolean) => void;
};

export const ConnectContext = createContext<ConnectContextType>({
  connected: false,
  setConnected: () => console.warn("no provider"),
});

export const useConnected = () => useContext(ConnectContext);
