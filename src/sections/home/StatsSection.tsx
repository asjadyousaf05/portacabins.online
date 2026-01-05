type Stat = { value: string; lines: string[] };

type Props = {
  stats: Stat[];
};

export const StatsSection = ({ stats }: Props) => (
  <section
    className="elementor-section elementor-top-section elementor-element elementor-element-01e89ea elementor-section-full_width elementor-section-height-default elementor-section-height-default"
    data-element_type="section"
    data-id="01e89ea"
  >
    <div className="elementor-container elementor-column-gap-no">
      <div
        className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-b1851b6"
        data-element_type="column"
        data-id="b1851b6"
      >
        <div className="elementor-widget-wrap elementor-element-populated">
          <div
            className="elementor-element elementor-element-1627aba elementor-widget elementor-widget-larson-numbers"
            data-element_type="widget"
            data-id="1627aba"
            data-widget_type="larson-numbers.default"
          >
            <div className="elementor-widget-container">
              <div className="webpage__statistics statistics" data-aos="none">
                <div className="container">
                  <div className="row">
                    {stats.map((stat, idx) => (
                      <div className="statistics__item col-12 col-sm" key={idx}>
                        <div className="statistics__item-value">
                          <span className="__js_number" data-end-value={stat.value.replace(/\D/g, '') || stat.value}>
                            {stat.value}
                          </span>
                        </div>
                        <div className="statistics__item-text">
                          <span>
                            {stat.lines.map((line, lineIdx) => (
                              <span key={lineIdx}>
                                {line}
                                {lineIdx < stat.lines.length - 1 && <br />}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
