import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import HearingIcon from 'material-ui-icons/Hearing';
import ExploreIcon from 'material-ui-icons/Explore';
import RecordVoiceOverIcon from 'material-ui-icons/RecordVoiceOver';
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
                    <BottomNavigationButton label="Supply" value="SU" icon={<RecordVoiceOverIcon />} />
                    <BottomNavigationButton label="All" value="ALL" icon={<ExploreIcon />} />
                    <BottomNavigationButton label="Demand" value="DE" icon={<HearingIcon />} />
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
