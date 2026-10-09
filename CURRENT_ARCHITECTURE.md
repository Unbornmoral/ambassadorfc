IMPORTANT:

localStorage architecture is deprecated.

Source of truth is Supabase.

Players:
- Read from Supabase
- Write to Supabase

Sessions:
- Read from Supabase
- Write to Supabase

Attendance:
- Read from Supabase
- Write to Supabase

Settings:
- Read from Supabase
- Write to Supabase

Dashboard:
- Uses Supabase data

store.tsx remains only for legacy helpers and compatibility.
Do not generate new code using localStorage.