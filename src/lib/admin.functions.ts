import { createHash, timingSafeEqual } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";

type AdminSession = { isAdmin?: boolean };

function getSessionConfig() {
  const password = process.env["SESSION_SECRET"];
  if (!password) throw new Error("SESSION_SECRET is not configured");

  return {
    password,
    name: "ambassador-admin-session",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function passwordMatches(input: string, expected: string): boolean {
  const inputHash = createHash("sha256").update(input, "utf8").digest();
  const expectedHash = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(inputHash, expectedHash);
}

export const getAdminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(getSessionConfig());
  return { isAdmin: session.data.isAdmin === true };
});

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ password: z.string().max(256) }).parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["SITE_PASSWORD"];
    if (!expected || !passwordMatches(data.password, expected)) return { ok: false as const };

    const session = await useSession<AdminSession>(getSessionConfig());
    await session.update({ isAdmin: true });
    return { ok: true as const };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(getSessionConfig());
  await session.clear();
  return { ok: true as const };
});