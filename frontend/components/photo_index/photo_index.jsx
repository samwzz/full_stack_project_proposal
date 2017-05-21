import React from 'react';
import { Route } from 'react-router-dom';
import PhotoIndexItem from './photo_index_item';
import PhotoModal from '../modal/photo_modal';
import Modal from 'react-modal';

class PhotoIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPhotos();
  }

  componentDidUpdate() {
    $("#gallery").justifiedGallery({
      rowHeight : 300,
      lastRow : 'justify',
      margins : 8,
      cssAnimation: false
    });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  render () {
    const { photos } = this.props;
    const photoItems = photos.map((photo) => (
      <PhotoModal key={photo.id} photo={photo} />
    ));

    return (
      <section className="photo-index">
        <div id="gallery" className="justified-gallery">
          {photoItems}
        </div>
      </section>
    );
  }
}

export default PhotoIndex;
