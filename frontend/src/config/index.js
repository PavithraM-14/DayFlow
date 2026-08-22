// Centralized frontend configuration (API base URL, feature flags, etc.)
// is read from environment variables here as it is needed.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
