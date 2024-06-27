// test-package/package/src/messageHandlers.ts

import { HandleWebSocketMessageOptionsSchema, HandleWebSocketMessageOptions } from './validation/messageHandlersValidation';
import { MessageEvent } from 'ws';

export function handleWebSocketMessage(event: MessageEvent, options: HandleWebSocketMessageOptions): void {
  HandleWebSocketMessageOptionsSchema.parse(options);

  const { fromRunDtoToStateDto, updateAnswerCallback, updateMessagesCallback, value } = options;

  try {
    let data: Record<string, any>;
    try {
      data = JSON.parse(event.data as string);
    } catch (error) {
      console.log("Received non-JSON message:", event.data);
      data = { message: event.data };
    }

    const message = fromRunDtoToStateDto(data);

    if (updateAnswerCallback) {
      updateAnswerCallback({
        conversationId: message.conversationId,
        conversationName: message.conversationName,
        createdDate: message.createdDate,
        updatedDate: message.updatedDate,
        output: message.output || message.message,
      });
    }

    if (updateMessagesCallback) {
      updateMessagesCallback([
        { messageType: 'input', message: value },
        { messageType: 'output', message: message.output || message.message },
      ]);
    }
  } catch (error) {
    console.error("Error handling WebSocket message:", error);
  }
}
