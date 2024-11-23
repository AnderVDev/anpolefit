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
import { signIn } from "next-auth/react";

const formSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
    })
    .email("Invalid email address"),
  password: z.string({
    required_error: "password is required",
  }),
  //   password: z
  //     .string()
  //     .min(8, "Password must be at least 8 characters long")
  //     .regex(/[A-Za-z]/, "Password must contain at least one letter")
  //     .regex(/[0-9]/, "Password must contain at least one number")
  //     .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: undefined,
      password: undefined,
    },
  });
  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    // console.log("Form submitted:", data);

    const response = await signIn("credentials", data);

    console.log(response);
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
              name="username"
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
            <Button type="submit" className="w-full my-2">
              Login
            </Button>
          </form>

          {/* Google Login */}
          <Button variant="outline" className="w-full">
            <Icons.google className="mr-2 h-4 w-4" />
            Login with Google
          </Button>

          {/* Footer */}
          <CardFooter className="mt-4 justify-center text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </CardFooter>
        </Form>
      </CardContent>
    </Card>
  );
}
