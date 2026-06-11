import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useAppForm } from "~/hooks/form";
import { Link } from "@better-pos/i18n/tanstack-start/components/link";
import { useNavigate } from "@better-pos/i18n/tanstack-start/hooks/use-navigate";

export const Route = createFileRoute("/{-$locale}/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const result = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to sign up");
        return;
      }

      toast.success("Account created successfully");
      await navigate({ to: "" });
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex flex-col gap-4"
          >
            <form.AppField
              name="name"
              children={(field) => <field.TextField label="Name" type="text" autoComplete="name" />}
            />
            <form.AppField
              name="email"
              children={(field) => (
                <field.TextField label="Email" type="email" autoComplete="email" />
              )}
            />
            <form.AppField
              name="password"
              children={(field) => (
                <field.TextField label="Password" type="password" autoComplete="new-password" />
              )}
            />
            <form.AppForm>
              <form.SubscribeButton label="Sign up" className="w-full" />
            </form.AppForm>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
