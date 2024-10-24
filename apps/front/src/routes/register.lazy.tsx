import { RegisterForm } from '@/features/auth/register-form';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/register')({
  component: () => (
    <div className="min-h-screen content-center">
      <RegisterForm />
    </div>
  ),
});
