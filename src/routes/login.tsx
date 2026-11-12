import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { signIn } from "@/services/auth";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      await signIn(email, password);

      toast.success("Logged in successfully");

      navigate({
        to: "/",
      });
    } catch (error: any) {
      toast.error(
        error.message ?? "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell
      title="Login"
      subtitle="Sign in to your account"
    >
      <div className="mx-auto max-w-md space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          
        />

        <Button
          className="
            w-full
            bg-gradient-to-r
            from-green-600
            to-lime-500
            text-white
            hover:shadow-lg
        "
          disabled={loading}
          onClick={handleLogin}
        >
          Login
        </Button>

        <p className="text-center text-sm">
          Need an account?{" "}
          <Link
            to="/signup"
            className="text-primary"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AppShell>
  );
}