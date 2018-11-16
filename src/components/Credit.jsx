import React from 'react';
import { css, media } from 'glamor';
import theme from '../theme';

const Credit = (props) => {
  const {
    credit,
  } = props;

  const creditWrap = css({
    marginTop: '60px',
    '& a': {
      color: 'red',
      '&:hover': {
        color: 'white',
      },
    },
  },
  media(`(min-width: ${theme.breakpoints.mobile})`, {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    marginTop: 0,
    width: '100%',
    paddingRight: '30px',
    textAlign: 'right',
  }));

  return (
    <div {...creditWrap} dangerouslySetInnerHTML={{ __html: credit.childMarkdownRemark.html }} />
  );
};

export default Credit;
