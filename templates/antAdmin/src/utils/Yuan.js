import React from 'react';

/**
 * 减少使用 dangerouslySetInnerHTML
 */
export default class Yuan extends React.PureComponent {
  componentDidMount() {
    this.rendertoHtml();
  }

  componentDidUpdate() {
    this.rendertoHtml();
  }

  rendertoHtml = () => {
    // const { children } = this.props;
    // if (this.main) {
    //   this.main.innerHTML = yuan(children);
    // }
  };

  render() {
    return (
      <span
        ref={ref => {
          this.main = ref;
        }}
      />
    );
  }
}
