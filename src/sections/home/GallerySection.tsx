import { siteCopy } from '../../content/siteCopy';

type Props = {
  copy: NonNullable<(typeof siteCopy)['en']['galleryPreview']>;
};

export const GallerySection = ({ copy }: Props) => (
  <div className="e-con-inner">
    <div
      className="elementor-element elementor-element-0d91d12 elementor-widget__width-initial elementor-widget elementor-widget-larson-about-description"
      data-id="0d91d12"
      data-element_type="widget"
      data-widget_type="larson-about-description.default"
    >
      <div className="elementor-widget-container">
        <section className="webpage__about-block about-block about-block--columns">
          <div className="about-block__inner container">
            <header className="about-block__header" data-aos="none">
              <h2 className="about-block__heading heading">
                <span>{copy.heading.toUpperCase()}</span>
              </h2>
            </header>
          </div>
        </section>
      </div>
    </div>
    <div
      className="elementor-element elementor-element-f24bf8e elementor-widget elementor-widget-larson-projects-gallery-grid"
      data-element_type="widget"
      data-id="f24bf8e"
      data-widget_type="larson-projects-gallery-grid.default"
    >
      <div className="elementor-widget-container">
        <div className="article__project-images container">
          <ul className="row project-images-grid __js_images-grid" data-aos="none">
            <li className="grid-sizer" />
            {copy.items.map((item, idx) => (
              <li
                className="project-images-item project-images-item__default col-12 col-md-4 __js_masonry-item"
                key={`${item.src}-${idx}`}
              >
                <a
                  data-elementor-lightbox-slideshow="gallery-grid"
                  data-elementor-lightbox-title={item.alt || 'PORTABLE CABIN'}
                  href={item.src}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                </a>
              </li>
            ))}
          </ul>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a className="btn" href={copy.viewAllHref || '/gallery'}>
              {copy.viewAllHref ? 'View full gallery' : 'View gallery'}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
