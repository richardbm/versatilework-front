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
import { Link } from 'react-router-dom';


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
    },

});


class DetailActivity extends Component {

    constructor(props) {
        super(props);

        this.logout = () => {
            this.props.autDiscardToken();
            window.location.reload();
        };
    }


    render() {
        const { classes } = this.props;
        let { loading, activity } = this.props;
        if (loading) {
            return (
                <Loader />
            )
        }

        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                    <div className={classes.row}>
                        {activity.firstImage ?
                            <Avatar
                                src={activity.firstImage}
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            :
                            <div></div>
                        }
                    </div>
                    <Typography type="headline" style={{textAlign:"center"}} component="h3">
                        {activity.title}
                    </Typography>

                </Paper>
                <Typography type="headline" style={{textAlign:"center"}} component="p">
                    {activity.description}
                </Typography>
                <div style={{margin:"50px"}}>
                    <Button raised component={Link} to={`/add-response/${activity.id}`}>
                        Response
                    </Button>

                </div>

            </div>
        );
    }
}

const DETAIL_ACTIVITY_QUERY = gql`
    query DetailActivityQuery ($id: ID!){
        detailActivity (id: $id){
            id
            title
            description
            firstImage
            typeActivity
            date
            typeActivityDisplay
            owner {
                id
                firstName
                lastName
                phone
            }
            category {
                icon
                iconColor
                backgroundColor
            }

        }
    }
`;

const queryOptions = {

    options: ({match}) => {
        let id = match.params.id;

        return {
            variables: {
                id: id,
            },
            fetchPolicy: 'network-only',
        };
    },
    props: ({data: {loading, detailActivity}}) => {
        return {

                loading,
                activity:detailActivity,

        }
    }
};


const DetailActivityWithData = graphql(DETAIL_ACTIVITY_QUERY, queryOptions)(withStyles(styles)(DetailActivity));

export default DetailActivityWithData;
