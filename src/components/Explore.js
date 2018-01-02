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

const Promise = global.Promise;

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
    }

    componentWillMount() {
        this.props.onLoaded(ALL);
    };

    componentWillUnmount() {
        this.props.onUnload();
    };



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
                        loadMoreEntries={this.props.data.loadMoreEntries}/>

            </span>
        );
    }
}

const exploreListQuery = gql`
    query Query ($type: String!, $limit: Int!, $offset: Int!){
        activity (typeActivity: $type, limit: $limit, offset: $offset){
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


const ITEMS_PER_PAGE = 2;
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
                console.log("paso");
                return fetchMore({
                    // query: ... (you can specify a different query. FEED_QUERY is used by default)
                    variables: {
                        offset: activity.length,
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
        }};
    },
};

const ExplorerWithData = graphql(exploreListQuery, queryOptions)(Explore);

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerWithData);