import React from 'react';

const Button = (props) => {
  const {
    buttonText,
    buttonLink,
    buttonStyle,
    buttonAlignment,
    openInANewWindow,
  } = props;

  const buttonCSSClassRoot = 'cta-wrp';
  let buttonAlignmentCSSClass = buttonCSSClassRoot;
  let buttonStyleCSSClass = 'cta';
  if (buttonAlignment !== '') {
    buttonAlignmentCSSClass += `--${buttonAlignment}`;
  }
  if (buttonStyle !== '') {
    buttonStyleCSSClass += `--${buttonStyle}`;
  }

  // todo: new window logic
  return (
    <div className={`${buttonCSSClassRoot} ${buttonAlignmentCSSClass}`}>
      <a className={`cta ${buttonStyleCSSClass}`} href={buttonLink}>{buttonText}</a>
    </div>
  );
};

export default Button;
