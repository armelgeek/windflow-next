import { z } from "zod";
import { forgotPasswordSchema } from "../schema/auth/forgot-password.schema";

export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
