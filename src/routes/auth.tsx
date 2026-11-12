import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { signIn, signUp } from "@/services/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // Login

  const [loginEmail, setLoginEmail] =
    useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  // Signup

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [position, setPosition] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  async function handleLogin() {
    try {
      setLoading(true);

      await signIn(
        loginEmail,
        loginPassword
      );

      toast.success(
        "Logged in successfully"
      );

      navigate({
        to: "/",
      });
    } catch (error: any) {
      toast.error(
        error?.message ??
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup() {
    try {
      if (
        !fullName ||
        !email ||
        !phone ||
        !position ||
        !password
      ) {
        toast.error(
          "Please fill all fields"
        );
        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        toast.error(
          "Passwords don't match"
        );
        return;
      }

      setLoading(true);

      await signUp(
        email,
        password
      );

      toast.success(
        "Account created. Club approval required."
      );

      setFullName("");
      setEmail("");
      setPhone("");
      setPosition("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(
        error?.message ??
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* HERO */}

<div className="relative h-72 md:h-96 lg:h-auto">          <img
            src="/Ambassadorfc_auth.png"
            alt="Ambassador FC"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <p className="font-condensed text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
              Official Club Portal
            </p>

            <h1 className="mt-3 text-5xl font-black uppercase">
              Ambassador FC
            </h1>

            <p className="mt-3 text-lg text-white/80">
              Discipline • Commitment • Excellence
            </p>
          </div>
        </div>

        {/* FORM */}

        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-card p-6 shadow-2xl backdrop-blur">

            <div className="mb-6 text-center">
              <img
                src="/ambassador_logo.jpeg"
                alt="Logo"
                className="mx-auto mb-4 h-20 w-20 rounded-full"
              />

              <h2 className="text-3xl font-bold">
                Ambassador FC
              </h2>

              <p className="text-sm text-muted-foreground">
                More Than A Club
              </p>
            </div>

            <Tabs
              defaultValue="login"
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">
                  LOGIN
                </TabsTrigger>

                <TabsTrigger value="signup">
                  SIGN UP
                </TabsTrigger>
              </TabsList>

              {/* LOGIN */}

              <TabsContent value="login">
                <div className="space-y-4 pt-4">

                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                    <Input
                      className="pl-10"
                      placeholder="Email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) =>
                        setLoginEmail(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                    <Input
                      className="pl-10 pr-10"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) =>
                        setLoginPassword(
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white"
                    disabled={loading}
                    onClick={
                      handleLogin
                    }
                  >
                    LOGIN
                  </Button>
                </div>
              </TabsContent>

              {/* SIGNUP */}

              <TabsContent value="signup">
                <div className="space-y-4 pt-4">

                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                    <Input
                      className="pl-10"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                    <Input
                      className="pl-10"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                    <Input
                      className="pl-10"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) =>
                        setPhone(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <Select
                    value={position}
                    onValueChange={
                      setPosition
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred Position" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="GK">
                        Goalkeeper
                      </SelectItem>

                      <SelectItem value="DF">
                        Defender
                      </SelectItem>

                      <SelectItem value="MF">
                        Midfielder
                      </SelectItem>

                      <SelectItem value="FW">
                        Forward
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                  />

                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={
                      confirmPassword
                    }
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                  />

                  <p className="text-xs text-muted-foreground">
                    New player registrations require
                    approval by club management.
                  </p>

                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white"
                    disabled={loading}
                    onClick={
                      handleSignup
                    }
                  >
                    CREATE ACCOUNT
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}