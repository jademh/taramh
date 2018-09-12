import React from 'react';
import { css } from 'glamor';

const Text = (props) => {
  const {
    subtitle,
    hideSubtitle,
    text,
    textAlignment,
  } = props;

  const textWrap = css({
    textAlign: textAlignment,
  });

  return (
    <div>
      {hideSubtitle === false && <h2>{subtitle}</h2>}
      <div {...textWrap} dangerouslySetInnerHTML={{ __html: text.childMarkdownRemark.html }} />
    </div>
  );
};

export default Text;
