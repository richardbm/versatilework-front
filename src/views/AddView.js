import React from 'react';
import AddComponent from '../components/AddComponent';
import HearingIcon from 'material-ui-icons/Hearing';
import RecordVoiceOverIcon from 'material-ui-icons/RecordVoiceOver';

class AddView extends React.Component {

    constructor(props){
        super(props);
    }


    render() {

        let iconStyle = {
            width: "75px",
            height: "75px",
            color: "gray",
            position: "relative",
        };
        return (
            <span style={{position: "relative", maxHeight: 100}}>
                <AddComponent
                    link="/add-supply"
                    title="Supply"
                    icon={<RecordVoiceOverIcon style={iconStyle}/>}/>
                <AddComponent
                    link="/add-demand"
                    title="Demand"
                    icon={<HearingIcon style={iconStyle} />}/>
            </span>
        );
    }
}

export default AddView;