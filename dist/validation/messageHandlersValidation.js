"use strict";
// test-package/package/src/validation/messageHandlersValidation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleWebSocketMessageOptionsSchema = void 0;
const zod_1 = require("zod");
exports.HandleWebSocketMessageOptionsSchema = zod_1.z.object({
    fromRunDtoToStateDto: zod_1.z.function().args(zod_1.z.record(zod_1.z.any())).returns(zod_1.z.record(zod_1.z.any())),
    updateAnswerCallback: zod_1.z.function().args(zod_1.z.record(zod_1.z.any())).optional(),
    updateMessagesCallback: zod_1.z.function().args(zod_1.z.array(zod_1.z.record(zod_1.z.any()))).optional(),
    value: zod_1.z.string()
});
