// test-package/package/src/websocket.js

import WebSocket from 'ws';

export function createWebSocket(websocketEndpoint, getConnectionId) {
    return new WebSocket(`${websocketEndpoint}/websocket/${getConnectionId()}`);
  }
  
  export function setupWebSocketListeners(websocket, callbacks) {
    const { onOpen, onError, onClose, onMessage } = callbacks;
  
    websocket.onopen = () => {
      console.info("websocket opened");
      onOpen && onOpen();
    };
  
    websocket.onerror = (error) => {
      console.error("WebSocket error: ", error);
      onError && onError(error);
    };
  
    websocket.onclose = () => {
      console.info("websocket closed");
      onClose && onClose();
    };
  
    websocket.onmessage = onMessage;
  }