import React, { Component } from 'react';
import { css, media } from 'glamor';
import { theme } from '../theme';
import helpCursor from '../cursors/help.png';

class ImageList extends Component {
  constructor(props) {
    super();
    this.state = {
      title: null,
      description: null,
      id: null,
    };

    this.handleClick = (id, title, description) => {
      if (description === null || id === this.state.id) {
        this.closeDescriptionPanel();
      } else if (id !== this.state.id) {
        if (this.props.descriptionPanelActive) {
          this.closeDescriptionPanel();
          setTimeout(() => {
            this.openDescriptionPanel(id, title, description);
          }, theme.imageInfoPanel.transitionTime);
        } else {
          this.openDescriptionPanel(id, title, description);
        }
      }
    };

    this.handleCloseButtonClick = () => {
      this.closeDescriptionPanel();
    };

    this.openDescriptionPanel = (id, title, description) => {
      this.setState({ id, title, description });
      this.props.onDescriptionPanelChange(true);
      document.addEventListener('keydown', this.handleKeyPress, false);
    };
    this.closeDescriptionPanel = () => {
      this.setState({ id: null, title: null, description: null });
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
      margin: '102vh 0 0 0',
      padding: 0,
      zIndex: 2,
      position: 'relative',
      listStyle: 'none',
    },
    media(`(max-width: ${theme.breakpoints.mobile})`, {
      marginTop: '45vh',
    }));

    const imageListItem = css({
      margin: '20vh 0',
      textAlign: 'center',
      '&:nth-child(even) img': {
        transform: 'rotate(1deg)',
      },
    },
    media(`(max-width: ${theme.breakpoints.mobile})`, {
      margin: '10vh 0',
    }),
    media(`(min-width: ${theme.breakpoints.mobile})`, {
      '&.left-s': {
        padding: '0 0 0 40px',
      },
      '&.left-m': {
        padding: '0 0 0 60px',
      },
      '&.left-l': {
        padding: '0 0 0 80px',
      },
      '&.right-s': {
        padding: '0 40px 0 0',
      },
      '&.right-m': {
        padding: '0 60px 0 0',
      },
      '&.right-l': {
        padding: '0 80px 0 0',
      },
    }));

    const imageListImage = css({
      maxWidth: '90%',
      height: 'auto',
      maxHeight: '90vh',
      transform: 'rotate(-1deg)',
      '&.has-description': {
        cursor: `url("${helpCursor}"), help`,
      },
    },
    media(`(min-width: ${theme.breakpoints.mobile})`, {
      '&.s': {
        maxHeight: '70vh',
      },
      '&.m': {
        maxHeight: '90vh',
      },
      '&.l': {
        maxHeight: '120vh',
      },
      '&.xl': {
        maxHeight: '150vh',
      },
    }));

    const descriptionPanel = css({
      position: 'fixed',
      background: theme.base.colors.modalBackground,
      borderRight: `5px solid ${theme.base.colors.modalBorder}`,
      height: '100%',
      top: 0,
      left: `-${theme.imageInfoPanel.width}`,
      width: theme.imageInfoPanel.width,
      padding: '0 20px',
      overflowY: 'auto',
      zIndex: 6,
      transition: `all ${theme.imageInfoPanel.transitionTime}ms ease-in-out`,
      '&.st-active': {
        left: 0,
      },
    },
    media(`(max-width: ${theme.breakpoints.mobile})`, {
      width: '100%',
      left: '-100%',
    }));

    const descriptionPanelTitle = css({
      paddingRight: '30px',
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
      width: '36px',
      padding: 0,
      marginTop: '-4px',
      '& svg': {
        width: '100%',
      },
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
            <li {...imageListItem} className={image.imageOffset} key={image.media.id}>
              <img {...imageListImage} className={`${image.longDescription !== null ? 'has-description' : ''} ${image.imageHeight}`} onClick={() => this.handleClick(image.media.id, image.title, image.longDescription)} src={image.media.resolutions.src} alt={image.media.description} />
              {image.longDescription !== null &&
                <div {...imageListDescription} dangerouslySetInnerHTML={{ __html: image.longDescription.childMarkdownRemark.html }} />
              }
            </li>
          ))}
        </ul>
        <div {...descriptionPanel} className={descriptionPanelActive ? 'st-active' : ''}>
          <h2 {...descriptionPanelTitle}>{title}</h2>
          {description !== null &&
            <div dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
          }
          <button {...infoPanelClose} type="button" onClick={this.handleCloseButtonClick}>
            <svg viewBox="0 0 48 48" width="48" height="48" version="1.1"
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
