type MobileCanvasProps = {
  locale: 'en' | 'ar';
};

const copy = {
  en: {
    close: 'Close menu',
    phone: '+966506802316',
    copyright: (
      <>
        Ac 2021 <strong>PORTACABINS.</strong> All Rights Reserved.
        <br />
        Development by{' '}
        <a href="https://wa.me/923144704840">
          <strong>ASJAD YOUSAF KHAN</strong>
        </a>
      </>
    ),
  },
  
  
ar: {
  close: 'إغلاق القائمة',
  phone: '+966506802316',
  copyright: (
    <>
      © 2021 <strong>بورتاكابين.</strong> جميع الحقوق محفوظة.
      <br />
      تم التطوير بواسطة{' '}
      <a href="https://wa.me/923144704840">
        <strong>ASJAD YOUSAF KHAN</strong>
      </a>
    </>
  ),
},


};

export const MobileCanvas = ({ locale }: MobileCanvasProps) => {
  const c = locale === 'ar' ? copy.ar : copy.en;

  return (
    <div className="mobile-canvas __js_mobile-canvas">
      <button className="mobile-canvas__close" type="button">
        <svg width="24" height="24">
          <use xlinkHref="#close"></use>
        </svg>
        <span className="visually-hidden">{c.close}</span>
      </button>

      <nav className="mobile-canvas__nav mobile-canvas__nav-h navigation"></nav>

      <div className="mobile-canvas__bottom">
        <a className="mobile-canvas__phone" href="https://wa.me/966506802316">
          {c.phone}
        </a>

        <div className="mobile-canvas__copy">
          <p>{c.copyright}</p>
        </div>

        <ul className="mobile-canvas__social social">
          <li className="social__item">
            <a
              className="social__link"
              href="https://www.facebook.com/profile.php?id=61581004881100&mibextid=ZbWKwL%20"
              target="_blank"
              title="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li className="social__item">
            <a
              className="social__link"
              href="https://www.linkedin.com/in/porta-cabins-b50820385"
              target="_blank"
              title="LINKEDIN"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
          <li className="social__item">
            <a
              className="social__link"
              href="http://wa.me/966506802316?text=Hello%20I%E2%80%99m%20interested%20in%20your%20services"
              target="_blank"
              title="WHATSAPP"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </li>
          <li className="social__item">
            <a
              className="social__link"
              href="https://www.instagram.com/portacabins39/"
              target="_blank"
              title="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
