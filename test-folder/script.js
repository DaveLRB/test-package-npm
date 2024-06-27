import runConversation from "../package/src/index.js";

const options = {
  id: "123",
  question_id: "456",
  value: "example-value",
  answer: {},
  updateAnswerCallback: (answer) => console.log("Answer updated:", JSON.stringify(answer)),
  updateMessagesCallback: (messages) => console.log("Messages updated:", JSON.stringify(messages)),
  fromRunDtoToStateDto: (dto) => {
    console.log("Received DTO:", JSON.stringify(dto));
    return dto;
  },
  websocketEndpoint: "ws://localhost:8080",
  getConnectionId: () => "test-connection-id",
  runChat: async (params) => {
    console.log("Running chat with params:", JSON.stringify(params));
  
    return { status: 'success' };
  }
};

const conversation = runConversation(options);


setTimeout(() => {
  console.log("Sending message: Hello, Everybodyyyy!");
  conversation.send("Hello, Everybodyyyy!");
}, 1000);


setTimeout(() => {
  console.log("Closing connection BYE!");
  conversation.close();
  process.exit(0);
}, 5000);