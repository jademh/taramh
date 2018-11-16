import React, { Component } from 'react';
import { css, media } from 'glamor';
import theme from '../theme';
import helpCursor from '../cursors/help.png';
import trackEvent from '../tracking';

class ImageList extends Component {
  constructor() {
    super();
    this.state = {
      activeTitle: null,
      activeDescription: null,
      activeId: null,
    };

    this.handleClick = (id, title, description) => {
      const { activeId } = this.state;
      const { descriptionPanelActive } = this.props;
      if (description === null || id === activeId) {
        this.closeDescriptionPanel();
      } else if (id !== activeId) {
        if (descriptionPanelActive) {
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

    this.openDescriptionPanel = (activeId, activeTitle, activeDescription) => {
      const { onDescriptionPanelChange } = this.props;
      this.setState({ activeId, activeTitle, activeDescription });
      onDescriptionPanelChange(true);
      trackEvent('Portfolio Image', 'Click', activeTitle);
      document.addEventListener('keydown', this.handleKeyPress, false);
    };

    this.closeDescriptionPanel = () => {
      const { onDescriptionPanelChange } = this.props;
      onDescriptionPanelChange(false);
      document.removeEventListener('keydown', this.handleKeyPress, false);
      // Don't remove the description text until the transition has finished
      setTimeout(() => {
        this.setState({ activeId: null, activeTitle: null, activeDescription: null });
      }, theme.imageInfoPanel.transitionTime);
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
      activeDescription,
      activeTitle,
    } = this.state;

    const imageList = css({
      margin: '102vh 0 0 0',
      padding: 0,
      zIndex: 2,
      position: 'relative',
      listStyle: 'none',
      '& li:nth-child(even) button:first-child, & li:nth-child(even) div:first-child': {
        transform: 'rotate(1deg)',
      },
    },
    media(`(max-width: ${theme.breakpoints.mobile})`, {
      marginTop: '45vh',
    }));

    const imageListItem = css({
      margin: '20vh 0',
      textAlign: 'center',
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

    const clickableImageListImageWrap = css({
      cursor: `url("${helpCursor}"), help`,
    });

    const imageListImageWrap = css({
      display: 'inline-block', // sometimes the wrapper is a button, so it needs to be a block element
      background: 'none',
      border: 0,
      padding: 0,
      transform: 'rotate(-1deg)',
      maxWidth: '90%',
    });

    const imageListImage = css({
      height: 'auto',
      maxHeight: '90vh',
      maxWidth: '100%',
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
      left: descriptionPanelActive ? '0' : `-${theme.imageInfoPanel.width}`,
      visibility: descriptionPanelActive ? 'visible' : 'hidden',
      width: theme.imageInfoPanel.width,
      padding: '0 20px',
      overflowY: 'auto',
      zIndex: 6,
      transition: `all ${theme.imageInfoPanel.transitionTime}ms ease-in-out`,
    },
    media(`(max-width: ${theme.breakpoints.mobile})`, {
      width: '100%',
      left: descriptionPanelActive ? '0' : '-100%',
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

    function LongDescription(props) {
      const { description } = props;
      if (description !== null) {
        return (
          <div
            {...imageListDescription}
            dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }}
          />
        );
      }
      return null;
    }

    function Image(props) {
      const {
        src,
        description,
        height,
      } = props;
      return (
        <img
          {...imageListImage}
          className={height}
          src={src}
          alt={description}
        />
      );
    }

    function ImageWrap(props) {
      const {
        longDescription,
        id,
        title,
        handleClick,
      } = props;
      if (longDescription !== null) {
        return (
          <button
            {...imageListImageWrap}
            {...clickableImageListImageWrap}
            type="button"
            onClick={() => handleClick(id, title, longDescription)}
          >
            <Image {...props} />
          </button>
        );
      }
      return (
        <div
          {...imageListImageWrap}
        >
          <Image {...props} />
        </div>
      );
    }

    function DescriptionPanel(props) {
      const {
        title,
        description,
      } = props;
      if (description !== null) {
        return (
          <div>
            <h2 {...descriptionPanelTitle}>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
          </div>
        );
      }
      return null;
    }

    return (
      <div>
        <ul {...imageList}>
          {images.map(image => (
            <li {...imageListItem} className={image.imageOffset} key={image.media.id}>
              <ImageWrap
                longDescription={image.longDescription}
                id={image.media.id}
                title={image.title}
                height={image.imageHeight}
                src={image.media.fixed.src}
                description={image.media.description}
                handleClick={this.handleClick}
              />
              <LongDescription description={image.longDescription} />
            </li>
          ))}
        </ul>
        <div
          {...descriptionPanel}
          aria-hidden={!descriptionPanelActive}
        >
          <DescriptionPanel title={activeTitle} description={activeDescription} />
          <button
            {...infoPanelClose}
            type="button"
            aria-label="Close image info panel"
            onClick={this.handleCloseButtonClick}
          >
            <svg
              viewBox="0 0 48 48"
              width="48"
              height="48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill={theme.base.colors.icon} d="M 36.019531 8.445313 L 39.558594 11.980469 L 11.980469 39.554688 L 8.445313 36.019531 Z " />
              <path fill={theme.base.colors.icon} d="M 39.554688 36.023438 L 36.019531 39.558594 L 8.445313 11.976563 L 11.980469 8.441406 Z " />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default ImageList;
