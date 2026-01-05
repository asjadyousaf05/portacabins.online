import { siteCopy } from '../../content/siteCopy';

type Props = {
  copy: (typeof siteCopy)['en']['about'];
};

export const AboutSection = ({ copy }: Props) => (
  <section
    className="elementor-section elementor-top-section elementor-element elementor-element-cc-about elementor-section-full_width elementor-section-height-default elementor-section-height-default"
    data-element_type="section"
    data-id="cc-about"
  >
    <div className="elementor-container elementor-column-gap-no">
      <div
        className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-cc-about-col"
        data-element_type="column"
        data-id="cc-about-col"
      >
        <div className="elementor-widget-wrap elementor-element-populated">
          <div
            className="elementor-element elementor-element-cc-about-widget elementor-widget elementor-widget-larson-about-description"
            data-element_type="widget"
            data-id="cc-about-widget"
            data-widget_type="larson-about-description.default"
          >
            <div className="elementor-widget-container">
              <section className="webpage__about-block about-block about-block--columns">
                <div className="about-block__inner container">
                  <header className="about-block__header" data-aos="none">
                    <h2 className="about-block__heading heading">
                      <span>{copy.heading}</span>
                    </h2>
                    <div className="about-block__pseudoheading heading">
                      <span>{copy.tagline}</span>
                    </div>
                  </header>
                  <div className="about-block__main">
                    <div className="about-block__text" data-aos="none">
                      <div>
                        <p>{copy.body}</p>
                      </div>
                      {copy.ctas && copy.ctas.length > 0 && (
                        <div style={{ marginTop: '20px' }}>
                          {copy.ctas.map((cta) => (
                            <a key={cta.href} className="btn" href={cta.href} style={{ marginRight: '10px' }}>
                              {cta.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
