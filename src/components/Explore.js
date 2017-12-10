import React, { Component } from 'react';
import LabelNavigation from '../elements/LabelNavigation';
import GridList from './GridList';
import {
    APPLY_FILTER_EXPLORE,
    EXPLORE_PAGE_LOADED,
    EXPLORE_PAGE_UNLOAD,
} from '../constants/actionTypes';
import { connect } from 'react-redux';

import tileData from './tileData';
import {ALL} from "../constants/constExplorer";

const Promise = global.Promise;

const mapStateToProps = state => ({
    ...state.explorer,
    activity: state.explorer.activity,
    tab: state.explorer.tab,
});

const mapDispatchToProps = dispatch => ({
    onChangeTab: (tab) =>
        dispatch({ type: APPLY_FILTER_EXPLORE, tab, activity:tileData}),
    onLoaded: (activity, tab=ALL) =>
        dispatch({ type: EXPLORE_PAGE_LOADED, tab, activity }),
    onUnload: () =>
        dispatch({  type: EXPLORE_PAGE_UNLOAD })
});


class Explore extends Component {

    componentWillMount() {
        this.props.onLoaded(tileData);
    };

    componentWillUnmount() {
        this.props.onUnload();
    };


    render() {
        return (
            <span style={{height: 100, maxHeight: 100}}>
                <LabelNavigation
                    tab={this.props.tab}
                    onChangeTab={this.props.onChangeTab}/>
                <GridList dataActivity={this.props.activity} />
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);