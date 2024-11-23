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
import { ResetSchema } from "@/lib/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { resetAction } from "@/actions/auth-actions";

type FormSchema = z.infer<typeof ResetSchema>;

export function ResetForm() {
  const [error, setError] = useState<string | null>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<FormSchema> = async (
    data: z.infer<typeof ResetSchema>
  ) => {
    setError("");

    startTransition(async () => {
      const response = await resetAction(data);
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
          Forgot your password?
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

            {/* Submit Button */}
            <Button type="submit" disabled={isPending} className="w-full my-2">
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send reset email
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
