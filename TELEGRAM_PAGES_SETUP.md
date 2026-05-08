# Telegram leads on GitHub Pages

GitHub Pages is static hosting, so this project sends leads directly from the browser to Telegram Bot API.

Important: with this setup, `VITE_TELEGRAM_BOT_TOKEN` is included in public browser JavaScript. This is how many simple GitHub Pages forms work, but the bot token is not private. If the token is abused, regenerate it in `@BotFather`.

## GitHub setup

In GitHub:

1. Open repository settings.
2. Go to `Secrets and variables` -> `Actions` -> `Variables`.
3. Add repository variables:
   - `VITE_TELEGRAM_BOT_TOKEN`
   - `VITE_TELEGRAM_CHAT_ID`

For this project the current chat id is:

```text
730519432
```

Push to `main`. The GitHub Pages workflow will build the site with these variables, and quiz submissions will go directly to Telegram.

## Local setup

For local builds, put the same values into `.env`:

```env
VITE_TELEGRAM_BOT_TOKEN=123456789:replace-with-your-token
VITE_TELEGRAM_CHAT_ID=730519432
```
