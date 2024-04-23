import { useContext } from "react";
import { WebSocketContext } from "../app/providers/WebSocketProvider";

export const useSocket = () => {
  const socketContext = useContext(WebSocketContext);

  if (!socketContext) {
    throw new Error("useSocket must be used within a WebSocketProvider");
  }

  return socketContext;
};
