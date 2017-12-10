import React from 'react';
import Explore from '../components/Explore';
import { connect } from 'react-redux';


class ExploreView extends React.Component {

    constructor(props){
        super(props);
    }


    render() {

        return (
            <Explore />
        );
    }
}

export default ExploreView;