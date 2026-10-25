# Project rules
- Use local public article photos as guarded fallbacks when remote article images fail, so cards never loop on another unavailable remote image.
- Keep the public contact section focused on remote contact and administrative address information, without embedding a visitor-location map.
- Brand colors come only from the `supreme` palette in `tailwind.config.ts` and the CSS tokens in `src/index.css`; never hardcode hex values or use green/emerald utility classes in components.