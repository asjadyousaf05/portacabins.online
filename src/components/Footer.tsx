import { Link } from 'react-router-dom';

type FooterProps = {
  locale: 'en' | 'ar';
};

const copy = {
  en: {
    logoLarge: 'PORTACABINS',
    logoSmall: 'SUPPLY AND INSTALLMENT',
    rights: 'All Rights Reserved',
    developedBy: 'Developed By',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
  },
  ar: {
    logoLarge: 'بورتاكابين',
    logoSmall: 'توريد وتركيب',
    rights: 'جميع الحقوق محفوظة',
    developedBy: 'تم التطوير بواسطة',
    services: 'الخدمات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    privacy: 'سياسة الخصوصية',
  },
};

export const Footer = ({ locale }: FooterProps) => {
  const c = locale === 'ar' ? copy.ar : copy.en;

  return (
    <footer className="footer" style={{ position: 'static', zIndex: 1, background: '#fff' }}>
      <div className="footer__inner">
        <div className="footer__builder">
          <div data-elementor-type="wp-post" data-elementor-id="728" className="elementor elementor-728">
            <section
              className="elementor-section elementor-top-section elementor-element elementor-element-ccd94eb elementor-section-full_width elementor-section-height-default elementor-section-height-default"
              data-id="ccd94eb"
              data-element_type="section"
            >
              <div className="elementor-container elementor-column-gap-no">
                <div
                  className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-334f82a"
                  data-id="334f82a"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-4d404c7 elementor-widget elementor-widget-larson-footer-logo"
                      data-id="4d404c7"
                      data-element_type="widget"
                      data-widget_type="larson-footer-logo.default"
                    >
                      <div className="elementor-widget-container">
                        <Link to="/" title="Porta Cabins" className="footer__logo logo--borderless logo">
                          <span className="logo__large">
                            <span>{c.logoLarge}</span>
                          </span>
                          <span className="logo__small">
                            <span>{c.logoSmall}</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-db9dc8a"
                  data-id="db9dc8a"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-9352f15 elementor-widget elementor-widget-larson-footer-copyright"
                      data-id="9352f15"
                      data-element_type="widget"
                      data-widget_type="larson-footer-copyright.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="footer__copyright">
                          <div>
                            <p>{c.rights}</p>
                            <p>{c.developedBy}&nbsp;</p>
                            <p>
                              <a href="https://wa.me/923144704840">Asjad Yousaf Khan</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-1aae558"
                  data-id="1aae558"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-4e5ed4a elementor-widget elementor-widget-larson-footer-menu"
                      data-id="4e5ed4a"
                      data-element_type="widget"
                      data-widget_type="larson-footer-menu.default"
                    >
                      <div className="elementor-widget-container">
                        <ul id="menu-footer-menu-1" className="footer__column-menu">
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1419">
                            <Link to="/services">{c.services}</Link>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1899">
                            <Link to="/about">{c.about}</Link>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1900">
                            <Link to="/contact">{c.contact}</Link>
                          </li>
                          <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-1415">
                            <Link to="/privacy-policy" rel="privacy-policy">
                              {c.privacy}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-beca22e"
                  data-id="beca22e"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-e88be73 elementor-widget elementor-widget-larson-footer-social-links"
                      data-id="e88be73"
                      data-element_type="widget"
                      data-widget_type="larson-footer-social-links.default"
                    >
                      <div className="elementor-widget-container">
                        <ul className="footer__social social">
                          <li className="social__item">
                            <a
                              target="_blank"
                              href="https://www.facebook.com/profile.php?id=61581004881100&mibextid=ZbWKwL%20"
                              className="social__link"
                              title="Facebook"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li className="social__item">
                            <a
                              target="_blank"
                              href="https://www.linkedin.com/in/porta-cabins-b50820385"
                              className="social__link"
                              title="LINKEDIN"
                            >
                              <i className="fab fa-linkedin"></i>
                            </a>
                          </li>
                          <li className="social__item">
                            <a
                              target="_blank"
                              href="http://wa.me/966506802316?text=Hello%20I%E2%80%99m%20interested%20in%20your%20services"
                              className="social__link"
                              title="WHATSAPP"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </a>
                          </li>
                          <li className="social__item">
                            <a
                              target="_blank"
                              href="https://www.instagram.com/portacabins39/"
                              className="social__link"
                              title="Instagram"
                            >
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </footer>
  );
};
