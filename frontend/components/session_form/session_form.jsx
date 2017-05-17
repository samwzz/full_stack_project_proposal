import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  navLink() {
    if (this.props.formType === 'login') {
      return <Link to="/signup">Sign Up</Link>;
    } else {
      return <Link to="/login">Log In</Link>;
    }
  }

  renderErrors() {
    return(
      <ul className="errors">
        {this.props.errors && this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  emailField() {
    if (this.props.formType === 'login') {
      return;
    } else {
      return (
        <div>
          <label>Email:
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              className="login-input"
              />
          </label>
          <br/>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
           {this.renderErrors()}
           <div className="login-form">
             <br/>
             <label>Username:
               <input type="text"
                 value={this.state.username}
                 onChange={this.update('username')}
                 className="login-input"
               />
             </label>
             <br />
             {this.emailField()}
             <label>Password:
               <input type="password"
                 value={this.state.password}
                 onChange={this.update('password')}
                 className="login-input"
               />
             </label>
             <br/>
             <input type="submit" value="Submit" />
           </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
