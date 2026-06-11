# AGENTS.md — Travel Tracker (Java/Android)

## Repository Type
Spec-driven development. No application code exists yet. All implementation guidance comes from markdown specs.

## Tech Stack (Mandatory)
- **Language:** Java only — no `.kt` files allowed
- **UI:** XML layouts with Material Components — no Jetpack Compose
- **Architecture:** MVVM with LiveData
- **State:** `LiveData<UiState>` from ViewModels; `SingleLiveEvent` or `Event<T>` wrapper for one-shot events
- **Async:** Retrofit `Call<T>`/callbacks, `ExecutorService`, `Handler` — no Coroutines, no Flow/StateFlow/SharedFlow
- **Binding:** ViewBinding required; DataBinding only when explicitly justified
- **Navigation:** AndroidX Navigation Component with `nav_graph.xml`
- **Local DB:** Room with DAOs returning `LiveData` or sync ops on background threads
- **HTTP:** Retrofit
- **Secure Storage:** `EncryptedSharedPreferences` for tokens; plain `SharedPreferences` for non-sensitive prefs
- **Maps:** MapLibre Native Android + OpenStreetMap tiles (BSD 2-Clause)
- **Background Location:** Foreground Service with `foregroundServiceType="location"` — this is the **only** mechanism that guarantees continuous capture when app is closed/backgrounded
- **Periodic Tasks:** WorkManager for supplemental tasks (e.g., reprocessing pending coordinates after reconnect); NOT for the 10s capture/60s sync intervals

## Location Capture Rules (Critical)
- Capture interval: **every 10 seconds** while trip is active
- Sync interval: **every 60 seconds** when internet available
- Both run inside the **same Foreground Service**
- Local coordinate fields: `coordenadaID` (GUID), `viagemID`, `dataHora`, `latitude`, `longitude`, `altitude`
- Sync payload includes: `app_id`, `latitude`, `longitude`, `altitude`, `recorded_at`
- After successful sync: remove coordinates locally
- After failed sync: keep locally for retry
- Stop capture when trip is inactivated, finished, or canceled

## Offline Behavior
- Login, register, password recovery: require internet
- List trips/tracked trips: show cached data if offline
- Create/edit/delete trip, accept/reject invite: require internet
- Activate trip: requires internet to update status; local capture continues if connection drops
- Coordinate capture: continues locally once trip is active (even offline)
- Coordinate sync: only when connected
- Logout: wipe all local user data (trips, tracked trips, invites, active trip, pending coordinates, session)

## Trip & Invite Status
- Trip: `pending` → `active` → `inactive` | `finished` | `canceled`
- Invite: `pending` → `accepted` | `rejected`

## API Auth
- JWT Bearer tokens
- Silent refresh
- Tokens stored in `EncryptedSharedPreferences`

## Key Spec Files
| File | Purpose |
|------|---------|
| `technical-travel-tracker.md` | Architecture, API contracts, data models, stack decisions |
| `product-travel-tracker.md` | User stories (US-01–US-18), functional requirements (RF-01–RF-71) |
| `features/feature-*.md` | Per-feature specs |

## Navigation Flow
Splash → (session valid?) → Main (tabs: My Trips / Tracked Trips) or Login → Register / Recover Password

## Module Structure (planned)
`App` | `Features/[Name]` | `Core/Network` | `Core/Persistence` | `Core/Analytics` | `DesignSystem` | `SharedDomain`