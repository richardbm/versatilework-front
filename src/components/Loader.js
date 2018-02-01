import React, { Component } from 'react';
import { LinearProgress } from 'material-ui/Progress';

let styles = {
    width: "100%",
    padding: 2,
    height:0,
    top: 0,
    position: "absolute"
};


function Loader(props) {
    return (
        <LinearProgress style={styles}/>
    )

}

export default Loader;