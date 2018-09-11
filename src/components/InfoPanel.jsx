import React, { Component } from 'react';
import { css } from 'glamor';
import Module from './Module';
import { theme } from '../theme';

class InfoPanel extends Component {
  constructor(props) {
    super();
    this.state = {
      active: false,
    };

    this.handleClick = () => {
      if (this.state.active) {
        this.closePanel();
      }
      else {
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
      this.setState({ active: true });
      document.addEventListener('keydown', this.handleKeyPress, false);
    }

    this.closePanel = () => {
      this.setState({ active: false });
      document.removeEventListener('keydown', this.handleKeyPress, false);
    };
  }

  render() {
    const {
      title,
      contentModules,
    } = this.props.node;
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
      transition: 'margin 300ms ease-in-out',
      display: 'flex',
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
        <div {...infoPanel}>
          <button {...infoPanelClose} type="button" onClick={this.handleClick}>
            <svg width="48" height="48" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <path fill={theme.base.colors.icon} d="M 36.019531 8.445313 L 39.558594 11.980469 L 11.980469 39.554688 L 8.445313 36.019531 Z "/>
                <path fill={theme.base.colors.icon} d="M 39.554688 36.023438 L 36.019531 39.558594 L 8.445313 11.976563 L 11.980469 8.441406 Z "/>
            </svg>
          </button>
          <div {...infoPanelContent}>
            <h1 {...infoPanelTitle}>{title}</h1>
            {contentModules ? contentModules.map(edge => <Module key={edge.id} props={edge} />) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPanel;
