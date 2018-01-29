import React, { Component } from 'react';
import {
    APPLY_FILTER_EXPLORE,
    EXPLORE_PAGE_LOADED,
    EXPLORE_PAGE_UNLOAD,
} from '../constants/actionTypes';
import { connect } from 'react-redux';

import {ALL} from "../constants/constExplorer";
import gql from 'graphql-tag';
import {
    graphql,
} from 'react-apollo';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import LoginFacebookButton from './LoginFacebookButton.js';

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

const mapStateToProps = state => ({
    ...state.explorer,
    activity: state.explorer.activity,
    tab: state.explorer.tab,
});

const mapDispatchToProps = dispatch => ({
    onChangeTab: (tab) =>
        dispatch({ type: APPLY_FILTER_EXPLORE, tab}),
    onLoaded: (tab=ALL) =>
        dispatch({ type: EXPLORE_PAGE_LOADED, tab }),
    onUnload: () =>
        dispatch({  type: EXPLORE_PAGE_UNLOAD })
});


class Profile extends Component {

    constructor(props){
        super(props);
        this.handleOnScroll = this.handleOnScroll.bind(this);
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleOnScroll);
        this.props.onLoaded(ALL);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
        this.props.onUnload();
    };

    handleOnScroll() {
        let scrollTop = (document.documentElement
            && document.documentElement.scrollTop)
            || document.body.scrollTop;
        let scrollHeight = (document.documentElement
            && document.documentElement.scrollHeight)
            || document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight
            || window.innerHeight;
        let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            this.props.data.loadMoreEntries();
        }
    }


    render() {
        const { classes } = this.props;
        let activity = {
            activity: this.props.data.activity,
            loading: this.props.data.loading
        };
        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                    <div className={classes.row}>
                      <Avatar
                          alt="Adelle Charles"
                          src="/static/images/uxceo-128.jpg"
                          className={classNames(classes.avatar, classes.bigAvatar)}
                      />
                    </div>
                    <Typography type="headline" component="h3">
                      This is a sheet of paper.
                    </Typography>
                    <Typography component="p">
                      Paper can be used to  surface or other elements for your application.
                    </Typography>
                    <LoginFacebookButton />

                </Paper>

            </div>
        );
    }
}

const exploreListQuery = gql`
    query Query ($type: String!, $limit: Int!, $offset: Int!, $new: Boolean!){
        activity (typeActivity: $type, limit: $limit, offset: $offset, new: $new){
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
            }
            category {
                icon
                iconColor
                backgroundColor
            }

        }
    }
`;


const ITEMS_PER_PAGE = 10;
const queryOptions = {

    options: props => {
        let tab = props.tab;
        if (!tab) {
            tab = ALL;
        }

        return {
        variables: {
            type: tab,
            offset: 0,
            limit: ITEMS_PER_PAGE,
            new: false,
        },
        fetchPolicy: 'network-only',
    };
    },
    props({ data: { loading, activity, currentUser, fetchMore } }) {
        return {data: {
            loading,
            activity,
            currentUser,
            loadMoreEntries() {
                console.log("more items loaded");
                return fetchMore({
                    // query: ... (you can specify a different query. FEED_QUERY is used by default)
                    variables: {
                        offset: activity.length > 0 ? activity[activity.length-1].id : 0,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult) { return previousResult; }
                        return Object.assign({}, previousResult, {
                            // Append the new feed results to the old one
                            activity: [...previousResult.activity, ...fetchMoreResult.activity],
                        });
                    },
                });
            },
            loadNewEntries() {
                console.log("New items loaded");
                return fetchMore({
                    // query: ... (you can specify a different query. FEED_QUERY is used by default)
                    variables: {
                        offset: activity.length > 0 ? activity[0].id : 0,
                        new: true,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                            return previousResult; }
                        return Object.assign({}, previousResult, {
                            // Append the new feed results to the old one
                            activity: [...fetchMoreResult.activity, ...previousResult.activity],
                        });
                    },
                });
            },
        }};
    },
};

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};


const ProfileWithData = graphql(exploreListQuery, queryOptions)(withStyles(styles)(Profile));

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWithData);