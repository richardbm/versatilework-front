import React from 'react';
import AddComponent from '../components/AddComponent';


class AddView extends React.Component {

    constructor(props){
        super(props);
    }


    render() {

        return (
            <span style={{position: "relative", maxHeight: 100}}>
                <AddComponent />
                <AddComponent />
            </span>
        );
    }
}

export default AddView;