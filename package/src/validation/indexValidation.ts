// test-package/package/src/validation/indexValidation.ts

import { z } from 'zod';

export const RunConversationOptionsSchema = z.object({
  id: z.string(),
  question_id: z.string(),
  value: z.string(),
  answer: z.object({
    conversationId: z.string().optional()
  }),
  updateAnswerCallback: z.function().args(z.record(z.any())).optional(),
  updateMessagesCallback: z.function().args(z.array(z.record(z.any()))).optional(),
  fromRunDtoToStateDto: z.function().args(z.record(z.any())).returns(z.record(z.any())),
  websocketEndpoint: z.string(),
  getConnectionId: z.function().returns(z.string()),
  runChat: z.function().args(z.record(z.any())).returns(z.promise(z.void()))
});

export type RunConversationOptions = z.infer<typeof RunConversationOptionsSchema>;
