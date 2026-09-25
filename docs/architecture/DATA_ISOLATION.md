# Multi-Tenant Data Isolation

TaskFlow uses strict tenant scoping. Every query to Projects, Tasks, or Comments joins through the active `workspaceId` verified against the user's active session.
