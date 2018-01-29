/*global FB*/
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const FACEBOOK_APP_ID = '180528702549642';
const FACEBOOK_API_VERSION = 'v2.11'; // e.g. v2.10

class LoginFacebook extends Component {

    constructor(props) {
        super(props);
        this._handleFBLogin = this._handleFBLogin.bind(this);
    }

    componentDidMount() {
        this._initializeFacebookSDK()
    }

    _initializeFacebookSDK() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : FACEBOOK_APP_ID,
                cookie     : true,  // enable cookies to allow the server to access the session
                version    : FACEBOOK_API_VERSION // use Facebook API version 2.10
            });
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    _facebookCallback(facebookResponse) {
        console.log("pasa");

        if (facebookResponse.status === 'connected') {
            const facebookToken = facebookResponse.authResponse.accessToken;
            const graphcoolResponse = this.props.authenticateUserMutation({variables: { facebookToken }});
            const graphcoolToken = graphcoolResponse.data.authenticateUser.token;
            localStorage.setItem('graphcoolToken', graphcoolToken);
            window.location.reload()
        } else {
            console.warn(`User did not authorize the Facebook application.`)
        }
    }

    _handleFBLogin() {
        FB.login(response => {
            this._facebookCallback(response)
        }, {scope: 'public_profile,email'})
    }



    _isLoggedIn () {
        return this.props.data.loggedInUser &&
            this.props.data.loggedInUser.id &&
            this.props.data.loggedInUser.id !== ''
    }

    _logout () {
        localStorage.removeItem('graphcoolToken');
        window.location.reload()
    }


    render () {
        if (this._isLoggedIn()) {
            return this.renderLoggedIn()
        } else {
            return this.renderLoggedOut()
        }

    }

    renderLoggedIn() {
        return (
            <div>
        <span>
          Logged in as ${this.props.data.loggedInUser.id}
        </span>
                <div className='pv3'>
          <span
              className='dib bg-red white pa3 pointer dim'
              onClick={this._logout}
          >
            Logout
          </span>
                </div>
            </div>
        )
    }

    renderLoggedOut() {
        return (
            <div>
                <div className='pv3'>
                    <div>
            <span
                onClick={this._handleFBLogin}
                className='dib pa3 white bg-blue dim pointer'
            >
              Log in with Facebook
            </span>
                    </div>
                    <span>Log in to create new posts</span>
                </div>
            </div>
        )
    }
}

const LOGGED_IN_USER = gql`
    query LoggedInUser {
        loggedInUser {
            id
        }
    }
`

const AUTHENTICATE_FACEBOOK_USER = gql`
    mutation AuthenticateUserMutation($facebookToken: String!) {
        authenticateUser(facebookToken: $facebookToken) {
            token
        }
    }
`

export default compose(
    graphql(AUTHENTICATE_FACEBOOK_USER, { name: 'authenticateUserMutation' }),
    graphql(LOGGED_IN_USER, { options: { fetchPolicy: 'network-only'}})
) (withRouter(LoginFacebook))