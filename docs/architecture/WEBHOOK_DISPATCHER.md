# Webhook Dispatcher

Outbound webhooks are signed using HMAC-SHA256 signatures passed in `X-TaskFlow-Signature`. Failed deliveries follow an exponential backoff schedule.
