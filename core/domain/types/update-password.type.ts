import { z } from 'zod';
import { updatePasswordSchema } from '@/core/domain/schema/auth/update-password.schema';

export type UpdatePasswordPayload = z.infer<typeof updatePasswordSchema>
