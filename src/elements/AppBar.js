import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Help from 'material-ui-icons/Help';
import IconButton from 'material-ui/IconButton';



const styles = theme => ({
    root: {
        marginTop: 0,
        width: '100%',
        position: "fixed",

    },
    menuLeftButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    menuRightButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});


class PrincipalAppBar extends Component {

  render() {
      const { classes } = this.props;
    return (
        <AppBar className={classes.root}>
            <Toolbar>

                <Typography  type="title" color="inherit" style={{position: "relative", width: "100%"}} >
                    <span style={{
                        position: "absolute",
                        left: 0,
                        top: -10,
                        width: "100%",
                        textAlign: "center",
                    }}>
                        Versatile Work
                    </span>
                </Typography>
            </Toolbar>
        </AppBar>
    );
  }
}

PrincipalAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrincipalAppBar);