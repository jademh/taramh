import React, { Component } from 'react';
import { css } from 'glamor';
import { theme } from '../theme';

class ImageList extends Component {
  constructor(props) {
    super();
    this.state = {
      title: null,
      description: null,
    };

    this.handleClick = (title, description) => {
      if (description === null) {
        this.closeDescriptionPanel();
      } else if(title !== this.state.title && description !== this.state.description) {
        if (this.props.descriptionPanelActive) {
          this.closeDescriptionPanel();
          setTimeout(() => {
            this.setState({ title, description });
            this.openDescriptionPanel();
          }, 300);
        } else {
          this.setState({ title, description });
          this.openDescriptionPanel();
        }
      }
    };

    this.handleCloseButtonClick = () => {
      this.closeDescriptionPanel();
    };

    this.openDescriptionPanel = () => {
      this.props.onDescriptionPanelChange(true);
      document.addEventListener('keydown', this.handleKeyPress, false);
    };
    this.closeDescriptionPanel = () => {
      this.props.onDescriptionPanelChange(false);
      document.removeEventListener('keydown', this.handleKeyPress, false);
      this.setState({ title: null, description: null });
    };

    this.handleKeyPress = (event) => {
      // ESC key closes panel
      if (event.keyCode === 27) {
        this.closeDescriptionPanel();
      }
    };
  }

  render() {
    const {
      images,
      descriptionPanelActive,
    } = this.props;

    const {
      description,
      title,
    } = this.state;

    const imageList = css({
      margin: '100vh 0 0 0',
      padding: 0,
      zIndex: 2,
      position: 'relative',
      listStyle: 'none',
      '@media only screen and (max-width: 45em)': {
        marginTop: '50vh',
      },
    });

    const imageListItem = css({
      margin: '10vh 0',
      textAlign: 'center',
      '&:nth-child(even) img': {
        transform: 'rotate(1deg)',
      },
    });

    const imageListImage = css({
      maxWidth: '90%',
      height: 'auto',
      maxHeight: '90vh',
      transform: 'rotate(-1deg)',
      '&.has-description': {
        cursor: 'help',
      },
    });

    const descriptionPanel = css({
      position: 'fixed',
      background: theme.base.colors.modalBackground,
      borderRight: `5px solid ${theme.base.colors.modalBorder}`,
      height: '100%',
      top: 0,
      left: '-400px',
      width: '400px',
      padding: '0 20px',
      overflowY: 'auto',
      zIndex: 6,
      transition: 'all 300ms ease-in-out',
      '@media only screen and (max-width: 45em)': {
        width: '100%',
        left: '-100%',
      },
      '&.st-active': {
        left: 0,
      },
    });

    // todo - hide this properly (accessibility)
    const imageListDescription = css({
      display: 'none',
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

    return (
      <div>
        <ul {...imageList}>
          {images.map(image => (
            <li {...imageListItem} key={image.media.id}>
              <img {...imageListImage} className={image.longDescription !== null ? 'has-description' : ''} onClick={() => this.handleClick(image.title, image.longDescription)} src={image.media.resolutions.src} alt={image.media.description} />
              {image.longDescription !== null &&
                <div {...imageListDescription} dangerouslySetInnerHTML={{ __html: image.longDescription.childMarkdownRemark.html }} />
              }
            </li>
          ))}
        </ul>
        <div {...descriptionPanel} className={descriptionPanelActive ? 'st-active' : ''}>
          <h2>{title}</h2>
          {description !== null &&
            <div dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
          }
          <button {...infoPanelClose} type="button" onClick={this.handleCloseButtonClick}>
            <svg width="48" height="48" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <path fill={theme.base.colors.icon} d="M 36.019531 8.445313 L 39.558594 11.980469 L 11.980469 39.554688 L 8.445313 36.019531 Z "/>
                <path fill={theme.base.colors.icon} d="M 39.554688 36.023438 L 36.019531 39.558594 L 8.445313 11.976563 L 11.980469 8.441406 Z "/>
            </svg>
          </button>
        </div>
      </div>
    );
  }
};

export default ImageList;
