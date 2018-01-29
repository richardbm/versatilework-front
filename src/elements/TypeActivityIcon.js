import React, { Component } from 'react';
import { DEMAND } from '../constants/constExplorer';
import HearingIcon from 'material-ui-icons/Hearing';
import RecordVoiceOverIcon from 'material-ui-icons/RecordVoiceOver';


function TypeActivityIcon(props) {
    let typeActivity = props.typeActivity;
    let style = {
        position: "absolute",
        left: "5px",
        top: "5px",
        color: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "#009688",
        borderRadius: "50%",
        height: "20px",
        width: "20px",
        padding: "6px",
    };

    if (typeActivity===DEMAND){
        return <HearingIcon style={style}/>
    }
    return <RecordVoiceOverIcon style={style}/>
}

export default TypeActivityIcon;