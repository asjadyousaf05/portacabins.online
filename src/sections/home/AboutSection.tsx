import { siteCopy } from '../../content/siteCopy';

type Props = {
  copy: (typeof siteCopy)['en']['about'];
};

export const AboutSection = ({ copy }: Props) => (
  <section
    className="about-section-enhanced"
    data-element_type="section"
    data-id="cc-about"
  >
    <div className="about-section__container">
      <div className="about-section__content-wrapper">
        {/* Image Column */}
        <div className="about-section__image-column">
          <div className="about-section__image-wrapper">
            <img
              src="/wp-content/uploads/2025/09/PORTACABIN9.webp"
              alt="Portable cabin showcase"
              className="about-section__image"
              loading="lazy"
            />
            <div className="about-section__image-overlay"></div>
          </div>
        </div>

        {/* Content Column */}
        <div className="about-section__text-column">
          <div className="about-section__content">
            <h2 className="about-section__heading">
              <span className="about-section__heading-small">{copy.heading}</span>
            </h2>
            <div className="about-section__tagline">
              <span>{copy.tagline}</span>
            </div>
            <p className="about-section__description">{copy.body}</p>

            {/* Feature Highlights */}
            <div className="about-section__features">
              <div className="about-section__feature">
                <svg className="about-section__feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>20+ Years Experience</span>
              </div>
              <div className="about-section__feature">
                <svg className="about-section__feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Quality Guaranteed</span>
              </div>
              <div className="about-section__feature">
                <svg className="about-section__feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Fast Delivery</span>
              </div>
              <div className="about-section__feature">
                <svg className="about-section__feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Custom Solutions</span>
              </div>
            </div>

            {/* CTA Buttons */}
            {copy.ctas && copy.ctas.length > 0 && (
              <div className="about-section__cta-wrapper">
                {copy.ctas.map((cta) => (
                  <a key={cta.href} className="about-section__cta-btn" href={cta.href}>
                    {cta.label}
                    <svg className="about-section__cta-arrow" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);
