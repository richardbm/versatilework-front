import React, { Component } from 'react';
import LabelNavigation from '../elements/LabelNavigation';
import GridList from './GridList';
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


class Explore extends Component {

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
        let activity = {
            activity: this.props.data.activity,
            loading: this.props.data.loading
        };
        return (
            <span style={{height: 100, maxHeight: 100}}>
                <LabelNavigation
                    tab={this.props.tab}
                    onChangeTab={this.props.onChangeTab}/>
                    <GridList
                        tab={this.props.tab}
                        data={activity}
                        loadNewEntries={this.props.data.loadNewEntries}
                    />

            </span>
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
            status
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

const ExplorerWithData = graphql(exploreListQuery, queryOptions)(Explore);

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerWithData);