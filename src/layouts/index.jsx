import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import InfoPanel from '../components/InfoPanel';

import './index.css';

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: data.site.siteMetadata.description },
      ]}
    />
    <div>
      <nav className="main-nav">
        <ul className="main-nav_list">
          {data.allContentfulInfoPage.edges.map(edge => (
            <li className="main-nav_list-item" key={edge.node.id}>
              <InfoPanel ctaClass="main-nav_link" node={edge.node} />
            </li>
          ))}
        </ul>
      </nav>
      {children()}
    </div>
  </div>
);

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
