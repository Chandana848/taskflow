# HTTP Caching Strategy

- Static Assets: `Cache-Control: public, max-age=31536000, immutable`
- Dynamic API Endpoints: `Cache-Control: private, no-cache, no-store, must-revalidate`
- Periodic Views: Stale-while-revalidate headers for analytics widgets
