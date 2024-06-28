// test-package/test-folder/script.ts

import runConversation from "../package/src/index";
import { RunConversationOptions } from "../package/src/validation/indexValidation";

// Define the options with appropriate types
const options: RunConversationOptions = {
  id: "123",
  question_id: "456",
  value: "example-value",
  answer: {},
  updateAnswerCallback: (answer: Record<string, any>) => console.log("Answer updated:", JSON.stringify(answer)),
  updateMessagesCallback: (messages: Record<string, any>[]) => console.log("Messages updated:", JSON.stringify(messages)),
  fromRunDtoToStateDto: (dto: Record<string, any>) => {
    console.log("Received DTO:", JSON.stringify(dto));
    return dto;
  },
  websocketEndpoint: "ws://localhost:8080",
  getConnectionId: () => "test-connection-id",
  runChat: async (params: Record<string, any>): Promise<void> => {
    console.log("Running chat with params:", JSON.stringify(params));
    // Perform your chat logic here
  }
};

// Initialize the conversation
const conversation = runConversation(options);

if (conversation) {
  // Send a message after 1 second
  setTimeout(() => {
    console.log("Sending message: Hello, Everybodyyyy!");
    conversation.send({ message: "Hello, Everybodyyyy!" });
  }, 1000);

  // Close the connection after 5 seconds
  setTimeout(() => {
    console.log("Closing connection BYE!");
    conversation.close();
    process.exit(0);
  }, 5000);
} else {
  console.error("Failed to initialize the conversation.");
}
