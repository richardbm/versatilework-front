import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: "100%",
        maxHeight: "100%",
        background: theme.palette.background.paper,
    },
});

function resolveName(obj, owner) {
    let fullName = obj.owner.firstName+" "+obj.owner.lastName
    if (owner.id === obj.owner.id) {
        fullName += " (Owner)"
    }
    return fullName
}

function ResponsesList(props) {
    const { classes } = props;
    let { responses, owner } = props;
    return (
        <div className={classes.root}>
            <List>
                {responses.map(obj => (
                    <ListItem
                        button key={obj.id}>
                        <Avatar src={obj.owner.facebookPictureUrl} />
                        <ListItemText
                            style={{paddingLeft:10}}
                            primary={resolveName(obj, owner)}
                            secondary={obj.description}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

ResponsesList.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ResponsesList);