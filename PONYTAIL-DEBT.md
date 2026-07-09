# TrustNet Ponytail Debt Ledger

This document tracks all deliberate shortcuts, simplifications, and deferrals introduced during development to avoid over-engineering.

| Location | Shortcut Description | Ceiling (Limit) | Upgrade Trigger |
| :--- | :--- | :--- | :--- |
| `src/App.tsx:21` | Simple Local i18n Language Context | Handles only EN/HI toggles locally. | Upgrade to `react-i18next` if adding 3+ languages or dynamic API translations. |
| `src/pages/LandingPage.tsx:180` | Simplified Framer Motion Animation Settings | Static transition variants configured inside components. | Move to a shared config if standardizing animations across multiple pages. |
| `src/pages/LoginPage.tsx:50` | Mock Authentication Handler (1.5s Delay) | Simulated authentication. | Integrate with actual auth providers (Firebase, Auth0, or backend endpoints). |
| `src/pages/LoginPage.tsx:206` | Placeholder Forgotten Password Link | Anchor href set to `#forgot`. | Implement a dedicated password reset page and route once built. |
| `src/pages/CommunityPage.tsx` | Mock Community Alerts | Hardcoded arrays for visual representation. | Integrate with real threat intel database. |
| `src/pages/AssistantPage.tsx` | Mock AI Responses | Hardcoded `setTimeout` response generation. | Connect to LLM backend API endpoint. |
| `src/pages/ReportsPage.tsx` | Mock Scan Reports | Hardcoded arrays for table rows. | Fetch actual scan histories from database. |

**7 markers tracked, 0 with no trigger.**
