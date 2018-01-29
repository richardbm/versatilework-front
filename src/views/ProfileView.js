import React from 'react';
import Profile from '../components/Profile';
import { connect } from 'react-redux';


class ProfileView extends React.Component {

    constructor(props){
        super(props);
    }


    render() {

        return (
            <Profile/>
        );
    }
}

export default ProfileView;