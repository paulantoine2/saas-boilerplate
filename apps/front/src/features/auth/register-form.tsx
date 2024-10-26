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
import { Separator } from '@/components/ui/separator';
import { useRegister } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthBodySchema, type AuthBody } from '@repo/types';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { GoogleSignIn } from './google-sign-in';

export function RegisterForm() {
  const register = useRegister();

  const form = useForm<AuthBody>({
    resolver: zodResolver(AuthBodySchema),
  });

  function onSubmit(values: AuthBody) {
    register.mutate(values);
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Already have an account ?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
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
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={register.isPending}
            >
              Create an account
            </Button>
          </form>
        </Form>
        <Separator className="my-4" />
        <GoogleSignIn />
      </CardContent>
    </Card>
  );
}
