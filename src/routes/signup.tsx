import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { signUp } from "@/services/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    try {
      setLoading(true);

      await signUp(email, password);

      toast.success(
        "Account created successfully"
      );

      navigate({
        to: "/login",
      });
    } catch (error: any) {
      toast.error(
        error.message ?? "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell
      title="Sign Up"
      subtitle="Create your account"
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
          className="w-full"
          disabled={loading}
          onClick={handleSignup}
        >
          Create Account
        </Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary"
          >
            Login
          </Link>
        </p>
      </div>
    </AppShell>
  );
}