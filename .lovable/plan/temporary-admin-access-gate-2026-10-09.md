# Temporary Admin Access Gate

## Scope

Add a temporary shared-password admin mode without changing club data behavior, backend services, schemas, dashboard calculations, or existing CRUD mutation logic.

## Implementation

- Add a small admin context/provider and a password modal in the shared application shell, with Admin Login, Admin Mode status, and Logout.
- Validate the shared password through a server function and persist the verified state in an encrypted session cookie; never ship the password in browser code or store admin authorization in localStorage.
- Hide mutation controls when signed out on Squad, Sessions, Attendance, and Settings; keep all existing read-only views and existing handlers intact.
- Record the new provider/server-function boundary in `AGENTS.md`.

## Important limitation

The checked-out app has no `CURRENT_ARCHITECTURE.md` and the current store reads/writes club data with localStorage; it does not contain the claimed Supabase migration. The gate will therefore only control the visible interface, not enforce data authorization against browser developer tools. No service files or database/schema files will be changed.

## Verification

Check for the required secret configuration, then verify login failure/success, refresh persistence, logout, visibility of admin-only controls, and the build diagnostics.
