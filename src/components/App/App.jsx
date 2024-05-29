import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import axios from 'axios';
import styles from './App.module.css';

const App = () => {
  const [URL] = useState('https://pixabay.com/api');
  const [API_KEY] = useState('42617556-81109194e933f8c86a5f2575e');
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(async () => {
    const fetchUrl = `${URL}/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

    setIsLoading(true);

    try {
      const response = await axios.get(fetchUrl);
      const data = response.data;

      setImages(prevImages => [...prevImages, ...data.hits]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setIsLoading(false);
      setError('Failed to fetch images. Please try again later.');
    }
  }, [URL, API_KEY, query, page]);

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, fetchImages]);

  const handleSubmit = useCallback(query => {
    setImages([]);
    setPage(1);
    setQuery(query);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

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
