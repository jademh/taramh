import React from 'react';

const ImageList = (props) => {
  const {
    images,
  } = props;

  return (
    <ul className="image-list">
      {images.map(image => (
        <li className="image-list_item" key={image.id}>
          <img className="image-list_image" src={image.resolutions.src} alt={image.description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageList;
