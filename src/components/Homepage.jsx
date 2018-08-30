import React, { Component } from 'react';
import { css } from 'glamor';
import ImageList from './ImageList';
import { theme } from '../theme';

class Homepage extends Component {
  constructor(props) {
    super();
    this.state = {
      descriptionPanelActive: false,
    };
    this.handleDescriptionPanelChange = (descriptionPanelActive) => {
      this.setState({ descriptionPanelActive });
    };
  }

  render() {
    const {
      heroImageSrc,
      heroImageDescription,
      imageList,
    } = this.props;
    
    const logoMargin = 30;
    const mainLogoWrap = css({
      background: theme.base.colors.background,
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '100vh',
      zIndex: 1,
    });
    const mainLogo = css({
      maxWidth: `calc(100% - ${logoMargin * 2}px)`,
      maxHeight: `calc(100vh - ${logoMargin * 2}px)`,
      margin: `${logoMargin}px`,
    });

    const pageWrapper = css({
      transition: '300ms padding ease-in-out',
      '@media only screen and (min-width: 45em)': {
        '&.st-description-panel-open': {
          paddingLeft: '400px',
        },
      },
    });

    return (
      <div {...pageWrapper} className={this.state.descriptionPanelActive ? 'st-description-panel-open' : ''}>
        <div {...mainLogoWrap}>
          <img {...mainLogo} src={heroImageSrc} alt={heroImageDescription} />
        </div>
        <ImageList images={imageList} descriptionPanelActive={this.state.descriptionPanelActive} onDescriptionPanelChange={this.handleDescriptionPanelChange} />
      </div>
    );
  }
}

export default Homepage;
