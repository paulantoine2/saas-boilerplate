import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthBodySchema, type AuthBody } from '@repo/types';
import { Link, useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { GoogleSignIn } from './google-sign-in';
import { Separator } from '@/components/ui/separator';

export function LoginForm() {
  const router = useRouter();
  const login = useLogin({
    onSuccess: async () => {
      // redirect to the next page after login
      await router.navigate({ to: '/profile' });
    },
  });

  const form = useForm<AuthBody>({
    resolver: zodResolver(AuthBodySchema),
  });

  function onSubmit(values: AuthBody) {
    login.mutate(values);
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Don't have an account ?{' '}
          <Link href="/register" className="underline">
            Sign up
          </Link>
          .
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={login.isPending}>
              Login
            </Button>
          </form>
        </Form>
        <Separator className="my-4" />
        <GoogleSignIn />
      </CardContent>
    </Card>
  );
}
