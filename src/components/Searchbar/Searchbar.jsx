import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

const Searchbar = ({onSubmit}) => {

  const [inputValue, setInputValue] = useState ('')


  //actualizam noua valoare input
  const handleInputChange = event => {
    // SAU const newInputValue = event.target.value => inputValue: newInputValue
    setInputValue( event.target.value );
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue(''); //se goleste inputul
  };

  
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="inputValue"
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
