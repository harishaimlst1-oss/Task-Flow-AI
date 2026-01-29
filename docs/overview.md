# Task Flow AI Overview

## Core flows
- **Login & onboarding**: Users authenticate with 6-character invite codes. Backend validates org domain
  from the invite and issues a short-lived JWT for API access.
- **RBAC enforcement**: Permissions are applied at both the API layer (`requirePermission`) and UI layer
  (ProtectedRoute + role mapping).
- **Assignment pipeline**:
  1. ML service runs deterministic TF-IDF matching on skill tags.
  2. Gemini 1.5 Flash subdivision stub provides subtask scaffolding.
  3. Backend records AI attempts and selects the highest-scoring assignee.
  4. Adaptive skill learning updates skill history.
- **Security & privacy**: AES-256-GCM encryption at rest for resumes and OAuth tokens, GDPR deletion
  workflows with scheduled purge.
