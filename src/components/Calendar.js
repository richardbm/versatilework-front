import React, { Component } from 'react';
import LabelNavigation from '../elements/LabelNavigation';
import CalendarList from './CalendarList';
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
import { LinearProgress } from 'material-ui/Progress';


const Promise = global.Promise;

const mapStateToProps = state => ({
    ...state.calendar,
    activity: state.calendar.activity,
    tab: state.calendar.tab,
});

const mapDispatchToProps = dispatch => ({
    onChangeTab: (tab) =>
        dispatch({ type: APPLY_FILTER_EXPLORE, tab}),
    onLoaded: (tab=ALL) =>
        dispatch({ type: EXPLORE_PAGE_LOADED, tab }),
    onUnload: () =>
        dispatch({  type: EXPLORE_PAGE_UNLOAD })
});


class Calendar extends Component {

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
        console.log(activity);
        return (
            <span style={{height: 100, maxHeight: 100}}>
                <LabelNavigation
                    tab={this.props.tab}
                    onChangeTab={this.props.onChangeTab}/>
                    <CalendarList
                        data={activity}
                        loadNewEntries={this.props.data.loadNewEntries}
                    />

            </span>
        );
    }
}

const CalendarListQuery = gql`
    query Query ($type: String!, $limit: Int!, $offset: Int!, $new: Boolean!, $status: String!){
        activity(typeActivity: $type, limit: $limit, offset: $offset, new: $new, status: $status){
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
            status: "PE",
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
                        status: "PE",

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
                return fetchMore({
                    // query: ... (you can specify a different query. FEED_QUERY is used by default)
                    variables: {
                        offset: activity.length > 0 ? activity[0].id : 0,
                        status: "PE",
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

const CalendarWithData = graphql(CalendarListQuery, queryOptions)(Calendar);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWithData);