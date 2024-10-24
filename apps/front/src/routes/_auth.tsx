import { Button } from '@/components/ui/button';
import { getUser, useLogout } from '@/lib/auth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  // Before loading, authenticate the user via our auth context
  // This will also happen during prefetching (e.g. hovering over links, etc)
  beforeLoad: async ({ context, location }) => {
    // If the user is logged out, redirect them to the login page
    const data = await context.queryClient
      .ensureQueryData({
        queryKey: ['authenticated-user'],
        queryFn: getUser,
      })
      .catch(() => console.log('User is not logged in'));

    console.log(data, location);

    if (!data) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }

    // Otherwise, return the user in context
    return {
      email: data.email,
    };
  },
  component: AuthLayout,
});

function AuthLayout() {
  const logout = useLogout();
  return (
    <div>
      <Button onClick={() => logout.mutate()}>Log out</Button>
      <Outlet />
    </div>
  );
}
