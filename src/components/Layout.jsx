import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { css, media } from 'glamor';
import InfoPanel from './InfoPanel';
import theme from '../theme';
import '../fonts/AUTHENTIC-Sans.woff';
import '../fonts/AUTHENTIC-Sans.woff2';
import '../fonts/Buffon-Thin.woff';
import '../fonts/Buffon-Thin.woff2';
import '../index.css';
import icon32 from '../favicon.png';


const Layout = ({ children }) => {
  css.global('body', { background: theme.base.colors.background, color: theme.base.colors.copy });
  css.global('p a', { color: theme.base.colors.copyLink });
  css.global('p a:hover', { color: theme.base.colors.copyLinkHover });

  const nav = css({
    position: 'fixed',
    bottom: '10px',
    right: '15px',
    zIndex: 5,
  },
  media(`(max-width: ${theme.breakpoints.mobile})`, {
    top: '0',
    width: '100%',
    left: '0',
    bottom: 'auto',
    textAlign: 'center',
    padding: '5px 0 2px 0',
    background: theme.base.colors.background,
    borderBottom: `2px solid ${theme.base.colors.modalBorder}`,
  }));

  const navList = css({
    listStyle: 'none',
    margin: 0,
    padding: 0,
  });
  const navListItem = css({
    display: 'inline-block',
    margin: '0 15px',
  });

  return (
    <StaticQuery
      query={graphql`
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
                    textAlignment
                  }
                  ... on ContentfulCredit {
                    id
                    credit {
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
    `}
      render={data => (
        <div>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: data.site.siteMetadata.description },
              { property: 'og:title', content: data.site.siteMetadata.title },
            ]}
            link={[
              { rel: 'shortcut icon', type: 'image/png', href: `${icon32}` },
            ]}
          />
          <div className="app-wrapper">
            <nav {...nav}>
              <ul {...navList}>
                {data.allContentfulInfoPage.edges.map(edge => (
                  <li {...navListItem} key={edge.node.id}>
                    <InfoPanel node={edge.node} />
                  </li>
                ))}
              </ul>
            </nav>
            {children}
          </div>
        </div>
      )}
    />
  );
};

export default Layout;
