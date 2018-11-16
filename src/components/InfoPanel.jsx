import React, { Component } from 'react';
import { css } from 'glamor';
import Module from './Module';
import theme from '../theme';
import trackEvent from '../tracking';

class InfoPanel extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };

    this.handleClick = () => {
      const { active } = this.state;
      if (active) {
        this.closePanel();
      } else {
        this.openPanel();
      }
    };

    this.handleKeyPress = (event) => {
      // ESC key closes panel
      if (event.keyCode === 27) {
        this.closePanel();
      }
    };

    this.openPanel = () => {
      const { node } = this.props;
      this.setState({ active: true });
      trackEvent('Footer Info Link', 'Click', node.title);
      document.addEventListener('keydown', this.handleKeyPress, false);
    };

    this.closePanel = () => {
      this.setState({ active: false });
      document.removeEventListener('keydown', this.handleKeyPress, false);
    };
  }

  render() {
    const { node } = this.props;
    const {
      title,
      contentModules,
    } = node;
    const { active } = this.state;

    const infoPanelCta = css({
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: theme.base.colors.navLink,
      fontSize: theme.nav.fontSize,
      /* might be a button, not always an <a> */
      background: 'none',
      border: 0,
      cursor: 'pointer',
      transition: 'color 300ms ease-in-out',
      ':hover': {
        color: theme.base.colors.navLinkHover,
      },
    });

    const infoPanel = css({
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: theme.base.colors.modalBackground,
      borderTop: `5px solid ${theme.base.colors.modalBorder}`,
      width: '100%',
      height: '100vh',
      marginTop: active ? '0' : '100vh',
      display: 'flex',
      visibility: active ? 'visible' : 'hidden',
      transition: 'all 300ms ease-in-out',
      alignItems: 'center',
      color: theme.base.colors.modalCopy,
    });

    const infoPanelTitle = css({
      textAlign: 'center',
    });

    const infoPanelClose = css({
      background: 'none',
      border: 0,
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
      '& svg path': {
        transition: 'fill 300ms ease-in-out',
      },
      ':hover svg path': {
        fill: theme.base.colors.iconHover,
      },
    });

    const infoPanelContent = css({
      width: '80%',
      margin: '0 auto',
      maxWidth: '26em',
    });

    return (
      <div>
        <button {...infoPanelCta} type="button" onClick={this.handleClick}>{title}</button>
        <div
          {...infoPanel}
          aria-hidden={!active}
        >
          <button {...infoPanelClose} type="button" onClick={this.handleClick} aria-label={`Close ${title} Panel`}>
            <svg
              width="48"
              height="48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill={theme.base.colors.icon} d="M 36.019531 8.445313 L 39.558594 11.980469 L 11.980469 39.554688 L 8.445313 36.019531 Z " />
              <path fill={theme.base.colors.icon} d="M 39.554688 36.023438 L 36.019531 39.558594 L 8.445313 11.976563 L 11.980469 8.441406 Z " />
            </svg>
          </button>
          <div {...infoPanelContent}>
            <h1 {...infoPanelTitle}>{title}</h1>
            {contentModules && contentModules.map(edge => <Module key={edge.id} props={edge} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPanel;
