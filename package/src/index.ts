// test-package/package/src/index.ts

import WebSocket, { MessageEvent, ErrorEvent } from 'ws';
import { RunConversationOptionsSchema, RunConversationOptions } from './validation/indexValidation';
import { createWebSocket, setupWebSocketListeners } from './websocket';
import { handleChatOperation } from './chat';
import { handleWebSocketMessage } from './messageHandlers';

function runConversation(options: RunConversationOptions) {
  RunConversationOptionsSchema.parse(options);

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
    onMessage: (event: MessageEvent) => {
      console.log("Received WebSocket message:", event.data);
      handleWebSocketMessage(event, {
        fromRunDtoToStateDto,
        updateAnswerCallback,
        updateMessagesCallback,
        value
      });
    },
    onError: (error: ErrorEvent) => {
      console.error("WebSocket error:", error);
    },
    onClose: () => {
      console.log("WebSocket connection closed");
    }
  });

  return {
    close: () => websocket.close(),
    send: (message: Record<string, any>) => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(message));
      } else {
        console.error("websocket is not open");
      }
    },
  };
}

export default runConversation;
