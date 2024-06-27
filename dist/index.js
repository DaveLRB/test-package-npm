"use strict";
// test-package/package/src/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const indexValidation_1 = require("./validation/indexValidation");
const websocket_1 = require("./websocket");
const chat_1 = require("./chat");
const messageHandlers_1 = require("./messageHandlers");
function runConversation(options) {
    indexValidation_1.RunConversationOptionsSchema.parse(options);
    const { id, question_id, value, answer, updateAnswerCallback, updateMessagesCallback, fromRunDtoToStateDto, websocketEndpoint, getConnectionId, runChat, } = options;
    if (!question_id || !id) {
        console.error("missing parameters");
        return;
    }
    const websocket = (0, websocket_1.createWebSocket)(websocketEndpoint, getConnectionId);
    (0, websocket_1.setupWebSocketListeners)(websocket, {
        onOpen: () => __awaiter(this, void 0, void 0, function* () {
            console.log("WebSocket connection opened");
            try {
                yield (0, chat_1.handleChatOperation)({ id, question_id, value, answer, getConnectionId, runChat });
            }
            catch (error) {
                console.error("Error in chat operation:", error);
                websocket.close();
            }
        }),
        onMessage: (event) => {
            console.log("Received WebSocket message:", event.data);
            (0, messageHandlers_1.handleWebSocketMessage)(event, {
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
            if (websocket.readyState === ws_1.default.OPEN) {
                websocket.send(JSON.stringify(message));
            }
            else {
                console.error("websocket is not open");
            }
        },
    };
}
exports.default = runConversation;
