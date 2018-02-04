import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Moment from 'react-moment';
import gql from 'graphql-tag';
import {
    graphql,
} from 'react-apollo';
import Loader from './Loader';
import {
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: "100%",
        maxHeight: "100%",
        background: theme.palette.background.paper,
    },
});


function resolveSrc(obj) {
    let data = JSON.parse(obj.data);
    return data.profile_photo;
}

function resolveIdActivity(obj) {
    let data = JSON.parse(obj.data);
    return data.id.toString();
}

function NotificationPanel(props) {
    const { classes } = props;
    let { loading, notifications } = props;
    if (loading) {
        return <Loader/>
    }
    return (
        <div className={classes.root}>
            <List>
                {notifications.map(obj => (
                    <ListItem button key={obj.id}
                    component={Link} to={"/activity/"+resolveIdActivity(obj)}
                    >
                        <Avatar src={resolveSrc(obj)}/>
                        <ListItemText primary={obj.body} secondary={(<Moment fromNow date={obj.date} />)}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

NotificationPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};


const NOTIFICATIONS_QUERY = gql`
    query NotificationsQuery {
        notifications {
            id
            body
            date
            data
        }
    }
`;


const queryOptions = {

    options:  {
        fetchPolicy: 'network-only',
    },
    props: ({ data: { loading, notifications } }) => ({
        loading, notifications
    }),
};


export default graphql(NOTIFICATIONS_QUERY, queryOptions)(withStyles(styles)(NotificationPanel));