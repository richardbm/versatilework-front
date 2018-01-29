import React from 'react';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import BuildIcon from 'material-ui-icons/Build';
import DriveEtaIcon from 'material-ui-icons/DriveEta';

const styles = {
    position: "relative",
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "#009688",
    borderRadius: "50%",
    height: "20px",
    width: "20px",
    padding: "6px",
}


function CategoryIconComponent (props) {
    let style = props.style ? props.style: styles;
    if (props.icon === "ShoppingCartIcon")
        return (<ShoppingCartIcon style={style} color={props.color} />)
    if (props.icon === "BuildIcon")
        return (<BuildIcon style={style} color={props.color} />)
    if (props.icon === "DriveEtaIcon")
        return (<DriveEtaIcon style={style} color={props.color} />)

}

export default CategoryIconComponent;