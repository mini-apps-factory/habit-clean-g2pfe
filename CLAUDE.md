# Habit Clean

## PROJECT
- Category: Health & Fitness
- Tier: MVP
- Slug: habit-clean-g2pfe
- Brand: Habit Clean — encouraging, calm, minimalist
- Colors: primary=#2D7D6E, bg=#F8F4E9, dark=#1A1A1A
- Generated: 2026-04-28

## SCREENS (9)
1. Onboarding: Welcome screen explaining habit tracking with clean streaks, allows user to set their primary habit goal
2. Habit Setup: Create first habit with name, frequency (daily/weekly), reminder time, and motivation message
3. Home Dashboard: Shows today's habits checklist, current streak count, motivational quote, and quick check-in button
4. My Habits: List of all active habits with streak indicators, completion status, and add new habit button
5. Habit Detail: Individual habit view showing calendar heatmap, statistics, streak history, edit and delete options
6. Check-In: Modal to confirm habit completion for today with optional note and feeling emoji
7. Statistics: Weekly/monthly overview with completion rate, longest streak, total days clean, visual charts
8. Profile: User settings including notification preferences, timezone, streak recovery options, data export
9. Achievements: Unlocked badges and milestones (7-day, 30-day, 100-day streaks) with progress indicators

## ROLES
- user: Individual tracking their habits and building clean streaks

## NAVIGATION
- Tab Bar: Home, Habits, Stats, Profile
- Stack: habit_detail, habit_setup, achievements
- Modal: check_in, onboarding

## USER FLOWS
1. First Time User Setup (user): onboarding → habit_setup → home
2. Daily Check-In Flow (user): home → check_in → home (updated streak)
3. Create New Habit (user): habit_list → habit_setup → habit_list (with new habit)
4. Review Progress (user): home → habit_detail → stats → achievements

## DATABASE
### habits
- id
- name
- notes
- created_at
- user_id

### completions
- id
- habit_id
- completed_at
- user_id

## API ENDPOINTS
- GET /api/specialists: Get list of specialists with filters and search
- GET /api/specialists/:id: Get specialist profile details
- POST /api/specialists: Create specialist profile
- PUT /api/specialists/:id: Update specialist profile
- GET /api/specialists/:id/services: Get specialist services
- POST /api/specialists/:id/services: Add service to specialist profile
- PUT /api/services/:id: Update service
- DELETE /api/services/:id: Delete service
- GET /api/specialists/:id/availability: Get specialist availability for date range
- POST /api/specialists/:id/availability: Set weekly availability schedule
- POST /api/specialists/:id/blocked-dates: Block specific dates
- DELETE /api/blocked-dates/:id: Remove blocked date
- POST /api/specialists/:id/portfolio: Upload portfolio image
- DELETE /api/portfolio/:id: Delete portfolio image
- GET /api/specialists/:id/reviews: Get specialist reviews
- POST /api/bookings: Create new booking
- GET /api/bookings/:id: Get booking details
- GET /api/bookings: Get user bookings with filters
- PUT /api/bookings/:id/accept: Specialist accepts booking
- PUT /api/bookings/:id/decline: Specialist declines booking
- PUT /api/bookings/:id/cancel: Cancel booking
- PUT /api/bookings/:id/complete: Mark booking as completed
- POST /api/payments/create-invoice: Create Telegram payment invoice
- POST /api/payments/webhook: Handle Telegram payment webhook
- GET /api/payments/:id: Get payment details
- POST /api/reviews: Submit review for completed booking
- GET /api/specialists/:id/earnings: Get specialist earnings and statistics
- GET /api/payouts: Get specialist payout history
- GET /api/notifications: Get user notifications
- PUT /api/notifications/:id/read: Mark notification as read
- GET /api/notification-settings: Get notification settings
- PUT /api/notification-settings: Update notification settings
- GET /api/users/me: Get current user profile
- PUT /api/users/me: Update user profile
- POST /api/upload: Upload file to Supabase Storage

## MODULES
### core
- src/app/layout.tsx
- src/app/page.tsx
- src/components/layout/AppShell.tsx
- src/components/layout/ErrorBoundary.tsx
- src/providers/TelegramProvider.tsx
- src/providers/SupabaseProvider.tsx

### ui
- src/components/ui/Button.tsx
- src/components/ui/Input.tsx
- src/components/ui/Card.tsx
- src/components/ui/Avatar.tsx
- src/components/ui/EmptyState.tsx
- src/components/ui/LoadingSpinner.tsx
- src/components/ui/Toast.tsx

### telegram
- src/hooks/useTelegram.ts
- src/hooks/useHapticFeedback.ts
- src/hooks/useBackButton.ts
- src/utils/telegram.ts
- src/types/telegram.ts

### auth
- src/hooks/useAuth.ts
- src/components/features/auth/LoginGuard.tsx
- src/utils/auth.ts
- src/app/auth/callback/page.tsx

### api
- src/utils/api.ts
- src/hooks/useApi.ts
- src/utils/apiClient.ts
- src/types/api.ts

### utils
- src/utils/format.ts
- src/utils/validation.ts
- src/utils/storage.ts
- src/utils/constants.ts
- src/utils/logger.ts

## TECH STACK
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict)
- Styling: TailwindCSS + brand colors via CSS vars
- Backend: Supabase (PostgreSQL + Auth + Realtime)
- Platform: Telegram Mini App SDK

## DESIGN TOKENS
```
--color-primary: #2D7D6E
--color-bg:      #F8F4E9
--color-dark:    #1A1A1A
--radius-md:     12px
--radius-lg:     16px
```

## CODING RULES
1. "use client" only where useState/useEffect/events needed
2. TailwindCSS only — no inline styles
3. Use brand.primary / brand.bg / brand.dark Tailwind classes
4. All screens: loading=Skeleton, empty=EmptyState, error=ErrorBoundary
5. Haptic feedback on every interactive element
6. Supabase: createBrowserClient from @supabase/ssr, no service_role in client

## ARKA SCORE
- Total: 58/100
