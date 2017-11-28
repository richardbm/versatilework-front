import React from 'react';
import LabelNavigation from '../elements/LabelNavigation';
import GridList from './GridList';


class Explore extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: 'recents',
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event, value) {
        this.setState({ value });
    };

    render() {

        return (
            <span style={{height: 100, maxHeight: 100}}>
                <LabelNavigation />
                <GridList/>
            </span>
        );
    }
}

export default Explore;