import React from 'react';
import Calendar from '../components/Calendar';
import { connect } from 'react-redux';


class CalendarView extends React.Component {

    constructor(props){
        super(props);
    }


    render() {

        return (
            <Calendar />
        );
    }
}

export default CalendarView;