import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
    button: {
        height: "42vh",
        width: "100%",
        position: "relative",
        backgroundColor: "rgba(231, 238, 210, 0.5)",
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
            <span>
                <Button
                    component={Link} to={this.props.link} value={this.props.link}
                    raised className={classes.button}>
                    <div style={{
                        height:"100px",
                        width:"100px",
                        color: "rgba(231, 238, 210, 0.5)",
                    }}>
                        {this.props.icon}

                        <h3 style={titleStyle}>
                            {this.props.title}
                        </h3>
                    </div>

                </Button>
            </span>
        );
    }
}


AddComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddComponent);