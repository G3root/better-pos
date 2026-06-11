import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Link } from "@better-pos/i18n/tanstack-start/components/link";

export const Route = createFileRoute("/{-$locale}/")({
  component: PosLoginPage,
});

function PosLoginPage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dateString = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 text-white">
      <div className="flex w-full max-w-2xl flex-col items-center gap-10">
        {/* Clock */}
        <div className="text-center">
          <div className="font-mono text-4xl font-light tracking-wider">{timeString}</div>
          <div className="mt-1 text-sm text-white/40">{dateString}</div>
        </div>

        {/* Login Card */}
        <Card className="w-full max-w-sm border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription className="text-white/40">Access your terminal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 rounded-md bg-white py-2.5 text-sm font-medium text-black hover:bg-white/90"
            >
              Sign In with Email
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/signup"
              className="flex items-center justify-center rounded-md border border-white/20 py-2.5 text-sm font-medium text-white hover:bg-white/5"
            >
              Create Account
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
