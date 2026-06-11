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
import { useNavigate } from "@better-pos/i18n/tanstack-start/hooks/use-navigate";
import { Link } from "@better-pos/i18n/tanstack-start/components/link";

export const Route = createFileRoute("/{-$locale}/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const result = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to sign in");
        return;
      }

      toast.success("Signed in successfully");

      await navigate({ to: "" });
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
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
              name="email"
              children={(field) => (
                <field.TextField label="Email" type="email" autoComplete="email" />
              )}
            />
            <form.AppField
              name="password"
              children={(field) => (
                <field.TextField label="Password" type="password" autoComplete="current-password" />
              )}
            />
            <form.AppForm>
              <form.SubscribeButton label="Sign in" className="w-full" />
            </form.AppForm>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primary underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
