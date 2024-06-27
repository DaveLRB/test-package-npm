"use strict";
// test-package/package/src/websocket.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebSocket = createWebSocket;
exports.setupWebSocketListeners = setupWebSocketListeners;
const ws_1 = __importDefault(require("ws"));
function createWebSocket(websocketEndpoint, getConnectionId) {
    return new ws_1.default(`${websocketEndpoint}/websocket/${getConnectionId()}`);
}
function setupWebSocketListeners(websocket, callbacks) {
    const { onOpen, onError, onClose, onMessage } = callbacks;
    websocket.onopen = () => {
        console.info("websocket opened");
        if (onOpen)
            onOpen();
    };
    websocket.onerror = (error) => {
        console.error("WebSocket error: ", error);
        if (onError)
            onError(error);
    };
    websocket.onclose = () => {
        console.info("websocket closed");
        if (onClose)
            onClose();
    };
    websocket.onmessage = onMessage;
}
