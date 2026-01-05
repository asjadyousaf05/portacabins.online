import { Helmet } from 'react-helmet';
import { PageContent } from '../components/PageContent';
import { useStaticHtml } from '../hooks/useStaticHtml';

type Props = {
  locale: 'en' | 'ar';
};

export const PrivacyPage = ({ locale }: Props) => {
  const path = locale === 'ar' ? '/content-ar/privacy-policy/index.html' : '/content/privacy-policy/index.html';
  const fallbackTitle =
    locale === 'ar' ? 'سياسة الخصوصية - بورتاكابينز' : 'Privacy Policy - Porta Cabins';
  const { staticHtml, loading } = useStaticHtml(path, locale);

  if (locale === 'ar') {
    const title = 'سياسة الخصوصية - بورتاكابينز';
    const description =
      'نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية كيفية جمع معلوماتك واستخدامها وحمايتها عند استخدام موقع وخدمات بورتاكابينز.';

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={`${window.location.origin}/privacy-policy`} />
        </Helmet>
        <main className="webpage rtl-page" style={{ background: '#fff', color: '#111' }}>
          <div className="container" style={{ padding: '80px 16px', maxWidth: 960, margin: '0 auto' }}>
            <h1 style={{ color: '#111', marginBottom: '12px' }}>{title}</h1>
            <p style={{ marginTop: 0, marginBottom: '32px', color: '#444', lineHeight: 1.8 }}>{description}</p>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ color: '#ffb74d', marginBottom: '10px', fontSize: '20px' }}>بيانات الشركة</h2>
              <p style={{ margin: 0, lineHeight: 1.8 }}>
                الاسم: بورتاكابينز. يمكنك التواصل معنا عبر الهاتف +966506802316 أو البريد الإلكتروني info@portacabins.online.
              </p>
            </section>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ color: '#ffb74d', marginBottom: '10px', fontSize: '20px' }}>المعلومات التي نجمعها</h2>
              <ul style={{ margin: 0, paddingInlineStart: '20px', lineHeight: 1.8 }}>
                <li>معلومات شخصية: الاسم، وسائل التواصل، البريد الإلكتروني، واسم الشركة.</li>
                <li>معلومات تقنية: عنوان الـ IP، نوع الجهاز والمتصفح، الصفحات التي تزورها، وملفات تعريف الارتباط.</li>
                <li>نماذج الاتصال: أي بيانات تقدمها عند طلب عرض أسعار أو إرسال استفسار.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ color: '#ffb74d', marginBottom: '10px', fontSize: '20px' }}>كيفية استخدام المعلومات</h2>
              <ul style={{ margin: 0, paddingInlineStart: '20px', lineHeight: 1.8 }}>
                <li>تقديم الخدمات والرد على الطلبات والاستفسارات.</li>
                <li>تحسين الموقع وتجربة المستخدم.</li>
                <li>إرسال تحديثات أو عروض متعلقة بخدماتنا (يمكنك إلغاء الاشتراك في أي وقت).</li>
              </ul>
            </section>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ color: '#ffb74d', marginBottom: '10px', fontSize: '20px' }}>مشاركة المعلومات</h2>
              <p style={{ margin: 0, lineHeight: 1.8 }}>
                لا نبيع معلوماتك الشخصية. نشارك البيانات فقط مع مزودي خدمة موثوقين لدعم الموقع أو تقديم خدمة مطلوبة،
                مع التزامهم بحماية خصوصيتك.
              </p>
            </section>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ color: '#ffb74d', marginBottom: '10px', fontSize: '20px' }}>ملفات تعريف الارتباط</h2>
              <p style={{ margin: 0, lineHeight: 1.8 }}>
                نستخدم ملفات تعريف الارتباط لأغراض تحليلية ولتحسين الأداء. يمكنك ضبط إعدادات المتصفح لرفض الكوكيز، لكن
                قد تتأثر بعض الميزات.
              </p>
            </section>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ color: '#ffb74d', marginBottom: '10px', fontSize: '20px' }}>أمن المعلومات</h2>
              <p style={{ margin: 0, lineHeight: 1.8 }}>
                نتخذ إجراءات معقولة لحماية بياناتك، لكن لا يمكن ضمان أمان تام عبر الإنترنت. شارك بياناتك بحذر.
              </p>
            </section>

            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ color: '#ffb74d', marginBottom: '10px', fontSize: '20px' }}>حقوقك</h2>
              <ul style={{ margin: 0, paddingInlineStart: '20px', lineHeight: 1.8 }}>
                <li>طلب الوصول أو التصحيح أو الحذف لمعلوماتك.</li>
                <li>الاعتراض على استخدام بياناتك لأغراض تسويقية.</li>
                <li>إلغاء الاشتراك من الرسائل في أي وقت.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ color: '#ffb74d', marginBottom: '10px', fontSize: '20px' }}>التغييرات على السياسة</h2>
              <p style={{ margin: 0, lineHeight: 1.8 }}>
                قد نقوم بتحديث هذه السياسة عند الحاجة. سيتم نشر أي تحديث مع تاريخ سريان جديد. استمرار استخدامك للموقع يعني
                موافقتك على الشروط المحدَّثة.
              </p>
            </section>
          </div>
        </main>
      </>
    );
  }

  return (
    <PageContent
      contentPath={path}
      fallbackTitle={fallbackTitle}
      locale={locale}
      staticHtml={staticHtml}
      staticLoading={loading}
    />
  );
};


