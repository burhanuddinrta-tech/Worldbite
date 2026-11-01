# WorldBite

WorldBite is a global food and meal-logging app with a searchable catalogue, portion controls and photo-based food estimates.

## Snap AI connection

The photo UI calls the Vercel function at /api/analyze. That function forwards the compressed photo to the private Jarvis Gemini endpoint using a server-to-server token. The Gemini API key stays only in the Jarvis Vercel project's sensitive Production environment variables; it is never included in this repository, browser bundle or APK.

WorldBite Vercel Production environment variables:
- JARVIS_SNAP_URL = https://jarvis-ai-independent.vercel.app/api/analyze
- JARVIS_SNAP_TOKEN = private shared token (sensitive)

Jarvis Vercel Production environment variable:
- WORLD_BITE_SHARED_TOKEN = the same private shared token (sensitive)

Never put either token or the Gemini API key in source code. Redeploy both projects after changing these settings.

## Android APK

The GitHub Actions workflow .github/workflows/android-apk.yml builds the web app, packages it with Capacitor, generates Android launcher icons from the WorldBite SVG mark, and uploads a debug APK artifact named WorldBite-Android-debug-APK. A successful workflow run is required before an APK is available. Debug APKs are for direct testing; a Play Store release needs a separately managed signing key.

## Food data

The catalogue now contains 196 dishes, including 50 new dishes added in this update. Calories are approximate per-100-gram reference estimates; recipes, ingredients, cooking methods and serving sizes vary.
