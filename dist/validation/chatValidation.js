"use strict";
// test-package/package/src/validation/chatValidation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleChatOperationOptionsSchema = void 0;
const zod_1 = require("zod");
exports.HandleChatOperationOptionsSchema = zod_1.z.object({
    id: zod_1.z.string(),
    question_id: zod_1.z.string(),
    value: zod_1.z.string(),
    answer: zod_1.z.object({
        conversationId: zod_1.z.string().optional()
    }),
    getConnectionId: zod_1.z.function().returns(zod_1.z.string()),
    runChat: zod_1.z.function().args(zod_1.z.record(zod_1.z.any())).returns(zod_1.z.promise(zod_1.z.void()))
});
