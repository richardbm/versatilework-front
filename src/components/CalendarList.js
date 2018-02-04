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

function CalendarList(props) {
    const { classes } = props;
    let { loading, activity } = props.data;
    if (loading) {
        return <Loader/>
    }
    return (
        <div className={classes.root}>
            <List>
                {activity.map(obj => (
                    <ListItem button key={obj.id}
                    component={Link} to={"/activity/"+obj.id}
                    >
                        <ListItemText primary={obj.title} secondary={(<Moment toNow date={obj.date} />)}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

CalendarList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarList);
