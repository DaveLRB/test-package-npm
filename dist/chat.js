"use strict";
// test-package/package/src/chat.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChatOperation = handleChatOperation;
const chatValidation_1 = require("./validation/chatValidation");
function handleChatOperation(options) {
    return __awaiter(this, void 0, void 0, function* () {
        chatValidation_1.HandleChatOperationOptionsSchema.parse(options);
        const { id, question_id, value, answer, getConnectionId, runChat } = options;
        const messageInput = { [question_id]: value };
        const chatParams = {
            pipe_id: id,
            inputs: messageInput,
            channel_id: getConnectionId(),
        };
        if (answer.conversationId) {
            chatParams.conversation_id = answer.conversationId;
        }
        try {
            yield runChat(chatParams);
        }
        catch (error) {
            console.error("Chat error: ", error);
            throw error;
        }
    });
}
