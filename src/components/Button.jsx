import React from 'react';
import { css } from 'glamor';

const Button = (props) => {
  const {
    buttonText,
    buttonLink,
    buttonStyle,
    buttonAlignment,
    openInANewWindow,
  } = props;

  const buttonWrap = css({
    textAlign: buttonAlignment,
  });

  const button = css({
    color: 'blue',
    fontFamily: 'sans-serif',
    transition: 'color 300ms ease-in-out',
    fontSize: buttonStyle === 'primary' ? '25px' : '14px',
    ':hover': {
      color: 'red',
    },
  });

  return (
    <div {...buttonWrap}>
      <a
        {...button}
        target={openInANewWindow ? '_blank' : undefined}
        rel={openInANewWindow ? 'noopener noreferrer' : undefined}
        href={buttonLink}
      >
        {buttonText}
      </a>
    </div>
  );
};

export default Button;
