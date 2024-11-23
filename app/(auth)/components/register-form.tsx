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
import { registerSchema } from "@/lib/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/actions/auth-actions";
import { signIn } from "next-auth/react";

type FormSchema = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordVerified: "",
    },
  });
  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<FormSchema> = async (data : z.infer<typeof registerSchema>) => {
    // console.log("Form submitted:", data);
    

    startTransition(async () => {
      const response = await registerAction(data);
      console.log(response);
      if (response?.error) {
        setError(response.error);
      } else {
        setError(null);
        router.push("/login");
      }
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <FormField
              control={control}
              name="name"
              render={({ field }: any) => (
                <FormItem className="mb-4">
                  <FormLabel className="">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      aria-label="Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              render={({ field }: unknown) => (
                <FormItem className="mb-4">
                  <FormLabel>Password</FormLabel>
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
            {/* Password Field */}
            <FormField
              control={control}
              name="passwordVerified"
              render={({ field }: unknown) => (
                <FormItem className="mb-4">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="passwordVerified"
                      type="password"
                      placeholder="Re-enter your password"
                      aria-label="Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" disabled={isPending} className="w-full my-2">
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </form>

          {/* Google Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>

          {/* Footer */}
          <CardFooter className="mt-4 justify-center text-center text-sm">
            <p>
              Already have an account? {"  "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </p>
          </CardFooter>
          {error && <FormMessage>{error}</FormMessage>}
        </Form>
      </CardContent>
    </Card>
  );
}
