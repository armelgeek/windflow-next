import { z } from 'zod';
import { resetPasswordSchema } from '../schema/auth/reset-password.schema';

export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;
