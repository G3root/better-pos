import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Store, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

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
    second: "2-digit",
    hour12: true,
  });

  const dateString = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      {/* Header Bar */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-white/10">
            <Store className="size-5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wide">BETTER POS</h1>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Point of Sale System</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-medium text-white/60">Terminal ID</div>
          <div className="text-[10px] font-mono text-white/40">TP-001 • Station 1</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center gap-12 px-6">
        {/* Left Side - Clock & Info */}
        <div className="flex flex-col items-center gap-8">
          {/* Large Clock */}
          <div className="flex flex-col items-center gap-2">
            <div className="font-mono text-[5rem] font-light leading-none tracking-wider text-white">
              {timeString}
            </div>
            <div className="text-sm font-medium tracking-wide text-white/50">
              {dateString}
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-3 gap-3">
            <StatusCard label="System" value="Online" status="online" />
            <StatusCard label="Database" value="Connected" status="online" />
            <StatusCard label="Sync" value="Active" status="online" />
          </div>

          {/* Terminal Info */}
          <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-white/40">Store:</span>
                <span className="ml-2 text-white/80">Main Branch</span>
              </div>
              <div>
                <span className="text-white/40">Shift:</span>
                <span className="ml-2 text-white/80">Morning</span>
              </div>
              <div>
                <span className="text-white/40">Version:</span>
                <span className="ml-2 text-white/80">v2.4.1</span>
              </div>
              <div>
                <span className="text-white/40">Server:</span>
                <span className="ml-2 text-white/80">OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <Card className="w-full max-w-sm border-white/10 bg-white/[0.03] text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">Staff Login</CardTitle>
            <CardDescription className="text-white/40">
              Enter your credentials to access the terminal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link
              to="/{-$locale}/login"
              className="flex items-center justify-center gap-2 rounded-md bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Sign In with Email
              <ArrowRight className="size-4" />
            </Link>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#0a0a0a] px-2 text-white/40">or</span>
              </div>
            </div>

            <Link
              to="/{-$locale}/signup"
              className="flex items-center justify-center gap-2 rounded-md border border-white/20 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Create Account
            </Link>

            <div className="text-center text-[10px] text-white/30">
              <p>Forgot password? Contact your manager.</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-3 text-[10px] text-white/30">
        <div className="flex items-center justify-between">
          <span>Better POS &copy; {time.getFullYear()}</span>
          <span>Secure Terminal Connection</span>
        </div>
      </footer>
    </div>
  );
}

function StatusCard({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: "online" | "offline" | "warning";
}) {
  const statusColor = {
    online: "bg-emerald-500",
    offline: "bg-red-500",
    warning: "bg-amber-500",
  }[status];

  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
      <div className={`size-2 rounded-full ${statusColor}`} />
      <div>
        <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
        <div className="text-xs font-medium text-white/80">{value}</div>
      </div>
    </div>
  );
}
