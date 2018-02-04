import React, { Component } from 'react';
import {
    AUTH_DISCARD_TOKEN,
} from '../constants/actionTypes';
import { connect } from 'react-redux';

import gql from 'graphql-tag';
import {
    graphql,
} from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import LoginFacebookButton from './LoginFacebookButton.js';
import Button from 'material-ui/Button';
import Loader from './Loader';


const styles = theme => ({
    root: theme.mixins.gutters({
        marginTop: "0px",
        height: "200px",
        paddingBottom: 16,
    }),
    row: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 15,
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 120,
        height: 120,
    },
});

const mapDispatchToProps = dispatch => ({
    autDiscardToken: () => {
        dispatch({ type: AUTH_DISCARD_TOKEN });
        localStorage.removeItem('token');
        localStorage.removeItem('meId');
    },

});


class Profile extends Component {

    constructor(props) {
        super(props);

        this.logout = () => {
            this.props.autDiscardToken();
            window.location.reload();
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        this.logout();
    }

    render() {
        const { classes } = this.props;
        let imageUrl = 'assets/favicon.ico';
        let fullName = '';
        let user = this.props.me;
        let { loading } = this.props;

        if (loading) {
            return (
                <Loader />
            )
        }

        if (user) {
            imageUrl = user.facebookPictureUrl || '';
            fullName = user.firstName +" "+user.lastName;
        }
        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                    <div className={classes.row}>
                        <Avatar
                            src={imageUrl}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                        />
                    </div>
                    <Typography type="headline" style={{textAlign:"center"}} component="h3">
                        {fullName}
                    </Typography>

                </Paper>

                <div style={{margin:"50px"}}>
                    {!user ?
                        <LoginFacebookButton />
                        :
                        <Button raised component="span" onClick={this.handleLogout}>
                            Logout
                        </Button>
                    }
                </div>

            </div>
        );
    }
}

const PROFILE_QUERY = gql`
    query currentUser {
        me {
            id
            firstName
            lastName
            facebookPictureUrl
        }
    }
`;


const queryOptions = {

    options:  {
        fetchPolicy: 'network-only',
    },
    props: ({ data: { loading, me } }) => ({
            loading, me
    }),
};

const ProfileWithData = graphql(PROFILE_QUERY, queryOptions)(withStyles(styles)(Profile));

export default connect(null, mapDispatchToProps)(ProfileWithData);