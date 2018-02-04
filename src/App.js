import React, { Component } from 'react';
import Header from "./components/Header";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import ExploreIcon from 'material-ui-icons/Explore';
import AccountCircle from 'material-ui-icons/AccountCircle';
import DateRange from 'material-ui-icons/DateRange';
import AddCircle from 'material-ui-icons/AddCircle';
import EventIcon from 'material-ui-icons/Event';
import Notifications from 'material-ui-icons/Notifications';
import ExploreView from './views/ExploreView';
import CalendarView from './views/CalendarView';
import NotificationView from './views/NotificationsView';
import AddView from "./views/AddView";
import { connect } from 'react-redux';
import { CHANGE_MAIN_TAB } from './constants/actionTypes';
import SupplyFormView from './views/SupplyFormView';
import DemandFormView from './views/DemandFormView';
import DetailActivityView from './views/DetailActivityView';
import AddResponseView from './views/AddResponseView';
import PrivateRoute from './components/PrivateRoute';
import gql from 'graphql-tag';
import {
    graphql,
} from 'react-apollo';
import {
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'
import ProfileView from "./views/ProfileView";
import Loader from './components/Loader';

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


const mapStateToProps = state => ({
    tab: state.commons.tab,
});

const mapDispatchToProps = dispatch => ({
    onChangeTab: (event, tab) =>
        dispatch({ type: CHANGE_MAIN_TAB, tab }),
});

class App extends Component {

    render() {
        const { classes, theme } = this.props;
        let { loading, me } = this.props;
        let authed = false;

        if (loading) {
            return (
                <Loader />
            )
        }

        if (!!me) {
            authed=true;
        }

        return (
                <span>
                  <Header/>

                        <div className={classes.root} style={{position: "absolute", width: "100%", top:58 }}>
                          <Switch>
                            <Route extact path='/explore' component={ExploreView}/>
                            <PrivateRoute authed={authed} extact path='/add' component={AddView}/>
                            <PrivateRoute authed={authed} extact path='/notifications' component={NotificationView}/>
                            <Route authed={authed} extact path='/calendar' component={CalendarView}/>
                            <Route authed={authed} extact path='/profile' component={ProfileView}/>
                            <PrivateRoute authed={authed} extact path='/add-supply' component={SupplyFormView}/>
                            <PrivateRoute authed={authed} extact path='/add-demand' component={DemandFormView}/>
                            <PrivateRoute authed={authed} path='/activity/:id' component={DetailActivityView}/>
                            <PrivateRoute authed={authed} path='/add-response/:id' component={AddResponseView}/>

                            <Route path='/' render={() => (<Redirect to="/explore"/>)}/>
                          </Switch>

                        </div>
                        <Paper style={{ width: "100%",
                            position: "fixed",
                            bottom: 0
                        }}>
                            <Tabs
                                value={this.props.location.pathname}
                                onChange={this.props.onChangeTab}
                                fullWidth
                                indicatorColor="#009688"
                                textColor="#009688"
                                centered>
                                <Tab icon={<ExploreIcon />} component={Link} to="/explore" value="/explore" />
                                <Tab icon={<EventIcon />} component={Link} to="/calendar" value="/calendar" />
                                <Tab icon={<AddCircle />} component={Link} to="/add" value="/add" />
                                <Tab icon={<Notifications />} component={Link} to="/notifications" value="/notifications" />
                                <Tab icon={<AccountCircle />} component={Link} to="/profile" value="/profile" />
                            </Tabs>
                        </Paper>
                </span>
    );
  }
}


const PROFILE_QUERY = gql`
    query currentUser {
        me {
            id
        }
    }
`;


const queryOptions = {

    options:  {
        fetchPolicy: 'network-only',
    },
    props: ({ data: { loading, me } }) => ({
        loading, me
    }),
};

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

let AppWithStyles = withStyles(styles, { withTheme: true })(App);
let AppWithData = graphql(PROFILE_QUERY, queryOptions)(AppWithStyles);
export default connect(mapStateToProps, mapDispatchToProps)(AppWithData);
