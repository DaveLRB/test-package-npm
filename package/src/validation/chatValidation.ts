// test-package/package/src/validation/chatValidation.ts

import { z } from 'zod';

export const HandleChatOperationOptionsSchema = z.object({
  id: z.string(),
  question_id: z.string(),
  value: z.string(),
  answer: z.object({
    conversationId: z.string().optional()
  }),
  getConnectionId: z.function().returns(z.string()),
  runChat: z.function().args(z.record(z.any())).returns(z.promise(z.void()))
});

export type HandleChatOperationOptions = z.infer<typeof HandleChatOperationOptionsSchema>;
