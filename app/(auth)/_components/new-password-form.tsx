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
import { NewPasswordSchema } from "@/lib/zod";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { newPasswordAction } from "@/actions/auth-actions";

type FormSchema = z.infer<typeof NewPasswordSchema>;

export function NewPasswordForm() {
  const [error, setError] = useState<string | null>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<FormSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      passwordVerified: "",
    },
  });
  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<FormSchema> = async (
    data: z.infer<typeof NewPasswordSchema>
  ) => {
    setError("");

    startTransition(async () => {
      const response = await newPasswordAction(data, token);
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
        <CardTitle className="text-2xl text-center">Reset password</CardTitle>
        <CardDescription className="text-center">
          Enter a new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Password Field */}
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
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
              render={({ field }) => (
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
              Reset password
            </Button>
          </form>

          {/* Footer */}
          <CardFooter className="mt-4 justify-center text-center text-sm">
            <Link href="/login" className="hover:underline">
              Back to login
            </Link>
          </CardFooter>
          {error && <FormMessage>{error}</FormMessage>}
        </Form>
      </CardContent>
    </Card>
  );
}
