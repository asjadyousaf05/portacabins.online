type LanguageToggleProps = {
  locale: 'en' | 'ar';
  onToggle: (locale: 'en' | 'ar') => void;
};

export const LanguageToggle = ({ locale, onToggle }: LanguageToggleProps) => {
  const nextLocale = locale === 'en' ? 'ar' : 'en';
  const label = nextLocale === 'ar' ? 'AR' : 'EN';

  return (
    <div className="locale-toggle">
      <button
        type="button"
        className="locale-toggle__btn"
        onClick={() => onToggle(nextLocale)}
        aria-label="Toggle language"
      >
        {label}
      </button>
    </div>
  );
};
