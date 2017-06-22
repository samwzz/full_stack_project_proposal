import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PhotoListContainer from '../photo/photo_list_container';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchPhotos() {
    const { match, fetchUserPhotos, fetchAlbumPhotos } = this.props;
    if (match.path === "/users/:userId") {
      return fetchUserPhotos(parseInt(match.params.userId));
    } else if (match.path === "/users/:userId/albums/:albumId") {
      return fetchAlbumPhotos(parseInt(match.params.albumId));
    }
  }

  componentWillUnmount() {
    $('.parallax-mirror').remove();
  }

  componentWillMount() {
    this.fetchPhotos()
    .then(() => {
      const photo = this.props.photos[Math.floor(Math.random() * this.props.photos.length)];
      $('.cover-photo').parallax({
        imageSrc: photo.image_url
      });
    });
  }

  componentDidUpdate() {
    const photo = this.props.photos[Math.floor(Math.random() * this.props.photos.length)];
    if (true) {
      $('.cover-photo').parallax({
        imageSrc: photo.image_url
      });
    }
  }

  render () {
    return(
      <section className="user-profile">
        <div className="profile-header-container">
          <div className="cover-photo"></div>
          <div className="header-spacer">
            <div className="avatar">
              <div className="avatar-wrapper">
                <img src="https://res.cloudinary.com/db1ywnpgj/image/upload/v1495431600/Doge_hu9gbb.jpg"/>
              </div>
            </div>
          </div>
          <div className="user-nav">
            <ul className="profile-tabs">
              <li id="photostream-tab">
                <NavLink exact to={`/users/${this.props.currentUser.id}`}>Photostream</NavLink>
              </li>
              <li id="album-tab">
                <NavLink to={`/users/${this.props.currentUser.id}/albums`}>Albums</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(UserProfile);
