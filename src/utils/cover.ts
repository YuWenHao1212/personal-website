// Cover images come in up to three widths (scripts/cover-variants.mjs makes the 400 and 800 pixel copies). Given a cover's
// path and how wide it is shown, this returns the attributes that let the browser pick the smallest file that is enough.
// A cover without copies gets nothing added and is served as before.
import variants from '../data/cover-variants.json';

type Variant = { small: string; thumb?: string; w: number; h: number };

export function coverSet(src: string | undefined, sizes: string): { srcset?: string; sizes?: string } {
  const v = src ? (variants as Record<string, Variant>)[src] : undefined;
  if (!v) return {};
  return { srcset: [v.thumb && `${v.thumb} 400w`, `${v.small} 800w`, `${src} ${v.w}w`].filter(Boolean).join(', '), sizes };
}
