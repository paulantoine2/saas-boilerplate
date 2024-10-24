import { LoginForm } from '@/features/auth/login-form';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/login')({
  component: () => (
    <div className="min-h-screen content-center">
      <LoginForm />
    </div>
  ),
});
