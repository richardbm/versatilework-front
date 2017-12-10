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
        this.props.onChangeTab(value);
    };

    render() {
        const { classes } = this.props;

        return (
            <span>
                <BottomNavigation
                    value={this.props.tab}
                    onChange={this.handleChange}
                    className={classes.root}>
                    <BottomNavigationButton label="Offers" value="offer" icon={<RestoreIcon />} />
                    <BottomNavigationButton label="All" value="all" icon={<FavoriteIcon />} />
                    <BottomNavigationButton label="Demands" value="demand" icon={<LocationOnIcon />} />
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