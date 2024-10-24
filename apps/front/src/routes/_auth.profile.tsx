import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/profile')({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { email } = Route.useRouteContext();

  return (
    <div className="p-2 space-y-2">
      <div>
        Email:<strong>{email}</strong>
      </div>
    </div>
  );
}
