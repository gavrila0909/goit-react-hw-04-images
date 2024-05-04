// App.js
import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import axios from 'axios';
import styles from './App.module.css';

const App = () => {
  const [images, setImage] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


    const fetchImages = useCallback ( async () => {
      const apiKey = '42617556-81109194e933f8c86a5f2575e';
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

      setIsLoading(true);

      try {
        const response = await axios.get(url);
        const data = response.data;

        setImage(prevImages => [...prevImages, ...data.hits]);
        setPage(prevPage => prevPage + 1);
        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching images:', error);
        setIsLoading(false);
        setError('Failed to fetch images. Please try again later.');
      }
    }, [query, page]);

    useEffect(() => {
      if (query) {
        fetchImages();
      }
    }, [query, fetchImages]);
  
    const handleSubmit = query => {
      setQuery(query);
      setImage([]);
      setPage(1);
    };


  const handleLoadMore = () => {
    fetchImages();
  };

  const handleImageClick = image => {
    setShowModal(true);
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p className={styles.error}>{error}</p>}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {!!images.length && <Button onLoadMore={handleLoadMore} />}
      {showModal && (
        <Modal image={selectedImage} onCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
