import React, { Component } from 'react';
import Module from './Module';

class InfoPanel extends Component {
  constructor(props) {
    super();
    this.state = {
      active: false,
    };

    this.handleClick = () => {
      const { active } = this.state;
      this.setState({ active: !active });
    };
  }

  render() {
    const {
      title,
      contentModules,
    } = this.props.node;
    const {
      ctaClass,
    } = this.props;
    const { active } = this.state;
    return (
      <div className="info-panel">
        <button className={ctaClass !== '' ? ctaClass : 'info-panel_cta'} type="button" onClick={this.handleClick}>{title}</button>
        <div className={`info-panel_panel ${active ? 'st-active' : ''}`}>
          <button className="info-panel_close" type="button" onClick={this.handleClick}>
            <svg width="48" height="48" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <path fill="red" d="M 36.019531 8.445313 L 39.558594 11.980469 L 11.980469 39.554688 L 8.445313 36.019531 Z "/>
                <path fill="red" d="M 39.554688 36.023438 L 36.019531 39.558594 L 8.445313 11.976563 L 11.980469 8.441406 Z "/>
            </svg>
          </button>
          <div className="info-panel_panel-content">
            <h1>{title}</h1>
            {contentModules ? contentModules.map(edge => <Module key={edge.id} props={edge} />) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPanel;
