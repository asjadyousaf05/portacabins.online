import { useState } from 'react';

export const FloatingMenu = () => {
  const [open, setOpen] = useState(false);

  const items = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/966506802316?text=Hello%20I%20am%20interested%20in%20your%20services',
      iconClass: 'fab fa-whatsapp',
      iconStyle: 'fab-menu__icon fab-menu__icon--whatsapp',
    },
    {
      label: 'Call',
      href: 'tel:+966506802316',
      iconClass: 'fas fa-phone',
      iconStyle: 'fab-menu__icon fab-menu__icon--call',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/portacabins39/',
      iconClass: 'fab fa-instagram',
      iconStyle: 'fab-menu__icon fab-menu__icon--instagram',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61581004881100&mibextid=ZbWKwL',
      iconClass: 'fab fa-facebook-f',
      iconStyle: 'fab-menu__icon fab-menu__icon--facebook',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/porta-cabins-b50820385',
      iconClass: 'fab fa-linkedin-in',
      iconStyle: 'fab-menu__icon fab-menu__icon--linkedin',
    },
  ];

  return (
    <div className="fab-menu">
      {open && (
        <ul className="fab-menu__list">
          {items.map((item) => (
            <li key={item.label} className="fab-menu__item">
              <a
                className="fab-menu__link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                title={item.label}
                aria-label={item.label}
              >
                <span className={item.iconStyle}>
                  <i className={item.iconClass}></i>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="fab-menu__toggle"
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <i className="fas fa-times"></i> : <i className="fas fa-phone"></i>}
      </button>
    </div>
  );
};
