import { siteCopy } from '../../content/siteCopy';

type Props = {
  copy: (typeof siteCopy)['en']['services'];
};

export const ServicesSection = ({ copy }: Props) => (
  <section
    className="elementor-section elementor-top-section elementor-element elementor-element-6a9b44b elementor-section-full_width elementor-section-height-default elementor-section-height-default"
    data-element_type="section"
    data-id="6a9b44b"
  >
    <div className="elementor-container elementor-column-gap-no">
      <div
        className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-1f14f9b"
        data-element_type="column"
        data-id="1f14f9b"
      >
        <div className="elementor-widget-wrap elementor-element-populated">
          <div
            className="elementor-element elementor-element-548a535 elementor-widget elementor-widget-larson-services"
            data-element_type="widget"
            data-id="548a535"
            data-widget_type="larson-services.default"
          >
            <div className="elementor-widget-container">
              <section className="webpage__services-section services-section">
                <div className="services-section__inner container">
                  <div className="row">
                    <div className="services-section__content col-12 col-md-6 order-md-1 ml-auto">
                      <h2 className="services-section__heading heading-small" data-aos="none">
                        <span>Services</span>
                      </h2>
                      <div className="services-section__pseudoheading heading" data-aos="none">
                        <span>{copy.heading}</span>
                      </div>
                      <ul className="services-section__list">
                        {copy.cards.map((card) => (
                          <li className="services-section__item" data-aos="none" key={card.slug}>
                            <a className="services-section__link" href={card.href}>
                              <span>{card.title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-12 col-md-6 col-lg-5">
                      <div className="services-section__image" data-aos="fade">
                        <img
                          src={copy.cards[0]?.image}
                          alt={copy.cards[0]?.alt || 'services image'}
                          width={426}
                          height={573}
                          decoding="async"
                        />
                      </div>
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
