import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    button: {
        height: "42vh",
        width: "100%",
        position: "relative",
    },
});

class AddComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Button raised className={classes.button}>
                To offer help
            </Button>
        );
    }
}


AddComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddComponent);