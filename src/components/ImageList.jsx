import React from 'react';
import { css } from 'glamor';

const ImageList = (props) => {
  const {
    images,
  } = props;

  const imageList = css({
    margin: '100vh 0 0 0',
    padding: 0,
    zIndex: 2,
    position: 'relative',
    listStyle: 'none',
    '@media only screen and (max-width: 45em)': {
      marginTop: '50vh',
    },
  });

  const imageListItem = css({
    margin: '10vh 0',
    textAlign: 'center',
    '&:nth-child(even) img': {
      transform: 'rotate(1deg)',
    },
  });

  const imageListImage = css({
    maxWidth: '90%',
    height: 'auto',
    maxHeight: '90vh',
    transform: 'rotate(-1deg)',
  });

  return (
    <ul {...imageList}>
      {images.map(image => (
        <li {...imageListItem} key={image.id}>
          <img {...imageListImage} src={image.resolutions.src} alt={image.description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageList;
