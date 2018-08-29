import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { css } from 'glamor';
import InfoPanel from '../components/InfoPanel';
import { theme } from '../theme';

import './index.css';

const Layout = ({ children, data }) => {

  css.global('body', { background: theme.base.colors.background, color: theme.base.colors.copy });
  css.global('p a', { color: theme.base.colors.copyLink });
  css.global('p a:hover', { color: theme.base.colors.copyLinkHover });

  const nav = css({
    position: 'fixed',
    bottom: '10px',
    marginLeft: '30px',
    zIndex: 5,
    '@media only screen and (max-width: 45em)': {
      top: '5px',
      bottom: 'auto',
    },
  });
  const navList = css({
    listStyle: 'none',
    margin: 0,
    padding: 0,
  });
  const navListItem = css({
    display: 'inline-block',
    marginRight: '20px',
  });

  return (
    <div>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
        ]}
      />
      <div>
        <nav {...nav}>
          <ul {...navList}>
            {data.allContentfulInfoPage.edges.map(edge => (
              <li {...navListItem} key={edge.node.id}>
                <InfoPanel node={edge.node} />
              </li>
            ))}
          </ul>
        </nav>
        {children()}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        description
      }
  }
  allContentfulInfoPage (
    filter:  {
      node_locale: {eq: "en-US"}
    }
    sort: { fields: [title], order: ASC }
    ) {
      edges {
        node {
          id
          title
          slug
          contentModules {
            __typename 
              ... on ContentfulButton {
                id
                buttonLink
                buttonText
                openInANewWindow
                buttonStyle
                buttonAlignment
              }
              ... on ContentfulText {
                id
                subtitle
                hideSubtitle
                text {
                  childMarkdownRemark {
                    html
                  }
                }
              }
            }
          }
        }
      }
    }
`;
