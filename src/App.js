import React, { Component } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import ExploreIcon from 'material-ui-icons/Explore';
import AccountCircle from 'material-ui-icons/AccountCircle';
import DateRange from 'material-ui-icons/DateRange';
import AddCircle from 'material-ui-icons/AddCircle';
import Notifications from 'material-ui-icons/Notifications';
import ExploreView from './views/ExploreView';
import NotificationView from './views/NotificationsView';
import AddView from "./views/AddView";
import {
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'

function TabContainer({ children, dir }) {
    return (
        <div dir={dir}>
            {children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
});


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
    }

    handleChange(event, value) {
        this.setState({ value });
    };

    handleChangeIndex(index) {
        this.setState({ value: index });

    };


    render() {
        const { classes, theme } = this.props;
        console.log(this.props.path);

        return (
                <span>
                  <Header/>

                        <div className={classes.root} style={{position: "absolute", width: "100%", top:58 }}>
                          <Switch>
                            <Route extact path='/explore' component={ExploreView}/>
                            <Route extact path='/add' component={AddView}/>
                            <Route extact path='/notifications' component={NotificationView}/>
                            <Route path='/' render={() => (<Redirect to="/explore"/>)}/>

                          </Switch>

                        </div>
                        <Paper style={{ width: "100%",
                            position: "fixed",
                            bottom: 0
                        }}>
                            <Tabs
                                value={this.props.history.location.pathname}
                                onChange={this.handleChange}
                                fullWidth
                                indicatorColor="accent"
                                textColor="accent"
                                centered>
                                <Tab icon={<ExploreIcon />} component={Link} to="/explore" value="/explore" />
                                <Tab icon={<DateRange />} component={Link} to="/calendar" value="/calendar" />
                                <Tab icon={<AddCircle />} component={Link} to="/add" value="/add" />
                                <Tab icon={<Notifications />} component={Link} to="/notifications" value="/notifications" />
                                <Tab icon={<AccountCircle />} component={Link} to="/profile" value="/profile" />
                            </Tabs>
                        </Paper>
                </span>
    );
  }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(App);