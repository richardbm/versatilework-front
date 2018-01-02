import React from 'react';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import BuildIcon from 'material-ui-icons/Build';
import DriveEtaIcon from 'material-ui-icons/DriveEta';


function CategoryIconComponent (props) {
    let style = props.style ? props.style: {};
    if (props.icon === "ShoppingCartIcon")
        return (<ShoppingCartIcon style={style} color={props.color} />)
    if (props.icon === "BuildIcon")
        return (<BuildIcon style={style} color={props.color} />)
    if (props.icon === "DriveEtaIcon")
        return (<DriveEtaIcon style={style} color={props.color} />)

}

export default CategoryIconComponent;