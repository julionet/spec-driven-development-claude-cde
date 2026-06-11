# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **spec-driven development** documentation repository for a travel tracking Android app. It contains product and technical specifications; no application code exists yet. The specs define what to build before implementation begins.

## Document Structure

| File | Purpose |
|------|---------|
| `product-travel-tracker.md` | Product spec: user stories (US-01–US-18), functional requirements (RF-01–RF-79), UX principles, copy strings, analytics events |
| `technical-travel-tracker.md` | Technical spec: architecture, API contracts, data models, state management, security, analytics schema, release strategy |
| `features/feature-splash.md` | FEAT-01: Splash — startup flow, session check, initial data load, permissions, coordinate sync |
| `features/feature-login.md` | FEAT-01: Login — authentication, session storage, navigation to Home |
| `features/feature-novo-usuario.md` | FEAT-02: User registration — form validation, `POST /auth/register`, redirect to login |
| `features/feature-recuperar-senha.md` | FEAT-03: Password recovery — 3-screen flow (email → token → new password), `POST /auth/recover-password` + `POST /auth/update-password` |
| `features/feature-tela-principal.md` | FEAT-04: Home screen — bottom nav, Minhas Viagens tab, Viagens Acompanhadas tab, invite accept/reject |

New feature specs should be created under `features/` following the naming convention `feature-[feature-name].md`. Use any existing feature spec as the template. The technical spec §4 lists all 23 planned features (FEAT-01 through FEAT-23) and the expected filename for each.

## App Overview

**Platform:** Android only (API 30+)  
**Language/Framework:** Kotlin / Jetpack Compose  
**Architecture:** MVVM with Clean Architecture layers (Presentation → Domain → Data)  
**Language (UI):** Portuguese (pt-BR)

## Key Architectural Decisions

### Layers
- **Presentation:** Composables/Views + ViewModels + UI state/events
- **Domain:** Use Cases + business rules + domain entities
- **Data:** Repositories + mappers + remote/local data sources

### State Management
- `StateFlow` for continuous screen state from ViewModels
- `SharedFlow` for one-shot UI events (navigation, dialogs, toasts)
- `Flow` for reactive local data from Room and DataStore
- Kotlin Coroutines for all async work; avoid `LiveData` in new features

### Local Storage
- **Room:** trips, tracked trips, pending coordinates (structured relational data)
- **DataStore:** non-sensitive preferences
- **EncryptedSharedPreferences:** `accessToken`, `refreshToken`, session data

### Background Work
- **WorkManager:** periodic coordinate sync (every 60s when online)
- Coordinates captured locally every 10s during active trip; sent to API every 60s; removed locally after successful upload

### Maps
- **MapLibre Native Android** (BSD 2-Clause) with OpenStreetMap tiles — no Google Maps dependency

### Observability
- **Firebase Crashlytics** (staging + production)
- **Firebase Analytics** (production)

## API Contract Summary

Base auth endpoints: `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/recover-password`, `/auth/update-password`  
Trip endpoints: `/trips`, `/trips/{trip_id}`, `/trips/{trip_id}/status`, `/trips/{trip_id}/locations`  
Tracking endpoints: `/tracking`, `/tracking/{trip_id}/accept`, `/tracking/{trip_id}/locations`

Authentication: JWT Bearer tokens. Silent refresh strategy. Full contract in `technical-travel-tracker.md` §6.1.

## Local Data Models

Three Room entities: `ViagemMinha` (owned trips), `ViagemAcompanhada` (tracked trips with `statusConvite`), `Coordenada` (pending coordinates). All local data is user-scoped and wiped on logout.

## Trip Status Flow

`pending` → `active` → `inactive` | `finished` | `canceled`  
Invite status: `pending` → `accepted` | `rejected`

## Module Structure (planned)

| Module | Role |
|--------|------|
| `App` | Entry point, DI root, navigation host |
| `Features/[FeatureName]` | Self-contained vertical slice per feature |
| `Core/Network` | HTTP client, interceptors, auth |
| `Core/Persistence` | Room, DataStore, EncryptedSharedPreferences |
| `Core/Analytics` | Event tracking abstraction |
| `DesignSystem` | Reusable Compose components, theme tokens |
| `SharedDomain` | Shared entities, interfaces |

Feature module paths established in the specs: `features/splash`, `features/auth/login`, `features/auth/recover-password`, `Features/CadastroUsuario`, `features/home`.

## Cross-Cutting Patterns (established across all feature specs)

### UI/State pattern per screen
Each feature follows: `Screen` (Composable) + `ViewModel` + `UiState` (StateFlow) + `UiEvent` (SharedFlow, one-shot) + `Action` (user interactions dispatched to ViewModel).

### Error display rules
- **Validation errors** (local, pre-API): inline below the corresponding field
- **API/endpoint errors**: always in a `StandardErrorBottomSheet` modal with title, friendly message, and at minimum an "Entendi" button; optionally a "Tentar novamente" button
- Never expose HTTP codes, stack traces, or raw API payloads to the user

### Token storage and security
- `accessToken` and `refreshToken` stored exclusively in `EncryptedSharedPreferences`
- Tokens are never logged, never sent in analytics events, never exposed in error messages
- Token validated in Splash; silent refresh attempted before redirecting to login

### Navigation flow
Splash is always the entry point. It routes to Login (no valid session) or Home (valid session). Features use `SharedFlow` events to trigger navigation from ViewModel; the View observes and executes navigation — never navigates directly from domain or data layers.

### Feature spec sections (template)
All feature specs follow sections: 1 (Summary/Scope), 2 (User-visible behavior — entry points, happy path, alternatives, edge cases), 3 (UI spec — screens, layouts, states, messages, components), 4 (Technical design — module placement, component decomposition, data flow, endpoints, persistence, error handling, technical rules), 5 (Analytics events), 6 (Permissions/Privacy), 8 (Localization — `strings.xml` keys with pt-BR values), 9 (Definition of Done).

## Offline Behavior Rules

- Coordinate capture continues locally once a trip is active, even without internet
- Sync to API only when connected; failed syncs retain local records
- Trips and tracked trips are loaded from API on startup and cached locally
- Actions that mutate server state (create/edit/delete trip, accept invite, etc.) require connectivity
- On logout: clear all local data including tokens, trips, coordinates, active trip cache
