/**
 * Netlify Edge Function – Cache‑Control for immutable Next.js assets
 * ---------------------------------------------------------------
 * This function runs at the edge for every request that matches the
 * `[[edge_functions]]` path defined in `netlify.toml` (i.e. "/_next/*").
 *
 * It adds a long‑term Cache‑Control header to static assets such as
 * JavaScript, CSS, images, fonts, and the Next.js build manifest.
 *
 * The logic is deliberately simple – a forensic‑style "exact‑match"
 * approach that never guesses. Only known static extensions receive the
 * immutable header.
 */

export default async (request: Request, context: any) => {
  // Let Next.js handle the request first
  const response = await context.next(request);

  // Determine if the request is for a static asset we want to cache
  const url = new URL(request.url);
  const staticExtensions = /\.(js|css|svg|png|jpe?g|webp|gif|woff2?)$/i;

  if (
    url.pathname.startsWith('/_next/static/') ||
    staticExtensions.test(url.pathname)
  ) {
    // Apply a strict, immutable cache policy (1 year)
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
};
