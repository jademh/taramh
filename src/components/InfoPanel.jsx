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
          <button className="info-panel_close" type="button" onClick={this.handleClick}>Close</button>
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
