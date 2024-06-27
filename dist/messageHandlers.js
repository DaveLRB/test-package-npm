"use strict";
// test-package/package/src/messageHandlers.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebSocketMessage = handleWebSocketMessage;
const messageHandlersValidation_1 = require("./validation/messageHandlersValidation");
function handleWebSocketMessage(event, options) {
    messageHandlersValidation_1.HandleWebSocketMessageOptionsSchema.parse(options);
    const { fromRunDtoToStateDto, updateAnswerCallback, updateMessagesCallback, value } = options;
    try {
        let data;
        try {
            data = JSON.parse(event.data);
        }
        catch (error) {
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
    }
    catch (error) {
        console.error("Error handling WebSocket message:", error);
    }
}
