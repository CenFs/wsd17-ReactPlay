import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// check more details here: https://medium.com/the-many/adding-login-and-authentication-sections-to-your-react-or-react-native-app-7767fd251bd1

function isLoggedIn () {
  // here just for simple test (try return false)
  // real mechaniam to check loginedIn status should be implelemented here
  // return true;
  return false;
}

class EnsureLoggedInContainer extends React.Component {
  componentDidMount () {
    const { dispatch, currentURL } = this.props;

    if (!isLoggedIn()) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      
      // dispatch(setRedirectUrl(currentURL));
      browserHistory.replace("/store/login");
      alert('Please login first!')
    }
  }

  render () {
    if (isLoggedIn()) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps (state, ownProps) {
  return {
    isLoggedIn: state.loggedIn,
    currentURL: ownProps.location.pathname
  };
}

export default connect(mapStateToProps)(EnsureLoggedInContainer);
