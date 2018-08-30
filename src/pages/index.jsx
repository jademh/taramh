import React from 'react';
import Helmet from 'react-helmet';
import { css } from 'glamor';
import ImageList from '../components/ImageList';
import { theme } from '../theme';

const IndexPage = ({ data }) => {
  const { node } = data.allContentfulHomepage.edges[0];

  // Apply theme if overrides have been entered in CMS
  if (node.backgroundColour !== null) {
    theme.base.colors.background = node.backgroundColour;
  }
  if (node.modalBackgroundColour !== null) {
    theme.base.colors.modalBackground = node.modalBackgroundColour;
  }
  if (node.modalBorderColour !== null) {
    theme.base.colors.modalBorder = node.modalBorderColour;
  }
  if (node.modalCloseIconColour !== null) {
    theme.base.colors.icon = node.modalCloseIconColour;
  }
  if (node.modalCloseIconColourHover !== null) {
    theme.base.colors.iconHover = node.modalCloseIconColourHover;
  }
  if (node.copyColour !== null) {
    theme.base.colors.copy = node.copyColour;
  }
  if (node.copyLinkColour !== null) {
    theme.base.colors.copyLink = node.copyLinkColour;
  }
  if (node.copyLinkColourHover !== null) {
    theme.base.colors.copyLinkHover = node.copyLinkColourHover;
  }
  if (node.navLinkColour !== null) {
    theme.base.colors.navLink = node.navLinkColour;
  }
  if (node.navLinkColourHover !== null) {
    theme.base.colors.navLinkHover = node.navLinkColourHover;
  }

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

  return (
    <div>
      <Helmet
        title={node.pageTitle}
        meta={[
          { name: 'description', content: node.pageDescription.childMarkdownRemark.rawMarkdownBody },
        ]}
      />
      <div {...mainLogoWrap}>
        <img {...mainLogo} src={node.heroImage.sizes.src} alt={node.heroImage.description} />
      </div>
      <ImageList images={node.images} />
    </div>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query pageQuery {
    allContentfulHomepage (
    filter:  {
      node_locale: {eq: "en-US"}
      slug: {eq: "homepage"}
    }
    ) {
      edges {
        node {
          pageTitle
          pageDescription {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
          backgroundColour
          modalBackgroundColour
          modalBorderColour
          modalCloseIconColour
          modalCloseIconColourHover
          copyColour
          copyLinkColour
          copyLinkColourHover
          navLinkColour
          navLinkColourHover
          heroImage {
            description
            sizes(maxWidth: 1912, quality: 100) {
              src
            }
          }
          images {
            id
            description
            resolutions(width: 900, quality: 100, resizingBehavior: NO_CHANGE) {
              src
            }
          }
        }
      }
    }
}`;
