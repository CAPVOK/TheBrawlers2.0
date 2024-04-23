import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

interface IWebsocketContext {
  socket: WebSocket | null;
  createConnection: () => void;
  sendMessage: (message: string) => void;
  closeConnection: () => void;
}

const WS_HOST = import.meta.env.VITE_SOCKET_WS_HOST;

export const WebSocketContext = createContext<IWebsocketContext | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<WebSocket | null>(null);

  const createConnection = useCallback(() => {
    if (!socketRef.current) {
      const newSocket = new WebSocket(`ws://${WS_HOST}/websockets`);

      newSocket.onopen = () => {
        console.log("WebSocket connection established.");
      };

      newSocket.onmessage = (message: MessageEvent<string>) => {
        console.log(message);
      };

      newSocket.onclose = () => {
        console.log("WebSocket connection closed.");
      };

      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socketRef.current = newSocket;
    }
  }, [socketRef]);

  const closeConnection = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
      socketRef.current = null;
    }
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (socketRef.current) {
        socketRef.current.send(JSON.stringify(message));
      }
    },
    [socketRef]
  );

  useEffect(() => {
    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        console.log("context useEffect");
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  const context: IWebsocketContext = {
    sendMessage,
    socket: socketRef.current,
    createConnection,
    closeConnection,
  };

  return (
    <WebSocketContext.Provider value={context}>
      {children}
    </WebSocketContext.Provider>
  );
};
