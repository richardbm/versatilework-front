import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import ExploreIcon from 'material-ui-icons/Explore';
import LocalOffer from 'material-ui-icons/LocalOffer';
import LiveHelp from 'material-ui-icons/LiveHelp';


export default class NavigationTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event, value) {
        this.setState({ value });
    };

    render() {
        return (
            <Paper style={{ width: "100%",
                position: "fixed",
                bottom: 0
                }}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    fullWidth
                    indicatorColor="accent"
                    textColor="accent"
                    centered>
                    <Tab icon={<LocalOffer />} />
                    <Tab icon={<ExploreIcon />} />
                    <Tab icon={<LiveHelp />} />
                </Tabs>
            </Paper>
        );
    }
}