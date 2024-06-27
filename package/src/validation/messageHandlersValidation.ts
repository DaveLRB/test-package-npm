// test-package/package/src/validation/messageHandlersValidation.ts

import { z } from 'zod';

export const HandleWebSocketMessageOptionsSchema = z.object({
  fromRunDtoToStateDto: z.function().args(z.record(z.any())).returns(z.record(z.any())),
  updateAnswerCallback: z.function().args(z.record(z.any())).optional(),
  updateMessagesCallback: z.function().args(z.array(z.record(z.any()))).optional(),
  value: z.string()
});

export type HandleWebSocketMessageOptions = z.infer<typeof HandleWebSocketMessageOptionsSchema>;
