// test-package/package/src/index.js

import WebSocket from 'ws';
import { createWebSocket, setupWebSocketListeners } from './websocket.js';
import { handleChatOperation } from './chat.js';
import { handleWebSocketMessage } from './messageHandlers.js';

function runConversation(options) {
  const {
    id,
    question_id,
    value,
    answer,
    updateAnswerCallback,
    updateMessagesCallback,
    fromRunDtoToStateDto,
    websocketEndpoint,
    getConnectionId,
    runChat,
  } = options;

  if (!question_id || !id) {
    console.error("missing parameters");
    return;
  }

  const websocket = createWebSocket(websocketEndpoint, getConnectionId);

  setupWebSocketListeners(websocket, {
    onOpen: async () => {
      console.log("WebSocket connection opened");
      try {
        await handleChatOperation({ id, question_id, value, answer, getConnectionId, runChat });
      } catch (error) {
        console.error("Error in chat operation:", error);
        websocket.close();
      }
    },
    onMessage: (event) => {
      console.log("Received WebSocket message:", event.data);
      handleWebSocketMessage(event, {
        fromRunDtoToStateDto,
        updateAnswerCallback,
        updateMessagesCallback,
        value
      });
    },
    onError: (error) => {
      console.error("WebSocket error:", error);
    },
    onClose: () => {
      console.log("WebSocket connection closed");
    }
  });

  return {
    close: () => websocket.close(),
    send: (message) => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(message));
      } else {
        console.error("websocket is not open");
      }
    },
  };
}

export default runConversation;