// App.js
import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import axios from 'axios';
import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      query: '',
      page: 1,
      showModal: false,
      selectedImage: null,
      isLoading: false,
      error: null,
    };
  }

  handleSubmit = query => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    const apiKey = '42617556-81109194e933f8c86a5f2575e';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

    this.setState({ isLoading: true });

    try {
      const response = await axios.get(url);
      const data = response.data;

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        page: prevState.page + 1,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({
        isLoading: false,
        error: 'Failed to fetch images. Please try again later.',
      });
    }
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { images, isLoading, showModal, selectedImage, error } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <p className={styles.error}>{error}</p>}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {!!images.length && <Button onLoadMore={this.handleLoadMore} />}
        {showModal && (
          <Modal image={selectedImage} onCloseModal={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
