# WorldBite

WorldBite is a global food and meal-logging app with a photo-based food estimate feature.

## Snap AI backend configuration

The photo UI calls the server-side Vercel function at `/api/analyze`. Provider credentials are never placed in the browser bundle or Android app.

In the Vercel project for WorldBite, add these **server-side Environment Variables** (Production and Preview as needed):

- `AI_API_URL`: the provider's OpenAI-compatible chat-completions endpoint.
- `AI_API_KEY`: the provider API key. Keep this secret; do not put it in GitHub, source code, screenshots, or the APK.
- `AI_MODEL`: a vision-capable model name supported by that endpoint.

Redeploy after adding the variables. Until configured, Snap AI deliberately returns a clear setup message rather than pretending photo recognition works. Use a provider account managed by a parent or guardian and check that provider's age and usage terms; do not create an account by entering a false age.

## Android APK

The GitHub Actions workflow `.github/workflows/android-apk.yml` builds the web app, packages it with Capacitor, and uploads a debug APK artifact named `WorldBite-Android-debug-APK`. A successful workflow run is required before an APK is available. Debug APKs are for direct testing; a Play Store release needs a separately managed signing key.

## Food data

Catalogue calorie values are approximate per-100-gram reference estimates. Recipes, oil, ingredients and serving sizes vary, so photo results and catalogue values should not be treated as exact nutrition measurements.
