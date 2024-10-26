import { Button } from '@/components/ui/button';
import { env } from '@/config/env';

export function GoogleSignIn() {
  return (
    <Button variant="outline" asChild className="w-full">
      <a href={env.API_URL + '/auth/google'}>Sign-in with Google</a>
    </Button>
  );
}
