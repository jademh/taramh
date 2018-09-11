import React from 'react';
import { css } from 'glamor';

const Credit = (props) => {
  const {
    credit,
  } = props;

  const creditWrap = css({
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    paddingRight: '30px',
    textAlign: 'right',
    '& a': {
      color: 'red',
      '&:hover': {
        color: 'white',
      },
    },
  });

  return (
      <div {...creditWrap} dangerouslySetInnerHTML={{ __html: credit.childMarkdownRemark.html }} />
  );
};

export default Credit;
