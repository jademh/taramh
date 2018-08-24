import React from 'react';
import Helmet from 'react-helmet';
import ImageList from '../components/ImageList';

const IndexPage = ({ data }) => {
  const { node } = data.allContentfulHomepage.edges[0];
  return (
    <div>
      <Helmet
        title={node.pageTitle}
        meta={[
          { name: 'description', content: node.pageDescription.childMarkdownRemark.rawMarkdownBody },
        ]}
      />
      <div className="main-logo_wrp">
        <img className="main-logo" src={node.heroImage.sizes.src} alt={node.heroImage.description} />
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
