/**
 * Internal dependencies
 */
import icons from "./icons";
import RbeaRangeControl from "../rbea-range-control";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { Component, Fragment } from "@wordpress/element";
import { RangeControl, TabPanel } from "@wordpress/components";

class ResponsiveTabsControl extends Component {
  constructor() {
    super(...arguments);
    this.setGutterTo = this.setGutterTo.bind(this);
    this.setGutterMobileTo = this.setGutterMobileTo.bind(this);
  }

  setGutterTo(value) {
    this.props.setAttributes({ gutter: value });
  }

  setGutterMobileTo(value) {
    this.props.setAttributes({ gutterMobile: value });
  }

  render() {
    const {
      attributes,
      label = __("Gutter", "responsive-block-editor-addons"),
      max = 50,
      min = 0,
      onChange = this.setGutterTo,
      onChangeMobile = this.setGutterMobileTo,
      step = 5,
    } = this.props;

    return (
      <Fragment>
        <TabPanel
          className="components-base-control components-responsive-block-editor-addons-responsive__tabs"
          activeClass="is-primary"
          initialTabName="desk"
          tabs={[
            {
              name: "desk",
              title: icons.desktopChrome,
              className:
                "components-responsive-block-editor-addons-responsive__tabs-item components-responsive-block-editor-addons-responsive__tabs-item--desktop components-button is-button is-default is-secondary",
            },
            {
              name: "mobile",
              title: icons.mobile,
              className:
                "components-responsive-block-editor-addons-responsive__tabs-item components-responsive-block-editor-addons-responsive__tabs-item--mobile components-button is-button is-default is-secondary",
            },
          ]}
        >
          {(tab) => {
            if ("mobile" === tab.name) {
              return (
                <RbeaRangeControl
                  label={sprintf(
                    /* translators: %s: values associated with CSS syntax, 'Width', 'Gutter', 'Height in pixels', 'Width' */
                    __("Mobile %s", "responsive-block-editor-addons"),
                    label
                  )}
                  value={attributes.gutterMobile}
                  onChange={(valueMobile) => onChangeMobile(valueMobile)}
                  min={min}
                  max={max}
                  step={step}
                />
              );
            }
            return (
              <RbeaRangeControl
                label={label}
                value={attributes.gutter}
                onChange={(value) => onChange(value)}
                min={min}
                max={max}
                step={step}
              />
            );
          }}
        </TabPanel>
      </Fragment>
    );
  }
}

export default ResponsiveTabsControl;
