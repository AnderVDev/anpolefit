"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/lib/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth-actions";
import { signIn } from "next-auth/react";

type FormSchema = z.infer<typeof loginSchema>;

interface LoginFormProps {
  // isVerified: boolean;
  OAuthAccountNotLinked: boolean;
}

export function LoginForm({ OAuthAccountNotLinked }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control } = form;

  const HandleOAuth = async () => {
    await signIn("google");
  };

  const onSubmit: SubmitHandler<FormSchema> = async (
    data: z.infer<typeof loginSchema>
  ) => {
    console.log("Form submitted:", data);
    setError(null);

    startTransition(async () => {
      const response = await loginAction(data);
      console.log({ response });
      if (response?.error) {
        setError(response.error);
      } else {
        router.push("/dashboard");
      }
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <FormField
              control={control}
              name="email"
              render={({ field }: any) => (
                <FormItem className="mb-4">
                  <FormLabel className="">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      aria-label="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={control}
              name="password"
              render={({ field }: any) => (
                <FormItem className="mb-4">
                  <FormLabel>
                    <div className="flex items-center">
                      Password
                      <Link
                        href="#"
                        className="ml-auto text-sm underline"
                        aria-label="Forgot your password?"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      aria-label="Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" disabled={isPending} className="w-full my-2">
              Login
            </Button>
          </form>

          {/* Google Login */}
          <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
            <Icons.google className="mr-2 h-4 w-4" />
            Login with Google
          </Button>

          {/* Footer */}
          <CardFooter className="mt-4 justify-center text-center text-sm">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
          {error && <FormMessage>{error}</FormMessage>}
          {OAuthAccountNotLinked && (
            <FormMessage>
              To confirm your identity, sign in with the same account you used
              originally.
            </FormMessage>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}
