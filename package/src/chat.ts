// test-package/package/src/chat.ts

import { HandleChatOperationOptionsSchema, HandleChatOperationOptions } from './validation/chatValidation';

export async function handleChatOperation(options: HandleChatOperationOptions): Promise<void> {
  HandleChatOperationOptionsSchema.parse(options);

  const { id, question_id, value, answer, getConnectionId, runChat } = options;

  const messageInput = { [question_id]: value };
  const chatParams: Record<string, any> = {
    pipe_id: id,
    inputs: messageInput,
    channel_id: getConnectionId(),
  };

  if (answer.conversationId) {
    chatParams.conversation_id = answer.conversationId;
  }

  try {
    await runChat(chatParams);
  } catch (error) {
    console.error("Chat error: ", error);
    throw error;
  }
}
