import React from 'react';

const Text = (props) => {
  const {
    subtitle,
    hideSubtitle,
    text,
  } = props;

  return (
    <div>
      {hideSubtitle === false &&
        <h2>{subtitle}</h2>
      }
      <div dangerouslySetInnerHTML={{ __html: text.childMarkdownRemark.html }} />
    </div>
  );
};

export default Text;
