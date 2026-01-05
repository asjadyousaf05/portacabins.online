import { PageContent } from '../components/PageContent';
import { useStaticHtml } from '../hooks/useStaticHtml';

type Props = {
  locale: 'en' | 'ar';
};

export const ContactPage = ({ locale }: Props) => {
  const path = locale === 'ar' ? '/content-ar/contact/index.html' : '/content/contact/index.html';
  const { staticHtml, loading } = useStaticHtml(path, locale);

  return (
    <PageContent
      contentPath={path}
      fallbackTitle="Contact - Porta Cabins"
      locale={locale}
      staticHtml={staticHtml}
      staticLoading={loading}
    />
  );
};
