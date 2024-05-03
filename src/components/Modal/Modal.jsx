import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

function Modal({ image, onCloseModal }) {
  return (
    <div className={styles.overlay} onClick={onCloseModal}>
      <div className={styles.modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  image: PropTypes.object.isRequired,
};

export default Modal;
