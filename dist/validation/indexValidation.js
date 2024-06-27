"use strict";
// test-package/package/src/validation/indexValidation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunConversationOptionsSchema = void 0;
const zod_1 = require("zod");
exports.RunConversationOptionsSchema = zod_1.z.object({
    id: zod_1.z.string(),
    question_id: zod_1.z.string(),
    value: zod_1.z.string(),
    answer: zod_1.z.object({
        conversationId: zod_1.z.string().optional()
    }),
    updateAnswerCallback: zod_1.z.function().args(zod_1.z.record(zod_1.z.any())).optional(),
    updateMessagesCallback: zod_1.z.function().args(zod_1.z.array(zod_1.z.record(zod_1.z.any()))).optional(),
    fromRunDtoToStateDto: zod_1.z.function().args(zod_1.z.record(zod_1.z.any())).returns(zod_1.z.record(zod_1.z.any())),
    websocketEndpoint: zod_1.z.string(),
    getConnectionId: zod_1.z.function().returns(zod_1.z.string()),
    runChat: zod_1.z.function().args(zod_1.z.record(zod_1.z.any())).returns(zod_1.z.promise(zod_1.z.void()))
});
