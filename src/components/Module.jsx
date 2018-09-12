import React from 'react';
import Button from './Button';
import Text from './Text';
import Credit from './Credit';

const Module = ({ props }) => {
  /* eslint no-underscore-dangle: ["error", { "allow": ["__typename"] }] */
  const contentType = props.__typename;
  if (contentType === 'ContentfulButton') {
    return (
      <Button {...props} />
    );
  }
  if (contentType === 'ContentfulText') {
    return (
      <Text {...props} />
    );
  }
  if (contentType === 'ContentfulCredit') {
    return (
      <Credit {...props} />
    );
  }
  return false;
};

export default Module;
