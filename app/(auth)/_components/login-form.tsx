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
import { LoginSchema } from "@/lib/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth-actions";
import { signIn } from "next-auth/react";

type FormSchema = z.infer<typeof LoginSchema>;
const button_menu = "bg-hotpink rounded-full text-lg text-white px-6";

interface LoginFormProps {
  // isVerified: boolean;
  OAuthAccountNotLinked: boolean;
}

export function LoginForm({ OAuthAccountNotLinked }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(LoginSchema),
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
    data: z.infer<typeof LoginSchema>
  ) => {
    setError(null);

    startTransition(async () => {
      const response = await loginAction(data);
      if (response?.error) {
        setError(response.error);
      } else {
        router.push("/overview");
      }
    });
  };
 
  return (
    <Card className="mx-auto max-w-sm bg-darkpurple bg-opacity-70 shadow-xl border-solid border-midpurple border text-lightpurple">
      <CardHeader>
        <CardTitle className="text-3xl">Login</CardTitle>
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
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
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
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>
                    <div className="flex items-center">
                      Password
                      <Link
                        href="/reset"
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
            <Button type="submit" disabled={isPending} className={`${button_menu} w-full my-2`}>
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
          </form>

          {/* Google Login */}
          <Button variant="outline"  className={`${button_menu} w-full my-2 bg-black border-none`} onClick={HandleOAuth}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
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
