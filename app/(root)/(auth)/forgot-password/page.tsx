import { ForgotPasswordForm } from '@/features/auth/components/organisms/forgot-password-form';

export default function Page() {
  return (
    <div className="flex  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
