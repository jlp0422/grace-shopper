import React from 'react';

class FacebookLogin extends React.Component {
  componentDidMount() {
    // console.log(window)
    window.fbAsyncInit = function () {
      this.FB.init({
        appId: '233922863853906',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.0'
      });

      window.FB.Event.subscribe('auth.statusChange', (response) => {
        if (response.authResponse) {
          console.log('logged in!')
          this.updateLoggedInState(response)
        }
        else {
          console.log('logged out!')
          this.updateLoggedOutState()
        }
      });
    }.bind(this)

    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    return (
      <h3>Hello</h3>
      // <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
    )
  }
}

export default FacebookLogin;
