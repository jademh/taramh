import React from 'react';
import { css } from 'glamor';
import { theme } from '../theme';

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
    color: theme.base.colors.copyLink,
    fontFamily: 'sans-serif',
    transition: 'color 300ms ease-in-out',
    fontSize: buttonStyle === 'primary' ? theme.cta.primaryFontSize : theme.cta.secondaryFontSize,
    ':hover': {
      color: theme.base.colors.copyLinkHover,
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
