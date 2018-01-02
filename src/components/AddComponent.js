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
        let titleStyle = {
            color: "gray",
            position: "relative",
            margin: 0,
            padding:0,
            fontSize: "19px"

        };
        return (
            <Button raised className={classes.button}>
                <div style={{
                    height:"100px",
                    width:"100px"
                }}>
                    {this.props.icon}

                    <h3 style={titleStyle}>
                        {this.props.title}
                    </h3>
                </div>

            </Button>
        );
    }
}


AddComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddComponent);