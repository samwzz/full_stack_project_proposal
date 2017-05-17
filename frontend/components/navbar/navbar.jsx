import React from 'react';
import Modal from 'react-modal';
import LoginFormContainer from '../form/login_form_container';
import SignupFormContainer from '../form/signup_form_container';
import FormModalStyle from './form_modal_style';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginModalOpen: false,
      SignupModalOpen: false
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.openSignupModal = this.openSignupModal.bind(this);
    this.closeSignupModal = this.closeSignupModal.bind(this);

    this.afterModalOpen = this.afterModalOpen.bind(this);
  }

  handleLoginClick(e) {
    e.preventDefault();
    this.setState({ LoginModalOpen: true });
  }

  openLoginModal() {
    this.setState({ LoginModalOpen: true });
  }

  closeLoginModal() {
    this.setState({ LoginModalOpen: false });
    FormModalStyle.content.opacity = 0;
  }

  handleSignupClick(e) {
    e.preventDefault();
    this.setState({ SignupModalOpen: true });
  }

  openSignupModal() {
    this.setState({ SignupModalOpen: true });
  }

  closeSignupModal() {
    this.setState({ SignupModalOpen: false });
    FormModalStyle.content.opacity = 0;
  }

  afterModalOpen() {
    FormModalStyle.content.opacity = 100;
  }

  sessionLinks() {
    if (!this.props.loggedIn) {
      return (
        <nav className="login-signup">
          <button id="login-button" onClick={this.handleLoginClick}>Log In</button>
          <button id="signup-button" onClick={this.handleSignupClick}>Sign Up</button>
        </nav>
      );
    }
  }

  personalGreeting(currentUser, logout) {
    if (currentUser) {
      return (
        <hgroup className="header-group">
          <h2 className="header-name">Hi, {currentUser.username}!</h2>
          <button className="header-button" onClick={logout}>Log Out</button>
        </hgroup>
      );
    }
  }

  render() {
    const { currentUser, logout, loggedIn } = this.props;

    return (
      <nav className="main-nav">
        <nav className="left-nav">
          <h1 className="logo">FStop</h1>
        </nav>
        {this.sessionLinks()}
        <Modal
          isOpen={this.state.LoginModalOpen}
          onAfterOpen={this.afterModalOpen}
          onRequestClose={this.closeLoginModal}
          style={FormModalStyle}
          contentLabel="LoginModal"
          >
          <LoginFormContainer closeLoginModal={this.closeLoginModal} openSignupModal={this.openSignupModal} />
          <button onClick={this.closeLoginModal}>Close</button>
        </Modal>
        <Modal
          isOpen={this.state.SignupModalOpen}
          onAfterOpen={this.afterModalOpen}
          onRequestClose={this.closeSignupModal}
          style={FormModalStyle}
          contentLabel="SignupModal"
          >
          <SignupFormContainer closeSignupModal={this.closeSignupModal} openLoginModal={this.openLoginModal} />
          <button onClick={this.closeSignupModal}>Close</button>
        </Modal>
        {this.personalGreeting(currentUser, logout)}
      </nav>
    );
  }
}

export default Navbar;
