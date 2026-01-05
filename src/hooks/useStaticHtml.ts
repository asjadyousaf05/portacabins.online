import { useEffect, useState } from 'react';
import { loadStaticHtml } from '../utils/staticHtml';

type Locale = 'en' | 'ar';

export const useStaticHtml = (contentPath: string, locale: Locale, initialHtml?: string) => {
  const [staticHtml, setStaticHtml] = useState<string | undefined>(initialHtml);
  const [loading, setLoading] = useState(!initialHtml);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setError(false);

    // If we already have inline HTML (critical path), avoid reloading.
    if (initialHtml) {
      setStaticHtml(initialHtml);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    setStaticHtml(undefined);
    setLoading(true);

    loadStaticHtml(contentPath, locale)
      .then((html) => {
        if (cancelled) return;
        setStaticHtml(html || undefined);
      })
      .catch(() => {
        if (cancelled) return;
        setStaticHtml(undefined);
        setError(true);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [contentPath, locale, initialHtml]);

  return { staticHtml, loading, error };
};
