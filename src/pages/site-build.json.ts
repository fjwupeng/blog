import { SITE } from 'astrowind:config';

export function GET() {
  return new Response(
    JSON.stringify({
      commit:
        import.meta.env.CF_PAGES_COMMIT_SHA ||
        import.meta.env.VERCEL_GIT_COMMIT_SHA ||
        import.meta.env.GITHUB_SHA ||
        'local',
      site: new URL('/', SITE.site).href,
    }),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  );
}
