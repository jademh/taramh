import React from 'react';
import Helmet from 'react-helmet';
import Homepage from '../components/Homepage';
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

  return (
    <div>
      <Helmet
        title={node.pageTitle}
        meta={[
          { name: 'description', content: node.pageDescription.childMarkdownRemark.rawMarkdownBody },
        ]}
      />
      <Homepage
        heroImageSrc={node.heroImage.sizes.src}
        heroImageDescription={node.heroImage.description}
        imageList={node.imageList}
      />
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
          imageList {
            title
            longDescription {
              childMarkdownRemark {
                html
              }
            }
            media {
              id
              description
              resolutions(width: 900, quality: 100, resizingBehavior: NO_CHANGE) {
                src
              }
            }
          }
        }
      }
    }
}`;
