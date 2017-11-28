import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import Divider from 'material-ui/Divider';

const styles = {
    root: {
        width: "100%",
        position: "relative",
    },
};

class LabelNavigation extends React.Component {

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
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <span>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    className={classes.root}>
                    <BottomNavigationButton label="Recents" value="recents" icon={<RestoreIcon />} />
                    <BottomNavigationButton label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationButton label="Nearby" value="nearby" icon={<LocationOnIcon />} />
                </BottomNavigation>
                <Divider />
            </span>
        );
    }
}

LabelNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelNavigation);