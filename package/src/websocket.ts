// test-package/package/src/websocket.ts

import WebSocket, { MessageEvent, ErrorEvent } from 'ws';

export function createWebSocket(websocketEndpoint: string, getConnectionId: () => string): WebSocket {
  return new WebSocket(`${websocketEndpoint}/websocket/${getConnectionId()}`);
}

interface WebSocketCallbacks {
  onOpen?: () => void;
  onError?: (error: ErrorEvent) => void;
  onClose?: () => void;
  onMessage: (event: MessageEvent) => void;
}

export function setupWebSocketListeners(websocket: WebSocket, callbacks: WebSocketCallbacks): void {
  const { onOpen, onError, onClose, onMessage } = callbacks;

  websocket.onopen = () => {
    console.info("websocket opened");
    if (onOpen) onOpen();
  };

  websocket.onerror = (error) => {
    console.error("WebSocket error: ", error);
    if (onError) onError(error);
  };

  websocket.onclose = () => {
    console.info("websocket closed");
    if (onClose) onClose();
  };

  websocket.onmessage = onMessage;
}
