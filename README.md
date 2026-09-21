# Ambassador FC

Build a modern football team management web app called "Ambassador FC", designed specifically for coaches to manage player rosters and track weekend training attendance from the pitch on mobile and desktop.

Stack & Design System:

- React + Vite, TypeScript, Tailwind CSS, shadcn/ui components, Lucide icons

- Theme: Athletic, clean, professional club aesthetic

- Color palette: Deep forest green accents (#0f5132 / emerald tones), crisp white surfaces, sharp slate/black text and dark borders

- Layout: Mobile-first responsive shell with a collapsible sidebar on desktop and a clean bottom navigation bar / hamburger drawer on mobile

Data & Persistence:

- Store all data in localStorage with sensible, realistic initial seed data so the app feels alive immediately.

- Structure data types cleanly with TypeScript interfaces matching a future Supabase schema (UUIDs, timestamps).

Data Models:

1. Player:

   - id: string

   - fullName: string

   - jerseyNumber: number

   - position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'

   - phoneNumber: string

   - active: boolean

2. TrainingSession:

   - id: string

   - title: string (e.g., "Saturday Morning Conditioning")

   - date: string (YYYY-MM-DD)

   - time: string (HH:MM)

   - location: string (default: "Ambassador FC Training Ground")

   - notes?: string

3. AttendanceRecord:

   - id: string

   - sessionId: string

   - playerId: string

   - status: 'present' | 'late' | 'absent'

   - notes?: string

4. TeamSettings:

   - teamName: "Ambassador FC"

   - coachName: string

   - coachPhone: string

   - defaultLocation: string

Key Screens & Features:

1. Dashboard:

   - Header with team badge placeholder, coach greeting, and next upcoming session banner.

   - Metric cards: Total Squad Size, Total Sessions, Overall Attendance Rate (%), and Top Committed Player.

   - "Quick Roll Call" prompt if a session is scheduled for today or upcoming.

   - Recent activity list (last 3 recorded sessions and attendance summaries).

2. Squad / Players Page:

   - Search bar by name or jersey number, plus quick filter pills by position (All, GK, DEF, MID, FWD).

   - Desktop: Data table with sorting by jersey number, name, and attendance rate.

   - Mobile: Clean player cards with position badges and phone action links (call/WhatsApp).

   - "Add Player" opens a slide-over Sheet or Dialog (Full Name, Jersey Number, Position dropdown, Phone Number) with validation.

   - Inline edit and delete confirmation dialogs.

3. Training Sessions Page:

   - Calendar / timeline list of upcoming and past sessions.

   - "New Session" dialog to schedule a session (Title, Date, Time, Location).

   - Each session card displays date, time, location, attendance status badge ("Completed" vs. "Upcoming"), and a direct button to "Take Attendance" or "View Report".

4. Pitch-side Attendance Tracker:

   - Session selector dropdown with clear session details at the top.

   - Live summary stats bar: Present (green pill), Late (amber pill), Absent (rose pill), Unmarked.

   - "Mark All Present" quick-action button to save time pitch-side.

   - Touch-optimized player roster: large tap buttons for Present (P), Late (L), and Absent (A) with active state colors.

   - Visual progress bar showing % roster checked in.

   - Auto-saves changes immediately to state and localStorage.

5. Settings:

   - Editable Team Profile (Team Name, Coach Name, Phone Number, Home Training Pitch).

   - "Reset to Demo Data" button with confirmation.

   - "Export Squad & Attendance as JSON / CSV" utility.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6c52afe3-6a98-4b88-b109-d31afa9c754b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
