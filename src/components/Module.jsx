import React from 'react';
import Button from './Button';
import Text from './Text';

const Module = ({ props }) => {
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
  return false;
};

export default Module;
