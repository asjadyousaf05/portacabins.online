import { PageContent } from '../../components/PageContent';
import { useStaticHtml } from '../../hooks/useStaticHtml';

type Props = {
  locale: 'en' | 'ar';
};

export const AluminiumPage = ({ locale }: Props) => {
  const path =
    locale === 'ar'
      ? '/content-ar/services/aluminium/index.html'
      : '/content/services/aluminium/index.html';
  const { staticHtml, loading } = useStaticHtml(path, locale);

  return (
    <PageContent
      contentPath={path}
      fallbackTitle="Aluminium - Porta Cabins"
      locale={locale}
      staticHtml={staticHtml}
      staticLoading={loading}
    />
  );
};
