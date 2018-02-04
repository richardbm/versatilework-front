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
import Button from 'material-ui/Button';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import ResponsesList from './ResponsesList';
import AddResponse from './AddResponse';

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
                    <Typography type="headline" style={{textAlign:"center"}} component="h3">
                        {activity.title}
                    </Typography>

                    <Typography type="headline" style={{textAlign:"justify", fontSize: 18, margin:10}} component="p">
                        {activity.description}
                    </Typography>
                </Paper>
                <Paper>
                    <Button
                        raised
                        component="span"
                        style={{bottom:0, position:"relative"}}
                        onClick={this.handleLogout}>
                        To offer
                    </Button>
                </Paper>

                <Typography type="headline" style={{textAlign:"center"}} component="h3">
                    Responses
                </Typography>

                <ResponsesList owner={activity.owner} responses={activity.responses}/>

                <div style={{marginTop:"15px", marginLeft:"25px", marginRight:"25px", marginBottom: "65px"}}>
                    <AddResponse activity={activity}/>

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
            responses {
                id
                description
                date
                owner {
                    id
                    firstName
                    lastName
                    facebookPictureUrl
                    
                }
            }
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
